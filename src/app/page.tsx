import Link from "next/link"
import { Activity, Compass, Cpu, Radar } from "lucide-react"

import {
  Badge,
  Button,
  Container,
  PageHero,
  PillarTrio,
  Reveal,
  ResearchAreaGrid,
  Section,
} from "@/components"
import type { Pillar } from "@/components"
import { getResearchAreas } from "@/lib/content"

const pillars: Pillar[] = [
  {
    id: "sensing",
    title: "Sensing & Observation",
    description:
      "Autonomous vehicles, IoT sensors and resilient networking for real-time environmental data acquisition.",
    icon: Radar,
  },
  {
    id: "processing",
    title: "Processing & Analysis",
    description:
      "Machine-learning models and benchmark datasets for accurate interpretation of remote-sensing observations.",
    icon: Cpu,
  },
  {
    id: "decisions",
    title: "Decision Making",
    description:
      "Actionable insights for disaster response, environmental protection, and sustainable development.",
    icon: Compass,
  },
]

const sdgs = [
  "Climate Action",
  "Life on Land",
  "Industry & Innovation",
  "Sustainable Cities",
] as const

export default function Home() {
  const researchAreas = getResearchAreas()

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="ISE Research Group"
        title="Novel machine learning and intelligent sensing for"
        highlight="Environmental Observation"
        description="We envision scientific investigations that advance real-world applications including natural disaster management, environment protection, and digital economy."
        ctas={[
          { label: "Explore Research", href: "/research" },
          { label: "View Impact", href: "/research/impact", variant: "secondary" },
        ]}
        imageSrc="/images/hero-vision.png"
      />

      <Section kicker="Vision" title="Our Research Focus" colorIndex={0}>
        <p className="max-w-2xl text-base">
          From sensing and observation to processing and analysis, we develop better
          performance, timelier processing, and higher-resolution solutions.
        </p>
      </Section>

      <section className="section-surface pb-12 md:pb-16">
        <PillarTrio pillars={pillars} />
      </section>

      <Section
        kicker="Global Impact"
        title="Contributing to UN Sustainable Development Goals"
        colorIndex={1}
      >
        <p className="mb-6 max-w-2xl text-base">
          Our research directly supports multiple United Nations Sustainable Development
          Goals through environmental monitoring, climate action, and technology innovation.
        </p>
        <div className="flex flex-wrap gap-3">
          {sdgs.map((sdg, idx) => (
            <Reveal key={sdg} delayMs={idx * 40}>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Activity className="mr-1 h-3.5 w-3.5" />
                {sdg}
              </Badge>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="section-muted py-12 md:py-16">
        <Reveal>
          <Container className="mb-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-semibold">Research Areas</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/research">View all &rarr;</Link>
              </Button>
            </div>
          </Container>
        </Reveal>
        <ResearchAreaGrid areas={researchAreas} />
      </Section>

      <Section
        kicker="Join Us"
        title="Collaborate with ISE"
        colorIndex={0}
        className="text-center"
      >
        <p className="mx-auto mb-8 max-w-xl text-base">
          We welcome collaborations with researchers, industry partners, and students
          interested in intelligent sensing and environmental applications.
        </p>
        <Reveal>
          <Button asChild size="lg" className="rounded-full font-semibold">
            <Link href="/people">Meet the Team</Link>
          </Button>
        </Reveal>
      </Section>
    </div>
  )
}
