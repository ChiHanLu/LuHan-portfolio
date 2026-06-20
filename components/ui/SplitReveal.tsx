"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useInView } from "@/lib/useInView";

interface SplitRevealProps {
  text: string;
  className?: string;
  /** 每字錯開秒數 */
  stagger?: number;
}

/**
 * 逐字揭示：把文字切成單字元，進場時各字以 3D 翻入 + 上移淡入錯開呈現（SplitText 風）。
 * 不依賴 GSAP SplitText 外掛；減少動態偏好下直接顯示。放在標題元素內使用。
 */
export function SplitReveal({ text, className, stagger = 0.03 }: SplitRevealProps) {
  const ref = useInView<HTMLSpanElement>(
    (el) => {
      const chars = el.querySelectorAll<HTMLElement>("[data-char]");
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger,
      });
    },
    { enabled: !prefersReducedMotion(), threshold: 0.3 }
  );

  React.useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.set(ref.current.querySelectorAll("[data-char]"), {
      yPercent: 120,
      opacity: 0,
      rotateX: -90,
    });
  }, [ref, text]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: "inline-block", perspective: "600px" }}
    >
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          data-char
          style={{ display: "inline-block", whiteSpace: "pre", transformOrigin: "50% 100%" }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
