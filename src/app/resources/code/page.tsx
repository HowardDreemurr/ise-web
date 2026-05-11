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
  title: "Code",
  description: "Open-source code repositories from the ISE Group.",
}

export default function CodeResourcesPage() {
  const items = getResources()
    .filter((r) => r.type === "code")
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="bg-background">
      <SubPageHero
        title="Code repositories"
        description="Reference implementations, training pipelines, and frameworks released by the group."
      />

      {items.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No code repositories published yet."
            description="Add type 'Code' resources via Keystatic to surface them here."
          />
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
