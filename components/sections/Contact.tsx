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
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-28">
      {/* 星系 / 黑洞 3D 背景（紫藍，與主題契合） */}
      <ThreeBackground />

      <div className="container relative z-10 pointer-events-none">
        <Reveal className="pointer-events-auto mx-auto max-w-2xl rounded-glass border border-glass-border bg-white/[0.03] p-10 text-center backdrop-blur-md">
          <p className="font-mono text-sm tracking-widest text-primary-400">{"// contact"}</p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
            {line}
          </h2>

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
