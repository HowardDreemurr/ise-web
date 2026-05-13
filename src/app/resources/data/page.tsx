import type { Metadata } from "next"

import {
  Container,
  EmptyState,
  ResourceList,
  Section,
  SubPageHero,
} from "@/components"
import { getResources } from "@/lib/content"

export const metadata: Metadata = {
  title: "Data",
  description: "Datasets and benchmarks released by the ISE Group.",
}

export default function DataResourcesPage() {
  const items = getResources()
    .filter((r) => r.type === "dataset")
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="bg-background">
      <SubPageHero
        title="Datasets & benchmarks"
        description="Reference datasets and benchmarks released or maintained by the group."
      />

      {items.length === 0 ? (
        <Section className="py-12">
          <Container>
            <EmptyState
              title="No datasets published yet."
              description="Add type 'Dataset' resources via Keystatic to surface them here."
            />
          </Container>
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container>
            <ResourceList resources={items} />
          </Container>
        </Section>
      )}
    </div>
  )
}
