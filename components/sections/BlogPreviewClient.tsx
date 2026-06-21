"use client";

import Link from "next/link";
import type { ArticleMeta } from "@/components/article/ArticleShell";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { ScrollTilt } from "@/components/ui/ScrollTilt";

export default function BlogPreviewClient({ posts }: { posts: ArticleMeta[] }) {
  return (
    <section id="blog" className="relative scroll-mt-20 py-28">
      <ScrollTilt className="container relative z-10">
        <Parallax speed={-50}>
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              最新文章
            </h2>
          </Reveal>
        </Parallax>

        <div className="mx-auto mt-12 max-w-3xl">
          <Reveal className="space-y-4" stagger={0.1}>
            {posts.map((post, i) => (
              <div key={post.slug}>
                {/* 視差分層：每張卡以不同速度位移，產生景深 */}
                <Parallax speed={-10 - i * 22}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="spotlight group relative block overflow-hidden rounded-glass glass p-6 transition-all duration-300 ease-cinema hover:-translate-y-1 hover:scale-[1.025] hover:border-primary-400/50 hover:shadow-glow-lg"
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
                </Parallax>
              </div>
            ))}
          </Reveal>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-medium text-gray-300 transition-colors hover:text-primary-400"
            >
              查看全部文章 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </ScrollTilt>
    </section>
  );
}
