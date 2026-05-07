"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavLeaf = { href: string; label: string }
type NavItem =
  | NavLeaf
  | {
      label: string
      href: string // base path used for active state
      children: NavLeaf[]
    }

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    label: "Community",
    href: "/community",
    children: [
      { href: "/community/news", label: "News" },
      { href: "/community/events", label: "Events" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { href: "/research", label: "Areas" },
      { href: "/research/publications", label: "Publications" },
      { href: "/research/projects", label: "Projects" },
      { href: "/research/impact", label: "Impact" },
    ],
  },
  { href: "/people", label: "People" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join" },
]

function HamburgerIcon({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
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
          isOpen && "rotate-45 translate-y-1.5",
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 mt-1",
          isOpen && "opacity-0",
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 mt-1",
          isOpen && "-rotate-45 -translate-y-1.5",
        )}
      />
    </button>
  )
}

function isHrefActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = isHrefActive(pathname, item.href)
  if (!("children" in item)) {
    return (
      <Link
        href={item.href}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="group relative">
      <Link
        href={item.href}
        className={cn(
          "inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </Link>
      <div
        className={cn(
          "invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-all duration-150",
          "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
        )}
      >
        <div className="ise-panel w-52 overflow-hidden p-1 shadow-md">
          {item.children.map((child) => {
            const childActive = isHrefActive(pathname, child.href)
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  childActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
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
    <header className="sticky top-0 z-50 h-16 border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto h-full w-full max-w-6xl px-6">
        <div className="relative flex h-full items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="z-10 flex items-center gap-3">
            <Image
              src="/images/ise-logo.png"
              alt="ISE Lab"
              width={50}
              height={50}
              className="h-11 w-11 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight" style={{ color: "#205775" }}>
                ISE LAB
              </span>
              <span
                className="hidden text-[0.7rem] sm:block text-muted-foreground"
              >
                Intelligent Sensing for Environment
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <DesktopItem key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <Button
            asChild
            size="sm"
            className="z-10 hidden rounded-full font-semibold md:inline-flex"
          >
            <Link href="/join">Join Us</Link>
          </Button>

          {/* Mobile Hamburger */}
          <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background transition-all duration-300 ease-out md:hidden",
          isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <nav className="flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {nav.map((item) => {
              const isActive = isHrefActive(pathname, item.href)
              return (
                <div key={item.href} className="space-y-1">
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/50",
                    )}
                  >
                    {item.label}
                  </Link>
                  {"children" in item && (
                    <div className="ml-4 flex flex-col gap-1 border-l border-border/40 pl-3">
                      {item.children.map((child) => {
                        const childActive = isHrefActive(pathname, child.href)
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              childActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted/50",
                            )}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
            <Button asChild className="mt-2 rounded-full font-semibold">
              <Link href="/join">Join Us</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
