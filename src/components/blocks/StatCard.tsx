import { Card, CardContent } from "@/components"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  value: string
  label: string
  note?: string
}

export function StatCard({ value, label, note, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("ice-panel overflow-hidden", className)} {...props}>
      <CardContent className="p-2 sm:p-3">
        {/* Mobile: value and label on same row */}
        <div className="flex items-baseline gap-2 sm:block sm:space-y-1">
          <p className="text-lg font-semibold leading-tight text-primary sm:text-2xl">{value}</p>
          <p className="text-[0.65rem] font-semibold sm:text-xs">{label}</p>
        </div>
        {note && (
          <p className="mt-1 text-[0.6rem] leading-tight text-muted-foreground sm:text-[0.65rem]">{note}</p>
        )}
      </CardContent>
    </Card>
  )
}
