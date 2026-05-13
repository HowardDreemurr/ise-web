import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Lowercase, hyphenated, alnum-only slug — for in-page anchor ids etc. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Prepend the configured Next.js `basePath` to a root-relative path. Use this
 * for raw URLs that the framework does not rewrite automatically — chiefly CSS
 * `background-image: url(...)` strings. `next/link` and `next/image` already
 * apply the basePath; do **not** wrap their props.
 *
 * Absolute (http://, https://), data:, mailto:, and tel: URLs pass through
 * unchanged.
 */
export function withBasePath(p: string | undefined | null): string {
  if (!p) return ""
  if (/^([a-z]+:)?\/\//i.test(p) || p.startsWith("data:") || p.startsWith("mailto:") || p.startsWith("tel:")) {
    return p
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  if (!base) return p
  return p.startsWith("/") ? `${base}${p}` : `${base}/${p}`
}
