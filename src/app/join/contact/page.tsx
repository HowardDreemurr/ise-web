import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import Image from "next/image"
import { ExternalLink, Mail, MapPin } from "lucide-react"

import { Container, Section, SubPageHero } from "@/components"

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Direct PI contact — email, address, and other ways to reach the ISE Group at the University of Exeter.",
}

const H2 = "font-serif text-xl font-bold tracking-tight text-foreground"
const P = "text-[15px] leading-relaxed text-foreground/80"
const A =
  "text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"

// Keyless Google Maps embed — no API quota required for the basic "q=" form.
// Pin uses explicit coordinates so it lands exactly on KBB regardless of how
// Google indexes the building name (it was recently renamed from "Innovation
// Centre Phase 1" to "Kathleen Booth Building").
const MAP_COORDS = "50.738138622684275,-3.5303992735742264"
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_COORDS}&z=17&output=embed`
const MAP_LINK_HREF = `https://www.google.com/maps/search/?api=1&query=${MAP_COORDS}`

// Optional building photo. Drop a file at public/images/contact/kathleen-booth.{jpg,png}
// and it renders automatically; otherwise the panel falls back to a styled placeholder.
const BUILDING_IMAGE_CANDIDATES = [
  "/images/contact/kathleen-booth.jpg",
  "/images/contact/kathleen-booth.png",
]
function findBuildingImage(): string | null {
  for (const rel of BUILDING_IMAGE_CANDIDATES) {
    const abs = path.join(process.cwd(), "public", rel)
    if (fs.existsSync(abs)) return rel
  }
  return null
}

const PLACEHOLDER_BG =
  "linear-gradient(135deg, rgba(30,58,138,0.92) 0%, rgba(3,105,161,0.88) 60%, rgba(56,189,248,0.85) 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 14px)"

export default function ContactPage() {
  const buildingImage = findBuildingImage()
  return (
    <div className="bg-background">
      <SubPageHero
        title="Get in Touch"
        description="Direct contact for the ISE Group — talks and visits, press enquiries, and anything that doesn't fit the other pathways."
      />

      <Section className="py-12 md:py-16">
        <Container className="max-w-3xl space-y-10">
          {/* Intro + contact cards */}
          <div className="space-y-6">
            <p className={P}>
              For PhD, postdoc, or industry enquiries please use the dedicated
              pages on this tab — the rest of the time, email the group lead
              directly. We aim to reply within a week; please flag clearly what
              you&apos;re writing about so we can route the conversation
              quickly.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="ise-panel flex items-start gap-3 p-5">
                <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Mail className="h-4 w-4" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:C.Luo@exeter.ac.uk"
                    className={`${A} text-sm`}
                  >
                    C.Luo@exeter.ac.uk
                  </a>
                </div>
              </div>

              <div className="ise-panel flex items-start gap-3 p-5">
                <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <MapPin className="h-4 w-4" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Office
                  </p>
                  <p className="text-sm text-foreground/80">
                    Kathleen Booth Building (KBB)
                    <br />
                    <span className="text-muted-foreground">
                      formerly Innovation Centre Phase 1
                    </span>
                    <br />
                    University of Exeter, Exeter EX4 4QF, UK
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Building photo + interactive map — 2 columns on md+, stacked on mobile */}
          <div className="grid gap-4 md:grid-cols-2">
            <figure className="ise-panel relative overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                {buildingImage ? (
                  <Image
                    src={buildingImage}
                    alt="Kathleen Booth Building, University of Exeter"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-end p-5 text-white"
                    style={{ backgroundImage: PLACEHOLDER_BG }}
                  >
                    <span className="font-serif text-lg font-semibold leading-tight">
                      Kathleen Booth Building
                      <br />
                      <span className="text-sm font-normal text-white/80">
                        University of Exeter
                      </span>
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="border-t border-border/60 bg-background/80 px-4 py-2.5 text-xs text-muted-foreground">
                Kathleen Booth Building (KBB) — formerly Innovation Centre
                Phase 1, Faculty of Environment, Science &amp; Economy
              </figcaption>
            </figure>

            <div className="ise-panel relative overflow-hidden">
              <iframe
                title="Map: Harrison Building, University of Exeter"
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block aspect-[4/3] w-full"
              />
              <div className="border-t border-border/60 bg-background/80 px-4 py-2.5">
                <a
                  href={MAP_LINK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Open in Google Maps
                  <ExternalLink aria-hidden className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className={H2}>Talks, visits, and press</h2>
            <p className={P}>
              We host visiting researchers and give invited talks year-round.
              For talk invitations, panel/keynote requests, or press
              enquiries, email the address above and include the date window,
              audience, and (for press) a deadline.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className={H2}>Contact me for</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] text-foreground/80">
              <li>Chairing / membership / trusteeship of committees, boards, and panels</li>
              <li>Consultancy work</li>
              <li>Keynote speaker / panel chair opportunities</li>
              <li>Research supervision (postgraduate — PhD and Masters)</li>
              <li>Editorial opportunities</li>
            </ul>
          </div>
        </Container>
      </Section>
    </div>
  )
}
