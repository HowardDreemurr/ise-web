import Image from "next/image"
import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Resource } from "@/lib/content"

const TYPE_LABEL: Record<Resource["type"], string> = {
  code: "Code",
  dataset: "Dataset",
  tools: "Tool",
}

type ResourceCardProps = {
  resource: Resource
  className?: string
}

/**
 * Cybergis-style stacked horizontal card. Thumbnail on the left, generous
 * description on the right. Used vertically (one per row), not in a tight grid.
 */
export function ResourceCard({ resource, className }: ResourceCardProps) {
  const Wrapper: React.ElementType = resource.link ? "a" : "article"
  const wrapperProps = resource.link
    ? { href: resource.link, target: "_blank" as const, rel: "noreferrer" }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "ise-panel group block overflow-hidden transition-[border-color,transform] duration-200 hover:border-primary/35",
        resource.link && "hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="grid gap-0 sm:grid-cols-[260px_1fr]">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] w-full bg-muted sm:aspect-auto sm:h-full sm:min-h-[180px]">
          {resource.thumbnail ? (
            <Image
              src={resource.thumbnail}
              alt=""
              fill
              sizes="(min-width: 640px) 260px, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(30,58,138,0.92) 0%, rgba(3,105,161,0.88) 60%, rgba(56,189,248,0.85) 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 14px)",
              }}
            />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-[0.08em]">
                {TYPE_LABEL[resource.type]}
              </Badge>
              {resource.version && (
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {resource.version}
                </span>
              )}
              {resource.license && (
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  · {resource.license}
                </span>
              )}
              {resource.size && (
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  · {resource.size}
                </span>
              )}
            </div>
            {resource.link && (
              <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                Open
                <ExternalLink className="h-3 w-3" />
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
            {resource.title}
          </h3>

          {resource.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {resource.description}
            </p>
          )}

          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-[11px]">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

type ResourceListProps = {
  resources: Resource[]
  className?: string
}

/** Vertical stacked list of full-width ResourceCards. */
export function ResourceList({ resources, className }: ResourceListProps) {
  if (resources.length === 0) return null
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  )
}
