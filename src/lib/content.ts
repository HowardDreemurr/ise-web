import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const CONTENT_ROOT = path.join(process.cwd(), "content")

export type MemberType = "PhD" | "PostDoc" | "MPhil"

export type Member = {
  id: string
  name: string
  type: MemberType
  research: string
  period: string
  funding?: string
  currentPosition?: string
  body?: string
}

export type NewsLink = { label: string; href: string }

export type NewsItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  tag?: string
  content?: string
  imageUrl?: string
  links?: NewsLink[]
}

export type Project = {
  id: string
  title: string
  summary: string
  status: string
  tags: string[]
}

export type Publication = {
  id: string
  title: string
  venue: string
  year: string
  authors: string
}

export type Paper = {
  id: string
  title: string
  authors: string
  venue: string
  year: number
  doi?: string
  link?: string
  images?: string[]
  description?: string
}

export type ResearchArea = {
  id: string
  title: string
  subtitle: string
  description: string
  papers: Paper[]
}

export type CodeDataItem = {
  id: string
  title: string
  description: string
  type: "code" | "dataset"
  link: string
}

export type IndustryImpact = {
  id: string
  title: string
  description: string
  partner?: string
  tags: string[]
}

export type Award = {
  id: string
  title: string
  organization: string
  year?: string
  description?: string
}

export type LeadMetric = {
  label: string
  value: string
  note?: string
}

export type LeadSection = {
  title: string
  items: string[]
  open?: boolean
}

export type LeadProfessor = {
  id: string
  name: string
  role: string
  affiliation: string
  image?: string
  focus: string
  metrics: LeadMetric[]
  roleHighlights: string[]
  sections: LeadSection[]
}

function readDir(rel: string): string[] {
  const dir = path.join(CONTENT_ROOT, rel)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(dir, entry.name))
}

function readMatter<T>(filePath: string): { data: T; content: string; slug: string } {
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const slug = path.basename(filePath, ".md")
  return { data: data as T, content: content.trim(), slug }
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
        links: data.links,
        content: content || undefined,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

function loadMembers(folder: "current" | "alumni"): Member[] {
  return readDir(`members/${folder}`).map((file) => {
    const { data, content, slug } = readMatter<Omit<Member, "id" | "body"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      name: data.name,
      type: data.type,
      research: data.research,
      period: data.period,
      funding: data.funding,
      currentPosition: data.currentPosition,
      body: content || undefined,
    }
  })
}

export function getCurrentMembers(): Member[] {
  return loadMembers("current")
}

export function getGraduatedMembers(): Member[] {
  return loadMembers("alumni")
}

export function getAllMembers(): Member[] {
  return [...getCurrentMembers(), ...getGraduatedMembers()]
}

export function getProjects(): Project[] {
  return readDir("projects").map((file) => {
    const { data, slug } = readMatter<Omit<Project, "id"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      summary: data.summary,
      status: data.status,
      tags: data.tags ?? [],
    }
  })
}

export function getPublications(): Publication[] {
  return readDir("publications")
    .map((file) => {
      const { data, slug } = readMatter<Omit<Publication, "id"> & { id?: string }>(file)
      return {
        id: data.id ?? slug,
        title: data.title,
        venue: data.venue,
        year: data.year,
        authors: data.authors,
      }
    })
    .sort((a, b) => (a.year < b.year ? 1 : -1))
}

export function getResearchAreas(): ResearchArea[] {
  return readDir("research-areas").map((file) => {
    const { data, slug } = readMatter<Omit<ResearchArea, "id"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      papers: data.papers ?? [],
    }
  })
}

export function getCodeAndData(): CodeDataItem[] {
  return readDir("code-and-data").map((file) => {
    const { data, slug } = readMatter<Omit<CodeDataItem, "id"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      description: data.description,
      type: data.type,
      link: data.link,
    }
  })
}

export function getIndustryImpacts(): IndustryImpact[] {
  return readDir("impact").map((file) => {
    const { data, slug } = readMatter<Omit<IndustryImpact, "id"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      description: data.description,
      partner: data.partner,
      tags: data.tags ?? [],
    }
  })
}

export function getAwards(): Award[] {
  return readDir("awards").map((file) => {
    const { data, slug } = readMatter<Omit<Award, "id"> & { id?: string }>(file)
    return {
      id: data.id ?? slug,
      title: data.title,
      organization: data.organization,
      year: data.year,
      description: data.description,
    }
  })
}

export function getLeadProfessor(): LeadProfessor {
  const file = path.join(CONTENT_ROOT, "lead", "index.md")
  const { data, content } = readMatter<Omit<LeadProfessor, "focus"> & { focus?: string }>(file)
  return {
    id: data.id,
    name: data.name,
    role: data.role,
    affiliation: data.affiliation,
    image: data.image,
    focus: data.focus ?? content,
    metrics: data.metrics ?? [],
    roleHighlights: data.roleHighlights ?? [],
    sections: data.sections ?? [],
  }
}
