"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// 鋸齒狀閃電（viewBox 360 x 480）；x = 落地點 X，用來在地板對應位置產生波紋
const BOLTS = [
  { d: "M40 -10 L28 90 L52 160 L22 280 L44 370 L18 470", x: 18 },
  { d: "M70 -10 L52 90 L78 150 L44 270 L66 360 L38 470", x: 38 },
  { d: "M120 -10 L138 80 L112 180 L140 270 L116 380 L142 470", x: 142 },
  { d: "M150 -10 L168 80 L140 170 L170 260 L146 370 L172 470", x: 172 },
  { d: "M205 -10 L190 100 L216 190 L188 300 L214 400 L192 470", x: 192 },
  { d: "M250 -10 L236 100 L262 190 L232 300 L256 400 L228 470", x: 228 },
  { d: "M300 -10 L316 90 L290 180 L320 290 L296 390 L322 470", x: 322 },
  { d: "M320 -10 L332 110 L306 200 L334 320 L312 420 L300 470", x: 300 },
];
const FLOOR_Y = 470;

/**
 * 紫色閃電：鋸齒路徑以 DrawSVG 快速「劈下」並閃爍，落地時在地板對應位置炸開紫色波紋。
 * 隨機間隔打在不同道；純裝飾；偏好減少動態者不啟用。
 */
export default function Lightning({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svg = ref.current;
    if (!svg) return;
    const bolts = Array.from(svg.querySelectorAll<SVGPathElement>("[data-bolt]"));
    const ripples = Array.from(svg.querySelectorAll<SVGEllipseElement>("[data-ripple]"));
    gsap.set(bolts, { drawSVG: "0% 0%", opacity: 0 });
    gsap.set(ripples, { opacity: 0, attr: { rx: 3, ry: 1 } });

    let alive = true;
    const strike = () => {
      if (!alive) return;
      const i = Math.floor(Math.random() * bolts.length);
      const p = bolts[i];
      const rip = ripples[i];
      gsap
        .timeline()
        // 劈下
        .set(p, { drawSVG: "0% 0%", opacity: 1 })
        .to(p, { drawSVG: "0% 100%", duration: 0.12, ease: "power1.in" })
        .to(p, { opacity: 0.35, duration: 0.06 })
        .to(p, { opacity: 1, duration: 0.05 })
        .to(p, { opacity: 0, duration: 0.5, ease: "power2.out" })
        // 落地波紋（在閃電到達地板時炸開）
        .set(rip, { opacity: 0.85, attr: { rx: 3, ry: 1 } }, 0.12)
        .to(rip, { attr: { rx: 80, ry: 18 }, duration: 0.75, ease: "power2.out" }, 0.12)
        .to(rip, { opacity: 0, duration: 0.55, ease: "power2.out" }, 0.18);
      gsap.delayedCall(1.2 + Math.random() * 2.8, strike);
    };
    gsap.delayedCall(0.8 + Math.random(), strike);

    return () => {
      alive = false;
      gsap.killTweensOf([...bolts, ...ripples]);
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
        {BOLTS.map((b, i) => (
          <ellipse
            key={`r${i}`}
            data-ripple
            cx={b.x}
            cy={FLOOR_Y}
            rx={3}
            ry={1}
            fill="none"
            stroke="#c4b5fd"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {BOLTS.map((b, i) => (
          <path
            key={`b${i}`}
            data-bolt
            d={b.d}
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
