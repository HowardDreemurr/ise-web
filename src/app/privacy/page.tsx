import type { Metadata } from "next"

import { Container, Section, SubPageHero } from "@/components"

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How the ISE Group website handles personal data — what is collected, what isn't, and where to ask questions.",
}

const H2 =
  "mt-10 mb-3 font-serif text-xl font-bold tracking-tight text-foreground first:mt-0"
const P = "text-[15px] leading-relaxed text-foreground/80"
const UL = "mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-foreground/80"
const A =
  "text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <SubPageHero
        title="Privacy"
        description="The short version: this is a static research-group website. We don't run analytics, we don't set cookies, and we don't sell your data."
      />

      <Section className="py-12 md:py-16">
        <Container className="max-w-3xl space-y-4">
          <h2 className={H2}>What this site is</h2>
          <p className={P}>
            This is the public website of the <strong>Intelligent Sensing &amp;
            Environment (ISE) Group</strong> at the University of Exeter. It is
            a static site — the pages you see are pre-built HTML, served by
            GitHub Pages. There is no application server, no user accounts, and
            no database backing the visitor-facing pages.
          </p>

          <h2 className={H2}>What we collect</h2>
          <p className={P}>
            <strong>Nothing on the site itself.</strong> We do not run any
            analytics platform (no Google Analytics, no Plausible, no Fathom),
            we do not set cookies, and we do not embed third-party trackers or
            advertising pixels. Static page loads do not identify you to us.
          </p>
          <p className={P}>
            Personal data only enters the picture when <em>you</em> initiate a
            contact:
          </p>
          <ul className={UL}>
            <li>
              <strong>Email</strong> — when you email a group member, your
              message is handled under the University of Exeter's mail
              retention and privacy policy, not ours.
            </li>
            <li>
              <strong>Forms</strong> — any external form linked from this site
              (for example, recruitment or member-information forms hosted on
              Google Forms) is operated under the provider's terms. The link
              text tells you when you're leaving this site.
            </li>
          </ul>

          <h2 className={H2}>What our host can see</h2>
          <p className={P}>
            The site is hosted on{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className={A}
            >
              GitHub Pages
            </a>
            . As with any web host, GitHub records standard server logs
            (request IP, user agent, requested URL, timestamp) for operational
            and abuse-prevention purposes. We don't query, export, or join
            those logs — GitHub's privacy statement governs them.
          </p>

          <h2 className={H2}>Images, papers, and embedded media</h2>
          <p className={P}>
            Photos of group members and projects are published with each
            person's consent. Member photos and biographies can be removed at
            any time on request — email the address below. Publication PDFs
            link out to publisher sites; we do not host paywalled copies.
          </p>

          <h2 className={H2}>Your rights</h2>
          <p className={P}>
            Because the visitor-facing site collects nothing about you, there
            is no personal record here to access, correct, or erase. For
            anything that touches University systems (email, HR records,
            student records, applications), the University's data-protection
            office is the relevant authority:{" "}
            <a href="mailto:dataprotection@exeter.ac.uk" className={A}>
              dataprotection@exeter.ac.uk
            </a>
            .
          </p>

          <h2 className={H2}>Questions about this page</h2>
          <p className={P}>
            Email the group lead at{" "}
            <a href="mailto:C.Luo@Exeter.ac.uk" className={A}>
              C.Luo@Exeter.ac.uk
            </a>
            .
          </p>
        </Container>
      </Section>
    </div>
  )
}
