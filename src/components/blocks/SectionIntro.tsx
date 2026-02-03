import { Badge } from "@/components"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

type SectionIntroProps = HTMLAttributes<HTMLDivElement> & {
  kicker?: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionIntro({
  kicker,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    >
      {kicker && (
        <Badge variant="secondary" className="text-[0.65rem] tracking-[0.3em]">
          {kicker}
        </Badge>
      )}
      <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
