"use client";

import * as React from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ReadingProgress } from "./ReadingProgress";
import { Toc } from "./Toc";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingMins: number;
};

type Adjacent = { slug: string; title: string } | null;

export function ArticleShell({
  meta,
  prev,
  next,
  children,
}: {
  meta: ArticleMeta;
  prev?: Adjacent;
  next?: Adjacent;
  children: React.ReactNode;
}) {
  const bodyRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = bodyRef.current;
      if (!el) return;
      const blocks = el.querySelectorAll<HTMLElement>(".article-block");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch(blocks, {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });
        gsap.set(blocks, { opacity: 0, y: 24 });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: bodyRef }
  );

  return (
    <main className="relative min-h-screen bg-background">
      <ReadingProgress />

      {/* 頂部橘色暈染封面 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-600/15 via-primary-500/5 to-transparent" />

      <div className="container relative py-20">
        <header className="mx-auto max-w-3xl">
          <Link href="/blog" className="font-mono text-sm text-primary-400 hover:text-primary-300">
            {"← /blog"}
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {meta.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-gray-400">
            <time>{meta.date}</time>
            <span className="text-primary-500/60">·</span>
            <span>{meta.readingMins} min read</span>
            <span className="text-primary-500/60">·</span>
            <span className="flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span key={t} className="rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-0.5 text-primary-300">
                  {t}
                </span>
              ))}
            </span>
          </div>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-primary-500/50 via-primary-500/10 to-transparent" />
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[1fr_220px]">
          <article ref={bodyRef} className="mx-auto w-full max-w-3xl space-y-6">
            {children}
          </article>
          <aside>
            <Toc />
          </aside>
        </div>

        {/* 上一篇 / 下一篇 */}
        <nav className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="rounded-xl border border-primary-500/20 bg-black/40 p-5 transition-colors hover:border-primary-400/40"
            >
              <span className="font-mono text-xs text-primary-400">← 上一篇</span>
              <p className="mt-1 text-sm text-gray-200">{prev.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="rounded-xl border border-primary-500/20 bg-black/40 p-5 text-right transition-colors hover:border-primary-400/40"
            >
              <span className="font-mono text-xs text-primary-400">下一篇 →</span>
              <p className="mt-1 text-sm text-gray-200">{next.title}</p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}
