"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 scroll-mt-20 overflow-hidden bg-background">
      {/* 黑色橙色背景 - 頂部橙色漸層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-primary-600/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/40 via-secondary-800/30 to-black" />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-10 right-20 w-56 h-56 rounded-full bg-primary-500/15 blur-3xl"
      />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            讓我們開始對話
          </motion.h2>
          
          <motion.p
            className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            在代碼與創意的交匯點，期待與你分享技術見解與想法。<br />
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="mailto:11336028@ntub.edu.tw" aria-label="Email">
              <Button className="w-full sm:w-auto" size="lg">
                📧 Email 聯絡
              </Button>
            </Link>
            <Link href="/LuHan CV Resume.pdf" aria-label="履歷 PDF" prefetch={false}>
              <Button className="w-full sm:w-auto" intent="outline" size="lg">
                📄 下載履歷
              </Button>
            </Link>
          </motion.div>
          
          {/* 裝飾性元素 */}
          <motion.div
            className="mt-16 flex justify-center gap-8 opacity-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="w-3 h-3 rounded-full bg-primary-500 animate-float" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 rounded-full bg-primary-400 animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="w-3 h-3 rounded-full bg-accent-amber animate-float" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
