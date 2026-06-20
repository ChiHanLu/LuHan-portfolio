"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** 位移距離（px） */
  y?: number;
  /** 子元素間錯開時間（秒） */
  stagger?: number;
}

/**
 * 捲動進場：對「直接子元素」做 fade + slide-up 的錯開動畫。
 * 用原生 IntersectionObserver 偵測進場（看真實 viewport，不依賴 Lenis 捲動代理），
 * 動畫本體交給 GSAP。開啟「減少動態」者直接看到內容、不跑動畫。
 */
export function Reveal({ children, className, y = 28, stagger = 0.08 }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.children) as HTMLElement[];
    if (!targets.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(targets, { opacity: 0, y });
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger,
            });
            obs.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
