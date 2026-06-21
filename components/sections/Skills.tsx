"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useInView } from "@/lib/useInView";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

// 3D 旋轉技能球只在 client 載入
const SkillSphere = dynamic(() => import("./SkillSphere"), { ssr: false });

const skills = [
  { name: "Laravel · PHP", level: 88 },
  { name: "Python · FastAPI · Flask", level: 85 },
  { name: "Vue.js · Next.js · React Native", level: 80 },
  { name: "MySQL · PostgreSQL · Oracle", level: 80 },
  { name: "自動化整合 · 資安防禦 · 雲端部署", level: 78 },
  { name: "AI / LLM · RAG · Prompt Engineering", level: 75 },
];

export default function Skills() {
  // 進場時技能列交錯淡入、技能條由 0 成長到滿（減少動態偏好下直接顯示、不動畫）
  const ref = useInView<HTMLDivElement>(
    (el) => {
      const rows = el.querySelectorAll<HTMLElement>("[data-row]");
      const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
      gsap.to(rows, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: "power3.out", stagger: 0.09 });
      gsap.to(bars, { scaleX: 1, duration: 1.1, ease: "power3.out", stagger: 0.09, delay: 0.15 });
    },
    { threshold: 0.25, enabled: !prefersReducedMotion() }
  );

  useEffect(() => {
    if (!ref.current) return;
    const reduce = prefersReducedMotion();
    const rows = ref.current.querySelectorAll<HTMLElement>("[data-row]");
    const bars = ref.current.querySelectorAll<HTMLElement>("[data-bar]");
    gsap.set(bars, { scaleX: reduce ? 1 : 0 });
    gsap.set(
      rows,
      reduce ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 14, rotateX: -28, transformPerspective: 800 }
    );
  }, [ref]);

  return (
    <section id="skills" className="relative scroll-mt-20 overflow-hidden py-28">
      {/* 光線：conic 漸層光圈在技能球後方緩慢旋轉 */}
      <div
        className="conic-glow left-1/4 top-1/2 z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        aria-hidden
      />

      <div className="container relative z-10">
        <Parallax speed={-50}>
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              核心技能
            </h2>
          </Reveal>
        </Parallax>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* 3D 旋轉技能球 */}
          <div className="relative h-[360px] sm:h-[440px] lg:h-[480px]">
            <SkillSphere />
          </div>

          {/* 熟練度技能條 */}
          <div
            ref={ref}
            className="glass grid gap-x-10 gap-y-4 rounded-glass p-7 [perspective:1000px] sm:p-9"
          >
            {skills.map((skill) => (
              <div
                key={skill.name}
                data-row
                className="spotlight relative space-y-2 overflow-hidden rounded-xl border border-white/5 bg-white/5 p-3 backdrop-blur-sm"
              >
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
      </div>
    </section>
  );
}
