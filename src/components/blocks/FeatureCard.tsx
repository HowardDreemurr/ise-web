import { Card, CardContent, CardHeader, CardTitle } from "@/components"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

type FeatureCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  description: string
  eyebrow?: string
}

export function FeatureCard({
  title,
  description,
  eyebrow,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Card className={cn("ice-panel", className)} {...props}>
      <CardHeader>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
