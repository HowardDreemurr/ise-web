import Link from "next/link"
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Reveal,
  Section,
} from "@/components"
import { getAwards, getIndustryImpacts } from "@/lib/content"

export default function ImpactPage() {
  const industryImpacts = getIndustryImpacts()
  const awards = getAwards()
  return (
    <div className="bg-background">
      <Section kicker="Impact" title="Real-World Applications" bg="primary">
        <p className="text-base max-w-2xl">
          Our research translates into tangible outcomes for industry, society, and the environment.
        </p>
      </Section>

      {/* Industry Impacts */}
      <section className="py-12 md:py-16 section-white">
        <Container>
          <Reveal>
            <h3 className="font-serif text-2xl font-semibold mb-8">Industry Impacts</h3>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {industryImpacts.map((impact, idx) => (
              <Reveal key={impact.id} delayMs={idx * 60}>
                <Card className="ice-panel h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-lg">{impact.title}</CardTitle>
                      {impact.partner && (
                        <Badge variant="outline" className="shrink-0">
                          {impact.partner}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {impact.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {impact.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Awards Section */}
      <Section kicker="Recognition" title="Awards & Achievements" colorIndex={1}>
        <p className="text-base max-w-2xl mb-8">
          Recognition from leading institutions for our contributions to research and innovation.
        </p>
      </Section>

      <section className="py-12 md:py-16 section-gray">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, idx) => (
              <Reveal key={award.id} delayMs={idx * 40}>
                <Card className="ice-panel h-full">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-base">{award.title}</CardTitle>
                    <CardDescription>{award.organization}</CardDescription>
                  </CardHeader>
                  {award.description && (
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        {award.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Collaborations CTA */}
      <Section kicker="Partner With Us" title="Industry Collaborations" colorIndex={0}>
        <p className="text-base max-w-2xl mb-6">
          We actively seek partnerships with industry to translate our research into practical applications.
          From proof-of-concept to deployment, we work with partners across sectors.
        </p>
        <Reveal>
          <Link
            href="/members"
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            Contact us to explore collaboration opportunities &rarr;
          </Link>
        </Reveal>
      </Section>
    </div>
  )
}
