import { ArrowUpRight, CalendarClock } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Opening, OpeningType } from "@/lib/content"

const TYPE_LABEL: Record<OpeningType, string> = {
  phd: "PhD",
  postdoc: "Postdoc",
  industry: "Industry",
  general: "Contact",
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function formatDate(s?: string): string | null {
  if (!s) return null
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return s
  return `${parseInt(m[3], 10)} ${MONTHS[parseInt(m[2], 10) - 1] ?? m[2]} ${m[1]}`
}

function isClosed(deadline?: string): boolean {
  if (!deadline) return false
  const today = new Date().toISOString().slice(0, 10)
  return deadline < today
}

/**
 * Time-ordered list of postings (PhD / Postdoc / Industry / General). Designed
 * to read like a company "current openings" page — each entry shows category,
 * date posted, deadline (or "Rolling"), title, a short summary, and an
 * optional outbound link.
 *
 * Closed entries (deadline in the past) are hidden by default; pass
 * `showClosed` to render them with a "Closed" badge instead.
 */
export function OpeningsList({
  items,
  showClosed = false,
  emptyState,
}: {
  items: Opening[]
  showClosed?: boolean
  emptyState?: React.ReactNode
}) {
  const visible = showClosed
    ? items
    : items.filter((o) => !isClosed(o.deadline))

  if (visible.length === 0) {
    return emptyState ?? null
  }

  return (
    <ul className="space-y-3">
      {visible.map((o) => {
        const closed = isClosed(o.deadline)
        const posted = formatDate(o.posted)
        const deadline = formatDate(o.deadline)

        return (
          <li key={o.id}>
            <article className="ise-panel p-5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <span className="rounded-full bg-primary/8 px-2 py-0.5 font-semibold text-primary">
                  {TYPE_LABEL[o.type]}
                </span>
                {posted && <time dateTime={o.posted}>Posted {posted}</time>}
                {(deadline || !o.deadline) && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1",
                      closed
                        ? "text-muted-foreground/70"
                        : deadline
                          ? "text-amber-700"
                          : "text-emerald-700",
                    )}
                  >
                    <CalendarClock aria-hidden className="h-3 w-3" />
                    {closed
                      ? "Closed"
                      : deadline
                        ? `Deadline ${deadline}`
                        : "Rolling"}
                  </span>
                )}
              </div>

              <h3 className="mt-2 font-serif text-lg font-semibold leading-snug tracking-tight text-foreground">
                {o.title}
              </h3>

              {o.summary && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {o.summary}
                </p>
              )}

              {o.link && !closed && (
                <a
                  href={o.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Details
                  <ArrowUpRight aria-hidden className="h-3 w-3" />
                </a>
              )}
            </article>
          </li>
        )
      })}
    </ul>
  )
}
