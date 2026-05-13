import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  MeasuredPeopleSections,
  PeopleGrid,
  Section,
  SubPageHero,
} from "@/components"
import { getAlumni } from "@/lib/content"

export const metadata: Metadata = {
  title: "Alumni",
  description: "Former members of the ISE Group and where they are now.",
}

function endYear(period?: string) {
  if (!period) return 0
  const matches = [...period.matchAll(/(\d{4})/g)]
  if (matches.length === 0) return 0
  return parseInt(matches[matches.length - 1][1], 10)
}

export default function AlumniPage() {
  const all = [...getAlumni()].sort((a, b) => {
    const ya = endYear(a.period)
    const yb = endYear(b.period)
    if (ya !== yb) return yb - ya
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="bg-background">
      <SubPageHero
        title="Alumni"
        description="Former PhD candidates, MPhil students, and postdocs of the group, with their current positions."
      />

      {all.length === 0 ? (
        <Section className="py-12">
          <Container>
            <EmptyState
              title="No alumni published yet."
              description="Move members to type 'Alumni' in Keystatic when they leave."
            />
          </Container>
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container>
            <MeasuredPeopleSections>
              <PeopleGrid people={all} showCurrentPosition />
            </MeasuredPeopleSections>
          </Container>
        </Section>
      )}
    </div>
  )
}
