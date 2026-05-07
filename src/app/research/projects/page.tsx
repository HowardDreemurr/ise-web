import type { Metadata } from "next"

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
import {
  getPeople,
  getProjects,
  type Project,
} from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects",
  description: "Funded research projects led by the ISE Group.",
}

const STATUS_LABEL: Record<Project["status"], string> = {
  active: "Active",
  completed: "Completed",
  "under-review": "Under Review",
  planned: "Planned",
  cancelled: "Cancelled",
}

function ProjectCard({
  project,
  peopleById,
}: {
  project: Project
  peopleById: Map<string, string>
}) {
  const piName = project.pi ? peopleById.get(project.pi) ?? project.pi : null
  const coiNames =
    project.coi?.map((id) => peopleById.get(id) ?? id).join(", ") ?? ""
  return (
    <Card className="ise-panel">
      <CardContent className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{STATUS_LABEL[project.status]}</Badge>
          {project.acronym && (
            <Badge variant="secondary" className="font-mono">
              {project.acronym}
            </Badge>
          )}
          {project.funder && (
            <Badge variant="secondary">{project.funder}</Badge>
          )}
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {project.period && <span>{project.period}</span>}
          {project.amount && <span className="font-semibold">{project.amount}</span>}
          {project.referenceNumber && <span>Ref. {project.referenceNumber}</span>}
        </div>
        {(piName || coiNames) && (
          <p className="text-sm text-muted-foreground">
            {piName && (
              <>
                <span className="font-semibold text-foreground">PI:</span> {piName}
                {coiNames && " · "}
              </>
            )}
            {coiNames && (
              <>
                <span className="font-semibold text-foreground">Co-Is:</span>{" "}
                {coiNames}
              </>
            )}
          </p>
        )}
        {project.partners && project.partners.length > 0 && (
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Partners:</span>{" "}
            {project.partners.map((p) => p.name).join(", ")}
          </p>
        )}
        {project.summary && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

const PERIOD_START = (p: Project) => p.period?.split(/[\s\-]+/)[0] ?? ""

export default function ProjectsPage() {
  const projects = getProjects()
  const peopleById = new Map(getPeople().map((p) => [p.id, p.name]))

  const grouped = (status: Project["status"]) =>
    projects
      .filter((p) => p.status === status)
      .sort((a, b) => (PERIOD_START(b) > PERIOD_START(a) ? 1 : -1))

  const groups = [
    { status: "active" as const, label: "Active" },
    { status: "completed" as const, label: "Completed" },
    { status: "under-review" as const, label: "Under review" },
    { status: "planned" as const, label: "Planned" },
  ]

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Research / Projects"
        title="Funded projects"
        description={`${projects.length} grants — actively running, completed, under review, or in preparation.`}
      />

      {projects.length === 0 ? (
        <Section className="py-12">
          <EmptyState
            title="No projects published yet."
            description="Add project records via Keystatic to surface them here."
          />
        </Section>
      ) : (
        <Section className="py-12 md:py-16">
          <Container className="space-y-12">
            {groups.map(({ status, label }) => {
              const items = grouped(status)
              if (items.length === 0) return null
              return (
                <div key={status} className="space-y-4">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">
                    {label}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      ({items.length})
                    </span>
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {items.map((p, idx) => (
                      <Reveal key={p.id} delayMs={Math.min(idx, 6) * 30}>
                        <ProjectCard project={p} peopleById={peopleById} />
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
