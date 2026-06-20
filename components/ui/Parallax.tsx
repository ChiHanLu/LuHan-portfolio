"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 捲動時的位移量（px）；負值＝隨捲動往上移得更快，製造景深 */
  speed?: number;
}

/**
 * 捲動視差：元素隨頁面捲動以不同速度位移，產生多層次景深。
 * 用 ScrollTrigger scrub（每次捲動連續更新，與 Lenis 同步穩定）。
 * 減少動態偏好下不套用。建議用在絕對定位的裝飾層，避免影響版面流。
 */
export function Parallax({ children, className, speed = -60, ...rest }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(el, {
      y: speed,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
