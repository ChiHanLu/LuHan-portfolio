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

  // Galaxy 捲動互動，拆成兩段確保「galaxy 在讀 Contact 時是滿的、最後才消失」：
  //   1) 進場：區塊進入時星空從下方升起＋淡入（top bottom → top center）
  //   2) 離場：捲到頁面最底前的最後一段，星空往下沉＋漸層消失（往下消失效果）
  // 中間整段維持滿版作為 Contact 背景。Contact 是最後一個區塊，離場觸發點鎖在
  // 「bottom bottom」這個真的能捲到的位置（舊版用 bottom top 永遠到不了所以看不到）。
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          galaxyRef.current,
          { yPercent: 16, opacity: 0, scale: 1.12 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          }
        );
        gsap.to(galaxyRef.current, {
          yPercent: 24,
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: root.current,
            start: "bottom bottom-=420",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="contact"
      ref={root}
      className="relative flex min-h-[135vh] scroll-mt-20 items-start overflow-x-clip pt-[24vh]"
    >
      {/* galaxy 包裹層：往上延伸超出 Contact（與 BlogPreview 拉開、星空往上下延伸） */}
      <div
        ref={galaxyRef}
        className="absolute inset-x-0 -top-[22vh] bottom-0 z-0 will-change-transform"
      >
        <ThreeBackground />
        {/* 上下漸層遮罩：星空往上下自然淡入淡出，與相鄰區塊不貼死 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-64 bg-gradient-to-b from-background via-background/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-64 bg-gradient-to-t from-background via-background/55 to-transparent" />
      </div>

      {/* contact 內容置於下方區域，上方留出大片星空（兩者各自保留空間、不貼合） */}
      <div className="container relative z-10 pointer-events-none">
        <Reveal className="mx-auto max-w-2xl text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
          <p className="font-mono text-sm text-gray-300">{line}</p>

          <div className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
