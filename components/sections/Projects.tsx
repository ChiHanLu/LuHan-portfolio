"use client";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const projects = [
  { 
    id: 1, 
    title: "日記之森 - SoulCraft Journal", 
    desc: "一個專注於心情記錄的線上日記平台，提供安全私密的情感抒發空間，幫助用戶建立健康的情緒管理習慣。", 
    tech: ["Python", "Flask", "PostgreSQL", "HTML/CSS", "JavaScript"],
    image: "🌳",
    link: "https://www.soulcraftjournal.studio/"
  },
  { 
    id: 2, 
    title: "個人作品集網站", 
    desc: "採用黑橙主題的響應式個人網站，展示全端開發技能與成長歷程，包含部落格與專案展示功能。", 
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "🔥"
  }
];

export default function Projects() {

  return (
    <section id="projects" className="relative py-24 scroll-mt-20 overflow-hidden bg-background">
      {/* 頂部橙色漸層延續效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-600/15 via-primary-700/8 to-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-600/8 via-orange-700/5 to-transparent" />
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-10 bottom-20 w-48 h-48 rounded-full bg-primary-500/12 blur-3xl"
      />
      
      <div className="container relative">
        <motion.h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          精選作品
        </motion.h2>
        
        <motion.p
          className="mt-4 text-center text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          展示一些代表性專案，每個作品都承載著解決實際問題的思考與創新
        </motion.p>

        {/* 響應式網格佈局 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="group"
            >
              <div className="bg-gradient-to-br from-black/80 via-secondary-800/50 to-black/90 backdrop-blur-md border border-primary-500/20 rounded-2xl p-6 md:p-8 shadow-2xl shadow-primary-500/5 hover:shadow-2xl hover:shadow-primary-500/15 hover:border-primary-400/30 transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-2 h-full">
                <div className="text-4xl md:text-5xl mb-4 md:mb-6">{project.image}</div>
                <h3 className="font-display font-semibold text-lg md:text-xl text-primary-300">{project.title}</h3>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-300 leading-relaxed">{project.desc}</p>
                
                <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 md:py-1.5 text-xs bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6 md:mt-8 flex gap-3">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button intent="ghost" size="sm">查看專案</Button>
                    </a>
                  ) : (
                    <Button intent="ghost" size="sm">持續開發中</Button>
                  )}
                  <Button intent="outline" size="sm">GitHub</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
