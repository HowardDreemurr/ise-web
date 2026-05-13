import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Mail,
  Users,
} from "lucide-react"

import { Container, Reveal, Section, SubPageHero } from "@/components"

export const metadata: Metadata = {
  title: "Collaborate",
  description:
    "PhD opportunities, postdoc positions, industry collaboration, and direct contact for the ISE Group at the University of Exeter.",
}

const PATHWAYS = [
  {
    href: "/join/phd",
    icon: GraduationCap,
    title: "PhD Opportunities",
    desc: "Scholarships and supervision routes — CSC, EPSRC IAA, EI CDT, self-funded — across sensing, processing, and decision making.",
  },
  {
    href: "/join/postdoc",
    icon: Users,
    title: "Postdoc & Research Staff",
    desc: "Open postdoc and RA positions, advertised via the University of Exeter careers portal.",
  },
  {
    href: "/join/industry",
    icon: Handshake,
    title: "Industry Collaboration",
    desc: "Innovate UK / KTP / EPSRC IAA partnerships and direct industry contracts.",
  },
  {
    href: "/join/contact",
    icon: Mail,
    title: "Get in Touch",
    desc: "Direct PI contact for everything else — talks, visits, press, and general enquiries.",
  },
]

export default function JoinPage() {
  return (
    <div className="bg-background">
      <SubPageHero
        title="Collaborate"
        description="We welcome PhD candidates, postdocs, industry partners, and visitors interested in intelligent sensing for environmental observation."
      />

      <Section className="py-10 md:py-14">
        <Container>
          <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
            {PATHWAYS.map(({ href, icon: Icon, title, desc }, idx) => (
              <Reveal key={href} delayMs={idx * 60} className="h-full">
                <Link
                  href={href}
                  className="ise-panel group flex h-full flex-col p-5 transition-colors hover:border-primary/40"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="font-serif text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  <p className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary">
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
