import Link from "next/link"

import {
  Button,
  Container,
  EmptyState,
  EventList,
  NewsMosaic,
  PageHero,
  Reveal,
  Section,
  SectionIntro,
} from "@/components"
import { getEvents, getNews } from "@/lib/content"

export default function Home() {
  const news = getNews().slice(0, 4)
  const events = getEvents().slice(0, 4)

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
                <Link href="/community/news">View all &rarr;</Link>
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

      {/* Upcoming Events */}
      <Section className="section-muted py-12 md:py-16">
        <Container className="space-y-8">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <SectionIntro kicker="Calendar" title="Upcoming events" />
              <Button asChild variant="ghost" size="sm">
                <Link href="/community/events">View all &rarr;</Link>
              </Button>
            </div>
          </Reveal>
          {events.length === 0 ? (
            <EmptyState
              title="No events scheduled."
              description="Talks, workshops and symposia will appear here."
            />
          ) : (
            <Reveal delayMs={80}>
              <EventList events={events} />
            </Reveal>
          )}
        </Container>
      </Section>
    </div>
  )
}
