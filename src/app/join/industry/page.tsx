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
  title: "Industry Collaboration",
  description:
    "Partnership routes — Innovate UK, KTP, EPSRC IAA, and direct contracts — with the ISE Group.",
}

const H2 = "font-serif text-xl font-bold tracking-tight text-foreground"
const P = "text-[15px] leading-relaxed text-foreground/80"
const A =
  "text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"

export default function IndustryPage() {
  const openings = getOpenings().filter((o) => o.type === "industry")

  return (
    <div className="bg-background">
      <SubPageHero
        title="Industry Collaboration"
        description="We partner with industry to translate intelligent-sensing research into deployed systems — through Innovate UK, KTP, EPSRC IAA, and direct contracts."
      />

      <Section className="py-12 md:py-16">
        <Container className="max-w-3xl space-y-4">
          <h2 className={H2}>How we collaborate</h2>
            <p className={P}>
              We partner with industry on Innovate UK / KTP / Knowledge
              Transfer projects, EPSRC IAA work, and direct contracts. Past
              collaborators include IBM, the Met Office, Thales, BT, RCA, and
              SpaceClipper.
            </p>
            <p className={P}>
              Typical scopes include: foundation-model adaptation for sensing
              data, edge-AI deployment, computer-vision and remote-sensing
              pipelines, and applied signal processing.
            </p>
            <p className={P}>
              Tell us about your problem — email{" "}
              <a href="mailto:C.Luo@exeter.ac.uk" className={A}>
                C.Luo@exeter.ac.uk
              </a>{" "}
              with a short description and we&apos;ll respond with a one-pager
              and possible funding routes.
            </p>
        </Container>
      </Section>

      <Section className="section-muted py-12 md:py-16">
        <Container className="max-w-3xl space-y-6">
          <SectionIntro kicker="Open" title="Calls and partnership routes" />
          <OpeningsList
            items={openings}
            emptyState={
              <EmptyState
                title="No specific calls listed."
                description="We respond to enquiries year-round. Reach out directly via email and we'll find a route together."
              />
            }
          />
        </Container>
      </Section>
    </div>
  )
}
