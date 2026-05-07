import type { Metadata } from "next"
import { GraduationCap, Handshake, Mail } from "lucide-react"

import {
  Container,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "PhD opportunities, postdoc positions, and industry collaboration with the ISE Group.",
}

const PATHWAYS = [
  {
    icon: GraduationCap,
    title: "PhD candidates",
    description:
      "We supervise PhDs across all three themes — sensing, processing, and decision making. UK & international applicants welcome; CSC, EPSRC IAA, EI CDT, and self-funded routes accepted.",
    cta: "Email C.Luo@exeter.ac.uk with a CV and a one-page research statement.",
  },
  {
    icon: Mail,
    title: "Postdoc & research staff",
    description:
      "Open positions are advertised on the University of Exeter careers portal. Reach out before applying so we can discuss fit and project alignment.",
    cta: "Mention which project (e.g. INSTANT, Wildfire, NEOM) you'd like to join.",
  },
  {
    icon: Handshake,
    title: "Industry collaboration",
    description:
      "We partner with industry on Innovate UK / KTP / Knowledge Transfer projects, EPSRC IAA work, and direct contracts. Past collaborators include IBM, Met Office, Thales, BT, RCA and SpaceClipper.",
    cta: "Tell us about your problem; we'll respond with a one-pager and possible funding routes.",
  },
]

export default function JoinPage() {
  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Join"
        title="Work with the ISE Group"
        description="We welcome PhD candidates, postdocs, and industry partners interested in intelligent sensing for environmental observation."
      />

      <Section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {PATHWAYS.map(({ icon: Icon, title, description, cta }, idx) => (
              <Reveal key={title} delayMs={idx * 60}>
                <div className="ise-panel flex h-full flex-col gap-3 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <p className="mt-auto rounded-md bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
                    {cta}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        kicker="Contact"
        title="Get in touch"
        className="section-muted py-12"
      >
        <Container>
          <p className="max-w-2xl text-base">
            Email the PI directly:{" "}
            <a
              href="mailto:C.Luo@exeter.ac.uk"
              className="font-semibold text-primary hover:underline"
            >
              C.Luo@exeter.ac.uk
            </a>
            . We aim to reply within a week — please flag clearly which pathway
            you&apos;re writing about so we can route the conversation quickly.
          </p>
        </Container>
      </Section>
    </div>
  )
}
