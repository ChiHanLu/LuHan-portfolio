"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useInView } from "@/lib/useInView";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  { value: 2, suffix: "+", label: "年開發經驗" },
  { value: 8, suffix: "+", label: "代表專案" },
  { value: 15, suffix: "+", label: "掌握技術" },
  { value: 5, suffix: "+", label: "技術文章" },
];

export default function Stats() {
  // 進場時數字由 0 滾動到目標值（減少動態偏好下直接顯示最終值、不動畫）
  const ref = useInView<HTMLDivElement>(
    (el) => {
      el.querySelectorAll<HTMLElement>("[data-num]").forEach((n) => {
        const end = Number(n.dataset.num);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => (n.textContent = String(Math.round(obj.v))),
        });
      });
    },
    { threshold: 0.3, enabled: !prefersReducedMotion() }
  );

  useEffect(() => {
    if (!prefersReducedMotion() || !ref.current) return;
    ref.current
      .querySelectorAll<HTMLElement>("[data-num]")
      .forEach((n) => (n.textContent = n.dataset.num ?? "0"));
  }, [ref]);

  return (
    <section className="relative py-16">
      <div ref={ref} className="container relative z-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <GlassCard key={s.label} className="p-6 text-center">
              <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                <span data-num={s.value}>0</span>
                <span className="text-primary-400">{s.suffix}</span>
              </div>
              <div className="mt-2 text-sm text-gray-400">{s.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
