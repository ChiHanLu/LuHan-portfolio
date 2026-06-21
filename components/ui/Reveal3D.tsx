"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useInView } from "@/lib/useInView";

interface Reveal3DProps {
  children: React.ReactNode;
  className?: string;
  /** 進場 X 軸傾倒角度（度），正值＝從下往上翻 */
  rotateX?: number;
  /** 進場 Y 軸翻轉角度（度），負值＝從左側翻入 */
  rotateY?: number;
  /** 位移距離（px） */
  y?: number;
  /** 子元素間錯開時間（秒） */
  stagger?: number;
}

const childrenOf = (el: HTMLElement) => Array.from(el.children) as HTMLElement[];

/**
 * 3D 翻轉進場：對「直接子元素」做 rotateX/rotateY + fade 的立體錯開動畫（CSS-3D，無 WebGL）。
 * 與 Reveal 相同的偵測/降級邏輯；偏好減少動態者直接顯示、不翻轉。
 */
export function Reveal3D({
  children,
  className,
  rotateX = 0,
  rotateY = 0,
  y = 36,
  stagger = 0.12,
}: Reveal3DProps) {
  const ref = useInView<HTMLDivElement>(
    (el) =>
      gsap.to(childrenOf(el), {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
      }),
    { enabled: !prefersReducedMotion() }
  );

  React.useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.set(childrenOf(ref.current), {
      opacity: 0,
      y,
      rotateX,
      rotateY,
      transformPerspective: 900,
      transformOrigin: "center center",
    });
  }, [ref, rotateX, rotateY, y]);

  return (
    <div ref={ref} className={className} style={{ perspective: 900 }}>
      {children}
    </div>
  );
}
