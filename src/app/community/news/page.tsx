import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import {
  Badge,
  Card,
  CardContent,
  Container,
  EmptyState,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"
import { getNews, type NewsItem } from "@/lib/content"

export const metadata: Metadata = {
  title: "News",
  description: "Announcements and updates from the ISE Group.",
}

const TAG_VARIANT: Record<NonNullable<NewsItem["tag"]>, string> = {
  Award: "bg-notable text-notable-foreground",
  Paper: "bg-primary/10 text-primary",
  Project: "bg-accent/10 text-accent",
  Talk: "bg-secondary text-secondary-foreground",
  Media: "bg-muted text-muted-foreground",
  Milestone: "bg-secondary text-secondary-foreground",
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card className="ise-panel overflow-hidden">
      {item.imageUrl && (
        <div className="relative h-40 w-full bg-muted">
          <Image
            src={item.imageUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="space-y-2 p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {item.date && <time dateTime={item.date}>{item.date}</time>}
          {item.tag && (
            <Badge className={TAG_VARIANT[item.tag] ?? ""}>{item.tag}</Badge>
          )}
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug">
          <Link href={`/community/news/${item.id}`} className="hover:text-primary">
            {item.title}
          </Link>
        </h3>
        {item.subtitle && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default function NewsPage() {
  const items = getNews()
  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Community / News"
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
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  )
}
