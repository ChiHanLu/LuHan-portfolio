"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/** 文章排版 primitives —— 用來組客製 React 文章頁（取代 markdown）。 */

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      data-toc
      className="article-block scroll-mt-24 font-display text-2xl font-bold text-white sm:text-3xl"
    >
      <span className="mr-2 font-mono text-base text-primary-500/70">#</span>
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="article-block scroll-mt-24 font-display text-xl font-semibold text-primary-200">
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="article-block text-[1.0625rem] leading-[1.85] text-gray-300">{children}</p>;
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="article-block text-lg leading-relaxed text-gray-200 sm:text-xl">{children}</p>
  );
}

export function Quote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="article-block border-l-2 border-primary-500/60 bg-primary-500/5 py-3 pl-5 pr-4 text-gray-200">
      <p className="italic leading-relaxed">{children}</p>
      {cite && <footer className="mt-2 font-mono text-xs text-primary-400">— {cite}</footer>}
    </blockquote>
  );
}

const calloutTone = {
  info: "border-primary-500/40 bg-primary-500/10 text-primary-100",
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-100",
  danger: "border-red-500/40 bg-red-500/10 text-red-100",
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof calloutTone;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("article-block rounded-xl border p-4 leading-relaxed", calloutTone[type])}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="article-block list-none space-y-2 text-[1.0625rem] leading-relaxed text-gray-300">
      {children}
    </ul>
  );
}

export function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary-500">
      {children}
    </li>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-secondary-800 px-1.5 py-0.5 font-mono text-[0.9em] text-primary-300">
      {children}
    </code>
  );
}

/** 程式碼區塊：深色卡 + 語言標籤 + 複製鈕。 */
export function CodeBlock({ code, lang = "code" }: { code: string; lang?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="article-block group relative overflow-hidden rounded-xl border border-primary-500/20 bg-black/70">
      <div className="flex items-center justify-between border-b border-primary-500/15 px-4 py-2">
        <span className="font-mono text-xs text-primary-400/80">{lang}</span>
        <button
          onClick={copy}
          className="font-mono text-xs text-gray-400 transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          {copied ? "已複製" : "複製"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-gray-200">{code}</code>
      </pre>
    </div>
  );
}

export function Figure({ children }: { children: React.ReactNode }) {
  return <div className="article-block">{children}</div>;
}

export function Divider() {
  return (
    <div className="article-block mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
  );
}
