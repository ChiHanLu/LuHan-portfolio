"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ThreeBackground from "./ThreeBackground";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Contact() {
  // 超爆笑標題小語陣列
  const funnyTitles = [
    "Coffee → Code → Repeat ☕💻",
    "Bug 不是 Bug，是未記錄的 Feature 🐛✨",
    "複製貼上工程師 Ctrl+C Ctrl+V 💪",
    "Stack Overflow 救了我的人生 🙏",
    "Console.log() 是我最好的朋友 👾",
    "Git Commit -m '修了一堆屁' 💩",
    "下班時間到，Bug 明天再說 🏃‍♂️💨",
    "人生苦短，我用 Python 🐍 (誒不對我用 TypeScript)",
    "寫 Code 像寫詩，Debug 像寫屁 📝💨",
    "今天也是被 CSS 虐的一天 🎨😭",
    "React 渲染三次，我的心情更新一萬次 ⚛️",
    "睡覺 = 編譯中... Zzz 😴",
    "程式碼能跑就是奇蹟，能用就是神蹟 ✨🎉",
    "Merge Conflict 是我的宿敵 ⚔️",
    "Localhost:3000 是我的第二個家 🏠",
    "Work Hard, Git Push Harder 💪🚀",
    "Documentation? 我就是 Documentation 📚",
    "測試？能動就行了吧？🤷‍♂️",
    "我的程式碼：優雅、高效、能跑（選一個）🎯",
    "Tabs vs Spaces？我選逃避問題 🏃"
  ];
  
  const [randomTitle, setRandomTitle] = useState("");
  
  // 每次刷新選擇隨機標題
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyTitles.length);
    setRandomTitle(funnyTitles[randomIndex]);
  }, []);
  
  return (
    <section id="contact" className="relative py-24 scroll-mt-20 overflow-hidden bg-background">
      {/* 3D 動畫背景容器 */}
      <ThreeBackground />
      {/* 黑色橙色背景 - 頂部橙色漸層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-primary-600/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/40 via-secondary-800/30 to-black pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-10 right-20 w-56 h-56 rounded-full bg-primary-500/15 blur-3xl pointer-events-none"
      />

      <div className="container relative z-10 pointer-events-auto">
        <div className="max-w-4xl mx-auto text-center -mt-8">
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {randomTitle || "Coffee → Code → Repeat ☕💻"}
          </motion.h2>
          
          <motion.div 
            className="mt-56 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="mailto:11336028@ntub.edu.tw" aria-label="Email">
              <Button className="w-full sm:w-auto bg-black/30 text-white" size="lg">
                📧 Email 聯絡
              </Button>
            </Link>
            <Link href="/LuHan CV Resume.pdf" aria-label="履歷 PDF" prefetch={false}>
              <Button className="w-full sm:w-auto bg-black/30 text-white" size="lg">
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
