import {
  Award,
  BadgeCheck,
  Brain,
  Building2,
  Coins,
  Cpu,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  Handshake,
  Network,
  Plane,
  Satellite,
  Sprout,
  Trophy,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { NewsItem } from "@/lib/content"

type NewsCardProps = {
  item: NewsItem
  size?: "lg" | "md" | "sm"
  className?: string
}

const SIZE_CLASS: Record<NonNullable<NewsCardProps["size"]>, string> = {
  lg: "min-h-[460px] p-8",
  md: "min-h-[280px] p-6",
  sm: "min-h-[140px] p-[18px]",
}

const TITLE_CLASS: Record<NonNullable<NewsCardProps["size"]>, string> = {
  lg: "text-[32px] leading-[1.15]",
  md: "text-[22px] leading-[1.2]",
  sm: "text-base leading-[1.3]",
}

const ICON_SIZE: Record<NonNullable<NewsCardProps["size"]>, string> = {
  lg: "h-44 w-44",
  md: "h-28 w-28",
  sm: "h-16 w-16",
}

/** Themed icon library — name → lucide component. Add new ones here. */
const ICONS: Record<string, LucideIcon> = {
  award: Award,
  "badge-check": BadgeCheck,
  brain: Brain,
  building: Building2,
  coins: Coins,
  cpu: Cpu,
  "file-text": FileText,
  flame: Flame,
  globe: Globe,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  network: Network,
  plane: Plane,
  satellite: Satellite,
  sprout: Sprout,
  trophy: Trophy,
}

/** Hairy default — navy → cerulean → sky with a thin diagonal-stripe overlay.
 *  Used when a news item has no `imageUrl`, so the card is never flat. */
const DEFAULT_BG =
  "linear-gradient(135deg, rgba(30,58,138,0.92) 0%, rgba(3,105,161,0.88) 60%, rgba(56,189,248,0.85) 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 14px)"

function buildBackground(imageUrl?: string) {
  if (!imageUrl) return DEFAULT_BG
  // Vertical scrim from transparent (top) to dark navy (bottom) so meta + title read on any photo.
  return [
    "linear-gradient(180deg, rgba(2,3,12,0.10) 0%, rgba(2,3,12,0.55) 60%, rgba(2,3,12,0.85) 100%)",
    `url(${imageUrl})`,
  ].join(", ")
}

export function NewsCard({ item, size = "md", className }: NewsCardProps) {
  const bg = buildBackground(item.imageUrl)
  // Link target — first external link if any. There's no per-news detail page,
  // so an item without a `links` entry stays static (no hover lift, no 404).
  const externalHref = item.links?.[0]?.href

  // When there's no image, render the themed icon as a large faint mark in the
  // upper area of the card. Keeps the card from looking flat without competing
  // with the title (which sits at the bottom).
  const IconComponent = !item.imageUrl && item.icon ? ICONS[item.icon] : null

  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-lg bg-cover bg-center text-white transition-[box-shadow] duration-300",
        externalHref &&
          "hover:shadow-[0_18px_40px_-16px_rgba(15,23,42,0.45)]",
        SIZE_CLASS[size],
        className,
      )}
      style={{ backgroundImage: bg }}
    >
      {externalHref && (
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={item.title}
        />
      )}

      {IconComponent && (
        <IconComponent
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-5 top-5 z-[0] text-white/20",
            ICON_SIZE[size],
          )}
          strokeWidth={1.25}
        />
      )}

      <div className="relative z-[1]">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/85">
          {item.tag && (
            <span className="rounded-full border border-sky-400/50 bg-sky-400/25 px-2 py-[3px] font-bold text-white">
              {item.tag}
            </span>
          )}
          {item.date && <time dateTime={item.date}>{item.date}</time>}
        </div>
        <h3
          className={cn(
            "mt-3 font-serif font-bold tracking-[-0.01em] text-white",
            TITLE_CLASS[size],
          )}
        >
          {item.title}
        </h3>
        {item.subtitle && size !== "sm" && (
          <p
            className={cn(
              "mt-2.5 text-white/85",
              size === "lg" ? "max-w-[520px] text-base" : "text-[14.5px]",
              "leading-[1.55]",
            )}
          >
            {item.subtitle}
          </p>
        )}
      </div>
    </article>
  )
}
