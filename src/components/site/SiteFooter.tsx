import Link from "next/link"

import { Button } from "@/components"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide">ISE Group</p>
          <p className="text-sm text-muted-foreground">
            Intelligence, sensing, and environment research for resilient systems.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/news">View updates</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/researches">Explore research</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
