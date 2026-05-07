"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Button } from "@/components"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/", label: "Vision" },
  { href: "/contribute", label: "Contribute" },
  { href: "/impact", label: "Impact" },
  { href: "/members", label: "Members" },
]

function HamburgerIcon({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-primary/10 transition-colors"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={cn(
          "block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300",
          isOpen && "rotate-45 translate-y-1.5"
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 mt-1",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 mt-1",
          isOpen && "-rotate-45 -translate-y-1.5"
        )}
      />
    </button>
  )
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = React.useState(pathname)

  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 h-16 bg-white/95 backdrop-blur-sm border-b border-border/50">
      <div className="mx-auto h-full w-full max-w-6xl px-6">
        <div className="h-full relative flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10">
            <Image
              src="/images/ise-logo.png"
              alt="ISE Lab"
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold" style={{ color: "#205775" }}>
                ISE LAB
              </span>
              <span className="text-[0.65rem] hidden sm:block" style={{ color: "#205775" }}>
                Intelligent Sensing for Environment
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav
            className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <Button asChild size="sm" className="hidden md:inline-flex rounded-full font-bold z-10">
            <Link href="/members">Join Us</Link>
          </Button>

          {/* Mobile Hamburger */}
          <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out bg-background border-t border-border/50",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <nav className="flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {nav.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-bold transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Button asChild className="mt-2 rounded-full font-bold">
              <Link href="/members">Join Us</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
