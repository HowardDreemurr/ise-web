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
import { getPeople, getPublications, type AuthorRef, type Publication } from "@/lib/content"

export const metadata: Metadata = {
  title: "Publications",
  description: "Journal, conference, workshop and book-chapter outputs from the ISE Group.",
}

function renderAuthors(authors: AuthorRef[], peopleById: Map<string, string>) {
  return authors
    .map((a) =>
      a.type === "member"
        ? peopleById.get(a.id) ?? a.id
        : a.name,
    )
    .join(", ")
}

function PublicationCard({
  pub,
  peopleById,
}: {
  pub: Publication
  peopleById: Map<string, string>
}) {
  const externalLink = pub.doi ? `https://doi.org/${pub.doi}` : pub.link
  return (
    <Card className="ise-panel">
      <CardContent className="space-y-2 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="secondary" className="font-mono">
            {pub.year}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {pub.type.replace("-", " ")}
          </Badge>
          {pub.featured && (
            <Badge className="bg-notable text-notable-foreground">Featured</Badge>
          )}
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
          {pub.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {renderAuthors(pub.authors, peopleById)}
        </p>
        <p className="text-sm italic text-muted-foreground">{pub.venue}</p>
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            {pub.doi ? `doi.org/${pub.doi}` : "Open paper"}
          </a>
        )}
      </CardContent>
    </Card>
  )
}

export default function PublicationsPage() {
  const pubs = getPublications()
  const peopleById = new Map(getPeople().map((p) => [p.id, p.name]))
  const featured = pubs.filter((p) => p.featured)
  const rest = pubs.filter((p) => !p.featured)

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Research / Publications"
        title="Publications"
        description={`${pubs.length} papers across journals, conferences, workshops, and book chapters. Featured first, then by year (descending).`}
      />

      {pubs.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No publications published yet."
            description="Add publications via Keystatic; the list updates at the next build."
          />
        </Section>
      ) : (
        <>
          {featured.length > 0 && (
            <Section
              kicker="Highlights"
              title="Featured publications"
              className="py-12"
            >
              <Container>
                <div className="grid gap-4 md:grid-cols-2">
                  {featured.map((p, idx) => (
                    <Reveal key={p.id} delayMs={idx * 40}>
                      <PublicationCard pub={p} peopleById={peopleById} />
                    </Reveal>
                  ))}
                </div>
              </Container>
            </Section>
          )}

          <Section
            kicker="All papers"
            title="All publications"
            className="section-muted py-12 md:py-16"
          >
            <Container>
              <div className="grid gap-4 md:grid-cols-2">
                {rest.map((p, idx) => (
                  <Reveal key={p.id} delayMs={Math.min(idx, 8) * 30}>
                    <PublicationCard pub={p} peopleById={peopleById} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </Section>
        </>
      )}
    </div>
  )
}
