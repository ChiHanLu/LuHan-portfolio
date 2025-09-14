"use client";
import { useRef, useState } from "react";

export function Pre(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div className="relative group">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        className="absolute top-2 right-2 text-xs rounded-md border border-foreground/10 bg-foreground/5 px-2 py-1 opacity-0 group-hover:opacity-100 transition"
      >
        {copied ? "已複製" : "複製"}
      </button>
    </div>
  );
}
