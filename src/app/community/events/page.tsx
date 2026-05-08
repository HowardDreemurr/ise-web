import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  EventCard,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"
import { getEvents, type EventType, type GroupEvent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Events",
  description:
    "Keynotes, workshops, editorial roles, and chair appointments by the ISE Group.",
}

const TYPE_LABEL: Record<EventType, string> = {
  keynote: "Keynote",
  workshop: "Workshop",
  symposium: "Symposium",
  "speaker-series": "Speaker Series",
  editorial: "Editorial",
  chair: "Chair Role",
}

const TYPE_ORDER: EventType[] = [
  "keynote",
  "workshop",
  "symposium",
  "speaker-series",
  "chair",
  "editorial",
]

export default function EventsPage() {
  const events = getEvents()
  const byType: Record<EventType, GroupEvent[]> = {
    keynote: [],
    workshop: [],
    symposium: [],
    "speaker-series": [],
    chair: [],
    editorial: [],
  }
  for (const ev of events) byType[ev.type].push(ev)

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Community / Events"
        title="Events & service"
        description={`${events.length} academic activities — keynotes, workshops, conference chair appointments and editorial roles.`}
      />

      {events.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No events published yet."
            description="Add events via Keystatic to surface them here."
          />
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container className="space-y-12">
            {TYPE_ORDER.map((type) => {
              const items = byType[type]
              if (items.length === 0) return null
              return (
                <div key={type} className="space-y-5">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">
                    {TYPE_LABEL[type]}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      ({items.length})
                    </span>
                  </h2>
                  <div className="grid gap-[18px] lg:grid-cols-2 lg:gap-5">
                    {items.map((ev, idx) => (
                      <Reveal key={ev.id} delayMs={Math.min(idx, 6) * 30}>
                        <EventCard event={ev} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </Container>
        </Section>
      )}
    </div>
  )
}
