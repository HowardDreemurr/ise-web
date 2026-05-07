import Link from "next/link"
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react"
import type { Metadata } from "next"

import { Container, Reveal, Section, SubPageHero } from "@/components"
import { getEvents, getNews } from "@/lib/content"

export const metadata: Metadata = {
  title: "Community",
  description: "News and events from the ISE Group.",
}

export default function CommunityPage() {
  const newsCount = getNews().length
  const eventCount = getEvents().length

  const links = [
    {
      href: "/community/news",
      label: "News",
      icon: Newspaper,
      desc: `${newsCount} announcements — papers, awards, projects, milestones.`,
    },
    {
      href: "/community/events",
      label: "Events",
      icon: CalendarDays,
      desc: `${eventCount} keynotes, workshops, editorial roles and chair appointments.`,
    },
  ]

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Community"
        title="What we're up to"
        description="Time-stamped announcements and academic activities — paper acceptances, awards, project launches, talks, editorial service."
      />

      <Section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {links.map(({ href, label, icon: Icon, desc }, idx) => (
              <Reveal key={href} delayMs={idx * 60}>
                <Link
                  href={href}
                  className="ise-panel group block p-6 transition-colors hover:border-primary/40"
                >
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <p className="font-serif text-2xl font-semibold">{label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Browse
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
