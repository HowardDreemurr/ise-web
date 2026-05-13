import type { Metadata } from "next"

import { Container, Section, SubPageHero } from "@/components"

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How the ISE Group website is built for accessible reading, known limitations, and how to report problems.",
}

const H2 =
  "mt-10 mb-3 font-serif text-xl font-bold tracking-tight text-foreground first:mt-0"
const P = "text-[15px] leading-relaxed text-foreground/80"
const UL = "mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-foreground/80"
const A =
  "text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
const CODE =
  "rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12.5px] text-foreground"

export default function AccessibilityPage() {
  return (
    <div className="bg-background">
      <SubPageHero
        title="Accessibility"
        description="We aim for content on this site to be readable by anyone, on any reasonable device. This page documents what we've done, what we know is imperfect, and how to flag problems."
      />

      <Section className="py-12 md:py-16">
        <Container className="max-w-3xl space-y-4">
          <h2 className={H2}>Standards we aim for</h2>
          <p className={P}>
            The site is built to meet{" "}
            <a
              href="https://www.w3.org/TR/WCAG22/"
              target="_blank"
              rel="noopener noreferrer"
              className={A}
            >
              WCAG 2.2 Level AA
            </a>{" "}
            where reasonably practicable. This is the standard adopted by UK
            public-sector sites and the one the University of Exeter follows.
          </p>

          <h2 className={H2}>What we&apos;ve done</h2>
          <ul className={UL}>
            <li>
              <strong>Semantic markup</strong> — headings, lists, landmarks
              (<code className={CODE}>main</code>,{" "}
              <code className={CODE}>nav</code>,{" "}
              <code className={CODE}>footer</code>),{" "}
              <code className={CODE}>aria-current</code> on the active
              navigation entry, and breadcrumb navigation on every sub-page.
            </li>
            <li>
              <strong>Keyboard navigation</strong> — every interactive control
              (links, buttons, in-page section nav, citation menu, mobile
              drawer) is reachable by Tab and operable with Enter or Space.
            </li>
            <li>
              <strong>Colour contrast</strong> — body text, link text, and the
              hero banners are designed to clear WCAG AA contrast against their
              backgrounds.
            </li>
            <li>
              <strong>Reduced motion</strong> — the deep-link highlight flash
              and reveal-on-scroll animations are suppressed for visitors with{" "}
              <code className={CODE}>prefers-reduced-motion: reduce</code>, and
              replaced with a static indicator where one is needed.
            </li>
            <li>
              <strong>Responsive type</strong> — text scales with viewport and
              respects browser zoom up to at least 200%.
            </li>
            <li>
              <strong>Alt text</strong> — informative images (member photos,
              project thumbnails) carry alt text; purely decorative images use{" "}
              <code className={CODE}>alt=&quot;&quot;</code>.
            </li>
          </ul>

          <h2 className={H2}>Known limitations</h2>
          <p className={P}>
            Some content predates this site or comes from external sources, and
            isn&apos;t fully accessible:
          </p>
          <ul className={UL}>
            <li>
              <strong>Publication PDFs</strong> — we link to publisher-hosted
              papers. Their accessibility depends on the publisher; we do not
              re-host accessible versions.
            </li>
            <li>
              <strong>External forms</strong> — recruitment and member-info
              forms hosted on Google Forms follow Google&apos;s accessibility
              support, not ours.
            </li>
            <li>
              <strong>Embedded figures</strong> in news entries or resources
              may not carry detailed alt text yet — we&apos;re filling these
              in as we go.
            </li>
          </ul>

          <h2 className={H2}>Reporting a problem</h2>
          <p className={P}>
            If something on this site is hard to use — text that doesn&apos;t
            reflow, a control that won&apos;t take focus, a contrast issue —
            please tell us and we&apos;ll fix it.
          </p>
          <ul className={UL}>
            <li>
              Email{" "}
              <a href="mailto:C.Luo@Exeter.ac.uk" className={A}>
                C.Luo@Exeter.ac.uk
              </a>{" "}
              with a link to the affected page and a short description of what
              went wrong.
            </li>
            <li>
              Or open a public issue on the{" "}
              <a
                href="https://github.com/HowardDreemurr/ise-web/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className={A}
              >
                site repository
              </a>{" "}
              (use the &ldquo;Report a bug&rdquo; link in the footer).
            </li>
          </ul>

          <h2 className={H2}>Enforcement</h2>
          <p className={P}>
            The site is part of the University of Exeter&rsquo;s research
            footprint. If we don&rsquo;t respond to an accessibility request
            within a reasonable time, you can escalate to the University&rsquo;s
            accessibility lead via{" "}
            <a href="mailto:webteam@exeter.ac.uk" className={A}>
              webteam@exeter.ac.uk
            </a>
            , or contact the{" "}
            <a
              href="https://www.equalityhumanrights.com/en/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className={A}
            >
              Equality and Human Rights Commission
            </a>
            , which oversees the UK Public Sector Bodies Accessibility
            Regulations.
          </p>
        </Container>
      </Section>
    </div>
  )
}
