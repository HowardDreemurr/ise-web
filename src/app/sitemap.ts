import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://howarddreemurr.github.io/ise-web";

const routes = [
  "",
  "/community",
  "/research",
  "/research/publications",
  "/research/projects",
  "/research/impact",
  "/people",
  "/resources",
  "/join",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
