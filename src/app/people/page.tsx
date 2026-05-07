import Link from "next/link"
import {
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react"
import type { Metadata } from "next"

import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  EmptyState,
  Reveal,
  SubPageHero,
} from "@/components"
import {
  getAffiliated,
  getAlumni,
  getCurrentPeople,
  getLead,
  type Person,
} from "@/lib/content"

export const metadata: Metadata = {
  title: "People",
  description:
    "PI, postdocs, PhD students, and affiliated collaborators of the ISE Group at the University of Exeter.",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function PersonLinks({ person }: { person: Person }) {
  const links = person.links ?? {}
  const items: { href: string; label: string; icon: typeof Mail }[] = []
  if (person.email) items.push({ href: `mailto:${person.email}`, label: "Email", icon: Mail })
  if (links.website) items.push({ href: links.website, label: "Website", icon: Globe })
  if (links.scholar) items.push({ href: links.scholar, label: "Scholar", icon: GraduationCap })
  if (links.github) items.push({ href: links.github, label: "GitHub", icon: Github })
  if (links.linkedin) items.push({ href: links.linkedin, label: "LinkedIn", icon: Linkedin })
  if (items.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  )
}

function LeadCard({ person }: { person: Person }) {
  return (
    <Card className="ise-panel overflow-hidden">
      <CardContent className="grid gap-6 p-6 md:grid-cols-[180px_1fr] md:p-8">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Avatar className="h-32 w-32">
            <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
              {getInitials(person.name)}
            </AvatarFallback>
          </Avatar>
          <PersonLinks person={person} />
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <Badge variant="secondary" className="text-[0.65rem] tracking-[0.2em]">
              {person.type.toUpperCase()}
            </Badge>
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              {person.name}
            </h2>
            {person.role && (
              <p className="text-base text-muted-foreground">{person.role}</p>
            )}
            {person.affiliation && (
              <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {person.affiliation}
              </p>
            )}
          </div>
          {person.bio && (
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {person.bio}
            </p>
          )}
          {person.roleHighlights && person.roleHighlights.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Roles
              </p>
              <ul className="space-y-1 text-sm text-foreground">
                {person.roleHighlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function PersonCard({
  person,
  showCurrentPosition = false,
}: {
  person: Person
  showCurrentPosition?: boolean
}) {
  return (
    <Card className="ise-panel h-full overflow-hidden">
      <CardContent className="space-y-2.5 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {getInitials(person.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="min-w-0 flex-1 truncate text-sm">
                {person.name}
              </CardTitle>
              <Badge
                variant={person.type === "PostDoc" ? "default" : "secondary"}
                className="shrink-0 text-[0.6rem]"
              >
                {person.type}
              </Badge>
            </div>
            {person.period && (
              <p className="truncate text-xs text-muted-foreground">
                {person.period}
              </p>
            )}
          </div>
        </div>
        {person.role && (
          <p className="text-xs font-medium text-foreground">{person.role}</p>
        )}
        {person.interests && person.interests.length > 0 && (
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {person.interests.join(" · ")}
          </p>
        )}
        {person.funding && (
          <Badge variant="outline" className="text-[0.65rem]">
            {person.funding}
          </Badge>
        )}
        {showCurrentPosition && person.currentPosition && (
          <p className="line-clamp-2 text-[0.7rem] text-muted-foreground">
            <span className="font-semibold">Now:</span> {person.currentPosition}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function PeopleSection({
  title,
  description,
  people,
  showCurrentPosition = false,
}: {
  title: string
  description?: string
  people: Person[]
  showCurrentPosition?: boolean
}) {
  if (people.length === 0) return null
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-serif text-2xl font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person, idx) => (
          <Reveal key={person.id} delayMs={idx * 30}>
            <PersonCard person={person} showCurrentPosition={showCurrentPosition} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function PeoplePage() {
  const lead = getLead()
  const current = getCurrentPeople().filter((p) => p.type !== "Lead")
  const alumni = getAlumni()
  const affiliated = getAffiliated()

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="People"
        title="The ISE team"
        description="PI, postdocs, PhD students, and affiliated collaborators working on intelligent sensing for environmental observation."
      />

      <section className="py-12 md:py-16">
        <Container className="space-y-12">
          {lead ? (
            <Reveal>
              <LeadCard person={lead} />
            </Reveal>
          ) : (
            <EmptyState
              title="The PI profile hasn't been published yet."
              action={
                <Link
                  href="/keystatic"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Open Keystatic →
                </Link>
              }
            />
          )}

          <PeopleSection
            title="Current Members"
            description="PostDocs, PhD candidates, and MPhil students currently in the group."
            people={current}
          />

          <PeopleSection
            title="Alumni"
            description="Where past members are now."
            people={alumni}
            showCurrentPosition
          />

          <PeopleSection
            title="Affiliated Faculty & Collaborators"
            description="External researchers we work with on a continuing basis."
            people={affiliated}
          />
        </Container>
      </section>
    </div>
  )
}
