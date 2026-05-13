import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const isVercel = !!process.env.VERCEL;
const adminFlag = process.env.NEXT_PUBLIC_KEYSTATIC === "1";
const includeAdmin = adminFlag || isVercel;
// admin is opt-in in dev: run `npm run dev:admin` when you actually want to edit content.
// `npm run dev` skips the heavy admin bundle so the editor compile stays light.
const isPagesExport = !isDev && !includeAdmin;
const basePath = isPagesExport ? "/ise-web" : "";

const nextConfig: NextConfig = {
  output: isPagesExport ? "export" : undefined,
  basePath: basePath || undefined,
  // Expose basePath to client code via NEXT_PUBLIC_BASE_PATH so we can prefix
  // raw URLs in CSS strings (background-image) that next/link + next/image
  // don't get to rewrite automatically.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: true,
  },
  pageExtensions: includeAdmin
    ? ["tsx", "ts", "jsx", "js", "kspage.tsx", "ksapi.ts"]
    : ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
