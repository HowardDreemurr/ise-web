import {
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { Person } from "@/lib/content"

type LinkSpec = { href: string; icon: LucideIcon; label: string }

function personLinks(person: Person): LinkSpec[] {
  const out: LinkSpec[] = []
  if (person.email) out.push({ href: `mailto:${person.email}`, icon: Mail, label: "Email" })
  const links = person.links ?? {}
  if (links.website) out.push({ href: links.website, icon: Globe, label: "Website" })
  if (links.scholar) out.push({ href: links.scholar, icon: GraduationCap, label: "Scholar" })
  if (links.github) out.push({ href: links.github, icon: Github, label: "GitHub" })
  if (links.linkedin) out.push({ href: links.linkedin, icon: Linkedin, label: "LinkedIn" })
  return out
}

const TYPE_LABEL: Record<Person["type"], string> = {
  Staff: "Staff",
  PostDoc: "PostDoc",
  PhD: "PhD Candidate",
  MPhil: "MPhil Student",
  Affiliated: "Affiliated",
  Alumni: "Alumni",
}

// Maps free-text role strings (e.g. "Postdoctoral Research Fellow",
// "MPhil (Lead supervision)", "Lead Professor, ISE Group") to short canonical
// badge labels. First match wins; order matters — put MORE SPECIFIC patterns
// before generic ones (e.g. "Lead Professor" before plain "Professor").
const ROLE_SHORT_FORMS: Array<[RegExp, string]> = [
  // — Specific senior / decorated titles —
  [/lead\s+prof|principal\s+investigator|\bpi\b/i, "Lead Professor"],
  [/chair\s+(in|of)\s+|chair\s+prof/i, "Chair"],
  [/honorary\s+prof/i, "Honorary Prof"],
  [/associate\s+prof|assoc\.?\s+prof/i, "Assoc. Prof"],
  [/assistant\s+prof|asst\.?\s+prof/i, "Asst. Prof"],
  [/adjunct\s+prof/i, "Adjunct Prof"],
  [/emeritus\s+prof/i, "Emeritus Prof"],
  [/visiting\s+(prof|scholar|researcher|fellow|student)/i, "Visiting"],

  // — UK academic ladder —
  [/senior\s+lecturer/i, "Senior Lecturer"],
  [/\blecturer\b/i, "Lecturer"],
  [/\breader\b/i, "Reader"],
  [/professor|\bprof\b/i, "Professor"],

  // — Postdoctoral —
  [/senior\s+research\s+fellow/i, "Senior PostDoc"],
  [/post[- ]?doctoral|post[- ]?doc|research\s+fellow|research\s+associate/i, "PostDoc"],

  // — Doctoral —
  [/d[\.\s]?phil|doctoral\s+(candidate|researcher|student|fellow)|\bphd\b/i, "PhD"],

  // — Masters / MPhil —
  [/\bmphil\b/i, "MPhil"],
  [/master(?:'s)?\s+(student|candidate)?|\bmsc\b|m\.sc|\bma\s+student/i, "Masters"],

  // — Undergraduate —
  [/under[- ]?graduate|undergrad|\bbsc\b|b\.sc|bachelor|honors?\s+student/i, "Undergrad"],
  [/project\s+student|final\s+year\s+project/i, "Project Student"],
  [/\bintern\b|internship/i, "Intern"],

  // — Research / teaching support —
  [/graduate\s+research\s+assistant|\bgra\b/i, "GRA"],
  [/research\s+assistant|\bra\b/i, "RA"],
  [/research\s+engineer|\bre\b/i, "RE"],
  [/research\s+officer|\bro\b/i, "RO"],
  [/teaching\s+assistant|\bta\b/i, "TA"],
  [/research\s+programmer|software\s+engineer|developer|programmer/i, "Engineer"],
  [/scientific\s+programmer/i, "Sci. Programmer"],

  // — Leadership / management —
  [/director/i, "Director"],
  [/deputy\s+head|head\s+of/i, "Head"],
  [/manager/i, "Manager"],

  // — Catch-alls —
  [/scholar/i, "Scholar"],
  [/fellow/i, "Fellow"],
  [/researcher/i, "Researcher"],
  [/student/i, "Student"],
]

/** Normalize a free-text role to a short badge label, or "" if unknown. */
function shortenRole(role: string): string {
  if (!role) return ""
  for (const [pattern, label] of ROLE_SHORT_FORMS) {
    if (pattern.test(role)) return label
  }
  // Fallback: first comma/paren segment, only if it's already concise.
  const seg = role.split(/[,(]/)[0].trim()
  return seg.length <= 18 ? seg : ""
}

type PersonCardProps = {
  person: Person
  /** Show "Now: <currentPosition>" line — only relevant for Alumni. */
  showCurrentPosition?: boolean
  className?: string
}

/**
 * Photoless compact card. Type badge sits inline at the top, then identity
 * lines, then a links bar pinned to the bottom. `funding` is intentionally
 * not rendered — the field is preserved in the schema (still editable in
 * Keystatic) but kept off the card to fit all members on one screen.
 */
export function PersonCard({
  person,
  showCurrentPosition = false,
  className,
}: PersonCardProps) {
  const links = personLinks(person)
  const showMeta =
    !!person.period || (showCurrentPosition && !!person.currentPosition)
  // Badge label rules:
  //   • Staff and Alumni are umbrellas — distinguish individuals via their
  //     `role`, normalized through ROLE_SHORT_FORMS (e.g. "Postdoctoral
  //     Research Fellow" → "PostDoc", "MPhil (Lead supervision)" → "MPhil",
  //     "Lead Professor, ISE Group" → "Lead Professor").
  //     Falls back to TYPE_LABEL when no short form matches.
  //   • Other types (PostDoc, PhD, MPhil, Affiliated) use the short fixed
  //     TYPE_LABEL regardless of how their `role` field is worded.
  const ROLE_DERIVED_TYPES: Person["type"][] = ["Staff", "Alumni"]
  const badgeLabel = ROLE_DERIVED_TYPES.includes(person.type)
    ? shortenRole(person.role || "") || TYPE_LABEL[person.type]
    : TYPE_LABEL[person.type]

  return (
    <article
      id={person.id}
      data-person-card
      data-anchor-flash
      className={cn(
        // scroll-mt clears the sticky header + (on /people/current) the
        // section nav, so deep links from author bylines land cleanly;
        // data-anchor-flash makes the card pulse a ring when it's the :target.
        "ise-panel flex h-full scroll-mt-[132px] flex-col gap-[5px] overflow-hidden px-4 py-3.5",
        className,
      )}
    >
      {/* Type badge — inline pill at the top of the card */}
      <span className="inline-flex w-fit items-center rounded-full border border-primary/25 bg-primary/10 px-2 py-[2px] text-[11px] font-semibold text-primary">
        {badgeLabel}
      </span>

      <h3 className="m-0 mt-0.5 font-serif text-lg font-bold leading-[1.15] tracking-[-0.015em]">
        {person.name}
      </h3>

      {person.role && (
        <p className="m-0 text-[12.5px] font-medium leading-tight text-foreground">
          {person.role}
        </p>
      )}

      {person.affiliation && (
        <p className="m-0 text-xs leading-tight text-muted-foreground">
          {person.affiliation}
        </p>
      )}

      {showMeta && (
        <div className="flex flex-wrap items-center gap-x-3 text-[11px] leading-tight text-muted-foreground">
          {person.period && <span>{person.period}</span>}
          {showCurrentPosition && person.currentPosition && (
            <>
              {person.period && <span aria-hidden>·</span>}
              <span>
                <span className="font-semibold text-foreground">Now:</span>{" "}
                {person.currentPosition}
              </span>
            </>
          )}
        </div>
      )}

      {person.interests && person.interests.length > 0 && (
        <p className="m-0 line-clamp-2 text-xs leading-[1.4] text-muted-foreground">
          <span className="font-semibold text-foreground">Research:</span>{" "}
          {person.interests.join(" · ")}
        </p>
      )}

      {person.metrics &&
        (person.metrics.citations ||
          person.metrics.hIndex ||
          person.metrics.i10Index) && (
          <div className="m-0 flex flex-wrap items-baseline gap-x-2 text-[11px] leading-tight text-muted-foreground">
            {person.metrics.citations !== undefined && (
              <span>
                <span className="font-semibold text-foreground">
                  {person.metrics.citations.toLocaleString()}
                </span>{" "}
                citations
              </span>
            )}
            {person.metrics.hIndex !== undefined && (
              <>
                <span aria-hidden>·</span>
                <span>
                  h-index{" "}
                  <span className="font-semibold text-foreground">
                    {person.metrics.hIndex}
                  </span>
                </span>
              </>
            )}
            {person.metrics.i10Index !== undefined && (
              <>
                <span aria-hidden>·</span>
                <span>
                  i10{" "}
                  <span className="font-semibold text-foreground">
                    {person.metrics.i10Index}
                  </span>
                </span>
              </>
            )}
          </div>
        )}

      {/* Links — ALWAYS rendered (the only reserved row), pinned to bottom */}
      <div className="mt-auto flex min-h-[28px] gap-1.5 border-t border-border pt-2">
        {links.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={`${person.name} — ${label}`}
            className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </article>
  )
}

type PeopleGridProps = {
  people: Person[]
  showCurrentPosition?: boolean
  className?: string
}

/**
 * Responsive 1/2/3-column grid. `auto-rows-fr` makes every row the height of
 * the tallest card in that row; combined with `h-full` and `mt-auto` on the
 * links row inside PersonCard, shorter cards push their links to the bottom
 * edge so every link bar aligns across the grid.
 */
export function PeopleGrid({
  people,
  showCurrentPosition,
  className,
}: PeopleGridProps) {
  if (people.length === 0) return null
  return (
    <div
      className={cn(
        "grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          showCurrentPosition={showCurrentPosition}
        />
      ))}
    </div>
  )
}
