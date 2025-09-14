# Chi Han Lu - 個人作品集網站

> 採用現代化黑橙主題設計的響應式個人網站，展示全端開發技能與成長歷程

## 🌟 專案簡介

這是一個使用 Next.js 14 構建的個人作品集網站，結合了現代化的設計理念與流暢的使用者體驗。網站採用黑色橙色主題配色，並整合了豐富的動畫效果與互動元素。

## 技術文件

AGENTS.md、GEMINI.md

## 🏗️ 程式架構

### 技術棧
- **框架**: Next.js 14 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **動畫**: Framer Motion
- **字體**: Noto Sans TC, Lexend
- **內容**: MDX (Markdown + JSX)
- **部署**: Vercel

### 專案結構

```
luhan-portfolio/
├── app/                      # Next.js App Router
│   ├── globals.css          # 全域樣式與動畫
│   ├── layout.tsx           # 根佈局
│   ├── page.tsx             # 首頁
│   ├── blog/                # 部落格路由
│   │   ├── page.tsx         # 部落格列表頁
│   │   ├── BlogPageClient.tsx
│   │   └── [slug]/          # 動態文章路由
│   │       └── page.tsx
│   └── not-found.tsx        # 404 頁面
│
├── components/              # React 組件
│   ├── layout/             # 佈局組件
│   │   ├── Header.tsx      # 智能導航 Header
│   │   └── Footer.tsx      # 頁尾
│   ├── sections/           # 頁面區塊組件
│   │   ├── Hero.tsx        # 主視覺區塊
│   │   ├── About.tsx       # 關於我
│   │   ├── Projects.tsx    # 精選作品
│   │   ├── BlogPreview.tsx # 部落格預覽
│   │   └── Contact.tsx     # 聯絡資訊
│   ├── ui/                 # UI 組件
│   │   └── Button.tsx      # 按鈕組件
│   └── mdx/                # MDX 組件
│       ├── Callout.tsx     # 提示框
│       └── Pre.tsx         # 程式碼區塊
│
├── content/                # 內容檔案
│   └── blog/               # 部落格文章 (MDX)
│       ├── ai-assisted-development.md
│       ├── building-soulcraft-journal.md
│       └── from-confusion-to-direction.md
│
├── lib/                    # 工具函數
│   ├── cn.ts              # className 合併工具
│   ├── md.ts              # Markdown 處理
│   └── mdx.tsx            # MDX 配置
│
├── public/                 # 靜態資源
│   ├── LuHan CV Resume.pdf
│   └── *.svg              # 圖示檔案
│
└── 配置檔案
    ├── next.config.ts     # Next.js 配置
    ├── tailwind.config.ts # Tailwind 配置
    ├── tsconfig.json      # TypeScript 配置
    └── package.json       # 專案依賴
```

## 📱 內容區塊簡介

### 🎯 Hero 區塊 (主視覺)
- **位置**: 首頁頂部
- **功能**: 
  - 多層視差海浪背景動畫
  - 滑鼠跟隨特效 (4層波紋系統)
  - 個人簡介與 CTA 按鈕
  - 響應式文字大小調整
- **特色**: 橙色漸層配色，營造溫暖視覺效果

### 👤 About 區塊 (關於我)
- **內容**: 個人背景、技能專長、學習歷程
- **設計**: 左右分欄佈局，包含頭像與詳細介紹
- **動畫**: 滾動觸發的漸入效果

### 🚀 Projects 區塊 (精選作品)
- **佈局**: 響應式網格 (手機單列、桌機雙列)
- **專案展示**:
  - 日記之森 - SoulCraft Journal
  - 個人作品集網站
- **功能**: Hover 動畫、技術標籤、外部連結

### 📝 Blog Preview 區塊 (部落格預覽)
- **內容**: 最新文章預覽
- **功能**: 
  - 自動抓取 MDX 文章
  - 摘要顯示
  - 跳轉到完整部落格

### 📞 Contact 區塊 (聯絡資訊)
- **資訊**: Email、社群媒體連結
- **設計**: 簡潔的聯絡方式展示
- **互動**: 社群圖示 hover 效果

### 🧭 Header (智能導航)
- **主頁導航**: 關於、作品、部落格、聯絡
- **子頁導航**: 僅顯示部落格 (簡化設計)
- **功能**:
  - 滾動方向感應 (向下隱藏、向上顯示)
  - 半透明毛玻璃效果
  - 48px 細緻高度設計

### 📖 部落格系統
- **文章格式**: MDX (支援 React 組件)
- **功能**:
  - 靜態生成 (SSG)
  - 自動路由生成
  - 文章元數據解析
  - 語法高亮
- **佈局**: 
  - 列表頁：卡片式文章預覽
  - 文章頁：優化的閱讀體驗

## 🎨 設計特色

### 配色系統
- **主色**: 橙色系統 (#f97316, #ea580c)
- **背景**: 深黑色系統 (#0a0a0a)
- **文字**: 白色與灰階層次
- **強調**: 橙色漸層效果

### 動畫系統
- **海浪波紋**: 12層錯時波紋背景動畫
- **滑鼠跟隨**: 4層波紋即時跟隨效果
- **頁面過渡**: Framer Motion 驅動的平滑轉場
- **滾動動畫**: 元素進入視野時的漸入效果

### 響應式設計
- **手機優先**: Mobile-first 設計理念
- **斷點系統**: sm, md, lg, xl 完整支援
- **觸控優化**: 手勢友好的互動設計
- **性能優化**: 圖片延遲載入、代碼分割

## 🚀 部署資訊

- **平台**: Vercel
- **域名**: [您的域名]
- **自動部署**: Git push 觸發自動建置與部署
- **CDN**: 全球內容分發網路
- **SSL**: 自動 HTTPS 憑證

## 📄 授權

此專案為個人作品集，僅供參考學習使用。

---

**建置時間**: 2025年
**作者**: Chi Han Lu
**聯絡**: 11336028@ntub.edu.tw
