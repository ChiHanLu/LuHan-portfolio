"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis 平滑捲動，並與 GSAP ScrollTrigger 同步（用 gsap.ticker 驅動 raf）。
 * 開啟「減少動態」的使用者一律用瀏覽器原生捲動。
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000); // gsap.ticker 給秒，lenis 要毫秒
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // 非同步內容（動態載入的 WebGL、字體 swap）會撐高頁面，
    // 必須在內容穩定後重算 ScrollTrigger 位置，否則靠近頁尾的觸發點會算錯而不觸發。
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 600);
    const t2 = window.setTimeout(refresh, 1500);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
