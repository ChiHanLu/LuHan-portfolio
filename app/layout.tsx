import type { Metadata } from "next";
import { Noto_Sans_TC, Lexend } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["300","400","500","600","700","900"],
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lu Han — Portfolio",
  description: "Personal portfolio of Lu Han: projects, blog, and contact.",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${noto.variable} ${lexend.variable} antialiased bg-background text-foreground scroll-smooth`} style={{ overflowX: 'hidden' }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
