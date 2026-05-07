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
 * Compact, surface-toned hero used on sub-pages where the home-page
 * imagery would be overkill. Source Serif 4 headline, generous padding,
 * neutral background.
 */
export function SubPageHero({
  eyebrow,
  title,
  description,
  className,
}: SubPageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-border/60 bg-card py-12 md:py-16",
        className,
      )}
    >
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <span className="pill pill-primary mb-4">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delayMs={eyebrow ? 60 : 0}>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delayMs={120}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}
