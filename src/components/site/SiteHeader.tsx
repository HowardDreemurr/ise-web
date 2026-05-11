"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Wordmark } from "@/components/site/Wordmark"
import { cn } from "@/lib/utils"

type NavLeaf = { href: string; label: string; cta?: boolean }
type NavItem =
  | NavLeaf
  | {
      label: string
      href: string // base path used for active state
      children: NavLeaf[]
      cta?: boolean
    }

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  // Community currently surfaces only News (Events was retired) — keep it a
  // plain leaf; restore a dropdown here if Seminars/Vacancies/etc. land.
  { href: "/community", label: "Community" },
  {
    label: "Research",
    href: "/research",
    children: [
      { href: "/research/publications", label: "Publications" },
      { href: "/research/projects", label: "Projects" },
      { href: "/research/impact", label: "Impact" },
    ],
  },
  {
    label: "People",
    href: "/people",
    children: [
      { href: "/people/current", label: "Current" },
      { href: "/people/alumni", label: "Alumni" },
      { href: "/people/affiliated", label: "Affiliated" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { href: "/resources/code", label: "Code" },
      { href: "/resources/data", label: "Data" },
      { href: "/resources/tools", label: "Tools" },
    ],
  },
  // Contact tab — last item, rendered as a primary-blue pill (replaces the
  // separate "Join Us" CTA). The page itself still lives at /join.
  { href: "/join", label: "Contact", cta: true },
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
      className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-primary/10 transition-colors"
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
    // CTA leaf — primary-blue filled pill (replaces the old standalone Join Us button).
    if (item.cta) {
      return (
        <Link
          href={item.href}
          className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {item.label}
        </Link>
      )
    }
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
      {/* Narrow hover-bridge — exactly the trigger's width × 8px tall.
          Lets the cursor cross from trigger to panel without losing :hover,
          but doesn't catch hover from far-side ghost area. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-full h-2"
      />

      {/* The dropdown panel — sits 8px below trigger, only visible on
          group-hover/focus-within. Wider than the trigger but its hover-active
          state only matters once it's actually visible. */}
      <div
        className={cn(
          "invisible absolute left-1/2 top-[calc(100%+0.5rem)] -translate-x-1/2 opacity-0 transition-opacity duration-150",
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

function MobileNavItem({
  item,
  pathname,
  onLeafClick,
  expanded,
  onToggle,
}: {
  item: NavItem
  pathname: string
  onLeafClick: () => void
  expanded: boolean
  onToggle: () => void
}) {
  const isActive = isHrefActive(pathname, item.href)
  const hasChildren = "children" in item

  if (!hasChildren) {
    // CTA leaf — primary-blue filled pill in the mobile drawer too.
    if (item.cta) {
      return (
        <Link
          href={item.href}
          onClick={onLeafClick}
          className="mt-2 block rounded-full bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {item.label}
        </Link>
      )
    }
    return (
      <Link
        href={item.href}
        onClick={onLeafClick}
        className={cn(
          "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-muted/50",
        )}
      >
        {item.label}
      </Link>
    )
  }

  // Estimated max-height when expanded: 1 overview + N children, each ~40px row + gap.
  // 240px comfortably fits up to 5 rows; clipped if more.
  const maxH = (item.children.length + 1) * 44 + 8

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-muted/50",
        )}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          expanded ? "opacity-100" : "opacity-0",
        )}
        style={{ maxHeight: expanded ? maxH : 0 }}
        aria-hidden={!expanded}
      >
        <div className="ml-4 flex flex-col gap-1 border-l border-border/40 pl-3 pt-1">
          <Link
            href={item.href}
            onClick={onLeafClick}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50",
            )}
          >
            {item.label} overview
          </Link>
          {item.children.map((child) => {
            const childActive = isHrefActive(pathname, child.href)
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onLeafClick}
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
      </div>
    </div>
  )
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = React.useState(pathname)
  // Track which parent group is open in the mobile drawer; only one at a time.
  const [openGroup, setOpenGroup] = React.useState<string | null>(null)

  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  const handleHamburger = () => {
    if (!isOpen) {
      // Opening — pre-expand the parent that contains the current route.
      const activeParent = nav.find(
        (n) => "children" in n && isHrefActive(pathname, n.href),
      )
      setOpenGroup(activeParent ? activeParent.href : null)
    }
    setIsOpen(!isOpen)
  }

  return (
    <header className="sticky top-0 z-50 h-[80px] border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto h-full w-full max-w-6xl px-6">
        <div className="flex h-full items-center justify-between gap-4">
          {/* Logo + SVG wordmark — textLength-locked so the two lines share the same width */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="ISE Lab — home"
          >
            <Image
              src="/images/ise-logo.png"
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 object-contain"
            />
            <Wordmark tone="light" width={170} className="sm:hidden" />
            <Wordmark tone="light" width={220} className="hidden sm:block" />
          </Link>

          {/* Desktop Navigation — right-aligned, includes Contact CTA at the end */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <DesktopItem key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <HamburgerIcon isOpen={isOpen} onClick={handleHamburger} />
        </div>
      </div>

      {/* Mobile Dropdown Menu — collapsible accordion per parent. Scrolls if too tall. */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          // Fit within viewport (subtract 64px header height)
          isOpen
            ? "max-h-[calc(100vh-72px)] opacity-100"
            : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto w-full max-w-6xl overflow-y-auto px-6 max-h-[calc(100vh-72px)]">
          <nav
            className="flex flex-col gap-1 py-4"
            aria-label="Mobile navigation"
          >
            {nav.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                pathname={pathname}
                onLeafClick={() => setIsOpen(false)}
                expanded={openGroup === item.href}
                onToggle={() =>
                  setOpenGroup((cur) => (cur === item.href ? null : item.href))
                }
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
