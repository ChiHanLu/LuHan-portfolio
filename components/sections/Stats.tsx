"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  { value: 2, suffix: "+", label: "年開發經驗" },
  { value: 2, suffix: "", label: "代表專案" },
  { value: 1, suffix: "", label: "競賽決賽晉級" },
  { value: 5, suffix: "+", label: "技術文章" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("[data-num]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nums.forEach((n) => (n.textContent = n.dataset.num ?? "0"));
      return;
    }
    // 用原生 IntersectionObserver 觸發數字滾動（不依賴 Lenis 捲動代理）
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          nums.forEach((n) => {
            const end = Number(n.dataset.num);
            const obj = { v: 0 };
            gsap.to(obj, {
              v: end,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => (n.textContent = String(Math.round(obj.v))),
            });
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
