"use client"

import { usePathname } from "next/navigation"
import { BackToTop } from "./BackToTop"
import { SiteFooter } from "./SiteFooter"
import { SiteHeader } from "./SiteHeader"

const ADMIN_PREFIXES = ["/keystatic"]

export function SiteChrome({
  children,
  showAffiliated = false,
}: {
  children: React.ReactNode
  /** Hide the Affiliated sub-tab in nav when no affiliated members exist. */
  showAffiliated?: boolean
}) {
  const pathname = usePathname()
  const isAdmin = ADMIN_PREFIXES.some((p) => pathname?.startsWith(p))

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showAffiliated={showAffiliated} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <BackToTop />
    </div>
  )
}
