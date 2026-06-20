"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";

const skills = [
  { name: "Python · Flask · Django", level: 85 },
  { name: "JavaScript · React · Next.js", level: 80 },
  { name: "PostgreSQL · MySQL", level: 75 },
  { name: "AI / LLM · Prompt Engineering", level: 70 },
  { name: "RESTful API 開發", level: 85 },
  { name: "Git · Linux", level: 80 },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      bars.forEach((bar) => gsap.set(bar, { scaleX: 1 }));
      return;
    }
    gsap.set(bars, { scaleX: 0 });
    // 原生 IntersectionObserver 觸發技能條成長（不依賴 Lenis 捲動代理）
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          gsap.to(bars, { scaleX: 1, duration: 1.1, ease: "power3.out", stagger: 0.08 });
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
                  className="h-full rounded-full bg-dark-orange-gradient"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
