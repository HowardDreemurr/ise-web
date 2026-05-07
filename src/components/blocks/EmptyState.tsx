import type { ReactNode } from "react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

/**
 * Compact placeholder shown on a list page when no entries exist yet.
 * Phase 5 will populate the data; this keeps layouts coherent in the meantime.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Container>
      <div
        className={cn(
          "ise-panel mx-auto flex max-w-xl flex-col items-center gap-3 py-12 text-center",
          className,
        )}
      >
        <p className="font-serif text-xl font-semibold">{title}</p>
        {description && (
          <p className="max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {action}
      </div>
    </Container>
  )
}
