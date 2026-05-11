import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  NewsCard,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"
import { getNews } from "@/lib/content"

export const metadata: Metadata = {
  title: "Community",
  description: "News and announcements from the ISE Group.",
}

export default function CommunityPage() {
  const items = getNews()
  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Community"
        title="News & announcements"
        description="Recent updates from the group — paper acceptances, project launches, awards, talks and milestones."
      />

      {items.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No news published yet."
            description="Add news items via Keystatic to surface them here."
          />
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, idx) => (
                <Reveal key={item.id} delayMs={Math.min(idx, 6) * 30}>
                  <NewsCard item={item} size="md" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  )
}
