"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = 0;
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 判斷滾動方向來顯示/隱藏 Header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 向下滾動且超過 100px 時隱藏
        setHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // 向上滾動時顯示
        setHidden(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 根據頁面路徑決定顯示的導航項目
  const getNavItems = () => {
    if (pathname === "/") {
      // 主頁顯示完整導航
      return [
        { href: "#about", label: "關於" },
        { href: "#projects", label: "作品" },
        { href: "/blog", label: "部落格" },
        { href: "#contact", label: "聯絡" }
      ];
    } else {
      // 其他頁面只顯示部落格
      return [
        { href: "/blog", label: "部落格" }
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        "bg-black/10 backdrop-blur-md"
      )}
    >
      <nav className="container flex h-12 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors duration-200 relative group"
          >
            首頁
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-orange-gradient group-hover:w-full transition-all duration-300" />
          </Link>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            item.href.startsWith('#') ? (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-orange-gradient group-hover:w-full transition-all duration-300" />
              </motion.a>
            ) : (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-orange-gradient group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            )
          ))}
        </div>

        {/* 手機版選單按鈕 */}
        <div className="md:hidden">
          <button className="p-2 text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
