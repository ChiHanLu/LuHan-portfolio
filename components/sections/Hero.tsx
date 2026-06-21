"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { ResumeDownload } from "@/components/ui/ResumeDownload";
import { Parallax } from "@/components/ui/Parallax";
import { SplitReveal } from "@/components/ui/SplitReveal";

// 粒子星群 / 3D 主視覺只在 client 載入
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 進場時間軸
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.5 })
          .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2")
          .from(".hero-cta > *", { opacity: 0, y: 18, duration: 0.5, stagger: 0.12 }, "-=0.3")
          .from(".hero-chip", { opacity: 0, scale: 0.6, duration: 0.4, stagger: 0.07 }, "-=0.2");

        // 捲動視差淡出：滑過首屏時內容上移、淡出、微縮（過程漸變）
        gsap.to(".hero-copy", {
          y: -140,
          opacity: 0,
          scale: 0.96,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 粒子星群連線（背景主視覺，全幅，隨捲動視差） */}
      <Parallax speed={-90} className="absolute inset-0 z-0">
        <ParticleField />
      </Parallax>
      {/* 3D 主視覺：變形球體 + 發光星點 + bloom（桌機靠右） */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>
      {/* 光線：god-ray 光束自上方緩慢掃過 + conic 光圈疊加（A+C） */}
      <div className="god-rays z-0" aria-hidden />
      <div
        className="conic-glow left-1/2 top-1/3 z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 opacity-25"
        aria-hidden
      />
      {/* 左側遮罩：確保標題文字可讀 */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/70 to-transparent" />

      <div className="container relative z-20">
        <div className="hero-copy max-w-3xl">
          <p className="hero-eyebrow font-mono text-sm tracking-widest text-primary-400">
            Full-Stack Engineer
          </p>

          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <SplitReveal text="Chi Han Lu" stagger={0.045} />
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-gray-300 lg:text-xl">
            資訊管理系學生 · 軟體開發實習生
            <br />
            具備後端工程能力與 AI 技術應用經驗，把需求轉成穩定好維護的系統。
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <ResumeDownload className="shadow-glow hover:shadow-glow" intent="primary" size="lg" />
            <a href="#contact">
              <Button className="backdrop-blur-sm" intent="outline" size="lg">
                聯絡我
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {["Python", "Laravel", "Next.js", "PostgreSQL", "AI / LLM"].map((t) => (
              <span
                key={t}
                className="hero-chip rounded-full border border-glass-border bg-glass px-3 py-1 font-mono text-xs text-primary-300 backdrop-blur-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 底部淡出銜接 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
