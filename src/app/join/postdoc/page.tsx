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
  title: "Postdoc & Research Staff",
  description:
    "Open postdoc and research-associate positions with the ISE Group at the University of Exeter.",
}

const H2 = "font-serif text-xl font-bold tracking-tight text-foreground"
const P = "text-[15px] leading-relaxed text-foreground/80"
const A =
  "text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"

export default function PostdocPage() {
  const openings = getOpenings().filter((o) => o.type === "postdoc")

  return (
    <div className="bg-background">
      <SubPageHero
        title="Postdoc & Research Staff"
        description="Research fellowships, postdoctoral positions, and research-associate roles tied to ISE projects."
      />

      <Section className="py-12 md:py-16">
        <Container className="max-w-3xl space-y-4">
          <h2 className={H2}>How positions are advertised</h2>
            <p className={P}>
              Open positions are advertised on the{" "}
              <a
                href="https://jobs.exeter.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className={A}
              >
                University of Exeter careers portal
              </a>
              . Reach out before applying so we can discuss fit and project
              alignment — mention which project (e.g. INSTANT, Wildfire, NEOM)
              you&apos;d like to join.
            </p>
            <p className={P}>
              For independent fellowships (Royal Society, Royal Academy of
              Engineering, Marie Skłodowska-Curie, UKRI Future Leaders), we are
              happy to host applications and co-author the proposal. Email{" "}
              <a href="mailto:C.Luo@exeter.ac.uk" className={A}>
                C.Luo@exeter.ac.uk
              </a>{" "}
              with a CV and a sketch of the fellowship plan.
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
                title="No live postdoc calls listed here."
                description="Check the University of Exeter careers portal directly, or email the PI to be alerted when a position opens."
              />
            }
          />
        </Container>
      </Section>
    </div>
  )
}
