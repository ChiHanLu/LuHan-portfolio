"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Parallax } from "@/components/ui/Parallax";

const highlights = [
  { k: "現職", v: "全端開發實習生（在職中）" },
  { k: "在學", v: "臺北商業大學 · 資訊管理系（二技）" },
  { k: "專長", v: "全端開發 · 自動化整合 · 資安防禦" },
  { k: "代表作", v: "Civic Tech 跨域競技場 · 全國決賽" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGCircleElement>(null);

  // 路徑動畫：捲動時 DrawSVG 沿著左側連接線「畫出」軌跡，光點以 MotionPath 沿同一路徑前進
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const path = pathRef.current;
        const comet = cometRef.current;
        if (!path || !comet) return;
        const st = {
          trigger: root.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        } as const;
        gsap.fromTo(path, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", scrollTrigger: st });
        gsap.fromTo(
          comet,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: st,
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative scroll-mt-20 overflow-hidden py-28">
      {/* 光線：右側 conic 光圈緩慢旋轉（C） */}
      <div
        className="conic-glow right-0 top-1/4 z-0 h-[420px] w-[420px] translate-x-1/4 opacity-20"
        aria-hidden
      />
      {/* 路徑動畫裝飾：左側 gutter 的連接線 + 光點（桌機顯示） */}
      <svg
        className="pointer-events-none absolute left-2 top-0 hidden h-full w-20 xl:block"
        viewBox="0 0 80 1000"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="about-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M40 20 C 10 220, 70 420, 40 620 S 10 880, 40 980"
          stroke="url(#about-line)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <circle ref={cometRef} r="5" fill="#c4b5fd" opacity="0">
          <animate attributeName="r" values="4;6;4" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="container relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-primary-400">{"// about"}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              關於我
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-300">
              <p>
                我是呂其翰（Chi Han Lu），就讀國立臺北商業大學資訊管理系。從五專企業管理科跨域轉向軟體開發，一門網頁設計課點燃了我「用程式從無到有解決問題」的熱情，也讓我帶著商業營運與 ERP 的底蘊投入工程。
              </p>
              <p>
                目前是全端開發實習生（1~2 年經歷），主力 Laravel 與 Python，主導開發金物流發票中控、CRM 中控等百萬級商業中台系統，擅長把複雜的商業邏輯轉化為模組化、標準化的系統架構。
              </p>
              <p>
                也負責後端架構與自動化整合：曾與臺大資工團隊協作開發 LineBot 與全端網站，運用 n8n、Make 建立跨平台工作流與 AI 客服串接，並熟悉 AWS、GCP、Oracle Cloud 部署與 Cloudflare 效能優化。
              </p>
              <p>
                我也深信使用者的信任建立在隱私保護與安全性之上——比起只把功能做完，我更在意系統化的防禦，因此獨立設計集中化 Log 監控與資安分析系統，並持續鑽研容錯與高強度的安全架構。曾帶領團隊從零程式基礎晉級《數位發展部》Civic Tech Taiwan 跨域競技場全國決賽，相信好的系統要兼顧高效的程式碼、貼合營運的商業邏輯，以及守得住的安全底線。
              </p>
            </div>
          </Reveal>

          <Parallax speed={-40}>
            <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
              {highlights.map((h) => (
                <GlassCard key={h.k} className="p-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-primary-400">{h.k}</div>
                  <div className="mt-2 text-base font-medium text-white">{h.v}</div>
                </GlassCard>
              ))}
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
