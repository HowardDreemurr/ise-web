import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"
import type { ResearchArea } from "@/lib/content"

type ResearchAreaCardProps = {
  area: ResearchArea
  /** Optional ordinal label (e.g. "01") shown in the corner. */
  index?: number
  /** When provided, the card title becomes a link. */
  href?: string
  className?: string
}

export function ResearchAreaCard({
  area,
  index,
  href,
  className,
}: ResearchAreaCardProps) {
  const titleNode = href ? (
    <Link href={href} className="hover:text-primary transition-colors">
      {area.title}
    </Link>
  ) : (
    area.title
  )

  return (
    <Card className={cn("ise-panel h-full", className)}>
      <CardHeader>
        {typeof index === "number" && (
          <div className="pill pill-primary mb-2 w-fit">
            {String(index + 1).padStart(2, "0")}
          </div>
        )}
        <CardTitle className="text-xl">{titleNode}</CardTitle>
        {area.subtitle && <CardDescription>{area.subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {area.description}
        </p>
        {area.papers && area.papers.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            {area.papers.length} publication{area.papers.length !== 1 ? "s" : ""}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

type ResearchAreaGridProps = {
  areas: ResearchArea[]
  hrefForArea?: (area: ResearchArea) => string
  /** Default 2-up. */
  columns?: 2 | 3
}

export function ResearchAreaGrid({
  areas,
  hrefForArea,
  columns = 2,
}: ResearchAreaGridProps) {
  return (
    <Container>
      <div
        className={cn(
          "grid gap-6",
          columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {areas.map((area, idx) => (
          <Reveal key={area.id} delayMs={idx * 60}>
            <ResearchAreaCard
              area={area}
              index={idx}
              href={hrefForArea?.(area)}
            />
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
