import type { Metadata } from "next";
import { Inter, Noto_Sans_TC, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const noto = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chi Han Lu — Portfolio",
  description: "Chi Han Lu 的個人作品集：專案、部落格與聯絡方式。全端開發 · AI 應用 · 3D 視覺。",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/providers/PageTransition";
import AmbientBackground from "@/components/ui/AmbientBackground";
import CursorGlow from "@/components/ui/CursorGlow";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${noto.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
        style={{ overflowX: "hidden" }}
      >
        <SmoothScroll>
          <AmbientBackground />
          <CursorGlow />
          <div className="grain" />
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
