import type { Metadata } from "next"

import {
  Badge,
  Card,
  CardContent,
  Chronology,
  Container,
  EmptyState,
  Section,
  SubPageHero,
  type ChronologyEntry,
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

const startYear = (p: Project) => {
  const m = p.period?.match(/\d{4}/)
  return m ? parseInt(m[0], 10) : 0
}

// Reading order within a year: live work first, finished work last.
const STATUS_RANK: Record<Project["status"], number> = {
  active: 0,
  "under-review": 1,
  planned: 2,
  completed: 3,
  cancelled: 4,
}

export default function ProjectsPage() {
  const projects = getProjects()
  const peopleById = new Map(getPeople().map((p) => [p.id, p.name]))

  const sorted = [...projects].sort((a, b) => {
    const ya = startYear(a)
    const yb = startYear(b)
    if (ya !== yb) return yb - ya
    if (STATUS_RANK[a.status] !== STATUS_RANK[b.status])
      return STATUS_RANK[a.status] - STATUS_RANK[b.status]
    return a.title.localeCompare(b.title)
  })

  const entries: ChronologyEntry[] = sorted.map((p) => ({
    id: p.id,
    year: startYear(p),
    label: p.acronym ? `${p.acronym} — ${p.title}` : p.title,
    node: <ProjectCard project={p} peopleById={peopleById} />,
  }))

  return (
    <div className="bg-background">
      <SubPageHero
        eyebrow="Research / Projects"
        title="Funded projects"
        description={`${projects.length} grants — a year-by-year archive of active, completed, and in-preparation work.`}
      />

      <Section className="py-12 md:py-16">
        <Container>
          <Chronology
            entries={entries}
            emptyState={
              <EmptyState
                title="No projects published yet."
                description="Add project records via Keystatic to surface them here."
              />
            }
          />
        </Container>
      </Section>
    </div>
  )
}
