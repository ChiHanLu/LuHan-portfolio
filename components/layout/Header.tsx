"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 100) setHidden(true);
      else if (y < lastScrollY) setHidden(false);
      lastScrollY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems =
    pathname === "/"
      ? [
          { href: "#about", label: "關於" },
          { href: "#skills", label: "技能" },
          { href: "#projects", label: "作品" },
          { href: "#experience", label: "經歷" },
          { href: "/blog", label: "部落格" },
          { href: "#contact", label: "聯絡" },
        ]
      : [{ href: "/blog", label: "部落格" }];

  const linkClass =
    "text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors duration-200 relative group";
  const underline =
    "absolute -bottom-1 left-0 h-0.5 w-0 bg-dark-orange-gradient transition-all duration-300 group-hover:w-full";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container mt-3">
        <nav className="glass flex h-14 items-center justify-between rounded-2xl px-4 shadow-glass sm:px-6">
          <Link href="/" className={cn(linkClass, "font-mono")}>
            ~/luhan
            <span className={underline} />
          </Link>

          {/* 桌機導航 */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                <a key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                  <span className={underline} />
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                  <span className={underline} />
                </Link>
              )
            )}
          </div>

          {/* 手機選單按鈕 */}
          <button
            className="rounded p-2 text-gray-200 transition-colors hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 md:hidden"
            aria-label="開啟選單"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* 手機選單面板 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="container overflow-hidden md:hidden"
          >
            <div className="glass mt-2 flex flex-col rounded-2xl p-2">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-gray-200 transition-colors hover:bg-primary-500/10 hover:text-primary-300"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-gray-200 transition-colors hover:bg-primary-500/10 hover:text-primary-300"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
