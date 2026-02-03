"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/researches", label: "Researches" },
  { href: "/impact", label: "Impact" },
  { href: "/members", label: "Members" },
]

type NavLinksProps = {
  className?: string
  onNavigate?: () => void
}

export function NavLinks({ className, onNavigate }: NavLinksProps) {
  const pathname = usePathname()
  return (
    <nav className={cn("flex flex-wrap items-center gap-2", className)}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Button
            key={link.href}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.18em]",
                isActive && "text-foreground"
              )}
              onClick={onNavigate}
            >
              {link.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
