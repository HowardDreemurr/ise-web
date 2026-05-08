import Link from "next/link"

import { Wordmark } from "./Wordmark"

type FooterLink = { label: string; href: string }

const RESEARCH_LINKS: FooterLink[] = [
  { label: "Pillars", href: "/research" },
  { label: "Projects", href: "/research/projects" },
  { label: "Publications", href: "/research/publications" },
  { label: "Open Source", href: "/resources" },
]

const COMMUNITY_LINKS: FooterLink[] = [
  { label: "News", href: "/community/news" },
  { label: "Events", href: "/community/events" },
  { label: "Seminars", href: "#" },
  { label: "Vacancies", href: "#" },
]

const ABOUT_LINKS: FooterLink[] = [
  { label: "The Group", href: "/" },
  { label: "People", href: "/people" },
  { label: "Collaborations", href: "/research/impact" },
  { label: "Contact", href: "/join" },
]

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </div>
  )
}

function ColList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2 text-sm">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-white/70 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0b1424] text-white/78">
      <div className="mx-auto w-full max-w-6xl px-6 pb-6 pt-14">
        {/* Two-section layout: brand block (left) + 3-col link group (right).
            Big gap between sections (md:gap-24) — tight gap within the 3 cols. */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-9 md:flex-row md:items-start md:gap-40">
          {/* Brand block — wordmark only (no logo mark in footer). */}
          <div className="flex flex-col gap-5 md:max-w-[320px] md:shrink-0">
            <Wordmark tone="dark" width={220} />
            <div className="flex flex-col gap-1.5 text-[13px] leading-relaxed text-white/78">
              <a
                href="mailto:C.Luo@Exeter.ac.uk"
                className="text-sky-300 hover:underline"
              >
                C.Luo@Exeter.ac.uk
              </a>
              <p>Harrison Building · Exeter EX4 4QF, UK</p>
            </div>
          </div>

          {/* 3-col link group — tight gap between cols, sits to the right of brand */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:flex-1 md:gap-8">
            <div>
              <ColLabel>Research</ColLabel>
              <ColList links={RESEARCH_LINKS} />
            </div>
            <div>
              <ColLabel>Community</ColLabel>
              <ColList links={COMMUNITY_LINKS} />
            </div>
            <div>
              <ColLabel>About</ColLabel>
              <ColList links={ABOUT_LINKS} />
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col items-start gap-4 pt-6 text-[12.5px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} ISE Lab · University of Exeter</div>
          <div className="flex gap-5">
            <Link href="#" className="text-white/55 hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="text-white/55 hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
