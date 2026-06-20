import type { ArticleMeta } from "@/components/article/ArticleShell";

/**
 * 文章登錄表（取代 markdown pipeline）。
 * 內容本體在 content/articles/<slug>.tsx，這裡只放清單用的 metadata。
 * 依日期新到舊排序。
 */
export const posts: ArticleMeta[] = [
  {
    slug: "from-resistance-to-ai-driven-dev",
    title: "從抗拒到 AI 主導開發：一場開發思維的徹底顛覆",
    date: "2026-06-15",
    excerpt:
      "在智能悅信實習期間，老闆一句「全公司都在用 AI，為什麼只有你沒有？」和一位台大資工講師的「降維打擊」，讓我從堅持手寫每一行程式，走向 AI 主導、人工審查架構與資安的開發模式。",
    tags: ["AI", "工作流", "心得"],
    readingMins: 8,
  },
  {
    slug: "building-commercial-mid-platforms",
    title: "中控系統實戰：模組化中台與多通路整合",
    date: "2026-06-10",
    excerpt:
      "在實習期間主導金物流發票中控與 CRM 中控的開發經驗。談模組化中台架構、標準化接口、跨平台資料一致性，以及如何把模糊的商業需求轉譯成穩定的系統邏輯。",
    tags: ["後端", "系統架構", "Laravel"],
    readingMins: 8,
  },
  {
    slug: "ai-assisted-development",
    title: "AI 助力開發：從排斥到依賴的學習轉變",
    date: "2025-09-14",
    excerpt:
      "分享我從排斥 AI 到善用 AI 工具的完整心路歷程，以及如何在程式開發中建立正確的 AI 使用習慣。",
    tags: ["AI", "學習", "心得"],
    readingMins: 7,
  },
  {
    slug: "building-soulcraft-journal",
    title: "日記之森開發心路歷程：從迷茫到決賽的技術成長",
    date: "2025-09-14",
    excerpt:
      "分享開發日記之森的心境轉折，從完全看不懂架構到帶領團隊晉級跨域競技場決賽的完整歷程。",
    tags: ["專案", "全端", "團隊"],
    readingMins: 7,
  },
  {
    slug: "from-confusion-to-direction",
    title: "從迷惘到定向：一位跨領域學習者的逆襲與實踐",
    date: "2025-09-14",
    excerpt:
      "分享我從五專企管成績 PR30 到帶領專題晉級全國決賽的完整轉變歷程，以及如何從排斥到善用 AI 的心境轉折。",
    tags: ["成長", "跨領域", "心得"],
    readingMins: 9,
  },
];

export function getPost(slug: string): ArticleMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = posts.findIndex((p) => p.slug === slug);
  // 清單為新→舊；「上一篇」= 較新（前一個），「下一篇」= 較舊（後一個）
  const prev = i > 0 ? posts[i - 1] : null;
  const next = i >= 0 && i < posts.length - 1 ? posts[i + 1] : null;
  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}
