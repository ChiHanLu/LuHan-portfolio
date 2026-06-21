"use client";

import Link from "next/link";
import type { ArticleMeta } from "@/components/article/ArticleShell";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export default function BlogPageClient({ posts }: { posts: ArticleMeta[] }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-600/15 via-primary-500/5 to-transparent" />

      <div className="container relative pb-24">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-primary-400">{"// blog"}</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">部落格文章</h1>
          <p className="mt-4 max-w-2xl text-gray-400">技術見解、專案心得與成長紀錄。</p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-16 font-mono text-gray-500">{"// 目前沒有文章。"}</p>
        ) : (
          <Reveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.1}>
            {posts.map((post) => (
              <Magnetic key={post.slug} strength={0.1} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-br from-black/60 to-secondary-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary-400/40 hover:shadow-2xl hover:shadow-primary-500/15 md:p-7"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 font-mono text-xs text-primary-400">
                    <span>{post.date}</span>
                    <span className="text-primary-500/50">·</span>
                    <span>{post.readingMins} min</span>
                  </div>
                  <h2 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-primary-300">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-gray-300">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-0.5 font-mono text-xs text-primary-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </Magnetic>
            ))}
          </Reveal>
        )}
      </div>
    </main>
  );
}
