import type { Metadata } from "next"
import { Code2, Database, Wrench, ExternalLink } from "lucide-react"

import {
  Badge,
  Card,
  CardContent,
  Container,
  EmptyState,
  Reveal,
  Section,
  SubPageHero,
} from "@/components"
import { getResources, type Resource, type ResourceType } from "@/lib/content"

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Code repositories, datasets, tools and demos released by the ISE Group.",
}

const TYPE_META: Record<ResourceType, { label: string; icon: typeof Code2 }> = {
  code: { label: "Code", icon: Code2 },
  dataset: { label: "Datasets", icon: Database },
  tools: { label: "Tools", icon: Wrench },
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="ise-panel h-full">
      <CardContent className="flex h-full flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-snug">
            {resource.title}
          </h3>
          <Badge variant="outline" className="shrink-0 capitalize">
            {resource.type}
          </Badge>
        </div>
        {resource.description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {resource.license && <span>License: {resource.license}</span>}
          {resource.version && <span>Version: {resource.version}</span>}
          {resource.size && <span>Size: {resource.size}</span>}
        </div>
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-auto pt-2">
          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ResourcesPage() {
  const all = getResources()
  const byType = (type: ResourceType) => all.filter((r) => r.type === type)

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Resources"
        title="Code, datasets, tools"
        description={`${all.length} open resources released by the group — repositories, benchmark datasets, and demos.`}
      />

      {all.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No resources published yet."
            description="Add code, datasets or tools entries via Keystatic."
          />
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container className="space-y-12">
            {(Object.keys(TYPE_META) as ResourceType[]).map((type) => {
              const items = byType(type)
              if (items.length === 0) return null
              const { label, icon: Icon } = TYPE_META[type]
              return (
                <div key={type} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <h2 className="font-serif text-2xl font-semibold tracking-tight">
                      {label}{" "}
                      <span className="text-base font-normal text-muted-foreground">
                        ({items.length})
                      </span>
                    </h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((r, idx) => (
                      <Reveal key={r.id} delayMs={Math.min(idx, 6) * 30}>
                        <ResourceCard resource={r} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </Container>
        </Section>
      )}
    </div>
  )
}
