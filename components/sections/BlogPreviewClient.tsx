"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ArticleMeta } from "@/components/article/ArticleShell";
import { Reveal } from "@/components/ui/Reveal";

export default function BlogPreviewClient({ posts }: { posts: ArticleMeta[] }) {
  const root = useRef<HTMLElement>(null);

  // 進階轉場：卡片隨捲動從左右交替「飛入」+ Y 軸翻正（scrub，與經歷的 pin 時間軸不同特色）
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-blog-card]");
        cards.forEach((card, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(
            card,
            { xPercent: dir * 65, opacity: 0, rotateY: dir * 32, scale: 0.9 },
            {
              xPercent: 0,
              opacity: 1,
              rotateY: 0,
              scale: 1,
              ease: "power2.out",
              transformPerspective: 1100,
              scrollTrigger: { trigger: card, start: "top 92%", end: "top 55%", scrub: true },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="blog" ref={root} className="relative scroll-mt-20 overflow-x-clip py-28">
      <div className="container relative z-10">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            最新文章
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl [perspective:1200px]">
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.slug} data-blog-card className="md:[transform-style:preserve-3d]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="spotlight group relative block overflow-hidden rounded-glass glass p-6 transition-[transform,box-shadow,border-color] duration-300 ease-cinema hover:-translate-y-1 hover:scale-[1.025] hover:border-primary-400/50 hover:shadow-glow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-primary-300">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 font-mono text-xs text-primary-400">
                        <span>{post.date}</span>
                        <span className="text-primary-500/50">·</span>
                        <span>{post.readingMins} min</span>
                      </div>
                      <p className="mt-3 leading-relaxed text-gray-300">{post.excerpt}</p>
                    </div>
                    <span className="mt-1.5 text-primary-400/60 transition-all group-hover:translate-x-1 group-hover:text-primary-400">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-medium text-gray-300 transition-colors hover:text-primary-400"
            >
              查看全部文章 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
