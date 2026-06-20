"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useInView } from "@/lib/useInView";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** 位移距離（px） */
  y?: number;
  /** 子元素間錯開時間（秒） */
  stagger?: number;
}

const childrenOf = (el: HTMLElement) => Array.from(el.children) as HTMLElement[];

/**
 * 捲動進場：對「直接子元素」做 fade + slide-up 的錯開動畫。
 * 進場偵測交給 useInView（原生 IntersectionObserver，看真實 viewport），
 * 動畫本體交給 GSAP。開啟「減少動態」者直接看到內容、不跑動畫。
 */
export function Reveal({ children, className, y = 28, stagger = 0.08 }: RevealProps) {
  const ref = useInView<HTMLDivElement>(
    (el) => gsap.to(childrenOf(el), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger }),
    { enabled: !prefersReducedMotion() }
  );

  React.useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.set(childrenOf(ref.current), { opacity: 0, y });
  }, [ref, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
