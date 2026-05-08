import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

type SubPageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

/**
 * Sub-page banner — solid primary→cerulean diagonal gradient band with a
 * subtle ring decoration on the right. Mirrors the design's `.banner` variant
 * (`ise-design-system/preview/hero-variants.html`).
 *
 * About 120-140px tall; no photography required. White pill eyebrow, white
 * serif title, white-fade description. Used on every sub-page (Community,
 * Research, People, Resources, Join).
 */
export function SubPageHero({
  eyebrow,
  title,
  description,
  className,
}: SubPageHeroProps) {
  return (
    <section
      className={cn("relative overflow-hidden", className)}
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
      }}
    >
      {/* Decorative ring on the right — concentric border + outer halo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: "-100px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "520px",
          height: "520px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "50%",
          boxShadow: "0 0 0 60px rgba(255,255,255,0.04)",
        }}
      />

      <Container className="relative z-[1] py-10 md:py-12">
        <div className="max-w-3xl text-white">
          {eyebrow && (
            <Reveal>
              <span className="pill pill-on-dark mb-3">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delayMs={eyebrow ? 60 : 0}>
            <h1
              className="font-serif font-bold leading-[1.15] text-white"
              style={{
                fontSize: "clamp(28px, 3.4vw, 36px)",
                letterSpacing: "-0.015em",
              }}
            >
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delayMs={120}>
              <p
                className="mt-2.5 max-w-2xl text-white/80"
                style={{ fontSize: "15px", lineHeight: 1.6 }}
              >
                {description}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}
