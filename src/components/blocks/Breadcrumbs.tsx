"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** Path segment → human label. Anything not listed falls back to a capitalised
 *  version of the segment. Keep these in sync with the nav labels in SiteHeader. */
const SEGMENT_LABELS: Record<string, string> = {
  news: "News",
  research: "Research",
  publications: "Publications",
  projects: "Projects",
  impact: "Impact",
  people: "People",
  current: "Current",
  alumni: "Alumni",
  affiliated: "Affiliated",
  resources: "Resources",
  code: "Code",
  data: "Data",
  tools: "Tools",
  join: "Contact",
  phd: "PhD Opportunities",
  postdoc: "Postdoc & Research Staff",
  industry: "Industry Collaboration",
  contact: "Get in Touch",
  privacy: "Privacy",
  accessibility: "Accessibility",
}

function labelFor(segment: string) {
  return (
    SEGMENT_LABELS[segment] ??
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
  )
}

type Crumb = { href: string; label: string }

/**
 * Location breadcrumb — auto-derived from the current pathname, so pages don't
 * have to pass anything. Renders nothing on the home page. Styled for the dark
 * `SubPageHero` banner (translucent-white text, chevron separators).
 *
 * `currentLabel` overrides the last crumb's label — pass the entity title on a
 * dynamic detail route (e.g. a news article) so the trail reads
 * "Home / Community / News / <Article title>" instead of the raw slug.
 */
export function Breadcrumbs({
  currentLabel,
  className,
}: {
  currentLabel?: string
  className?: string
}) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return null

  const crumbs: Crumb[] = [{ href: "/", label: "Home" }]
  segments.forEach((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/")
    const isLast = i === segments.length - 1
    crumbs.push({
      href,
      label: isLast && currentLabel ? currentLabel : labelFor(seg),
    })
  })

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-none">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={c.href} className="flex items-center gap-x-1.5">
              {i > 0 && (
                <ChevronRight
                  aria-hidden
                  className="h-3 w-3 shrink-0 text-white/35"
                />
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-white/90">
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="text-white/55 transition-colors hover:text-white"
                >
                  {c.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
