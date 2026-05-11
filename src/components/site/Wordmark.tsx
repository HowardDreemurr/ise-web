import { cn } from "@/lib/utils"

type Tone = "light" | "dark"

type WordmarkProps = {
  /** Visual tone — light = brand blue + slate; dark = white + 78% white. */
  tone?: Tone
  /** Render width in px. Height auto-derives from the 1000:290 viewBox. */
  width?: number
  className?: string
  /** Optional accessible label. Defaults to "ISE LAB — Intelligent Sensing for Environment". */
  ariaLabel?: string
}

/**
 * SVG wordmark with both lines locked to identical `textLength` so "ISE LAB"
 * and "INTELLIGENT SENSING FOR ENVIRONMENT" share the exact same width
 * regardless of font loading or browser rendering. "ISE LAB" can never wrap.
 *
 * Three canonical widths are used in this codebase:
 *  - header   : 180–200
 *  - footer   : 280–340
 *  - hero/OG  : 520
 */
export function Wordmark({
  tone = "light",
  width = 200,
  className,
  ariaLabel = "ISE LAB — Intelligent Sensing for Environment",
}: WordmarkProps) {
  const topFill = tone === "dark" ? "#ffffff" : "#205775"
  const bottomFill = tone === "dark" ? "rgba(255,255,255,0.78)" : "#64748b"

  return (
    <svg
      viewBox="0 0 1000 290"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={cn("block h-auto", className)}
      style={{ width }}
    >
      {/* font-family must go through `style` (a CSS property), not the SVG
          presentation attribute — `var()` does not resolve in SVG attributes,
          which would silently drop the next/font face and leave it preloaded
          but unused. */}
      <text
        x="0"
        y="208"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fontSize="240"
        fill={topFill}
        style={{ fontFamily: "var(--font-ise-wordmark), 'Archivo Black', system-ui, sans-serif" }}
      >
        ISE LAB
      </text>
      <text
        x="0"
        y="278"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fontWeight={700}
        fontSize="42"
        letterSpacing="2"
        fill={bottomFill}
        style={{ fontFamily: "var(--font-ise-wordmark-tag), 'Space Grotesk', system-ui, sans-serif" }}
      >
        INTELLIGENT SENSING FOR ENVIRONMENT
      </text>
    </svg>
  )
}
