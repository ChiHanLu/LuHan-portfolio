"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Heading = { id: string; text: string };

/** 自動從文章內的 [data-toc] 標題建目錄，捲動時高亮當前段落。桌機才顯示。 */
export function Toc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-toc]"));
    setHeadings(nodes.map((n) => ({ id: n.id, text: n.textContent?.replace(/^#\s*/, "") ?? "" })));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-24 hidden max-h-[70vh] overflow-auto lg:block">
      <p className="mb-3 font-mono text-xs tracking-widest text-primary-400/70">{"// 目錄"}</p>
      <ul className="space-y-2 border-l border-primary-500/15">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 pl-3 text-sm transition-colors",
                active === h.id
                  ? "border-primary-500 text-primary-300"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
