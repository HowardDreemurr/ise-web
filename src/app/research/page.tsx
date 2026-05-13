import Link from "next/link"
import { ArrowRight, BookOpen, FlaskConical, Sparkles } from "lucide-react"
import type { Metadata } from "next"

import {
  Container,
  ResearchScrollStory,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"
import { getProjects, getPublications } from "@/lib/content"

export const metadata: Metadata = {
  title: "Research",
  description:
    "ISE Lab's research vision — sensing & observation, processing & analysis, decision making — and the work that gets us there.",
}

const QUICK_LINKS = [
  {
    href: "/research/publications",
    label: "Publications",
    desc: "Journal, conference, and book-chapter outputs.",
    icon: BookOpen,
  },
  {
    href: "/research/projects",
    label: "Projects",
    desc: "Funded grants — active, completed, and under review.",
    icon: FlaskConical,
  },
  {
    href: "/research/impact",
    label: "Impact",
    desc: "Industry collaborations and group recognitions.",
    icon: Sparkles,
  },
]

export default function ResearchPage() {
  const pubCount = getPublications().length
  const projCount = getProjects().length

  return (
    <div className="bg-background">
      <SubPageHero
        title="Sensing, processing, and acting on environmental data."
        description={`From sensing and observation to processing and analysis, we develop better-performing, timelier, higher-resolution solutions for environmental intelligence. ${pubCount} publications and ${projCount} funded projects across three themes.`}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
            {QUICK_LINKS.map(({ href, label, desc, icon: Icon }, idx) => (
              <Reveal key={href} delayMs={idx * 60} className="h-full">
                <Link
                  href={href}
                  className="ise-panel group flex h-full flex-col p-5 transition-colors hover:border-primary/40"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="font-serif text-lg font-semibold">{label}</p>
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

      <ResearchScrollStory />
    </div>
  )
}
