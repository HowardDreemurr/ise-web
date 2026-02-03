import { SectionIntro } from "@/components"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

type PageHeaderProps = HTMLAttributes<HTMLDivElement> & {
  kicker?: string
  title: string
  description?: string
}

export function PageHeader({
  kicker,
  title,
  description,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("ice-panel p-8 sm:p-10", className)} {...props}>
      <SectionIntro
        kicker={kicker}
        title={title}
        description={description}
      />
    </div>
  )
}
