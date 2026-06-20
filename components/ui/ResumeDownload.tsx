"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const resumes = [
  { label: "104 完整履歷", href: "/LuHan-Resume-104.pdf", desc: "詳細版・含完整經歷" },
  { label: "一頁 CV", href: "/LuHan-CV-OnePage.pdf", desc: "精簡版・一頁總覽" },
] as const;

interface ResumeDownloadProps {
  intent?: ButtonProps["intent"];
  size?: ButtonProps["size"];
  className?: string;
}

/**
 * 下載履歷下拉選單：選單以 portal 掛到 <body>、用 fixed 定位，
 * 徹底跳出各區塊 / scrub transform 造成的堆疊脈絡，確保永遠浮在最上層。
 */
export function ResumeDownload({ intent = "primary", size = "lg", className }: ResumeDownloadProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMounted(true), []);

  const place = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ top: r.bottom + 8, left: r.left });
  };

  const toggle = () => {
    if (!open) place();
    setOpen((v) => !v);
  };

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (triggerRef.current?.contains(t)) return;
      if (t.closest?.("[data-resume-menu]")) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // fixed 選單不跟著捲動，捲動/縮放時關閉避免錯位
    const close = () => setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          data-resume-menu
          role="menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ position: "fixed", top: pos.top, left: pos.left }}
          className="z-[200] w-64 overflow-hidden rounded-xl border border-white/10 bg-black/90 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-lg"
        >
          {resumes.map((r) => (
            <a
              key={r.href}
              href={r.href}
              download
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-4 py-3 text-left transition-colors",
                "hover:bg-primary-500/15 focus:bg-primary-500/15 focus:outline-none",
                "focus-visible:ring-2 focus-visible:ring-primary-400"
              )}
            >
              <div className="text-sm font-semibold text-white">{r.label}</div>
              <div className="mt-0.5 text-xs text-gray-400">{r.desc}</div>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={triggerRef} className="relative inline-block">
      <Button
        intent={intent}
        size={size}
        className={className}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        下載履歷
      </Button>
      {mounted && createPortal(menu, document.body)}
    </div>
  );
}
