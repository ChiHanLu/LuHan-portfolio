import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 黑色橙色主題基礎顏色
        background: "#0a0a0a",
        foreground: "#ffffff",
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a1a1aa",
        },
        // 主色調 - 橙色系統
        primary: {
          50: '#fff7ed',
          100: '#ffedd5', 
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#f97316',
        },
        // 次要色調 - 深灰色系統
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#1e293b',
        },
        // 強調色
        accent: {
          orange: {
            50: '#fff7ed',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            DEFAULT: '#f97316',
          },
          amber: {
            50: '#fffbeb',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            DEFAULT: '#f59e0b',
          }
        },
        // 語義化顏色
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'system-ui', 'sans-serif'],
        display: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dark-orange-gradient": "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #fb923c 100%)",
        "dark-gradient": "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
        "ripple-effect": "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(117, 201, 212, 0.3) 0%, transparent 50%)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "ripple": "ripple 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "wave": "wave 8s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "wave": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" }
        }
      },
      boxShadow: {
        "lakeside": "0 4px 20px rgba(117, 201, 212, 0.15)",
        "lakeside-lg": "0 8px 40px rgba(117, 201, 212, 0.2)",
        "soft": "0 2px 15px rgba(0, 0, 0, 0.08)",
      },
      backdropBlur: {
        "xs": "2px",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;