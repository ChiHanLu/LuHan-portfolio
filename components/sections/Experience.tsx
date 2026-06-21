"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

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
  const root = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  // 進階轉場：釘住區塊，捲動驅動一條 scrubbed 時間軸 —— 主線逐段繪製、節點與卡片依序點亮滑入
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        if (!lineRef.current) return;

        gsap.set(lineRef.current, { drawSVG: "0%" });
        gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: "center" });
        gsap.set(cards, { opacity: 0, y: 38 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 1.15,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(lineRef.current, { drawSVG: "100%", ease: "none", duration: timeline.length });
        nodes.forEach((node, i) => {
          tl.to(node, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, i);
          tl.to(cards[i], { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, i + 0.08);
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="experience" ref={root} className="relative scroll-mt-20 overflow-hidden py-28">
      {/* 光線：左側 conic 光圈緩慢旋轉（C） */}
      <div
        className="conic-glow left-0 top-1/2 z-0 h-[460px] w-[460px] -translate-x-1/3 -translate-y-1/2 opacity-20"
        aria-hidden
      />
      <div className="container relative z-10">
        <Parallax speed={-50}>
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              經歷
            </h2>
          </Reveal>
        </Parallax>

        <div className="exp-timeline relative mx-auto mt-14 max-w-3xl">
          {/* 軸線：隨捲動逐段繪製 */}
          <svg
            className="pointer-events-none absolute left-3 top-2 bottom-2 w-1 sm:left-4"
            viewBox="0 0 4 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="exp-line" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              ref={lineRef}
              d="M2 0 L2 1000"
              stroke="url(#exp-line)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="space-y-6">
            {timeline.map((item) => (
              <div key={item.title + item.period} className="relative pl-10 sm:pl-14">
                {/* 節點（依序點亮） */}
                <span
                  data-node
                  className="absolute left-[5px] top-6 h-3 w-3 rounded-full bg-primary-500 shadow-glow ring-4 ring-primary-500/15 sm:left-[9px]"
                />
                <div data-card className="spotlight relative overflow-hidden glass rounded-glass p-6">
                  <div className="font-mono text-xs tracking-widest text-primary-400">{item.period}</div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {item.title}
                    <span className="ml-2 text-sm font-normal text-gray-400">· {item.org}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
