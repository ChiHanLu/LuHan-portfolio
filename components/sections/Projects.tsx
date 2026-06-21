"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Reveal3D } from "@/components/ui/Reveal3D";
import { GlassCard } from "@/components/ui/GlassCard";
import { Parallax } from "@/components/ui/Parallax";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  live?: string;
  flagship?: boolean;
};

// 註：描述依專案名稱與技術棧草擬，待本人校正。
const projects: Project[] = [
  {
    title: "NTUB 資管系專題系統",
    desc: "資管系團隊專題的全端系統，Vue 前端搭配 TypeScript 後端 API，含成績／學分相關模組與前後端資料對齊。",
    tech: ["Vue", "TypeScript", "REST API"],
    live: "https://ntub-project-frontend.vercel.app",
  },
  {
    title: "Vocab 單字學習 App",
    desc: "每日單字學習應用，支援來源篩選與「重新產生今日學習」，以 Expo 跨平台開發。",
    tech: ["React Native", "Expo", "TypeScript"],
    live: "https://vocab-frontend-zeta.vercel.app",
  },
  {
    title: "無障礙前端專案",
    desc: "以無障礙（a11y）為核心的前端專案，著重鍵盤操作、語意標記與對比可讀性。",
    tech: ["TypeScript", "Accessibility"],
    live: "https://accessibility-frontend-project.vercel.app",
  },
  {
    title: "Log Analysis 日誌分析平台",
    desc: "日誌分析系統，Laravel 後端 API 搭配 Vue 前端視覺化，協助快速定位異常。",
    tech: ["Laravel", "PHP", "Vue"],
  },
  {
    title: "TripOne 旅遊規劃平台",
    desc: "旅遊行程規劃平台，Vue 前端與 PHP 後端整合，提供行程與資料管理。",
    tech: ["Vue", "PHP"],
  },
  {
    title: "個人作品集網站",
    desc: "玻璃擬態紫黑主題響應式個人網站，整合 GSAP 捲動動畫、Lenis 平滑捲動與 Canvas 粒子、WebGL 星系特效。",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    flagship: true,
  },
];

const GITHUB = "https://github.com/ChiHanLu";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // 桌機：釘住面板，垂直捲動驅動卡片橫向滑動（pin + scrub）
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;
        const amount = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
        // 覆流（coverflow）3D：卡片依其相對視窗中心的位置旋轉 Y 軸
        const cards = gsap.utils.toArray<HTMLElement>(track.querySelectorAll(".pcard"));
        const tilt = () => {
          const cx = window.innerWidth / 2;
          cards.forEach((c) => {
            const r = c.getBoundingClientRect();
            const d = (r.left + r.width / 2 - cx) / window.innerWidth; // -0.5 ~ 0.5
            gsap.set(c, {
              rotateY: gsap.utils.clamp(-22, 22, -d * 46),
              z: -Math.abs(d) * 120,
              transformPerspective: 1200,
              transformOrigin: "center center",
            });
          });
        };
        gsap.to(track, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + amount(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: tilt,
            onRefresh: tilt,
          },
        });
        tilt();
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="projects" ref={root} className="relative scroll-mt-20 overflow-hidden pt-28">
      {/* 光線：god-ray 光束掃過（A） */}
      <div className="god-rays z-0" aria-hidden />
      <div className="container relative z-10">
        <Parallax speed={-50}>
          {/* 3D 轉場：標題群組由下往上翻入 */}
          <Reveal3D className="text-center" rotateX={40} stagger={0.12}>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              精選作品
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              從全端系統、AI 工具到跨平台 App，每個作品都承載著解決實際問題的思考。
            </p>
          </Reveal3D>
        </Parallax>
      </div>

      {/* 桌機：pin 釘住 + 橫向 track；手機：垂直 grid */}
      <div ref={pinRef} className="relative mt-12 md:mt-16 md:h-screen md:overflow-hidden">
        <div
          ref={trackRef}
          className="container grid grid-cols-1 gap-6 [perspective:1400px] sm:grid-cols-2 md:flex md:h-full md:w-max md:max-w-none md:items-center md:gap-8 md:px-16"
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="pcard flex md:w-[340px] md:shrink-0 md:[transform-style:preserve-3d]"
            >
            <GlassCard className="flex h-full flex-1 flex-col p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-sm text-primary-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-primary-500/20" />
                {project.flagship && (
                  <span className="rounded-full bg-primary-500/15 px-2 py-0.5 font-mono text-[10px] tracking-widest text-primary-300">
                    代表作
                  </span>
                )}
                {!project.live && (
                  <span className="rounded-full border border-glass-border px-2 py-0.5 font-mono text-[10px] tracking-widest text-gray-400">
                    私有
                  </span>
                )}
              </div>

              <h3 className="font-display text-base font-semibold text-primary-300 md:text-lg">{project.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-300">{project.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-glass-border bg-glass px-3 py-1 font-mono text-xs text-primary-300 backdrop-blur-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <Button intent="outline" size="sm">
                      查看 Demo →
                    </Button>
                  </a>
                ) : (
                  <span className="font-mono text-xs text-gray-500">原始碼可應要求提供</span>
                )}
              </div>
            </GlassCard>
            </div>
          ))}
        </div>
      </div>

      <div className="container relative z-10 mt-12 pb-28 text-center md:mt-16">
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium text-gray-300 transition-colors hover:text-primary-400"
        >
          更多專案在 GitHub <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
