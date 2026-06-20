"use client";

import * as React from "react";
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

export function ResumeDownload({ intent = "primary", size = "lg", className }: ResumeDownloadProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <Button
        intent={intent}
        size={size}
        className={className}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        下載履歷
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-black/80 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-lg"
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
    </div>
  );
}
