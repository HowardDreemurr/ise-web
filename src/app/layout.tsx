import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { SiteChrome } from "@/components";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://howarddreemurr.github.io/ise-web";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ISE Group — Intelligent Sensing & Environment",
    template: "%s | ISE Group",
  },
  description:
    "Intelligent Sensing & Environment research group at the University of Exeter. Machine learning and intelligent sensing for environmental observation.",
  applicationName: "ISE Group",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ISE Group",
    title: "ISE Group — Intelligent Sensing & Environment",
    description:
      "Machine learning and intelligent sensing for environmental observation, disaster management, and digital economy.",
    images: [
      {
        url: "/images/hero-vision.png",
        width: 1200,
        height: 630,
        alt: "ISE Group hero image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISE Group",
    description: "Machine learning and intelligent sensing for environmental observation.",
    images: ["/images/hero-vision.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${iceSans.variable} ${iceSerif.variable} antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
