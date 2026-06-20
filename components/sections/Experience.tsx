"use client";

import { Reveal } from "@/components/ui/Reveal";

type Item = { period: string; title: string; org: string; desc: string };

const timeline: Item[] = [
  {
    period: "2025 – 至今",
    title: "資訊實習生",
    org: "智能悅信資訊股份有限公司",
    desc: "負責後端系統開發，主導金物流發票中控與 CRM 中控；協作前端 UI/UX，並以 workflow 建立自動化流程。",
  },
  {
    period: "2025",
    title: "主要開發者",
    org: "日記之森 · SoulCraft Journal",
    desc: "帶領團隊開發心情記錄平台，從架構設計到上線，晉級跨域競技場決賽。",
  },
  {
    period: "在學",
    title: "資訊管理系",
    org: "國立臺北商業大學",
    desc: "全端開發、資料庫設計、AI/LLM 應用與 RAG 技術實作。",
  },
  {
    period: "起點",
    title: "跨域轉向軟體開發",
    org: "從企管到工程",
    desc: "從五專企管背景跨域學習程式，從排斥 AI 到 AI 主導開發、人工審查架構與資安。",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 py-28">
      <div className="container relative z-10">
        <Reveal className="text-center">
          <p className="font-mono text-sm tracking-widest text-primary-400">{"// experience"}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            經歷
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* 軸線 */}
          <span className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary-500/60 via-primary-500/30 to-transparent sm:left-4" />

          <Reveal className="space-y-6" stagger={0.12}>
            {timeline.map((item) => (
              <div key={item.title + item.period} className="relative pl-10 sm:pl-14">
                {/* 節點 */}
                <span className="absolute left-[5px] top-6 h-3 w-3 rounded-full bg-primary-500 shadow-glow ring-4 ring-primary-500/15 sm:left-[9px]" />
                <div className="glass rounded-glass p-6">
                  <div className="font-mono text-xs tracking-widest text-primary-400">{item.period}</div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {item.title}
                    <span className="ml-2 text-sm font-normal text-gray-400">· {item.org}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
