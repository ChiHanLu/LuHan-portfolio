"use client";

import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // 確保腳本只加載一次
    if (scriptLoadedRef.current) return;
    
    // 檢查腳本是否已經在頁面中
    const existingScript = document.querySelector('script[src="/youmom.js"]');
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "/youmom.js";
      script.async = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;

      return () => {
        // 清理時不移除腳本,因為 Three.js 可能還在使用
      };
    } else {
      scriptLoadedRef.current = true;
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="experience" 
      suppressHydrationWarning
      style={{
        touchAction: 'none',
        userSelect: 'none',
      }}
    />
  );
}
