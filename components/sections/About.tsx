"use client";

import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

const highlights = [
  { k: "現職", v: "智能悅信 · 資訊實習生" },
  { k: "在學", v: "臺北商業大學 · 資訊管理系" },
  { k: "專長", v: "後端工程 · AI / LLM 應用" },
  { k: "代表作", v: "日記之森 SoulCraft Journal" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-28">
      <div className="container relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-primary-400">{"// about"}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              關於我
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-300">
              <p>
                我是 Chi Han Lu，國立臺北商業大學資訊管理系學生，同時也是一名軟體開發實習生，具備小型專案全端開發、AI 技術應用與團隊專案的實務經驗。
              </p>
              <p>
                目前在智能悅信資訊股份有限公司擔任資訊實習生，主要負責後端系統開發，同時協作前端 UI/UX 設計，並運用 workflow 建立自動化流程。
              </p>
              <p>
                具備 Python (Flask) 與 PHP (Laravel) 的後端開發能力，熟悉 JavaScript (React, Next.js) 前端技術，擅長 PostgreSQL、MySQL 資料庫運用，並具備 AI/LLM Prompt Engineering 與 RAG 技術經驗。
              </p>
              <p>
                作為團隊專案《日記之森》的主要開發者，帶領專案晉級競賽決賽，相信技術的力量在於解決實際問題、創造有意義的產品。
              </p>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
            {highlights.map((h) => (
              <GlassCard key={h.k} className="p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-primary-400">{h.k}</div>
                <div className="mt-2 text-base font-medium text-white">{h.v}</div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
