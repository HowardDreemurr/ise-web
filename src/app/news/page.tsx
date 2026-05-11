import type { Metadata } from "next"

import {
  Chronology,
  Container,
  EmptyState,
  NewsListCard,
  Section,
  SubPageHero,
  type ChronologyEntry,
} from "@/components"
import { getNews } from "@/lib/content"

export const metadata: Metadata = {
  title: "News",
  description: "News and announcements from the ISE Group.",
}

function yearOf(date?: string) {
  const m = String(date ?? "").match(/\d{4}/)
  return m ? parseInt(m[0], 10) : 0
}

export default function NewsPage() {
  // getNews() is already sorted by date desc.
  const entries: ChronologyEntry[] = getNews().map((item) => ({
    id: item.id,
    year: yearOf(item.date),
    label: item.title,
    node: <NewsListCard item={item} />,
  }))

  return (
    <div className="bg-background">
      <SubPageHero
        title="News & announcements"
        description="Recent updates from the group — paper acceptances, project launches, awards, talks and milestones."
      />

      <Section className="py-12 md:py-16">
        <Container>
          <Chronology
            entries={entries}
            emptyState={
              <EmptyState
                title="No news published yet."
                description="Add news items via Keystatic to surface them here."
              />
            }
          />
        </Container>
      </Section>
    </div>
  )
}
