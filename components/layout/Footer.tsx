"use client";

import { useState, useEffect } from "react";

const quotes = [
  "Coffee → Code → Repeat",
  "Bug 不是 Bug，是未記錄的 Feature",
  "Console.log() 是我最好的朋友",
  "Localhost:3000 是我的第二個家",
  "Work Hard, Git Push Harder",
  "程式碼能跑就是奇蹟，能用就是神蹟",
];

const socials = [
  { name: "GitHub", href: "https://github.com/ChiHanLu" },
  { name: "Instagram", href: "https://www.instagram.com/lu_chihan/" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <footer className="relative border-t border-glass-border">
      <div className="container relative z-10 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-wrap justify-center gap-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded font-mono text-sm tracking-wide text-gray-400 transition-colors hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                {s.name}
              </a>
            ))}
          </div>

          <p className="font-mono text-sm text-gray-400">john_lu@intellitrustme.com</p>

          <div className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

          <p className="font-mono text-sm text-gray-500">{quote}</p>
          <p className="text-xs text-gray-600">
            © {currentYear} Chi Han Lu · built with Next.js · GSAP · Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
