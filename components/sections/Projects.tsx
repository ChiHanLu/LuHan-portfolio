"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  /** 線上 demo 連結；無則視為私有專案 */
  live?: string;
  /** 標記為旗艦/代表作 */
  flagship?: boolean;
};

// 註：以下描述為依專案名稱與技術棧草擬，待本人校正。
const projects: Project[] = [
  {
    title: "日記之森 · SoulCraft Journal",
    desc: "專注於心情記錄的線上日記平台，提供安全私密的情感抒發空間；身為主要開發者帶領團隊晉級競賽決賽。",
    tech: ["Python", "Flask", "PostgreSQL", "JavaScript"],
    live: "https://www.soulcraftjournal.studio/",
    flagship: true,
  },
  {
    title: "NTUB 資管系專題系統",
    desc: "資管系團隊專題的全端系統，Vue 前端搭配 TypeScript 後端 API，含成績／學分相關模組與前後端資料對齊。",
    tech: ["Vue", "TypeScript", "REST API"],
    live: "https://ntub-project-frontend.vercel.app",
  },
  {
    title: "ESG AI 行銷工具箱",
    desc: "串接 Gemini 的 ESG 行銷內容生成工具，透過 serverless proxy 安全呼叫模型，前端即時產出文案。",
    tech: ["JavaScript", "Gemini API", "Serverless"],
    live: "https://esg-ai-demo.vercel.app",
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
  return (
    <section id="projects" className="relative scroll-mt-20 py-28">
      <div className="container relative z-10">
        <Reveal className="text-center">
          <p className="font-mono text-sm tracking-widest text-primary-400">{"// projects"}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            精選作品
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            從全端系統、AI 工具到跨平台 App，每個作品都承載著解決實際問題的思考。
          </p>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.1}>
          {projects.map((project, idx) => (
            <GlassCard key={project.title} className="flex h-full flex-col p-6 md:p-7">
              <div className="mb-4 flex items-center gap-3">
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

              <h3 className="font-display text-lg font-semibold text-primary-300">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">{project.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
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
          ))}
        </Reveal>

        <div className="mt-10 text-center">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-gray-300 transition-colors hover:text-primary-400"
          >
            更多專案在 GitHub <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
