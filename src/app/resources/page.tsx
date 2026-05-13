import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Code2, Database, Wrench } from "lucide-react"

import {
  Container,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"
import { getResources, type ResourceType } from "@/lib/content"

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Code repositories, datasets, tools and demos released by the ISE Group.",
}

export default function ResourcesPage() {
  const all = getResources()
  const count = (type: ResourceType) => all.filter((r) => r.type === type).length

  const sections = [
    {
      href: "/resources/code",
      label: "Code",
      desc: "Open-source repositories — reference implementations, training pipelines, frameworks.",
      icon: Code2,
      count: count("code"),
    },
    {
      href: "/resources/data",
      label: "Data",
      desc: "Datasets and benchmarks released or maintained by the group.",
      icon: Database,
      count: count("dataset"),
    },
    {
      href: "/resources/tools",
      label: "Tools",
      desc: "Demos, plugins, and pre-trained models meant to be used, not just read.",
      icon: Wrench,
      count: count("tools"),
    },
  ]

  return (
    <div className="bg-background">
      <SubPageHero
        title="Code, data, tools"
        description={`${all.length} open resources released by the group — repositories, benchmark datasets, and demos.`}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
            {sections.map(({ href, label, desc, icon: Icon, count }, idx) => (
              <Reveal key={href} delayMs={idx * 60} className="h-full">
                <Link
                  href={href}
                  className="ise-panel group flex h-full flex-col p-5 transition-colors hover:border-primary/40"
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
