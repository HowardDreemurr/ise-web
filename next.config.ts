import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ise-web",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
