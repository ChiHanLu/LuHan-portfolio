import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Glass Cinema 紫黑基底
        background: "#08060f",
        surface: "#0d0a16",
        elevated: "#13101f",
        foreground: "#f0f0f5",
        muted: {
          DEFAULT: "#101010",
          foreground: "#9aa0aa",
        },
        // 玻璃表面 / 邊框（半透明 token，配 backdrop-blur 用）
        glass: {
          DEFAULT: "rgb(255 255 255 / 0.05)",
          strong: "rgb(255 255 255 / 0.08)",
          border: "rgb(255 255 255 / 0.12)",
        },
        // 主色調 - 紫色 / violet 系統（配 galaxy 藍紫）
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          DEFAULT: "#8b5cf6",
        },
        // 次要 - 深灰（沿用，供既有元件相容）
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          DEFAULT: "#1e293b",
        },
        accent: {
          violet: { 50: "#f5f3ff", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", DEFAULT: "#8b5cf6" },
          indigo: { 50: "#eef2ff", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", DEFAULT: "#6366f1" },
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        // Inter 走 latin/數字，Noto Sans TC 補中文
        sans: ["var(--font-inter)", "var(--font-noto)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "var(--font-noto)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        glass: "18px",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #a78bfa 100%)",
        "text-brand-gradient": "linear-gradient(120deg, #ffffff 0%, #a78bfa 100%)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "rise": "rise 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "aurora": "aurora 16s ease-in-out infinite alternate",
        "drift": "drift 16s ease-in-out infinite",
        "pulse-orb": "pulse-orb 6s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 28s linear infinite reverse",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "rise": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora": {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-4%,3%) scale(1.12)" },
          "100%": { transform: "translate(3%,-3%) scale(1.05)" },
        },
        "drift": { "50%": { transform: "translate(60px,50px) scale(1.15)" } },
        "pulse-orb": { "50%": { transform: "translateY(-50%) scale(1.06)" } },
      },
      boxShadow: {
        glow: "0 8px 30px rgba(139, 92, 246, 0.40)",
        "glow-lg": "0 24px 60px rgba(139, 92, 246, 0.22)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
        soft: "0 2px 15px rgba(0, 0, 0, 0.35)",
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
