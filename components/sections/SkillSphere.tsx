"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const TERMS = [
  "Laravel", "PHP", "Python", "FastAPI", "Flask", "Vue.js", "Next.js", "React Native",
  "TypeScript", "MySQL", "PostgreSQL", "Oracle", "Docker", "AWS", "GCP", "n8n",
  "AI / LLM", "RAG", "Prompt", "Security", "Automation", "Git", "Linux", "Cloudflare",
];

/** 製作一個文字精靈（canvas → 貼圖 → Sprite），發光紫白字，供 bloom 擷取。 */
function makeLabel(text: string): THREE.Sprite {
  const dpr = 2;
  const pad = 16 * dpr;
  const fontPx = 44 * dpr;
  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = `600 ${fontPx}px "Inter", system-ui, sans-serif`;
  const tw = Math.ceil(measure.measureText(text).width);
  const canvas = document.createElement("canvas");
  canvas.width = tw + pad * 2;
  canvas.height = fontPx + pad * 2;
  const ctx = canvas.getContext("2d")!;
  ctx.font = `600 ${fontPx}px "Inter", system-ui, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(139,92,246,0.5)";
  ctx.shadowBlur = 7 * dpr;
  ctx.fillStyle = "#b9a8e6"; // 較柔和的紫，避免太亮
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.82, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  const scale = 0.0034;
  sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
  return sprite;
}

/** 3D 旋轉技能球：技能名稱以文字精靈分布在球面（Fibonacci），自轉＋滑鼠視差＋bloom。 */
export default function SkillSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 640;

    let w = mount.clientWidth || 400;
    let h = mount.clientHeight || 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 6.2;

    const group = new THREE.Group();
    scene.add(group);

    // Fibonacci 球面分布
    const R = 2.3;
    const n = TERMS.length;
    const sprites: THREE.Sprite[] = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * 2.399963229728653; // golden angle
      const s = makeLabel(TERMS[i]);
      s.position.set(R * radius * Math.cos(theta), R * y, R * radius * Math.sin(theta));
      group.add(s);
      sprites.push(s);
    }

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
    composer.setSize(w, h);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(w, h), lowEnd ? 0.18 : 0.28, 0.6, 0.3));
    composer.addPass(new OutputPass());

    // 拖曳旋轉：按住拖曳手動轉，放開回到自動慢轉
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0.18; // 自動慢轉速度（rad/s）
    let velY = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      mount.setPointerCapture?.(e.pointerId);
      renderer.domElement.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      group.rotation.y += dx * 0.006;
      group.rotation.x += dy * 0.006;
      velX = dx * 0.05; // 放開後保留些微慣性
      velY = dy * 0.05;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      mount.releasePointerCapture?.(e.pointerId);
      renderer.domElement.style.cursor = "grab";
    };
    if (!reduce) {
      renderer.domElement.style.cursor = "grab";
      mount.addEventListener("pointerdown", down);
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerup", up);
    }

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const dt = clock.getDelta();
      if (!dragging) {
        // 慣性衰減回到自動慢轉
        velX += (0.18 - velX) * 0.02;
        velY += (0 - velY) * 0.05;
        group.rotation.y += velX * dt;
        group.rotation.x += velY * dt;
      }
      composer.render();
    };
    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    if (reduce) {
      clock.getDelta();
      render();
    } else loop();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting && !raf) {
          clock.getDelta();
          loop();
        } else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const onResize = () => {
      w = mount.clientWidth || 400;
      h = mount.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      sprites.forEach((s) => {
        (s.material as THREE.SpriteMaterial).map?.dispose();
        (s.material as THREE.Material).dispose();
      });
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden
      style={{
        maskImage: "radial-gradient(circle at 50% 50%, #000 38%, transparent 68%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 38%, transparent 68%)",
      }}
    />
  );
}
