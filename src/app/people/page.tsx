import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Users, GraduationCap, Globe } from "lucide-react"

import {
  Container,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"
import {
  getAffiliated,
  getAlumni,
  getCurrentPeople,
} from "@/lib/content"

export const metadata: Metadata = {
  title: "People",
  description:
    "PI, postdocs, PhD students, and affiliated collaborators of the ISE Group at the University of Exeter.",
}

export default function PeoplePage() {
  const current = getCurrentPeople()
  const alumni = getAlumni()
  const affiliated = getAffiliated()

  const sections = [
    {
      href: "/people/current",
      label: "Current",
      desc: "PI, postdocs, PhD candidates and MPhil students currently in the group.",
      icon: Users,
      count: current.length,
    },
    {
      href: "/people/alumni",
      label: "Alumni",
      desc: "Where past members are now — placement and current roles.",
      icon: GraduationCap,
      count: alumni.length,
    },
    {
      href: "/people/affiliated",
      label: "Affiliated",
      desc: "External faculty and collaborators we work with on a continuing basis.",
      icon: Globe,
      count: affiliated.length,
    },
  ]

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="People"
        title="The ISE team"
        description="PI, postdocs, PhD students, and affiliated collaborators working on intelligent sensing for environmental observation."
      />

      <Section className="py-10 md:py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {sections.map(({ href, label, desc, icon: Icon, count }, idx) => (
              <Reveal key={href} delayMs={idx * 60}>
                <Link
                  href={href}
                  className="ise-panel group block p-5 transition-colors hover:border-primary/40"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="font-serif text-lg font-semibold">
                    {label}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      ({count})
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    View
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
