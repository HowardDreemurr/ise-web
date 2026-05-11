import Image from "next/image"

import { cn } from "@/lib/utils"
import type { NewsItem } from "@/lib/content"

/** Diagonal navy→cerulean wash used when a news item has no image. */
const PLACEHOLDER_BG =
  "linear-gradient(135deg, rgba(30,58,138,0.92) 0%, rgba(3,105,161,0.88) 60%, rgba(56,189,248,0.85) 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 14px)"

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function formatDate(s: string): string {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return s
  return `${parseInt(m[3], 10)} ${MONTHS[parseInt(m[2], 10) - 1] ?? m[2]} ${m[1]}`
}

/**
 * News list item — thumbnail (or gradient placeholder) on the left, tag · date,
 * serif title and the abstract on the right, plus any external links. The flat
 * list counterpart to the poster-style `NewsCard` used on the home mosaic.
 */
export function NewsListCard({
  item,
  className,
}: {
  item: NewsItem
  className?: string
}) {
  return (
    <article
      className={cn(
        "ise-panel grid overflow-hidden sm:grid-cols-[180px_minmax(0,1fr)]",
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full bg-muted sm:aspect-auto sm:h-full sm:min-h-[148px]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt=""
            fill
            sizes="(min-width: 640px) 180px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full" style={{ backgroundImage: PLACEHOLDER_BG }} />
        )}
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-col gap-1.5 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {item.tag && (
            <span className="rounded-full bg-primary/8 px-2 py-0.5 font-semibold text-primary">
              {item.tag}
            </span>
          )}
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-foreground">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-sm leading-relaxed text-muted-foreground">{item.subtitle}</p>
        )}
        {item.links && item.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-1.5 text-xs font-semibold">
            {item.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {l.label} &rarr;
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
