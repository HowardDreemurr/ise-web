"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Floating "back to top" button — fixed bottom-right, fades in once the page is
 * scrolled past ~600px, smooth-scrolls to the top on click. Rendered globally
 * by `SiteChrome`.
 */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const update = () => setVisible(window.scrollY > 600)
    const raf = requestAnimationFrame(update)
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", update)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-sm",
        "transition-all duration-300 hover:bg-background hover:text-primary hover:shadow-xl",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  )
}
