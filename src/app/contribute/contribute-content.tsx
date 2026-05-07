"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Badge,
  Card,
  CardContent,
  Container,
  Reveal,
  Section,
} from "@/components"
import type { CodeDataItem, Paper, ResearchArea } from "@/lib/content"
import { cn } from "@/lib/utils"

type ResearchAreaSectionProps = {
  area: ResearchArea
  index: number
}

function ResearchAreaSection({ area, index }: ResearchAreaSectionProps) {
  const sortedPapers = [...area.papers].sort((a, b) => b.year - a.year)

  const [activePaper, setActivePaper] = useState(0)
  const paperRefs = useRef<(HTMLDivElement | null)[]>([])
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const mobileNavRefs = useRef<(HTMLButtonElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      let currentIndex = 0

      paperRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          if (rect.top <= containerRect.top + 50) {
            currentIndex = idx
          }
        }
      })

      if (currentIndex !== activePaper) {
        setActivePaper(currentIndex)
        navRefs.current[currentIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
        mobileNavRefs.current[currentIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [activePaper])

  const scrollToPaper = (idx: number) => {
    const container = contentRef.current
    const paper = paperRefs.current[idx]
    if (container && paper) {
      const containerTop = container.getBoundingClientRect().top
      const paperTop = paper.getBoundingClientRect().top
      const offset = paperTop - containerTop + container.scrollTop
      container.scrollTo({ top: offset, behavior: "smooth" })
    }
    setActivePaper(idx)
  }

  return (
    <section className={cn("py-12 md:py-16", index % 2 === 0 ? "section-surface" : "section-muted")}>
      <Container>
        <Reveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="pill">{index + 1}</span>
              <h3 className="font-serif text-2xl font-semibold">{area.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-3xl">{area.subtitle}</p>
            <p className="text-base text-muted-foreground mt-4 max-w-4xl leading-relaxed">
              {area.description}
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <Card className="ise-panel overflow-hidden">
            <CardContent className="p-4 sm:p-5">
              <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:gap-5">
                <nav className="shrink-0 lg:w-56 lg:border-r lg:border-border/40 lg:pr-4">
                  <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Publications Timeline
                  </p>
                  <div className="-mx-1 flex gap-1.5 overflow-x-auto px-2 py-1 lg:hidden">
                    {sortedPapers.map((paper, idx) => (
                      <button
                        key={paper.id}
                        ref={(el) => { mobileNavRefs.current[idx] = el }}
                        onClick={() => scrollToPaper(idx)}
                        className={cn(
                          "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors",
                          activePaper === idx
                            ? "bg-primary/10 font-semibold text-primary"
                            : "bg-muted/30 text-muted-foreground"
                        )}
                      >
                        {paper.year}
                      </button>
                    ))}
                  </div>
                  <div className="hidden max-h-96 space-y-1 overflow-y-auto lg:block">
                    {sortedPapers.map((paper, idx) => (
                      <button
                        key={paper.id}
                        ref={(el) => { navRefs.current[idx] = el }}
                        onClick={() => scrollToPaper(idx)}
                        className={cn(
                          "relative block w-full text-left transition-colors pl-4 py-2",
                          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5",
                          activePaper === idx
                            ? "before:bg-primary"
                            : "before:bg-border/60 hover:before:bg-border"
                        )}
                      >
                        <time className={cn(
                          "text-[0.65rem] font-semibold",
                          activePaper === idx ? "text-primary" : "text-muted-foreground"
                        )}>
                          {paper.year}
                        </time>
                        <p className={cn(
                          "text-xs leading-snug mt-0.5 line-clamp-2",
                          activePaper === idx
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        )}>
                          {paper.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </nav>

                <div
                  ref={contentRef}
                  className="max-h-96 min-w-0 flex-1 space-y-4 overflow-y-auto pr-2"
                >
                  {sortedPapers.map((paper, idx) => (
                    <div
                      key={paper.id}
                      ref={(el) => { paperRefs.current[idx] = el }}
                      className="scroll-mt-4"
                    >
                      <PaperCard paper={paper} isActive={activePaper === idx} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Container>
    </section>
  )
}

function PaperCard({ paper, isActive }: { paper: Paper; isActive: boolean }) {
  const hasImages = paper.images && paper.images.length > 0

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all",
        isActive
          ? "border-primary/30 bg-primary/5"
          : "border-border/60 bg-background/50"
      )}
    >
      {hasImages && paper.images!.length > 1 && (
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {paper.images!.map((img, idx) => (
            <div
              key={idx}
              className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md bg-muted"
            >
              <Image
                src={img}
                alt={`${paper.title} - Image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        {hasImages && paper.images!.length === 1 && (
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={paper.images![0]}
              alt={paper.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <Badge variant="outline" className="text-[0.6rem] mb-2">
            {paper.year}
          </Badge>

          <h4 className="text-sm font-semibold leading-snug mb-1.5">
            {paper.title}
          </h4>

          <p className="text-xs text-muted-foreground mb-1">
            {paper.authors}
          </p>

          <p className="text-xs text-muted-foreground italic">
            {paper.venue}
          </p>

          {paper.description && (
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {paper.description}
            </p>
          )}

          {paper.doi && (
            <Link
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              className="text-xs text-primary hover:underline mt-2 inline-block"
            >
              DOI: {paper.doi}
            </Link>
          )}
          {!paper.doi && paper.link && (
            <Link
              href={paper.link}
              target="_blank"
              className="text-xs text-primary hover:underline mt-2 inline-block"
            >
              View Paper →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

type ContributeContentProps = {
  researchAreas: ResearchArea[]
  codeAndData: CodeDataItem[]
}

export function ContributeContent({ researchAreas, codeAndData }: ContributeContentProps) {
  return (
    <div className="bg-background">
      <Section kicker="Contribute" title="Research & Resources" bg="primary">
        <p className="text-base max-w-2xl">
          Explore our research areas, publications, and open-source code and datasets
          that advance intelligent sensing and environmental observation.
        </p>
      </Section>

      {researchAreas.map((area, index) => (
        <ResearchAreaSection key={area.id} area={area} index={index} />
      ))}

      <Section kicker="Open Source" title="Code & Data Access" colorIndex={1}>
        <p className="text-base max-w-2xl mb-8">
          We believe in open science. Access our code repositories and benchmark datasets
          to reproduce our research or build upon our work.
        </p>
      </Section>

      <section className="py-12 md:py-16 section-muted">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Reveal>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="pill">Code</span>
                  Repositories
                </h4>
              </Reveal>
              <div className="space-y-3">
                {codeAndData
                  .filter((item) => item.type === "code")
                  .map((item, idx) => (
                    <Reveal key={item.id} delayMs={idx * 40}>
                      <Link
                        href={item.link}
                        target="_blank"
                        className="block ise-panel p-4 hover:-translate-y-0.5 transition-all group"
                      >
                        <h5 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="pill">Data</span>
                  Datasets
                </h4>
              </Reveal>
              <div className="space-y-3">
                {codeAndData
                  .filter((item) => item.type === "dataset")
                  .map((item, idx) => (
                    <Reveal key={item.id} delayMs={idx * 40}>
                      <Link
                        href={item.link}
                        target="_blank"
                        className="block ise-panel p-4 hover:-translate-y-0.5 transition-all group"
                      >
                        <h5 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
