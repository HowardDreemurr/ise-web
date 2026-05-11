import Link from "next/link"

import { CiteMenu, type CiteFormat } from "@/components/blocks/CiteMenu"
import { cn } from "@/lib/utils"
import type { AuthorRef, Publication } from "@/lib/content"

type PeopleIndex = Map<string, { name: string; href: string }>
type AuthorDisplay = { name: string; href?: string }

/** Resolve an author ref for display: member ids → { name, href to their card };
 *  external authors → { name } (no link). Unknown member ids fall back to the id. */
function resolveAuthor(a: AuthorRef, peopleById: PeopleIndex): AuthorDisplay {
  if (a.discriminant === "member") {
    const hit = peopleById.get(a.value)
    return hit ? { name: hit.name, href: hit.href } : { name: a.value }
  }
  return { name: a.value }
}

/* ── Citation formats ──────────────────────────────────────────────────── */

const BIBTEX_TYPE: Record<Publication["type"], string> = {
  journal: "article",
  conference: "inproceedings",
  workshop: "inproceedings",
  preprint: "misc",
  "book-chapter": "incollection",
  report: "techreport",
}
const BIBTEX_VENUE_KEY: Record<Publication["type"], string> = {
  journal: "journal",
  conference: "booktitle",
  workshop: "booktitle",
  preprint: "howpublished",
  "book-chapter": "booktitle",
  report: "institution",
}
const RIS_TYPE: Record<Publication["type"], string> = {
  journal: "JOUR",
  conference: "CPAPER",
  workshop: "CPAPER",
  preprint: "GEN",
  "book-chapter": "CHAP",
  report: "RPRT",
}

function buildCitations(pub: Publication, authorNames: string[]): CiteFormat[] {
  const url = pub.doi ? `https://doi.org/${pub.doi}` : pub.link
  const key = pub.id.replace(/^paper-/, "")

  const plain = [
    authorNames.length ? `${authorNames.join(", ")}.` : null,
    `(${pub.year}).`,
    `${pub.title}.`,
    `${pub.venue}.`,
    url,
  ]
    .filter(Boolean)
    .join(" ")

  const bibtex = [
    `@${BIBTEX_TYPE[pub.type]}{${key},`,
    `  title   = {${pub.title}},`,
    authorNames.length ? `  author  = {${authorNames.join(" and ")}},` : null,
    `  ${BIBTEX_VENUE_KEY[pub.type]} = {${pub.venue}},`,
    `  year    = {${pub.year}},`,
    pub.doi ? `  doi     = {${pub.doi}},` : null,
    !pub.doi && pub.link ? `  url     = {${pub.link}},` : null,
    `}`,
  ]
    .filter(Boolean)
    .join("\n")

  const ris = [
    `TY  - ${RIS_TYPE[pub.type]}`,
    `TI  - ${pub.title}`,
    ...authorNames.map((n) => `AU  - ${n}`),
    `T2  - ${pub.venue}`,
    `PY  - ${pub.year}`,
    pub.doi ? `DO  - ${pub.doi}` : null,
    url ? `UR  - ${url}` : null,
    `ER  - `,
  ]
    .filter(Boolean)
    .join("\n")

  return [
    { key: "plain", label: "Plain text", text: plain },
    { key: "bibtex", label: "BibTeX", text: bibtex },
    { key: "ris", label: "RIS / EndNote", text: ris },
  ]
}

/* ── Card ──────────────────────────────────────────────────────────────── */

export function PublicationCard({
  pub,
  peopleById,
  className,
}: {
  pub: Publication
  peopleById: PeopleIndex
  className?: string
}) {
  const authors = pub.authors
    .map((a) => resolveAuthor(a, peopleById))
    .filter((a) => a.name)
  const primary = pub.doi ? `https://doi.org/${pub.doi}` : pub.link
  const citations = buildCitations(pub, authors.map((a) => a.name))

  return (
    <article className={cn("ise-panel flex h-full flex-col gap-1.5 p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide">
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-muted-foreground">
            {pub.year}
          </span>
          <span className="rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            {pub.type.replace("-", " ")}
          </span>
          {pub.featured && (
            <span className="rounded bg-notable/15 px-1.5 py-0.5 text-notable">Featured</span>
          )}
        </div>
        <CiteMenu formats={citations} className="-mr-1 shrink-0" />
      </div>
      <h3 className="font-serif text-[15px] font-semibold leading-snug text-foreground">
        {pub.title}
      </h3>
      {authors.length > 0 && (
        <p className="text-[12.5px] leading-snug text-muted-foreground">
          {authors.map((a, i) => (
            <span key={i}>
              {i > 0 && ", "}
              {a.href ? (
                <Link
                  href={a.href}
                  className="font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
                >
                  {a.name}
                </Link>
              ) : (
                a.name
              )}
            </span>
          ))}
        </p>
      )}
      <p className="text-[12.5px] italic leading-snug text-muted-foreground">{pub.venue}</p>
      {/* Links row — always present (mt-auto) so cards in a row stay aligned. */}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] font-semibold">
        {primary && (
          <a href={primary} target="_blank" rel="noreferrer" className="break-all text-primary hover:underline">
            {pub.doi ? `doi.org/${pub.doi}` : "Open paper"}
          </a>
        )}
        {pub.pdf && (
          <a href={pub.pdf} target="_blank" rel="noreferrer" className="text-primary hover:underline">PDF</a>
        )}
        {pub.code && (
          <a href={pub.code} target="_blank" rel="noreferrer" className="text-primary hover:underline">Code</a>
        )}
      </div>
    </article>
  )
}
