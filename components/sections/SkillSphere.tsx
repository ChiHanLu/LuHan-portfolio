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
  "AI / LLM", "RAG", "Prompt", "資安", "自動化", "Git", "Linux", "Cloudflare",
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
  ctx.shadowColor = "rgba(139,92,246,0.9)";
  ctx.shadowBlur = 18 * dpr;
  ctx.fillStyle = "#ede9fe";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
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

    // 細線框球體做骨架
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R, 1)),
      new THREE.LineBasicMaterial({ color: new THREE.Color("#6d28d9"), transparent: true, opacity: 0.18 })
    );
    group.add(wire);

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
    composer.setSize(w, h);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(w, h), lowEnd ? 0.35 : 0.5, 0.6, 0.15));
    composer.addPass(new OutputPass());

    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    if (!reduce) mount.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const dt = clock.getDelta();
      group.rotation.y += dt * 0.18 + px * dt * 0.6;
      group.rotation.x += (py * 0.4 - group.rotation.x) * 0.04;
      // 讓每個標籤永遠面向相機（sprite 本來就 billboard，這裡只更新 bloom 場景）
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
      mount.removeEventListener("pointermove", onMove);
      sprites.forEach((s) => {
        (s.material as THREE.SpriteMaterial).map?.dispose();
        (s.material as THREE.Material).dispose();
      });
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
