import Link from "next/link"

import {
  Button,
  Container,
  EmptyState,
  NewsMosaic,
  PageHero,
  PublicationCard,
  Reveal,
  Section,
  SectionIntro,
} from "@/components"
import { getNews, getPeople, getPublications } from "@/lib/content"

export default function Home() {
  const news = getNews().slice(0, 4)
  const peopleById = new Map(getPeople().map((p) => [p.id, p.name]))
  // Pinned via `featured: true` on a publication in Keystatic; newest first.
  const featuredWork = getPublications()
    .filter((p) => p.featured)
    .slice(0, 6)

  return (
    <div className="bg-background">
      <PageHero
        title="Novel machine learning and intelligent sensing for"
        highlight="Environmental Observation"
        description="We envision scientific investigations that advance real-world applications including natural disaster management, environment protection, and digital economy."
        ctas={[
          { label: "Explore Research", href: "/research" },
          { label: "View Impact", href: "/research/impact", variant: "secondary" },
        ]}
        imageSrc="/images/hero-vision.png"
      />

      {/* Recent News — featured mosaic */}
      <Section className="section-surface py-12 md:py-16">
        <Container className="space-y-8">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <SectionIntro kicker="Recent" title="News & highlights" />
              <Button asChild variant="ghost" size="sm">
                <Link href="/news">View all &rarr;</Link>
              </Button>
            </div>
          </Reveal>
          {news.length === 0 ? (
            <EmptyState
              title="No news published yet."
              description="News items will appear here once added in Keystatic."
            />
          ) : (
            <Reveal delayMs={80}>
              <NewsMosaic items={news} />
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Featured work — pinned publications */}
      {featuredWork.length > 0 && (
        <Section className="py-12 md:py-16">
          <Container className="space-y-8">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <SectionIntro kicker="Highlights" title="Featured work" />
                <Button asChild variant="ghost" size="sm">
                  <Link href="/research/publications">All publications &rarr;</Link>
                </Button>
              </div>
            </Reveal>
            <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
              {featuredWork.map((p, idx) => (
                <Reveal key={p.id} delayMs={Math.min(idx, 6) * 40} className="h-full">
                  <PublicationCard pub={p} peopleById={peopleById} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  )
}
