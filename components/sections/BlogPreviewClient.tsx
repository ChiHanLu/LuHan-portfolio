"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/md";

interface BlogPreviewClientProps {
  posts: PostMeta[];
}

export default function BlogPreviewClient({ posts }: BlogPreviewClientProps) {
  return (
    <section id="blog" className="relative py-24 scroll-mt-20 overflow-hidden bg-background">
      {/* 背景裝飾 - 頂部橙色漸層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/8 via-primary-600/4 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-bl from-secondary-900/30 to-transparent" />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute right-20 top-32 w-44 h-44 rounded-full bg-primary-500/12 blur-3xl"
      />
      
      <div className="container relative">
        <motion.h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          最新文章
        </motion.h2>
        
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <div className="text-6xl mb-6">📝</div>
            <p className="text-lg text-white">
              近期文章即將發布，敬請期待
            </p>
            <p className="mt-2 text-sm text-gray-300">
              分享技術見解與創作心得
            </p>
          </motion.div>
        ) : (
          <div className="mt-12 space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="group block bg-gradient-to-br from-black/70 via-secondary-800/40 to-black/80 backdrop-blur-md border border-primary-500/20 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-400/30 transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg text-white group-hover:text-primary-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-primary-400 font-medium">
                        {post.date}
                      </p>
                      {post.excerpt && (
                        <p className="mt-3 text-gray-300 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                      📄
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center pt-6"
            >
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-gray-300 hover:text-primary-400 font-medium transition-colors group"
              >
                查看全部文章
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}