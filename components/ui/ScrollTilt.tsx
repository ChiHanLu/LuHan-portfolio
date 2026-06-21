"use client";

import * as React from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollTiltProps {
  children: React.ReactNode;
  className?: string;
  /** 最大傾角（度）。進場時往後傾、置中時打平、離場往前傾＝輕微翻頁感 */
  max?: number;
}

/**
 * 捲動透視翻頁：區塊隨捲動以 rotateX 連續傾斜（scrub），置中時打平。
 * 角度小（預設 7°）以維持上下區塊銜接、不破壞閱讀流。只用 rotateX（不造成水平溢出）。
 * 偏好減少動態者完全不套用。
 */
export function ScrollTilt({ children, className, max = 7 }: ScrollTiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const angle = (0.5 - self.progress) * 2 * max; // +max(進場) → 0(置中) → -max(離場)
        gsap.set(inner, { rotateX: angle, transformPerspective: 1400, transformOrigin: "center center" });
      },
    });
    return () => st.kill();
  }, [max]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
