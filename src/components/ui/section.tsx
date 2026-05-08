import { cn } from "@/lib/utils"
import { Container } from "./container"
import { Reveal } from "./reveal"
import type { ReactNode, HTMLAttributes } from "react"

const SECTION_COLORS = [
  "var(--card)",  // surface
  "var(--muted)", // muted
]

type SectionProps = HTMLAttributes<HTMLElement> & {
  kicker?: string
  title?: string
  children?: ReactNode
  imageUrl?: string
  colorIndex?: number
  dark?: boolean
  bg?: string
}

export function Section({
  kicker,
  title,
  children,
  imageUrl,
  id,
  colorIndex = 0,
  className,
  dark = false,
  bg,
  style,
  ...props
}: SectionProps) {
  // Determine background color
  let bgColor: string
  let hasDarkBg = dark || !!imageUrl

  if (bg === "primary") {
    bgColor = "var(--primary)"
    hasDarkBg = true
  } else if (bg === "chart-4") {
    bgColor = "var(--chart-4)"
    hasDarkBg = true
  } else if (bg) {
    bgColor = bg
  } else {
    bgColor = SECTION_COLORS[colorIndex % SECTION_COLORS.length]
  }

  return (
    <section
      id={id}
      className={cn("py-12 bg-cover bg-center", className)}
      style={{
        backgroundImage: imageUrl
          ? `linear-gradient(180deg, rgba(10,18,14,.78), rgba(10,18,14,.38)), url(${imageUrl})`
          : undefined,
        backgroundColor: imageUrl ? undefined : bgColor,
        ...style,
      }}
      {...props}
    >
      {/* Heading area is wrapped in Container; children pass through untouched
          so callers can use their own Container (or none) without double padding. */}
      {(kicker || title) && (
        <Container>
          <Reveal>
            {kicker && (
              <div className={cn("mb-4", hasDarkBg ? "pill pill-on-dark" : "pill pill-primary")}>
                {kicker}
              </div>
            )}
            {title && (
              <h2
                className={cn(
                  "font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight",
                  hasDarkBg ? "text-white" : "text-foreground"
                )}
              >
                {title}
              </h2>
            )}
          </Reveal>
        </Container>
      )}
      {children && (
        <div
          className={cn(
            (kicker || title) && "mt-4",
            hasDarkBg ? "text-white/90" : "text-muted-foreground"
          )}
        >
          {children}
        </div>
      )}
    </section>
  )
}
