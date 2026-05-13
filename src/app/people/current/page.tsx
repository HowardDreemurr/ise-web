import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  MeasuredPeopleSections,
  PeopleGrid,
  Section,
  SubPageHero,
} from "@/components"
import { getCurrentPeople, type PersonType } from "@/lib/content"

export const metadata: Metadata = {
  title: "Current",
  description: "Lead, postdocs, PhD candidates, and MPhil students currently in the ISE Group.",
}

/**
 * Ordering priority for the (un-grouped) members list. The page renders a
 * single flat grid — the type badge on each card carries the role, so no
 * section headings are needed. Members sort by:
 *   1. type, in the order below (Staff first, MPhil last)
 *   2. start year of `period`, descending
 *   3. name, alphabetical
 */
const TYPE_ORDER: PersonType[] = ["Staff", "PostDoc", "PhD", "MPhil"]

function startYear(period?: string) {
  if (!period) return 0
  const m = period.match(/(\d{4})/)
  return m ? parseInt(m[1], 10) : 0
}

export default function CurrentMembersPage() {
  const all = [...getCurrentPeople()].sort((a, b) => {
    const ta = TYPE_ORDER.indexOf(a.type)
    const tb = TYPE_ORDER.indexOf(b.type)
    if (ta !== tb) return ta - tb
    const ya = startYear(a.period)
    const yb = startYear(b.period)
    if (ya !== yb) return yb - ya
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="bg-background">
      <SubPageHero
        title="Current members"
        description="The PI and the in-residence researchers driving the group's work."
      />

      {all.length === 0 ? (
        <Section className="py-12">
          <Container>
            <EmptyState
              title="No current members published yet."
              description="Add people via Keystatic to surface them here."
            />
          </Container>
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
