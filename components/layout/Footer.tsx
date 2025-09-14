"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
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
          <div className="flex justify-center gap-6 mb-6">
            {[
              { name: "GitHub", icon: "💻", href: "https://github.com/ChiHanLu" },
              { name: "SoulCraft Journal", icon: "📝", href: "https://www.soulcraftjournal.studio/" },
              { name: "Email", icon: "📧", href: "mailto:11336028@ntub.edu.tw" }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200 hover:scale-105"
                aria-label={social.name}
              >
                <span className="text-lg">{social.icon}</span>
                <span className="hidden sm:inline">{social.name}</span>
              </motion.a>
            ))}
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent w-48 mx-auto" />
          
          <p className="text-sm text-gray-400 font-medium">
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
