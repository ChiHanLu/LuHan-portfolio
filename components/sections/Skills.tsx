"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useInView } from "@/lib/useInView";
import { Reveal } from "@/components/ui/Reveal";

const skills = [
  { name: "Laravel · PHP", level: 88 },
  { name: "Python · FastAPI · Flask", level: 85 },
  { name: "Vue.js · Next.js · React Native", level: 80 },
  { name: "MySQL · PostgreSQL · Oracle", level: 80 },
  { name: "自動化整合 · 資安防禦 · 雲端部署", level: 78 },
  { name: "AI / LLM · RAG · Prompt Engineering", level: 75 },
];

export default function Skills() {
  // 進場時技能條由 0 成長到滿（減少動態偏好下直接顯示滿格、不動畫）
  const ref = useInView<HTMLDivElement>(
    (el) => {
      const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
      gsap.to(bars, { scaleX: 1, duration: 1.1, ease: "power3.out", stagger: 0.08 });
    },
    { threshold: 0.25, enabled: !prefersReducedMotion() }
  );

  useEffect(() => {
    if (!ref.current) return;
    const bars = ref.current.querySelectorAll<HTMLElement>("[data-bar]");
    gsap.set(bars, { scaleX: prefersReducedMotion() ? 1 : 0 });
  }, [ref]);

  return (
    <section id="skills" className="relative scroll-mt-20 py-28">
      <div className="container relative z-10">
        <Reveal className="text-center">
          <p className="font-mono text-sm tracking-widest text-primary-400">{"// skills"}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            核心技能
          </h2>
        </Reveal>

        <div
          ref={ref}
          className="glass mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-6 rounded-glass p-7 sm:grid-cols-2 sm:p-10"
        >
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                <span className="font-mono text-xs text-primary-400">{skill.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  data-bar
                  style={{ width: `${skill.level}%`, transformOrigin: "left center" }}
                  className="h-full rounded-full bg-brand-gradient"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
