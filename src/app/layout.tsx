import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components";
import "./globals.css";

const iceSans = Space_Grotesk({
  variable: "--font-ice-sans",
  subsets: ["latin"],
});

const iceSerif = Cormorant_Garamond({
  variable: "--font-ice-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ISE Group",
  description: "Interactive Systems & Education group showcase website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${iceSans.variable} ${iceSerif.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
