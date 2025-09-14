"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // 追蹤滑鼠位置
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setMousePosition({ x, y });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  // 多層視差效果 - 夏日湖畔層次感
  const yFar = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* 頂部橙色漸層美術效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/30 via-primary-600/20 to-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/15 via-orange-600/10 to-transparent" />
      
      {/* 海浪波紋動畫層 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 第一層海浪 */}
        <motion.div 
          style={{ y: yFar }} 
          className="absolute -inset-x-40 -top-60 h-96 rounded-full blur-3xl bg-gradient-to-r from-primary-500/20 via-orange-500/15 to-primary-600/20 animate-wave opacity-30" 
        />
        
        {/* 第二層海浪（反向） */}
        <motion.div 
          style={{ y: yBack }} 
          className="absolute -inset-x-20 -top-32 h-80 rounded-full blur-2xl bg-gradient-to-r from-orange-400/25 via-primary-500/20 to-orange-600/25 animate-wave-reverse opacity-40" 
        />
        
        {/* 第三層海浪波紋 */}
        <motion.div 
          style={{ y: yMid }} 
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary-600/20 via-primary-500/10 to-transparent animate-wave" 
        />
        
        {/* 優化的多層波紋效果 - 避開主標題區域 */}
        {/* 大型波紋 - 分佈在邊緣區域 */}
        <div className="absolute top-1/6 left-1/12 w-48 h-48 rounded-full bg-primary-500/6 animate-ripple" style={{ animationDelay: '0s', animationDuration: '5s' }} />
        <div className="absolute top-1/5 right-1/12 w-42 h-42 rounded-full bg-orange-500/8 animate-ripple" style={{ animationDelay: '2s', animationDuration: '4.2s' }} />
        <div className="absolute bottom-1/4 left-1/8 w-38 h-38 rounded-full bg-primary-400/10 animate-ripple" style={{ animationDelay: '4s', animationDuration: '4.8s' }} />
        
        {/* 中型波紋 - 中間區域但避開中心 */}
        <div className="absolute top-2/3 left-1/6 w-32 h-32 rounded-full bg-orange-400/8 animate-ripple" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-1/3 right-1/6 w-36 h-36 rounded-full bg-primary-600/9 animate-ripple" style={{ animationDelay: '3s', animationDuration: '4s' }} />
        <div className="absolute top-1/8 right-2/5 w-28 h-28 rounded-full bg-orange-500/7 animate-ripple" style={{ animationDelay: '5s', animationDuration: '3.8s' }} />
        
        {/* 小型波紋 - 細節裝飾 */}
        <div className="absolute bottom-1/5 left-2/3 w-24 h-24 rounded-full bg-primary-300/12 animate-ripple" style={{ animationDelay: '1.5s', animationDuration: '3s' }} />
        <div className="absolute top-3/4 right-2/5 w-20 h-20 rounded-full bg-orange-300/10 animate-ripple" style={{ animationDelay: '3.8s', animationDuration: '2.8s' }} />
        <div className="absolute bottom-1/6 right-1/8 w-26 h-26 rounded-full bg-primary-400/8 animate-ripple" style={{ animationDelay: '5.5s', animationDuration: '3.2s' }} />
        
        {/* 微型波紋 - 增加層次感 */}
        <div className="absolute top-1/3 left-3/4 w-16 h-16 rounded-full bg-orange-200/15 animate-ripple" style={{ animationDelay: '2.5s', animationDuration: '2.5s' }} />
        <div className="absolute bottom-2/5 left-1/5 w-18 h-18 rounded-full bg-primary-200/12 animate-ripple" style={{ animationDelay: '4.5s', animationDuration: '2.2s' }} />
        
        {/* 跟隨滑鼠的海浪特效 */}
        {isHovering && (
          <>
            {/* 主要跟隨波紋 - 向左上偏移 */}
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-primary-400/15 blur-lg pointer-events-none"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-75%, -75%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            
            {/* 大型海浪跟隨效果 - 背景層 */}
            <motion.div
              className="absolute w-40 h-40 rounded-full bg-orange-400/6 blur-2xl pointer-events-none"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-60%, -60%)',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            
            {/* 小型跟隨波紋 - 前景層 */}
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-primary-300/20 blur-md pointer-events-none"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-45%, -85%)',
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            />
            
            {/* 微型波紋點綴 */}
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-orange-300/25 blur-sm pointer-events-none"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-90%, -45%)',
              }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />
          </>
        )}
      </div>
      
      {/* 前景 - 主要內容 */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm tracking-wider text-primary-400 font-medium"
          >
            Hi, I&apos;m
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white"
          >
            Chi Han Lu
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-lg lg:text-xl text-gray-300 text-balance max-w-2xl leading-relaxed"
          >
            資訊管理系學生 • 軟體開發實習生<br />
            具備後端工程能力與 AI 技術應用經驗。
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a href="/LuHan CV Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/50" intent="primary" size="lg">
                  下載履歷
                </Button>
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button className="backdrop-blur-sm" intent="outline" size="lg">
                聯絡我
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* 裝飾性色彩方塊 - 湖水層次 */}
        <motion.div 
          style={{ y: yFront }} 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="relative mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-4 gap-4 max-w-md opacity-60">
            {[
              { color: "bg-primary-300", delay: 0 },
              { color: "bg-primary-500", delay: 0.1 },
              { color: "bg-primary-600", delay: 0.2 },
              { color: "bg-accent-amber", delay: 0.3 }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + item.delay }}
                className={`h-16 rounded-xl ${item.color} shadow-soft animate-float`}
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* 底部漸層過渡 */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
