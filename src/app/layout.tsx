import type { Metadata } from "next";
import { Archivo_Black, Inter, Source_Serif_4, Space_Grotesk } from "next/font/google";
import { SiteChrome } from "@/components";
import { getAffiliated } from "@/lib/content";
import "./globals.css";

const iseSans = Inter({
  variable: "--font-ise-sans",
  subsets: ["latin"],
  display: "swap",
});

const iseSerif = Source_Serif_4({
  variable: "--font-ise-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Wordmark display: heavy condensed face for "ISE LAB" lockup.
const iseWordmark = Archivo_Black({
  variable: "--font-ise-wordmark",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Wordmark tagline: confident sans for "INTELLIGENT SENSING FOR ENVIRONMENT".
const iseWordmarkTag = Space_Grotesk({
  variable: "--font-ise-wordmark-tag",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
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
      <body className={`${iseSans.variable} ${iseSerif.variable} ${iseWordmark.variable} ${iseWordmarkTag.variable} antialiased`}>
        <SiteChrome showAffiliated={getAffiliated().length > 0}>{children}</SiteChrome>
      </body>
    </html>
  );
}
