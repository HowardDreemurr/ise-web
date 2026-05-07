"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "./SiteFooter"
import { SiteHeader } from "./SiteHeader"

const ADMIN_PREFIXES = ["/keystatic"]

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = ADMIN_PREFIXES.some((p) => pathname?.startsWith(p))

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
