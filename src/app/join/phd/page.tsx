import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  OpeningsList,
  Section,
  SectionIntro,
  SubPageHero,
} from "@/components"
import { getOpenings } from "@/lib/content"

export const metadata: Metadata = {
  title: "PhD Opportunities",
  description:
    "PhD scholarships and supervision routes with the ISE Group at the University of Exeter — CSC, EPSRC IAA, EI CDT, and self-funded.",
}

const H2 = "font-serif text-xl font-bold tracking-tight text-foreground"
const P = "text-[15px] leading-relaxed text-foreground/80"
const UL = "mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-foreground/80"
const A =
  "text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"

export default function PhdPage() {
  const openings = getOpenings().filter((o) => o.type === "phd")

  return (
    <div className="bg-background">
      <SubPageHero
        title="PhD Opportunities"
        description="Fully-funded scholarships and self-funded routes across sensing, processing, and decision-making — including CSC × Exeter, EPSRC IAA, and EI CDT awards."
      />

      <Section className="py-12 md:py-16">
        <Container className="max-w-3xl space-y-4">
          <h2 className={H2}>How to apply</h2>
            <p className={P}>
              We supervise PhDs across all three ISE themes — sensing,
              processing, and decision making. UK and international applicants
              are welcome, via these routes:
            </p>
            <ul className={UL}>
              <li>
                <strong>CSC × Exeter</strong> — fully-funded joint scholarships
                with the China Scholarship Council.
              </li>
              <li>
                <strong>EPSRC IAA / EI CDT</strong> — UK research-council
                channels, typically tied to ongoing projects.
              </li>
              <li>
                <strong>Self-funded / sponsored</strong> — direct supervision
                applications.
              </li>
            </ul>
            <p className={P}>
              Email{" "}
              <a href="mailto:C.Luo@exeter.ac.uk" className={A}>
                C.Luo@exeter.ac.uk
              </a>{" "}
              with a CV and a one-page research statement. I&apos;ll guide you
              through the application — materials, sample documents, and the
              choice of research direction.
            </p>
        </Container>
      </Section>

      <Section className="section-muted py-12 md:py-16">
        <Container className="max-w-3xl space-y-6">
          <SectionIntro kicker="Open" title="Current openings" />
          <OpeningsList
            items={openings}
            emptyState={
              <EmptyState
                title="No active calls right now."
                description="PhD calls are posted at the start of each application cycle. Email the PI to be notified, or check this page closer to the autumn cycle."
              />
            }
          />
        </Container>
      </Section>
    </div>
  )
}
