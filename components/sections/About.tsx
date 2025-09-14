"use client";
import { motion } from "framer-motion";

export default function About() {
  const skills = [
    { name: "Python & Flask & Django", level: 85 },
    { name: "JavaScript & React & Next.js", level: 80 },
    { name: "PostgreSQL & MySQL", level: 75 },
    { name: "AI/LLM & Prompt Engineering", level: 70 },
    { name: "RESTful API 開發", level: 85 },
    { name: "Git & Linux", level: 80 }
  ];

  return (
    <section id="about" className="relative py-24 scroll-mt-20 overflow-hidden bg-background">
      {/* 頂部橙色漸層延續效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-600/12 via-primary-700/6 to-black" />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute right-10 top-20 w-40 h-40 rounded-full bg-primary-500/15 blur-2xl"
      />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左側內容 */}
          <div>
            <motion.h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              關於我
            </motion.h2>
            
            <motion.div
              className="mt-6 space-y-4 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                我是 Chi Han Lu，國立臺北商業大學資訊管理系學生，同時也是一名軟體開發實習生，具備小型專案全端開發、AI 技術應用與團隊專案的實務經驗。
              </p>
              <p>
                目前在智能悅信資訊股份有限公司擔任資訊實習生，主要負責後端系統開發，同時協作前端 UI/UX 設計，並運用 workflow 建立自動化流程。
              </p>
              <p>
                具備 Python (flask) 與 PHP (laravel) 的後端開發能力，熟悉 JavaScript (React, Next.js) 前端技術，擅長 PostgreSQL、MySQL 資料庫運用，並具備 AI/LLM Prompt Engineering 與 RAG 技術經驗。
              </p>
              <p>
                作為團隊專案《日記之森》的主要開發者，帶領專案晉級《跨域競技場》競賽決賽，展現了技術實力與團隊協作能力。相信技術的力量在於解決實際問題，創造有意義的產品。
              </p>
            </motion.div>
          </div>

          {/* 右側技能展示 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-display text-xl font-semibold text-primary-400">
              核心技能
            </h3>
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm text-gray-200">{skill.name}</span>
                  <span className="text-xs text-primary-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-dark-orange-gradient rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
