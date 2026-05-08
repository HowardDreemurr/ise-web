import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const CONTENT_ROOT = path.join(process.cwd(), "content")

/* -------- People ---------------------------------------------------------- */

export type PersonType =
  | "Staff"
  | "PostDoc"
  | "PhD"
  | "MPhil"
  | "Affiliated"
  | "Alumni"

export type PersonLinks = {
  website?: string
  scholar?: string
  orcid?: string
  github?: string
  linkedin?: string
}

export type Person = {
  id: string
  name: string
  type: PersonType
  role?: string
  affiliation?: string
  email?: string
  photo?: string
  period?: string
  funding?: string
  currentPosition?: string
  interests?: string[]
  roleHighlights?: string[]
  links?: PersonLinks
  bio?: string
}

/* -------- Publications ---------------------------------------------------- */

export type AuthorRef =
  | { type: "member"; id: string }
  | { type: "external"; name: string }

export type PublicationType =
  | "journal"
  | "conference"
  | "workshop"
  | "preprint"
  | "book-chapter"
  | "report"

export type Publication = {
  id: string
  title: string
  year: number
  venue: string
  type: PublicationType
  authors: AuthorRef[]
  researchAreas?: string[]
  featured?: boolean
  doi?: string
  link?: string
  pdf?: string
  code?: string
  abstract?: string
}

/* -------- Projects -------------------------------------------------------- */

export type ProjectStatus =
  | "planned"
  | "under-review"
  | "active"
  | "completed"
  | "cancelled"

export type ExternalPerson = { name: string; affiliation?: string }
export type Partner = { name: string; role?: string }

export type Project = {
  id: string
  title: string
  acronym?: string
  status: ProjectStatus
  period?: string
  funder?: string
  amount?: string
  referenceNumber?: string
  pi?: string
  coi?: string[]
  externalCoIs?: ExternalPerson[]
  partners?: Partner[]
  researchAreas?: string[]
  relatedPubs?: string[]
  tags?: string[]
  summary?: string
}

/* -------- Research Areas -------------------------------------------------- */

export type ResearchArea = {
  id: string
  title: string
  subtitle?: string
  description?: string
  order?: number
  icon?: string
  image?: string
  /** Convenience — papers in this area, computed at load time. */
  papers?: Publication[]
}

/* -------- Resources ------------------------------------------------------- */

export type ResourceType = "code" | "dataset" | "tools"

export type Resource = {
  id: string
  title: string
  type: ResourceType
  link?: string
  license?: string
  version?: string
  size?: string
  relatedPubs?: string[]
  relatedProjs?: string[]
  researchAreas?: string[]
  tags?: string[]
  thumbnail?: string
  description?: string
}

/* -------- Impact ---------------------------------------------------------- */

export type IndustryImpact = {
  id: string
  title: string
  partner?: string
  period?: string
  amount?: string
  people?: string[]
  relatedProjs?: string[]
  relatedPubs?: string[]
  tags?: string[]
  description?: string
}

/* -------- Awards ---------------------------------------------------------- */

export type Award = {
  id: string
  title: string
  organization?: string
  year?: number
  holders?: string[]
  relatedProjs?: string[]
  relatedPubs?: string[]
  description?: string
}

/* -------- Events ---------------------------------------------------------- */

export type EventType =
  | "keynote"
  | "workshop"
  | "symposium"
  | "speaker-series"
  | "editorial"
  | "chair"

export type GroupEvent = {
  id: string
  title: string
  type: EventType
  date?: string
  endDate?: string
  venue?: string
  role?: string
  organizers?: string[]
  url?: string
  slides?: string
  recurring?: boolean
  relatedPubs?: string[]
  tags?: string[]
  description?: string
}

/* -------- News ------------------------------------------------------------ */

export type NewsLink = { label: string; href: string }

export type NewsTag = "Award" | "Paper" | "Project" | "Talk" | "Media" | "Milestone"

export type NewsItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  tag?: NewsTag
  imageUrl?: string
  relatedPeople?: string[]
  relatedProjs?: string[]
  relatedPubs?: string[]
  relatedAwards?: string[]
  relatedEvents?: string[]
  links?: NewsLink[]
  content?: string
}

/* -------- IO helpers ------------------------------------------------------ */

function readDir(rel: string): string[] {
  const dir = path.join(CONTENT_ROOT, rel)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(dir, entry.name))
}

function toIsoIfDate(v: unknown): unknown {
  return v instanceof Date ? v.toISOString().slice(0, 10) : v
}

function readMatter<T>(filePath: string): { data: T; content: string; slug: string } {
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  // YAML auto-parses ISO dates to Date — coerce known date fields back to "YYYY-MM-DD".
  const obj = data as Record<string, unknown>
  for (const key of ["date", "endDate"]) {
    if (key in obj) obj[key] = toIsoIfDate(obj[key])
  }
  const slug = path.basename(filePath, ".md")
  return { data: data as T, content: content.trim(), slug }
}

/* -------- Loaders --------------------------------------------------------- */

export function getPeople(): Person[] {
  return readDir("people").map((file) => {
    const { data, content, slug } = readMatter<Omit<Person, "id" | "bio"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      name: data.name,
      type: data.type,
      role: data.role,
      affiliation: data.affiliation,
      email: data.email,
      photo: data.photo,
      period: data.period,
      funding: data.funding,
      currentPosition: data.currentPosition,
      interests: data.interests,
      roleHighlights: data.roleHighlights,
      links: data.links,
      bio: content || undefined,
    }
  })
}

/** Convenience — first Staff member with a Lead-Professor-shaped role.
 *  Kept for legacy callers; new code should treat Staff as a normal group. */
export function getLead(): Person | undefined {
  return getPeople().find((p) => p.type === "Staff")
}

export function getCurrentPeople(): Person[] {
  const currentTypes: PersonType[] = ["Staff", "PostDoc", "PhD", "MPhil"]
  return getPeople().filter((p) => currentTypes.includes(p.type))
}

export function getAlumni(): Person[] {
  return getPeople().filter((p) => p.type === "Alumni")
}

export function getAffiliated(): Person[] {
  return getPeople().filter((p) => p.type === "Affiliated")
}

export function getPublications(): Publication[] {
  return readDir("publications")
    .map((file) => {
      const { data, content, slug } = readMatter<Omit<Publication, "id" | "abstract"> & { id?: string }>(file)
      return {
        id: data.id ?? slug,
        title: data.title,
        year: data.year,
        venue: data.venue,
        type: data.type,
        authors: data.authors ?? [],
        researchAreas: data.researchAreas,
        featured: data.featured,
        doi: data.doi,
        link: data.link,
        pdf: data.pdf,
        code: data.code,
        abstract: content || undefined,
      }
    })
    .sort((a, b) => b.year - a.year)
}

export function getProjects(): Project[] {
  return readDir("projects").map((file) => {
    const { data, content, slug } = readMatter<Omit<Project, "id" | "summary"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      acronym: data.acronym,
      status: data.status,
      period: data.period,
      funder: data.funder,
      amount: data.amount,
      referenceNumber: data.referenceNumber,
      pi: data.pi,
      coi: data.coi,
      externalCoIs: data.externalCoIs,
      partners: data.partners,
      researchAreas: data.researchAreas,
      relatedPubs: data.relatedPubs,
      tags: data.tags,
      summary: content || undefined,
    }
  })
}

export function getResearchAreas(): ResearchArea[] {
  const areas = readDir("research-areas").map((file) => {
    const { data, slug } = readMatter<Omit<ResearchArea, "id" | "papers"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      order: data.order,
      icon: data.icon,
      image: data.image,
      papers: undefined as Publication[] | undefined,
    }
  })

  // Compute reverse refs once
  const pubs = getPublications()
  for (const a of areas) {
    a.papers = pubs.filter((p) => p.researchAreas?.includes(a.id))
  }

  return areas.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getResources(): Resource[] {
  return readDir("resources").map((file) => {
    const { data, content, slug } = readMatter<Omit<Resource, "id" | "description"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      type: data.type,
      link: data.link,
      license: data.license,
      version: data.version,
      size: data.size,
      relatedPubs: data.relatedPubs,
      relatedProjs: data.relatedProjs,
      researchAreas: data.researchAreas,
      tags: data.tags,
      thumbnail: data.thumbnail,
      description: content || undefined,
    }
  })
}

export function getIndustryImpacts(): IndustryImpact[] {
  return readDir("impact").map((file) => {
    const { data, content, slug } = readMatter<Omit<IndustryImpact, "id" | "description"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      partner: data.partner,
      period: data.period,
      amount: data.amount,
      people: data.people,
      relatedProjs: data.relatedProjs,
      relatedPubs: data.relatedPubs,
      tags: data.tags,
      description: content || undefined,
    }
  })
}

export function getAwards(): Award[] {
  return readDir("awards")
    .map((file) => {
      const { data, content, slug } = readMatter<Omit<Award, "id" | "description"> & { id?: string }>(file)
      return {
        id: data.id ?? slug,
        title: data.title,
        organization: data.organization,
        year: data.year,
        holders: data.holders,
        relatedProjs: data.relatedProjs,
        relatedPubs: data.relatedPubs,
        description: content || undefined,
      }
    })
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
}

export function getEvents(): GroupEvent[] {
  return readDir("events")
    .map((file) => {
      const { data, content, slug } = readMatter<Omit<GroupEvent, "id" | "description"> & { id?: string }>(file)
      return {
        id: data.id ?? slug,
        title: data.title,
        type: data.type,
        date: data.date,
        endDate: data.endDate,
        venue: data.venue,
        role: data.role,
        organizers: data.organizers,
        url: data.url,
        slides: data.slides,
        recurring: data.recurring,
        relatedPubs: data.relatedPubs,
        tags: data.tags,
        description: content || undefined,
      }
    })
    .sort((a, b) => ((b.date ?? "") < (a.date ?? "") ? -1 : 1))
}

export function getNews(): NewsItem[] {
  return readDir("news")
    .map((file) => {
      const { data, content, slug } = readMatter<Omit<NewsItem, "id" | "content"> & { id?: string }>(file)
      return {
        id: data.id ?? slug,
        date: data.date,
        title: data.title,
        subtitle: data.subtitle,
        tag: data.tag,
        imageUrl: data.imageUrl,
        relatedPeople: data.relatedPeople,
        relatedProjs: data.relatedProjs,
        relatedPubs: data.relatedPubs,
        relatedAwards: data.relatedAwards,
        relatedEvents: data.relatedEvents,
        links: data.links,
        content: content || undefined,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
