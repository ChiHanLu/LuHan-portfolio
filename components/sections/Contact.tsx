"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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
  const root = useRef<HTMLElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState(lines[0]);

  useEffect(() => {
    setLine(lines[Math.floor(Math.random() * lines.length)]);
  }, []);

  // Galaxy 捲動互動：一條 scrubbed timeline —— 進場從下方升起淡入 → 過場視差縮放 → 離場往下沉淡出
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .fromTo(
            galaxyRef.current,
            { yPercent: 14, opacity: 0, scale: 1.12 },
            { yPercent: 0, opacity: 1, scale: 1, ease: "power1.out", duration: 0.35 }
          )
          .to(galaxyRef.current, { scale: 1.05, ease: "none", duration: 0.4 })
          .to(galaxyRef.current, { yPercent: 16, opacity: 0, ease: "power1.in", duration: 0.25 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="contact"
      ref={root}
      className="relative flex min-h-[120vh] scroll-mt-20 items-center pt-10 pb-0"
    >
      {/* galaxy 包裹層：上下各延伸超出 Contact，讓星空不與內容、頁尾貼死 */}
      <div
        ref={galaxyRef}
        className="absolute inset-x-0 -top-[18vh] -bottom-[12vh] z-0 will-change-transform"
      >
        <ThreeBackground />
        {/* 上下漸層遮罩：星空往上下自然淡入淡出，銜接相鄰區塊 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-56 bg-gradient-to-b from-background via-background/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-56 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* contact 內容垂直置中浮於星空上方（無卡片框） */}
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
