import Link from "next/link"
import Image from "next/image"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Reveal,
  Section,
} from "@/components"
import { getResearchAreas } from "@/lib/content"

export default function Home() {
  const researchAreas = getResearchAreas()
  return (
    <div className="bg-background">

      {/* Hero Section - Vision with background image */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background color matching image edge */}
        <div className="absolute inset-0 bg-[#02030C]" />
        {/* Background image - right aligned, full height, maintain ratio */}
        <div
          className="absolute inset-0"
        />
        <Image
          src="/images/hero-vision.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left"
        />

        {/* Content */}
        <Container className="relative z-10 py-12 md:py-16">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider uppercase bg-white/10 text-white border border-white/20 mb-6">
                ISE Research Group
              </div>
            </Reveal>
            <Reveal delayMs={60}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white">
                Novel machine learning and intelligent sensing for{" "}
                <span className="text-cyan-400">Environmental Observation</span>
              </h1>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="text-lg text-white/90 mt-6 leading-relaxed max-w-xl">
                We envision scientific investigations that advance real-world applications
                including natural disaster management, environment protection, and digital economy.
              </p>
            </Reveal>
            <Reveal delayMs={180}>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button asChild size="lg" className="rounded-full font-bold bg-cyan-500 hover:bg-cyan-400 text-white border-0">
                  <Link href="/contribute">Explore Research</Link>
                </Button>
                <Button asChild size="lg" className="rounded-full font-bold bg-sky-500 hover:bg-sky-300 border-white/30 text-white">
                  <Link href="/impact">View Impact</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision Pillars */}
      <Section className=""
        kicker="Vision" title="Our Research Focus" colorIndex={0}>
        <p className="text-base max-w-2xl">
          From sensing and observation to processing and analysis, we develop better performance,
          timelier processing, and higher resolution solutions.
        </p>
      </Section>

      <section className="pb-12 md:pb-16 section-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal>
              <Card className="ice-panel h-full text-center p-6">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <CardTitle>Sensing & Observation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Autonomous vehicles, IoT sensors, and advanced networking for real-time environmental data acquisition
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={60}>
              <Card className="ice-panel h-full text-center p-6">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <CardTitle>Processing & Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Machine learning models and benchmark datasets for accurate environmental data interpretation
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={120}>
              <Card className="ice-panel h-full text-center p-6">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <CardTitle>Decision Making</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Actionable insights for disaster response, environmental protection, and sustainable development
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* UN SDGs Section */}
      <Section kicker="Global Impact" title="Contributing to UN Sustainable Development Goals" colorIndex={1}>
        <p className="text-base max-w-2xl mb-8">
          Our research directly supports multiple United Nations Sustainable Development Goals
          through environmental monitoring, climate action, and technology innovation.
        </p>
        <div className="flex flex-wrap gap-3">
          <Reveal>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              Climate Action
            </Badge>
          </Reveal>
          <Reveal delayMs={40}>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              Life on Land
            </Badge>
          </Reveal>
          <Reveal delayMs={80}>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              Industry & Innovation
            </Badge>
          </Reveal>
          <Reveal delayMs={120}>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              Sustainable Cities
            </Badge>
          </Reveal>
        </div>
      </Section>

      {/* Research Areas Preview */}
      <Section className="py-12 md:py-16 section-gray">

          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-semibold">Research Areas</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/contribute">View all &rarr;</Link>
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {researchAreas.map((area, idx) => (
              <Reveal key={area.id} delayMs={idx * 60}>
                <Card className="ice-panel h-full">
                  <CardHeader>
                    <div className="pill w-fit mb-2">{idx + 1}</div>
                    <CardTitle>{area.title}</CardTitle>
                    <CardDescription>{area.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {area.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      {area.papers.length} publications
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
      </Section>

      {/* CTA Section */}
      <Section
        kicker="Join Us"
        title="Collaborate with ISE"
        colorIndex={0}
        className="text-center"
      >
        <p className="text-base max-w-xl mx-auto mb-8">
          We welcome collaborations with researchers, industry partners, and students
          interested in intelligent sensing and environmental applications.
        </p>
        <Reveal>
          <Button asChild size="lg" className="rounded-full font-bold">
            <Link href="/members">Meet the Team</Link>
          </Button>
        </Reveal>
      </Section>
    </div>
  )
}
