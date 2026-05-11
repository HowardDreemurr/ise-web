import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  MeasuredPeopleSections,
  PeopleGrid,
  Section,
  SectionNav,
  SubPageHero,
} from "@/components"
import { getCurrentPeople, type PersonType } from "@/lib/content"
import { slugify } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Current",
  description: "Lead, postdocs, PhD candidates, and MPhil students currently in the ISE Group.",
}

/**
 * Edit this list to control how members are grouped on /people/current.
 * Each entry is a section: `label` becomes the section heading; `types` is
 * the list of PersonType values aggregated into that section.
 *
 * Examples — change the groupings here without touching component code:
 *   • Merge Staff + PostDoc into one section:
 *       { label: "Researchers", types: ["Staff", "PostDoc"] }
 *   • Split out a "Faculty" section that's just type Staff:
 *       { label: "Faculty", types: ["Staff"] }
 *
 * Sections are rendered in array order; types within a section are sorted
 * by start year desc.
 */
const GROUPS: Array<{ label: string; types: PersonType[] }> = [
  { label: "Staff", types: ["Staff"] },
  { label: "Post-Doctoral Researchers", types: ["PostDoc"] },
  { label: "PhD Candidates", types: ["PhD"] },
  { label: "MPhil Students", types: ["MPhil"] },
]

function startYear(period?: string) {
  if (!period) return 0
  const m = period.match(/(\d{4})/)
  return m ? parseInt(m[1], 10) : 0
}

export default function CurrentMembersPage() {
  const all = getCurrentPeople()

  // Build sections per GROUPS config; people are aggregated by their type
  // matching any of the group's `types`. Within each section, sort by start
  // year desc then name.
  const sections = GROUPS.map(({ label, types }) => {
    const items = all
      .filter((p) => types.includes(p.type))
      .sort((a, b) => {
        const ya = startYear(a.period)
        const yb = startYear(b.period)
        if (ya !== yb) return yb - ya
        return a.name.localeCompare(b.name)
      })
    return { id: slugify(label), label, items }
  }).filter((s) => s.items.length > 0)

  return (
    <div className="bg-background">
      <SubPageHero
        title="Current members"
        description="The PI and the in-residence researchers driving the group's work."
      />

      <SectionNav items={sections.map((s) => ({ id: s.id, label: s.label }))} />

      {all.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No current members published yet."
            description="Add people via Keystatic to surface them here."
          />
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container>
            <MeasuredPeopleSections className="space-y-12">
              {sections.map(({ id, label, items }) => (
                <div key={id} id={id} className="scroll-mt-[132px] space-y-5">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">
                    {label}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      ({items.length})
                    </span>
                  </h2>
                  <PeopleGrid people={items} />
                </div>
              ))}
            </MeasuredPeopleSections>
          </Container>
        </Section>
      )}
    </div>
  )
}
