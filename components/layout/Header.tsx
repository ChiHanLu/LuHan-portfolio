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

  // 選單展開時鎖定背景捲動（手機 Lenis 預設不平滑觸控，原生 overflow:hidden 即可擋住）
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
    "absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-gradient transition-all duration-300 group-hover:w-full";

  return (
    <>
      {/* 手機選單：scrim 遮罩——置於 header 之外，因 header 有 transform 會讓 fixed 子元素只相對 header 定位，無法蓋滿整頁 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>

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

          {/* 手機選單按鈕（三線 → X 變形過渡） */}
          <button
            className={cn(
              "burger flex flex-col items-center justify-center rounded p-2 text-gray-200 transition-colors hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 md:hidden",
              menuOpen && "open text-primary-300"
            )}
            aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </nav>
      </div>

      {/* 手機選單面板（在 scrim 之上、glass-strong 不透明背板） */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="container relative z-50 md:hidden"
          >
            <div className="glass-strong mt-2 flex flex-col rounded-2xl p-2 shadow-glass">
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
    </>
  );
}
