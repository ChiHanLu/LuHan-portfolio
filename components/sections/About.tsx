"use client";

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
