import Link from "next/link"
import { Radar, Cpu, Compass } from "lucide-react"
import { notFound } from "next/navigation"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  FeatureCard,
  PillarTrio,
  Reveal,
  Section,
  Separator,
  StatCard,
} from "@/components"
import type { Pillar } from "@/components"

const demoPillars: Pillar[] = [
  { id: "p1", title: "Sensing", description: "Demo card.", icon: Radar },
  { id: "p2", title: "Processing", description: "Demo card.", icon: Cpu },
  { id: "p3", title: "Decisions", description: "Demo card.", icon: Compass },
]

export default function DebugPage() {
  if (process.env.NODE_ENV === "production") {
    notFound()
  }
  return (
    <div className="bg-background">
      <Section kicker="Debug" title="Component Playground" colorIndex={0}>
        <p className="text-base">
          Visual testing of all UI components and design tokens.
        </p>
      </Section>

      <section className="py-12 section-surface">
        <Container>
          <div className="space-y-12">
            <Reveal>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Pill Badges</h2>
                <div className="flex flex-wrap gap-3">
                  <div className="pill">Default</div>
                  <div className="pill pill-primary">Primary</div>
                  <div className="pill pill-on-dark bg-foreground/80">On dark</div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={60}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Badge + Button</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button size="sm" asChild>
                    <Link href="/">Link button</Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Card</h2>
                <Card className="ise-panel">
                  <CardHeader>
                    <CardTitle>Card title</CardTitle>
                    <CardDescription>
                      Card description for visual hierarchy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Card content with a few lines of text to validate spacing
                      and typography across blocks.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Button size="sm">Primary action</Button>
                    <Button size="sm" variant="ghost">
                      Secondary
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </Reveal>

            <Reveal delayMs={180}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">FeatureCard</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FeatureCard
                    eyebrow="Feature"
                    title="Rapid sensing pipelines"
                    description="Highlights how a feature card behaves with intent content."
                  />
                  <FeatureCard
                    eyebrow="Feature"
                    title="Terrain-aware intelligence"
                    description="Use this to check layout with slightly longer copy."
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">StatCard</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  <StatCard value="128" label="Deployments" note="Field and lab" />
                  <StatCard value="24" label="Datasets" note="Public releases" />
                  <StatCard value="9" label="Partners" note="Research + industry" />
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">PillarTrio</h2>
                <PillarTrio pillars={demoPillars} />
              </div>
            </Reveal>

            <Reveal delayMs={360}>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Separator</h2>
                <p className="text-sm text-muted-foreground">
                  Use separators to break up dense layouts.
                </p>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  Follow-up content below the separator.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  )
}
