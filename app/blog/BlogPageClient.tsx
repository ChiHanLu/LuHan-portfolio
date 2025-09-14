"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/md";

interface BlogPageClientProps {
  posts: PostMeta[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <main className="min-h-screen bg-background">

      <div className="container py-16">

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl font-bold text-white mb-12"
        >
          部落格文章
        </motion.h1>
        
        {posts.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            目前沒有文章。
          </motion.p>
        ) : (
          <div className="grid gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-gradient-to-br from-black/70 via-secondary-800/40 to-black/80 backdrop-blur-md border border-primary-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-400/30 transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-display font-semibold text-2xl text-white group-hover:text-primary-400 transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-sm text-primary-400 font-medium mb-4">
                        {post.date}
                      </p>
                      {post.excerpt && (
                        <p className="text-gray-300 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity">
                      📄
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}