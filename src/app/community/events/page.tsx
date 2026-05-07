import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"

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
import { getEvents, getPeople, type EventType, type GroupEvent } from "@/lib/content"

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

function EventCard({
  ev,
  peopleById,
}: {
  ev: GroupEvent
  peopleById: Map<string, string>
}) {
  return (
    <Card className="ise-panel">
      <CardContent className="space-y-2 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">{TYPE_LABEL[ev.type]}</Badge>
          {ev.date && <span className="text-muted-foreground">{ev.date}</span>}
          {ev.role && (
            <Badge variant="secondary" className="text-xs">
              {ev.role}
            </Badge>
          )}
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug">
          {ev.title}
        </h3>
        {ev.venue && (
          <p className="text-sm italic text-muted-foreground">{ev.venue}</p>
        )}
        {ev.organizers && ev.organizers.length > 0 && (
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Organisers:</span>{" "}
            {ev.organizers.map((id) => peopleById.get(id) ?? id).join(", ")}
          </p>
        )}
        {ev.description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {ev.description}
          </p>
        )}
        {ev.url && (
          <a
            href={ev.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Programme
          </a>
        )}
      </CardContent>
    </Card>
  )
}

export default function EventsPage() {
  const events = getEvents()
  const peopleById = new Map(getPeople().map((p) => [p.id, p.name]))

  // Group by type for cleaner browsing
  const byType: Record<EventType, GroupEvent[]> = {
    keynote: [],
    workshop: [],
    symposium: [],
    "speaker-series": [],
    chair: [],
    editorial: [],
  }
  for (const ev of events) byType[ev.type].push(ev)

  const order: EventType[] = [
    "keynote",
    "workshop",
    "symposium",
    "speaker-series",
    "chair",
    "editorial",
  ]

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
            {order.map((type) => {
              const items = byType[type]
              if (items.length === 0) return null
              return (
                <div key={type} className="space-y-4">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">
                    {TYPE_LABEL[type]}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      ({items.length})
                    </span>
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {items.map((ev, idx) => (
                      <Reveal key={ev.id} delayMs={Math.min(idx, 6) * 30}>
                        <EventCard ev={ev} peopleById={peopleById} />
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
