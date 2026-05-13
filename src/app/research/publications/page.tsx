import type { Metadata } from "next"

import {
  Chronology,
  Container,
  EmptyState,
  PublicationCard,
  Reveal,
  Section,
  SubPageHero,
  type ChronologyEntry,
} from "@/components"
import { getPeopleIndex, getPublications } from "@/lib/content"

export const metadata: Metadata = {
  title: "Publications",
  description: "Journal, conference, workshop and book-chapter outputs from the ISE Group.",
}

export default function PublicationsPage() {
  const pubs = getPublications()
  const peopleById = getPeopleIndex()
  // Cap Featured to match the home page; surplus featured papers fall through to the archive.
  const FEATURED_CAP = 6
  const featuredAll = pubs.filter((p) => p.featured)
  const featured = featuredAll.slice(0, FEATURED_CAP)
  const featuredIds = new Set(featured.map((p) => p.id))
  const rest = pubs.filter((p) => !featuredIds.has(p.id))

  // getPublications() is sorted by year desc; Chronology buckets by year.
  const restEntries: ChronologyEntry[] = rest.map((p) => ({
    id: p.id,
    year: p.year,
    label: p.title,
    node: <PublicationCard pub={p} peopleById={peopleById} />,
  }))

  return (
    <div className="bg-background">
      <SubPageHero
        title="Publications"
        description={`${pubs.length} papers across journals, conferences, workshops, and book chapters. Featured highlights first, then a year-by-year archive.`}
      />

      {pubs.length === 0 ? (
        <Section className="py-12">
          <Container>
            <EmptyState
              title="No publications published yet."
              description="Add publications via Keystatic; the list updates at the next build."
            />
          </Container>
        </Section>
      ) : (
        <>
          {featured.length > 0 && (
            <Section kicker="Highlights" title="Featured publications" className="py-12">
              <Container>
                <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
                  {featured.map((p, idx) => (
                    <Reveal key={p.id} delayMs={Math.min(idx, 8) * 30} className="h-full">
                      <div id={p.id} className="h-full scroll-mt-24">
                        <PublicationCard pub={p} peopleById={peopleById} />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Container>
            </Section>
          )}

          <Section
            kicker={featured.length > 0 ? "All papers" : undefined}
            title="All publications"
            className={
              featured.length > 0
                ? "section-muted py-12 md:py-16"
                : "py-12 md:py-16"
            }
          >
            <Container>
              <Chronology entries={restEntries} />
            </Container>
          </Section>
        </>
      )}
    </div>
  )
}
