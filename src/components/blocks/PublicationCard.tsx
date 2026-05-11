import { Code2, ExternalLink, FileText, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { AuthorRef, Publication } from "@/lib/content"

function renderAuthors(authors: AuthorRef[], peopleById: Map<string, string>) {
  return authors
    .map((a) => (a.type === "member" ? peopleById.get(a.id) ?? a.id : a.name))
    .join(", ")
}

const TYPE_LABEL: Record<Publication["type"], string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
  "book-chapter": "Book Chapter",
  report: "Report",
}

type LinkSpec = { href: string; icon: LucideIcon; label: string }

function pubLinks(pub: Publication): LinkSpec[] {
  const out: LinkSpec[] = []
  const primary = pub.doi ? `https://doi.org/${pub.doi}` : pub.link
  if (primary) {
    out.push({ href: primary, icon: ExternalLink, label: pub.doi ? `doi.org/${pub.doi}` : "Page" })
  }
  if (pub.pdf) out.push({ href: pub.pdf, icon: FileText, label: "PDF" })
  if (pub.code) out.push({ href: pub.code, icon: Code2, label: "Code" })
  return out
}

/**
 * Horizontal `ise-panel` publication card — a navy→cerulean spine on the left
 * carrying the year + a type pill, the paper details on the right. Mirrors the
 * `PersonCard` / cybergis card footprint. Drop it in an `auto-rows-fr` grid (so
 * a row stays uniform height) or in a plain vertical stack.
 */
export function PublicationCard({
  pub,
  peopleById,
  className,
}: {
  pub: Publication
  peopleById: Map<string, string>
  className?: string
}) {
  const links = pubLinks(pub)
  return (
    <article
      className={cn("ise-panel grid h-full min-h-[148px] overflow-hidden", className)}
      style={{ gridTemplateColumns: "minmax(104px, 136px) 1fr" }}
    >
      {/* Left spine — year over the gradient; type pill floats top-left */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)" }}
      >
        <span className="font-serif text-2xl font-bold leading-none tracking-tight text-white/95 sm:text-[28px]">
          {pub.year}
        </span>
        <span
          className="absolute left-2 top-2 inline-flex items-center rounded-full px-2 py-[3px] text-[10.5px] font-semibold text-white"
          style={{
            backgroundColor: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.30)",
            backdropFilter: "blur(4px)",
          }}
        >
          {TYPE_LABEL[pub.type]}
        </span>
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-col gap-1.5 px-5 py-3.5 sm:px-[22px]">
        <h3 className="m-0 font-serif text-base font-bold leading-snug tracking-[-0.01em] text-foreground sm:text-lg">
          {pub.title}
        </h3>
        <p className="m-0 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
          {renderAuthors(pub.authors, peopleById)}
        </p>
        <p className="m-0 text-[13px] italic leading-snug text-muted-foreground">
          {pub.venue}
        </p>

        {/* Links — pinned to the bottom (always reserved so rows stay aligned) */}
        <div className="mt-auto flex min-h-[28px] flex-wrap items-center gap-1.5 border-t border-border pt-2">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-3 w-3" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
