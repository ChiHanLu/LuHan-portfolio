"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Hero 共用 3D 主視覺：玻璃水晶（icosahedron, transmission）+ 發光紫色星點粒子。
 * 星空宇宙 + 玻璃水晶風格。滑鼠視差、緩慢自轉；偏好減少動態者只渲染靜態一幀。
 * 效能：DPR 上限、離開視窗暫停 RAF、手機降級（關 transmission、減粒子）、卸載時 dispose。
 */
export default function CrystalScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 640;

    let w = mount.clientWidth || window.innerWidth;
    let h = mount.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);

    // 環境貼圖：玻璃反射用（PMREM + RoomEnvironment）
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    // 玻璃水晶
    const geo = new THREE.IcosahedronGeometry(1.45, 0);
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c4b5fd"),
      metalness: 0,
      roughness: 0.12,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
      transparent: true,
      // 手機關閉 transmission（每幀額外渲染較貴），改用半透明玻璃感
      transmission: lowEnd ? 0 : 1,
      thickness: 1.4,
      opacity: lowEnd ? 0.5 : 1,
      attenuationColor: new THREE.Color("#8b5cf6"),
      attenuationDistance: 2.6,
    });
    const crystal = new THREE.Mesh(geo, mat);
    crystal.position.x = w < 768 ? 0 : 1.6; // 桌機靠右（避開左側標題），手機置中
    scene.add(crystal);

    // 發光線框邊
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: new THREE.Color("#a78bfa"), transparent: true, opacity: 0.5 })
    );
    crystal.add(edges);

    // 發光星點粒子
    const count = reduce ? 0 : lowEnd ? 180 : 420;
    let points: THREE.Points | null = null;
    if (count > 0) {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 6;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pos[i * 3 + 2] = r * Math.cos(ph) - 2;
      }
      const pgeo = new THREE.BufferGeometry();
      pgeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pmat = new THREE.PointsMaterial({
        color: new THREE.Color("#a78bfa"),
        size: 0.05,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      points = new THREE.Points(pgeo, pmat);
      scene.add(points);
    }

    // 燈光（紫＋靛）
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const l1 = new THREE.PointLight(0x8b5cf6, 40, 30);
    l1.position.set(4, 3, 4);
    scene.add(l1);
    const l2 = new THREE.PointLight(0x6366f1, 26, 30);
    l2.position.set(-4, -2, 3);
    scene.add(l2);

    // 滑鼠視差
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      crystal.rotation.y = t * 0.25 + px * 0.4;
      crystal.rotation.x = Math.sin(t * 0.3) * 0.15 - py * 0.3;
      if (points) points.rotation.y = t * 0.04;
      camera.position.x += (px * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-py * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    if (reduce) render();
    else loop();

    // 離開視窗時暫停 RAF（省電/省 GPU）
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting && !raf) loop();
        else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const onResize = () => {
      w = mount.clientWidth || window.innerWidth;
      h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      crystal.position.x = w < 768 ? 0 : 1.6;
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      edges.geometry.dispose();
      (edges.material as THREE.Material).dispose();
      if (points) {
        points.geometry.dispose();
        (points.material as THREE.Material).dispose();
      }
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
