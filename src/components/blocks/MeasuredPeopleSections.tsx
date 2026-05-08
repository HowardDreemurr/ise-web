"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
}

/**
 * Wraps all PersonCards on a People page and equalizes their heights to the
 * tallest one — measured from the actual rendered DOM (no estimation).
 *
 * Works across multiple sections / multiple `PeopleGrid` instances inside.
 * Each PersonCard tags itself via `data-person-card`. After mount, we read
 * `offsetHeight` of all such cards, take the max, and stamp it back as
 * `min-height` on each. Re-runs on container resize via ResizeObserver.
 *
 * Brief layout flash on first paint is acceptable — the alternative
 * (heuristic min-height baked at build time) consistently overshoots.
 */
export function MeasuredPeopleSections({ children, className }: Props) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    let raf = 0
    const equalize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const cards = root.querySelectorAll<HTMLElement>("[data-person-card]")
        if (cards.length === 0) return
        // Reset so we measure intrinsic content height
        cards.forEach((c) => {
          c.style.minHeight = ""
        })
        let max = 0
        cards.forEach((c) => {
          if (c.offsetHeight > max) max = c.offsetHeight
        })
        cards.forEach((c) => {
          c.style.minHeight = `${max}px`
        })
      })
    }

    equalize()

    const ro = new ResizeObserver(equalize)
    ro.observe(root)
    // Also re-run when fonts finish loading (heading metrics shift)
    if ("fonts" in document) {
      document.fonts.ready.then(equalize).catch(() => {})
    }
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={rootRef} className={cn(className)}>
      {children}
    </div>
  )
}
