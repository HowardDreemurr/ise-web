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
  title: "Tools",
  description: "Demos, plugins, and pre-trained models from the ISE Group.",
}

export default function ToolsResourcesPage() {
  const items = getResources()
    .filter((r) => r.type === "tools")
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="bg-background">
      <SubPageHero
        title="Tools, demos, models"
        description="Online demos, plugins, and pre-trained models — meant to be used, not just read."
      />

      {items.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No tools published yet."
            description="Add type 'Tools' resources via Keystatic to surface them here."
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
