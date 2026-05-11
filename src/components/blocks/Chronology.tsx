"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type ChronologyEntry = {
  /** Unique id — becomes the scroll anchor and the rail key. */
  id: string
  /** Year bucket. Use 0 for undated entries (they sort last under "Undated"). */
  year: number
  /** Short label shown in the left-rail index (clamped to 2 lines). */
  label: string
  /** The rendered card / row shown in the right column. */
  node: React.ReactNode
}

/** Scroll-margin so an anchored element clears the sticky chrome above it:
 *  desktop = site header (80px) + a little; mobile = header + the sticky year
 *  bar (~52px). Kept in sync with the `scroll-mt-*` classes below. */
function stickyOffset() {
  if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
    return 96
  }
  return 132
}

type YearBucket = { year: number; label: string; entries: ChronologyEntry[] }

function bucketByYear(entries: ChronologyEntry[]): YearBucket[] {
  const map = new Map<number, ChronologyEntry[]>()
  for (const e of entries) {
    const arr = map.get(e.year)
    if (arr) arr.push(e)
    else map.set(e.year, [e])
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, es]) => ({
      year,
      label: year > 0 ? String(year) : "Undated",
      entries: es,
    }))
}

/**
 * Chronological archive layout for time-stamped collections (News, Publications,
 * Projects).
 *
 * - Desktop (`lg+`): a sticky left rail that buckets entries by year — each year
 *   is a collapsible group whose items list out in a single column. It
 *   scroll-spies the entry in view and keeps that year open.
 * - Mobile: a sticky horizontal year bar at the top (the per-item rail doesn't
 *   fit a phone); tapping a year jumps to it.
 * - Right column on all sizes: the entries under year headings.
 *
 * `entries` should already be in the order you want within each year (year
 * buckets are sorted newest-first regardless).
 */
export function Chronology({
  entries,
  emptyState,
  className,
}: {
  entries: ChronologyEntry[]
  emptyState?: React.ReactNode
  className?: string
}) {
  const buckets = React.useMemo(() => bucketByYear(entries), [entries])
  const yearOf = React.useMemo(
    () => new Map(entries.map((e) => [e.id, e.year])),
    [entries],
  )

  const [expanded, setExpanded] = React.useState<Set<number>>(
    () => new Set(buckets[0] ? [buckets[0].year] : []),
  )
  const [activeId, setActiveId] = React.useState<string | null>(
    entries[0]?.id ?? null,
  )
  const railRef = React.useRef<HTMLDivElement>(null)
  const yearBarRef = React.useRef<HTMLDivElement>(null)
  const lockUntil = React.useRef(0)

  const activeYear = activeId ? yearOf.get(activeId) ?? null : buckets[0]?.year ?? null

  // Scroll-spy: highlight the topmost in-view entry and keep its year open.
  React.useEffect(() => {
    if (entries.length === 0) return
    const els = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el != null)
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (records) => {
        if (Date.now() < lockUntil.current) return
        const top = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (!top) return
        const id = top.target.id
        setActiveId(id)
        const yr = yearOf.get(id)
        if (yr != null) {
          setExpanded((cur) => (cur.has(yr) ? cur : new Set(cur).add(yr)))
        }
      },
      { rootMargin: `-${stickyOffset()}px 0px -70% 0px`, threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [entries, yearOf])

  // Keep the active link / chip visible in its scroller as you scroll.
  React.useEffect(() => {
    if (!activeId) return
    railRef.current
      ?.querySelector<HTMLElement>(`[data-rail-id="${CSS.escape(activeId)}"]`)
      ?.scrollIntoView({ block: "nearest" })
    if (activeYear != null) {
      yearBarRef.current
        ?.querySelector<HTMLElement>(`[data-year-chip="${activeYear}"]`)
        ?.scrollIntoView({ inline: "nearest", block: "nearest" })
    }
  }, [activeId, activeYear])

  const scrollToAnchor = React.useCallback((anchorId: string) => {
    const el = document.getElementById(anchorId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - stickyOffset()
    window.scrollTo({ top, behavior: "smooth" })
    lockUntil.current = Date.now() + 800
    history.replaceState(null, "", `#${anchorId}`)
  }, [])

  const scrollToEntry = React.useCallback(
    (id: string) => {
      scrollToAnchor(id)
      setActiveId(id)
    },
    [scrollToAnchor],
  )

  const scrollToYear = React.useCallback(
    (year: number) => {
      scrollToAnchor(`year-${year}`)
      const first = buckets.find((b) => b.year === year)?.entries[0]
      if (first) setActiveId(first.id)
      setExpanded((cur) => (cur.has(year) ? cur : new Set(cur).add(year)))
    },
    [scrollToAnchor, buckets],
  )

  const toggleYear = React.useCallback((year: number) => {
    setExpanded((cur) => {
      const next = new Set(cur)
      if (next.has(year)) next.delete(year)
      else next.add(year)
      return next
    })
  }, [])

  if (entries.length === 0) return <>{emptyState ?? null}</>

  return (
    <div className={cn(className)}>
      {/* Mobile: sticky horizontal year jumper (the per-item rail is desktop-only). */}
      <div
        ref={yearBarRef}
        className="sticky top-[80px] z-20 mb-8 -mx-1 flex items-center gap-1 overflow-x-auto border-b border-border bg-background/95 px-1 py-2 backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        aria-label="Jump to year"
      >
        {buckets.map(({ year, label, entries: yearEntries }) => {
          const isActive = year === activeYear
          return (
            <button
              key={year}
              type="button"
              data-year-chip={year}
              onClick={() => scrollToYear(year)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
              <span className="ml-1.5 text-xs text-muted-foreground">
                {yearEntries.length}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[212px_minmax(0,1fr)] lg:gap-10">
        {/* Desktop left rail — year accordion + per-year entry list. */}
        <aside className="hidden lg:block">
          <div
            ref={railRef}
            className="sticky top-[88px] max-h-[calc(100vh-112px)] overflow-y-auto pr-2 [scrollbar-width:thin]"
          >
            <nav aria-label="Archive index" className="border-l border-border">
              {buckets.map(({ year, label, entries: yearEntries }) => {
                const isOpen = expanded.has(year)
                const hasActive = yearEntries.some((e) => e.id === activeId)
                return (
                  <div key={year}>
                    <button
                      type="button"
                      onClick={() => toggleYear(year)}
                      aria-expanded={isOpen}
                      className={cn(
                        "-ml-px flex w-full items-center justify-between gap-2 border-l-2 py-1.5 pl-3 pr-1.5 text-left text-sm font-semibold transition-colors",
                        hasActive
                          ? "border-primary text-primary"
                          : "border-transparent text-foreground hover:text-primary",
                      )}
                    >
                      <span>{label}</span>
                      <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                        {yearEntries.length}
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            isOpen && "rotate-180",
                          )}
                        />
                      </span>
                    </button>
                    {isOpen && (
                      <ul className="pb-1">
                        {yearEntries.map((e) => {
                          const isActive = e.id === activeId
                          return (
                            <li key={e.id}>
                              <a
                                href={`#${e.id}`}
                                data-rail-id={e.id}
                                onClick={(ev) => {
                                  ev.preventDefault()
                                  scrollToEntry(e.id)
                                }}
                                aria-current={isActive ? "true" : undefined}
                                className={cn(
                                  "-ml-px block border-l-2 py-1 pl-5 pr-1.5 text-[12.5px] leading-snug transition-colors",
                                  isActive
                                    ? "border-primary font-medium text-primary"
                                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                                )}
                              >
                                <span className="line-clamp-2">{e.label}</span>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Right column — entries grouped under year headings. */}
        <div className="min-w-0 space-y-12">
          {buckets.map(({ year, label, entries: yearEntries }) => (
            <section
              key={year}
              id={`year-${year}`}
              className="scroll-mt-[132px] space-y-5 lg:scroll-mt-[88px]"
            >
              <h2 className="flex items-baseline gap-3 font-serif text-2xl font-semibold tracking-tight text-foreground">
                {label}
                <span className="text-sm font-normal text-muted-foreground">
                  {yearEntries.length} {yearEntries.length === 1 ? "item" : "items"}
                </span>
              </h2>
              <div className="space-y-5">
                {yearEntries.map((e) => (
                  <div
                    key={e.id}
                    id={e.id}
                    className="scroll-mt-[132px] lg:scroll-mt-[96px]"
                  >
                    {e.node}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
