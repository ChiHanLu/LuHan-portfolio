"use client";

import { useEffect, useRef } from "react";

/**
 * galaxy / 黑洞 3D 背景：載入 /youmom.js（第三方 minified bundle，內含自己的 Three.js）。
 * - 延後到 .experience 容器有實際尺寸後才注入，避免 init 與 resize 競態
 * - youmom.js 在競態下會丟 'composer' undefined 的良性錯誤（galaxy 仍正常渲染）；
 *   僅攔截來源為 youmom.js 的錯誤，避免 dev 錯誤覆蓋層與 console 噪音，不影響其他錯誤
 */
export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (e.filename && e.filename.includes("youmom.js")) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    // capture 階段先攔截，搶在框架的 error 監聽之前
    window.addEventListener("error", onError, true);

    let raf = 0;
    const inject = () => {
      if (loadedRef.current) return;
      const el = containerRef.current;
      if (!el || el.clientWidth === 0 || el.clientHeight === 0) {
        raf = requestAnimationFrame(inject);
        return;
      }
      loadedRef.current = true;
      if (!document.querySelector('script[src="/youmom.js"]')) {
        const script = document.createElement("script");
        script.src = "/youmom.js";
        script.async = true;
        document.body.appendChild(script);
      }
    };
    raf = requestAnimationFrame(inject);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("error", onError, true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="experience"
      suppressHydrationWarning
      style={{ touchAction: "none", userSelect: "none" }}
    />
  );
}
