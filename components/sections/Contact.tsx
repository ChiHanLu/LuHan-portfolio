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
// 星空粒子背景（滿版，與 galaxy 疊加）
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

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
          { yPercent: 14, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
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
      className="relative flex min-h-[130vh] scroll-mt-20 items-start overflow-x-clip pt-[14vh]"
    >
      {/* 星空粒子背景：滿版往上下延伸（pointer-events-none，避免手機攔截捲動） */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <ParticleField />
      </div>

      {/* galaxy 包裹層：以 mask 把星系上下淡成「透明」融入星空；手機縮小且不攔截捲動 */}
      <div
        ref={galaxyRef}
        className="pointer-events-none absolute inset-x-0 top-[44vh] h-[42vh] z-0 will-change-transform md:pointer-events-auto md:top-[40vh] md:h-[62vh]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)",
        }}
      >
        <ThreeBackground />
      </div>

      {/* contact 內容置於下方區域，上方留出大片星空（兩者各自保留空間、不貼合） */}
      <div className="container relative z-10 pointer-events-none">
        <Reveal className="mx-auto max-w-3xl text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
          {/* 直接把工程師語錄當作標題 */}
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {line}
          </h2>

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
