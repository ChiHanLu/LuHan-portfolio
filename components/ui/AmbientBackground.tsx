"use client";

import { useEffect, useRef } from "react";

/**
 * 全站背景：極光漸層 + 三顆漂浮紫光球（滑鼠 + 捲動視差），
 * 並隨捲動進度做 hue-rotate，使主色在區塊間於紫↔靛藍間漸變。
 * fixed 在最底層、不吃滑鼠事件。減少動態偏好下全部停用。
 */
export default function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const blobs = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]"));
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let raf = 0;
    let px = 0,
      py = 0,
      sy = 0;

    const apply = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        blobs.forEach((b) => {
          const s = Number(b.dataset.speed);
          // pointer 視差（桌機）+ scroll 視差（全裝置）疊加 → 全站景深
          const x = coarse ? 0 : px * s * 30;
          const y = (coarse ? 0 : py * s * 30) + sy * s * 0.06;
          b.style.transform = `translate(${x}px, ${y}px)`;
        });
      });
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth - 0.5;
      py = e.clientY / window.innerHeight - 0.5;
      apply();
    };
    const onScroll = () => {
      sy = window.scrollY;
      // 捲動進度 → hue-rotate：整層背景主色在紫↔靛藍間漸變（過程漸變）
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, sy / max) : 0;
      root.style.filter = `hue-rotate(${-p * 45}deg)`;
      apply();
    };

    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      root.style.filter = "";
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 極光漸層 */}
      <div
        className="absolute -inset-[20%] animate-aurora blur-[90px]"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgb(139 92 246 / 0.16), transparent 60%)," +
            "radial-gradient(35% 35% at 80% 20%, rgb(99 102 241 / 0.12), transparent 60%)," +
            "radial-gradient(45% 45% at 60% 80%, rgb(124 58 237 / 0.13), transparent 60%)",
        }}
      />
      {/* 漂浮光球 */}
      <div
        data-speed="3"
        className="absolute -left-10 -top-16 h-[380px] w-[380px] rounded-full bg-primary-500/12 blur-[60px] transition-transform duration-500 ease-cinema"
      />
      <div
        data-speed="-2"
        className="absolute bottom-[8%] -right-16 h-[320px] w-[320px] rounded-full bg-primary-400/10 blur-[60px] transition-transform duration-500 ease-cinema"
      />
      <div
        data-speed="4"
        className="absolute left-1/2 top-[40%] h-[240px] w-[240px] rounded-full bg-primary-600/[0.08] blur-[60px] transition-transform duration-500 ease-cinema"
      />
    </div>
  );
}
