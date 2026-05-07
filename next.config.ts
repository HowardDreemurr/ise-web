import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const isVercel = !!process.env.VERCEL;
const adminFlag = process.env.NEXT_PUBLIC_KEYSTATIC === "1";
const includeAdmin = adminFlag || isVercel;
// admin is opt-in in dev: run `npm run dev:admin` when you actually want to edit content.
// `npm run dev` skips the heavy admin bundle so the editor compile stays light.
const isPagesExport = !isDev && !includeAdmin;

const nextConfig: NextConfig = {
  output: isPagesExport ? "export" : undefined,
  basePath: isPagesExport ? "/ise-web" : undefined,
  images: {
    unoptimized: true,
  },
  pageExtensions: includeAdmin
    ? ["tsx", "ts", "jsx", "js", "kspage.tsx", "ksapi.ts"]
    : ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
