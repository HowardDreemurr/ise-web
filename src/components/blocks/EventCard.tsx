import type { GroupEvent } from "@/lib/content"
import { cn } from "@/lib/utils"

type EventCardProps = {
  event: GroupEvent
  className?: string
}

const TYPE_LABEL: Record<GroupEvent["type"], string> = {
  keynote: "Keynote",
  workshop: "Workshop",
  symposium: "Symposium",
  "speaker-series": "Speaker Series",
  editorial: "Editorial",
  chair: "Chair Role",
}

/** Same default texture used by NewsCard, so cards without imagery still feel branded. */
const DEFAULT_BG =
  "linear-gradient(135deg, rgba(30,58,138,0.92) 0%, rgba(3,105,161,0.88) 60%, rgba(56,189,248,0.85) 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 14px)"

function parts(date?: string): { day: string; month: string; year: string } {
  if (!date) return { day: "—", month: "", year: "" }
  const m = new Date(date)
  if (isNaN(m.getTime())) return { day: date.slice(0, 4), month: "", year: "" }
  return {
    day: String(m.getDate()).padStart(2, "0"),
    month: m.toLocaleString("en", { month: "short" }).toUpperCase(),
    year: String(m.getFullYear()),
  }
}

export function EventCard({ event, className }: EventCardProps) {
  const { day, month, year } = parts(event.date)
  const tag = TYPE_LABEL[event.type]
  const imageUrl: string | undefined = undefined // events have no imageUrl in our schema yet
  const bg = imageUrl ? `url(${imageUrl})` : DEFAULT_BG

  const Wrapper: React.ElementType = event.url ? "a" : "article"
  const wrapperProps = event.url
    ? { href: event.url, target: "_blank" as const, rel: "noreferrer" }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group grid h-full overflow-hidden rounded-lg border border-border bg-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_14px_32px_-14px_rgba(15,23,42,0.18)]",
        // Always horizontal: image-on-left, body-on-right.
        // Image column shrinks on mobile so the row stays a row (not a stack).
        "grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr]",
        className,
      )}
    >
      {/* Image column with floating date block */}
      <div
        className="relative flex h-full items-start overflow-hidden bg-cover bg-center p-3 sm:p-4"
        style={{ backgroundImage: bg, minHeight: 140 }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,3,12,0) 35%, rgba(2,3,12,0.35) 100%)",
          }}
        />
        <div className="relative min-w-[54px] rounded-lg bg-white px-2.5 py-[7px] text-center shadow-[0_6px_16px_-6px_rgba(2,3,12,0.40)]">
          <div className="font-serif text-[22px] font-bold leading-none tracking-[-0.02em] text-foreground">
            {day}
          </div>
          {month && (
            <div className="mt-[3px] font-mono text-[10px] font-bold tracking-[0.12em] text-primary">
              {month}
            </div>
          )}
          {year && (
            <div className="mt-[2px] font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
              {year}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col justify-center gap-2 px-5 py-[18px]">
        <span className="self-start rounded-full border border-primary/25 bg-primary/10 px-2.5 py-[3px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-primary">
          {tag}
        </span>
        <h3 className="mt-1 font-serif text-lg font-bold leading-[1.2] tracking-[-0.01em] text-foreground">
          {event.title}
        </h3>
        {event.role && (
          <p className="text-[13.5px] leading-[1.55] text-muted-foreground">{event.role}</p>
        )}
        {event.venue && (
          <p className="mt-1.5 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.04em] text-muted-foreground">
            <span className="text-primary">●</span>
            {event.venue}
          </p>
        )}
      </div>
    </Wrapper>
  )
}

type EventListProps = {
  events: GroupEvent[]
  className?: string
}

/** 2-col responsive grid for EventCards, used on home page + events page. */
export function EventList({ events, className }: EventListProps) {
  if (events.length === 0) return null
  return (
    <div className={cn("grid gap-[18px] lg:grid-cols-2 lg:gap-5", className)}>
      {events.map((ev) => (
        <EventCard key={ev.id} event={ev} />
      ))}
    </div>
  )
}

// Backwards-compat alias if needed elsewhere
export type { GroupEvent }
