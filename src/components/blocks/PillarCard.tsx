import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type Pillar = {
  /** Unique slug, used as React key. */
  id: string
  title: string
  description: string
  icon: LucideIcon
}

type PillarCardProps = {
  pillar: Pillar
  className?: string
}

export function PillarCard({ pillar, className }: PillarCardProps) {
  const Icon = pillar.icon
  return (
    <Card className={cn("ise-panel h-full p-6 text-center", className)}>
      <CardHeader>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 text-primary ring-1 ring-primary/15">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <CardTitle className="text-xl">{pillar.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {pillar.description}
        </p>
      </CardContent>
    </Card>
  )
}
