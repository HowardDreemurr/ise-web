import Image from "next/image"
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

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
 * Cybergis-style horizontal person card. 160px photo column on the left,
 * structured content on the right. Type badge floats top-left over the photo.
 *
 * Optional fields render only when present (no empty placeholders) — except
 * the bottom links bar, which always reserves space so cards in the same row
 * keep their links baseline aligned.
 */
export function PersonCard({
  person,
  showCurrentPosition = false,
  className,
}: PersonCardProps) {
  const links = personLinks(person)
  const initials = getInitials(person.name)
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
        "ise-panel grid h-full scroll-mt-[132px] overflow-hidden",
        className,
      )}
      style={{ gridTemplateColumns: "minmax(120px, 160px) 1fr" }}
    >
      {/* Photo column — type badge floats top-left over the image */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "#02030C" }}
      >
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-serif text-4xl font-bold tracking-tight text-white/90 sm:text-[44px]"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
            }}
          >
            {initials}
          </div>
        )}
        {/* Type badge — top-left, on-dark style so it reads over any photo */}
        <span
          className="absolute left-2 top-2 inline-flex items-center rounded-full px-2 py-[3px] text-[11px] font-semibold text-white"
          style={{
            backgroundColor: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.30)",
            backdropFilter: "blur(4px)",
          }}
        >
          {badgeLabel}
        </span>
      </div>

      {/* Body column — populated rows only; links bar always reserved */}
      <div className="flex min-w-0 flex-col gap-[5px] px-5 py-3 sm:px-[22px]">
        <h3 className="m-0 font-serif text-xl font-bold leading-[1.15] tracking-[-0.015em]">
          {person.name}
        </h3>

        {person.role && (
          <p className="m-0 text-[13px] font-medium leading-tight text-foreground">
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

        {person.funding && (
          <div className="inline-flex items-center gap-1.5 text-[11px] leading-tight text-muted-foreground">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--notable)" }}
            />
            {person.funding}
          </div>
        )}

        {/* Links — ALWAYS rendered (the only reserved row), pinned to bottom */}
        <div className="mt-auto flex min-h-[30px] gap-1.5 border-t border-border pt-2">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={`${person.name} — ${label}`}
              className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
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
 * 1-col on mobile, 2-col on lg+ — matches the wider horizontal card footprint.
 * `auto-rows-fr` makes every row in this grid take the same height (= the
 * tallest card's content), so all cards in the section are uniform regardless
 * of which optional fields they have. Combined with `h-full` and `mt-auto` on
 * the links row inside PersonCard, shorter cards get their flex space above
 * the icon bar — links stay anchored to the bottom edge.
 */
export function PeopleGrid({
  people,
  showCurrentPosition,
  className,
}: PeopleGridProps) {
  if (people.length === 0) return null
  return (
    <div className={cn("grid auto-rows-fr gap-5 lg:grid-cols-2", className)}>
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
