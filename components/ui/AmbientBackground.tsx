"use client";

import { useEffect, useRef } from "react";

/**
 * 全站背景：極光漸層 + 三顆漂浮橘光球（滑鼠視差）。
 * fixed 在最底層、不吃滑鼠事件。減少動態偏好下停用視差。
 */
export default function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const blobs = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]"));
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        blobs.forEach((b) => {
          const s = Number(b.dataset.speed);
          b.style.transform = `translate(${dx * s * 30}px, ${dy * s * 30}px)`;
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 極光漸層 */}
      <div
        className="absolute -inset-[20%] animate-aurora blur-[90px]"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 30%, rgb(249 115 22 / 0.30), transparent 60%)," +
            "radial-gradient(35% 35% at 80% 20%, rgb(251 146 60 / 0.20), transparent 60%)," +
            "radial-gradient(45% 45% at 60% 80%, rgb(234 88 12 / 0.24), transparent 60%)",
        }}
      />
      {/* 漂浮光球 */}
      <div
        data-speed="3"
        className="absolute -left-10 -top-16 h-[380px] w-[380px] rounded-full bg-primary-500/25 blur-[60px] transition-transform duration-500 ease-cinema"
      />
      <div
        data-speed="-2"
        className="absolute bottom-[8%] -right-16 h-[320px] w-[320px] rounded-full bg-primary-400/20 blur-[60px] transition-transform duration-500 ease-cinema"
      />
      <div
        data-speed="4"
        className="absolute left-1/2 top-[40%] h-[240px] w-[240px] rounded-full bg-primary-600/15 blur-[60px] transition-transform duration-500 ease-cinema"
      />
    </div>
  );
}
