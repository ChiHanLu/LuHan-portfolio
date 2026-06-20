"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 傾斜最大角度（度） */
  tilt?: number;
}

/**
 * 玻璃卡片：滑鼠移動時 3D 傾斜 + 光暈跟隨（樣式見 globals.css 的 .glass-card）。
 * 觸控 / 減少動態偏好下不傾斜，只保留靜態玻璃外觀。
 */
export function GlassCard({ children, className, tilt = 8, ...rest }: GlassCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(700px) rotateY(${(px - 0.5) * tilt}deg) rotateX(${(0.5 - py) * tilt}deg) translateY(-6px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("glass-card", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
