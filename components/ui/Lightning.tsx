"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// 幾道鋸齒狀閃電路徑（viewBox 360 x 480）
const BOLTS = [
  "M70 -10 L52 90 L78 150 L44 270 L66 360 L38 490",
  "M150 -10 L168 80 L140 170 L170 260 L146 370 L172 490",
  "M250 -10 L236 100 L262 190 L232 300 L256 400 L228 490",
  "M320 -10 L332 110 L306 200 L334 320 L312 420 L300 490",
];

/**
 * 紫色閃電：鋸齒路徑以 DrawSVG 快速「劈下」並閃爍，隨機間隔打在不同道上。
 * 純裝飾、置於區塊背景；偏好減少動態者不啟用。
 */
export default function Lightning({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svg = ref.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    gsap.set(paths, { drawSVG: "0% 0%", opacity: 0 });

    let alive = true;
    const strike = () => {
      if (!alive) return;
      const p = paths[Math.floor(Math.random() * paths.length)];
      gsap
        .timeline()
        .set(p, { drawSVG: "0% 0%", opacity: 1 })
        .to(p, { drawSVG: "0% 100%", duration: 0.12, ease: "power1.in" })
        .to(p, { opacity: 0.35, duration: 0.06 })
        .to(p, { opacity: 1, duration: 0.05 }) // 閃爍
        .to(p, { opacity: 0, duration: 0.45, ease: "power2.out" });
      gsap.delayedCall(1.4 + Math.random() * 3.2, strike);
    };
    gsap.delayedCall(0.8 + Math.random(), strike);

    return () => {
      alive = false;
      gsap.killTweensOf(paths);
    };
  }, []);

  return (
    <div className={className} aria-hidden>
      <svg
        ref={ref}
        className="h-full w-full"
        viewBox="0 0 360 480"
        preserveAspectRatio="none"
        fill="none"
        style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.9))" }}
      >
        {BOLTS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#a78bfa"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
