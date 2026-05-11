import type { Metadata } from "next"
import { Award as AwardIcon } from "lucide-react"

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  EmptyState,
  Reveal,
  Section,
  SectionNav,
  SubPageHero,
} from "@/components"
import { getAwards, getIndustryImpacts, getPeople } from "@/lib/content"

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Industry collaborations and group recognitions for the ISE Group at the University of Exeter.",
}

export default function ImpactPage() {
  const impacts = getIndustryImpacts()
  const awards = getAwards()
  const peopleById = new Map(getPeople().map((p) => [p.id, p.name]))

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Research / Impact"
        title="From research to real-world outcomes"
        description="Industry collaborations and group recognitions — translating intelligent sensing into deployed systems and policy outcomes."
      />

      <SectionNav
        items={[
          { id: "industry-collaborations", label: "Industry" },
          { id: "awards", label: "Awards" },
        ]}
      />

      <Section
        id="industry-collaborations"
        kicker="Industry"
        title="Industry collaborations"
        className="scroll-mt-[132px] py-12 md:py-16"
      >
        <Container>
          {impacts.length === 0 ? (
            <EmptyState
              title="No industry collaborations published yet."
              description="Add impact entries via Keystatic to surface them here."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {impacts.map((impact, idx) => (
                <Reveal key={impact.id} delayMs={idx * 50}>
                  <Card className="ise-panel h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-lg">{impact.title}</CardTitle>
                        {impact.partner && (
                          <Badge variant="outline" className="shrink-0">
                            {impact.partner}
                          </Badge>
                        )}
                      </div>
                      {(impact.period || impact.amount) && (
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          {impact.period && <span>{impact.period}</span>}
                          {impact.amount && (
                            <span className="font-semibold">{impact.amount}</span>
                          )}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {impact.description && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {impact.description}
                        </p>
                      )}
                      {impact.people && impact.people.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            People:
                          </span>{" "}
                          {impact.people
                            .map((id) => peopleById.get(id) ?? id)
                            .join(", ")}
                        </p>
                      )}
                      {impact.tags && impact.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {impact.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section
        id="awards"
        kicker="Recognition"
        title="Awards & recognition"
        className="scroll-mt-[132px] section-muted py-12 md:py-16"
      >
        <Container>
          {awards.length === 0 ? (
            <EmptyState
              title="No awards published yet."
              description="Add awards via Keystatic to surface them here."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {awards.map((award, idx) => (
                <Reveal key={award.id} delayMs={idx * 30}>
                  <Card className="ise-panel h-full">
                    <CardHeader className="pb-2">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <AwardIcon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <CardTitle className="text-base">{award.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {award.organization}
                        {award.year && ` · ${award.year}`}
                      </p>
                    </CardHeader>
                    {award.description && (
                      <CardContent className="pt-0">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {award.description}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}
