"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 捲動時的位移量（px）；負值＝隨捲動往上移得更快，製造景深 */
  speed?: number;
  /** 捲動時的旋轉量（deg）；製造旋轉動畫 */
  rotate?: number;
}

/**
 * 捲動視差 / 旋轉：元素隨頁面捲動以不同速度位移或旋轉，產生多層次景深與動態。
 * 用 ScrollTrigger scrub（每次捲動連續更新，與 Lenis 同步穩定）。
 * 減少動態偏好下不套用。建議用在絕對定位的裝飾層，避免影響版面流。
 */
export function Parallax({ children, className, speed = -60, rotate = 0, ...rest }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const vars: gsap.TweenVars = { ease: "none" };
    if (speed) vars.y = speed;
    if (rotate) vars.rotate = rotate;

    const tween = gsap.to(el, {
      ...vars,
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, rotate]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
