"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // 超爆笑 footer 小語陣列
  const funnyQuotes = [
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
  
  const [randomQuote, setRandomQuote] = useState("");
  
  // 每次刷新選擇隨機小語
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyQuotes.length);
    setRandomQuote(funnyQuotes[randomIndex]);
  }, []);
  
  return (
    <footer className="relative bg-gradient-to-t from-secondary-900/30 to-transparent">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-800/20 to-secondary-700/20" />
      
      <div className="container relative py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex justify-center gap-6">
              {[
                { name: "GitHub", icon: "/icons/github.svg", href: "https://github.com/ChiHanLu" },
                { name: "SoulCraft Journal", icon: "/icons/soulcraft.svg", href: "https://www.soulcraftjournal.studio/" },
                { name: "Instagram", icon: "/icons/instagram.svg", href: "https://www.instagram.com/lu_chihan/" }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200 hover:scale-105"
                  aria-label={social.name}
                >
                  <img src={social.icon} alt={`${social.name} icon`} className="w-5 h-5" />
                  <span className="hidden sm:inline">{social.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Email as plain text (not a clickable button) */}
            <p className="text-sm text-gray-400">Email: 11336028@ntub.edu.tw</p>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent w-48 mx-auto" />
          
          <p className="text-sm text-gray-400 font-medium">
            {randomQuote || "Coffee → Code → Repeat ☕💻"}
          </p>
          
          <p className="text-xs text-gray-500 mt-2">
            © {currentYear} Chi Han Lu. Made with 🔥 by coding passion.
          </p>
          
          <div className="flex justify-center gap-2 mt-4 opacity-40">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-float" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 rounded-full bg-accent-amber animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
