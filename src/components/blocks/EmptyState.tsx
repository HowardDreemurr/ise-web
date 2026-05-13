import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type EmptyStateProps = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

/**
 * Placeholder shown on a list when no entries exist yet. The card fills its
 * parent container — callers must place it inside a `<Container>` (or any
 * width-capped wrapper) so it sits at the same width as the surrounding
 * content.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "ise-panel flex w-full flex-col items-center gap-3 px-6 py-12 text-center",
        className,
      )}
    >
      <p className="font-serif text-xl font-semibold">{title}</p>
      {description && (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      )}
      {action}
    </div>
  )
}
