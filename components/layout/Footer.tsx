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
