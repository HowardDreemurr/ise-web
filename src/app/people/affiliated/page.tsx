import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  MeasuredPeopleSections,
  PeopleGrid,
  Section,
  SubPageHero,
} from "@/components"
import { getAffiliated } from "@/lib/content"

export const metadata: Metadata = {
  title: "Affiliated",
  description: "External faculty and collaborators of the ISE Group.",
}

export default function AffiliatedPage() {
  const all = [...getAffiliated()].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="bg-background">
      <SubPageHero
        title="Affiliated faculty & collaborators"
        description="External researchers connected to the group through co-authored papers, joint projects, or formal affiliation."
      />

      {all.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No affiliated members published yet."
            description="Add people with type 'Affiliated' in Keystatic to surface them here."
          />
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container>
            <MeasuredPeopleSections>
              <PeopleGrid people={all} />
            </MeasuredPeopleSections>
          </Container>
        </Section>
      )}
    </div>
  )
}
