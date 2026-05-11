"use client"

import * as React from "react"
import { Check, ChevronDown, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

export type CiteFormat = { key: string; label: string; text: string }

/**
 * A small "Cite ▾" dropdown — lists citation formats; click one to copy it to
 * the clipboard (shows a brief ✓). Pre-built `formats` are passed in by the
 * (server) PublicationCard so this client component stays data-free.
 */
export function CiteMenu({
  formats,
  className,
}: {
  formats: CiteFormat[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState<string | null>(null)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const copy = async (f: CiteFormat) => {
    try {
      await navigator.clipboard.writeText(f.text)
      setCopied(f.key)
      window.setTimeout(() => setCopied((c) => (c === f.key ? null : c)), 1600)
    } catch {
      /* clipboard unavailable (e.g. insecure context) — silently no-op */
    }
  }

  if (formats.length === 0) return null

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        Cite
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>
      {/* Right-aligned, opens downward — the trigger sits in the card's
          top-right corner, so the menu drops over the card's own content
          (which paints below it in the same stacking context). */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.375rem)] z-30 w-40 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-md"
        >
          {formats.map((f) => (
            <button
              key={f.key}
              type="button"
              role="menuitem"
              onClick={() => copy(f)}
              className="flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-[12.5px] text-foreground transition-colors hover:bg-muted"
            >
              {f.label}
              {copied === f.key ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
              ) : (
                <Copy className="h-3 w-3 shrink-0 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
