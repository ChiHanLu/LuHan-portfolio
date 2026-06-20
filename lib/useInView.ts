"use client";

import * as React from "react";

/** 是否偏好減少動態（client-only；SSR 時回傳 false） */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface UseInViewOptions {
  /** 進場觸發門檻（IntersectionObserver threshold） */
  threshold?: number;
  /** 為 false 時不掛 observer、不觸發（例如「減少動態」分支已自行處理） */
  enabled?: boolean;
}

/**
 * 捲動進場（只觸發一次）：元素進入 viewport 時呼叫 onEnter 後立即 disconnect。
 * 用原生 IntersectionObserver 偵測（看真實 viewport，不依賴 Lenis 捲動代理）。
 * onEnter 以 ref 保存，避免每次 render 重掛 observer。
 */
export function useInView<T extends HTMLElement>(
  onEnter: (el: T) => void,
  { threshold = 0.12, enabled = true }: UseInViewOptions = {}
) {
  const ref = React.useRef<T>(null);
  const onEnterRef = React.useRef(onEnter);
  onEnterRef.current = onEnter;

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          onEnterRef.current(el);
          obs.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, enabled]);

  return ref;
}
