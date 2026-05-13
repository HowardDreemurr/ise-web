import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { cn, withBasePath } from "@/lib/utils"

type CtaLink = {
  label: string
  href: string
  variant?: "primary" | "secondary"
}

type PageHeroProps = {
  /** Optional pill / kicker shown above the title. */
  eyebrow?: string
  /** Main heading — supports inline highlight via `highlight`. */
  title: ReactNode
  /** Highlighted phrase rendered after the title in accent color. */
  highlight?: ReactNode
  /** Lead paragraph. */
  description?: ReactNode
  /** 0-N call-to-action buttons. */
  ctas?: CtaLink[]
  /** Background image — when provided the hero renders dark. */
  imageSrc?: string
  imageAlt?: string
  /** Hero height. Default `large`. */
  size?: "compact" | "default" | "large"
  className?: string
}

const SIZE_HEIGHT: Record<NonNullable<PageHeroProps["size"]>, string> = {
  compact: "min-h-[40vh]",
  default: "min-h-[60vh]",
  large: "min-h-[78vh]",
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  ctas,
  imageSrc,
  imageAlt = "",
  size = "large",
  className,
}: PageHeroProps) {
  const isDark = !!imageSrc

  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden",
        SIZE_HEIGHT[size],
        isDark ? "bg-[#02030C]" : "bg-background",
        className,
      )}
    >
      {imageSrc && (
        <>
          <Image
            src={withBasePath(imageSrc)}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-left"
          />
          <div
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,3,12,0.78) 0%, rgba(2,3,12,0.55) 45%, rgba(2,3,12,0.10) 100%)",
            }}
          />
        </>
      )}

      <Container className="relative z-10 py-12 md:py-16">
        <div className="max-w-2xl">
          {eyebrow && (
            <Reveal>
              <span
                className={cn(
                  "pill mb-6",
                  isDark ? "pill-on-dark" : "pill-primary",
                )}
              >
                {eyebrow}
              </span>
            </Reveal>
          )}

          <Reveal delayMs={eyebrow ? 60 : 0}>
            <h1
              className={cn(
                "font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl",
                isDark ? "text-white" : "text-foreground",
              )}
            >
              {title}
              {highlight && (
                <>
                  {" "}
                  <span className="text-accent">{highlight}</span>
                </>
              )}
            </h1>
          </Reveal>

          {description && (
            <Reveal delayMs={120}>
              <p
                className={cn(
                  "mt-6 max-w-xl text-lg leading-relaxed",
                  isDark ? "text-white/85" : "text-muted-foreground",
                )}
              >
                {description}
              </p>
            </Reveal>
          )}

          {ctas && ctas.length > 0 && (
            <Reveal delayMs={180}>
              <div className="mt-8 flex flex-wrap gap-3">
                {ctas.map((cta) => {
                  const isPrimary = cta.variant !== "secondary"
                  return (
                    <Button
                      key={cta.href}
                      asChild
                      size="lg"
                      variant={
                        cta.variant === "secondary" && !isDark
                          ? "outline"
                          : "default"
                      }
                      className={cn(
                        "rounded-full font-semibold",
                        isDark &&
                          cta.variant === "secondary" &&
                          "bg-white/10 text-white hover:bg-white/15 border border-white/30",
                        // Breathing cerulean glow on the primary CTA — pulls the
                        // eye to the lead action without animating layout.
                        isPrimary && "ise-pulse-glow",
                      )}
                    >
                      <Link href={cta.href}>{cta.label}</Link>
                    </Button>
                  )
                })}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}
