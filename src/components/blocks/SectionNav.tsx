"use client"

import * as React from "react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

export type SectionNavItem = { id: string; label: string }

/** Combined height of the sticky chrome above this bar — site header (80px) +
 *  this bar (~52px). Sections opt in with `scroll-mt-[132px]` so anchor jumps
 *  land below it; the bar itself sticks at `top-[80px]`. */
const STICKY_OFFSET = 132

/**
 * Sticky in-page section nav — an "on this page" jump bar. Place it directly
 * after `<SubPageHero>` on pages that render two or more anchored sections;
 * each item's `id` must match the `id` of a section element on the page.
 * Clicking scrolls to that section; the bar scroll-spies the section in view.
 *
 * Renders nothing for fewer than two items, so callers can pass it
 * unconditionally even when a page sometimes has only one section.
 */
export function SectionNav({
  items,
  className,
}: {
  items: SectionNavItem[]
  className?: string
}) {
  const [active, setActive] = React.useState<string | null>(items[0]?.id ?? null)
  // While a click-initiated smooth scroll is in flight, ignore scroll-spy
  // updates so the highlight doesn't flicker through intermediate sections.
  const lockUntil = React.useRef(0)

  React.useEffect(() => {
    if (items.length < 2) return
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el != null)
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (onScreen[0]) setActive(onScreen[0].target.id)
      },
      // Active = the section whose top sits in a thin band just below the
      // sticky chrome (132px from the top down to ~25% of the viewport).
      { rootMargin: `-${STICKY_OFFSET}px 0px -75% 0px`, threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET
      window.scrollTo({ top, behavior: "smooth" })
      setActive(id)
      lockUntil.current = Date.now() + 800
      history.replaceState(null, "", `#${id}`)
    },
    [],
  )

  if (items.length < 2) return null

  return (
    <div
      className={cn(
        "sticky top-[80px] z-30 border-b border-border bg-background/95 backdrop-blur-sm",
        className,
      )}
    >
      <Container>
        <nav
          aria-label="On this page"
          className="flex items-center gap-1 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it) => {
            const isActive = active === it.id
            return (
              <a
                key={it.id}
                href={`#${it.id}`}
                onClick={(e) => onClick(e, it.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {it.label}
              </a>
            )
          })}
        </nav>
      </Container>
    </div>
  )
}
