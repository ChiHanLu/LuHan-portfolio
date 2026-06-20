"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ResumeDownload } from "@/components/ui/ResumeDownload";
import { Reveal } from "@/components/ui/Reveal";

// 橙色粒子星空背景只在 client 載入
const Starfield = dynamic(() => import("./Starfield"), { ssr: false });

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
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-28">
      {/* 橙色粒子星空背景 */}
      <div className="absolute inset-0 z-0">
        <Starfield />
      </div>

      <div className="container relative z-10">
        <Reveal className="mx-auto max-w-2xl rounded-glass glass-strong p-10 text-center pointer-events-auto">
          <p className="font-mono text-sm tracking-widest text-primary-400">{"// contact"}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            一起做點有趣的東西
          </h2>
          <p className="mt-4 font-mono text-sm text-gray-400">{line}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
