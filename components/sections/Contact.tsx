"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ResumeDownload } from "@/components/ui/ResumeDownload";
import { Reveal } from "@/components/ui/Reveal";

// galaxy / 黑洞 3D 背景（youmom.js）只在 client 載入
const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

const lines = [
  "Coffee → Code → Repeat",
  "Bug 不是 Bug，是未記錄的 Feature",
  "Console.log() 是我最好的朋友",
  "Localhost:3000 是我的第二個家",
  "Work Hard, Git Push Harder",
  "程式碼能跑就是奇蹟，能用就是神蹟",
  "人生苦短，但 TypeScript 讓它更穩",
];

export default function Contact() {
  const [line, setLine] = useState(lines[0]);

  useEffect(() => {
    setLine(lines[Math.floor(Math.random() * lines.length)]);
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] scroll-mt-20 items-start overflow-hidden pt-10 pb-0"
    >
      {/* galaxy 星系作為整塊背景 */}
      <ThreeBackground />

      {/* 僅底部漸層銜接頁尾；頂部不加遮罩，galaxy 完全透出 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-44 bg-gradient-to-t from-background to-transparent" />

      {/* contact 內容直接融入 galaxy 上方（無卡片框） */}
      <div className="container relative z-10 pointer-events-none">
        <Reveal className="mx-auto max-w-2xl text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
          <p className="font-mono text-sm tracking-widest text-primary-400">{"// contact"}</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            一起做點有趣的東西
          </h2>
          <p className="mt-4 font-mono text-sm text-gray-300">{line}</p>

          <div className="pointer-events-auto mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="mailto:11336028@ntub.edu.tw" aria-label="Email">
              <Button intent="primary" size="lg">
                Email 聯絡
              </Button>
            </Link>
            <ResumeDownload intent="outline" size="lg" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
