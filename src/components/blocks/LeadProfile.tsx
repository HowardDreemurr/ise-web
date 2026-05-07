"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import {
  Badge,
  Card,
  CardContent,
  StatCard,
} from "@/components"
import { cn } from "@/lib/utils"
import type { LeadProfessor } from "@/lib/content"

type LeadProfileProps = {
  profile: LeadProfessor
}

export function LeadProfile({ profile }: LeadProfileProps) {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const mobileNavRefs = useRef<(HTMLButtonElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  // Filter out "Highly Cited Papers" from metrics
  const filteredMetrics = profile.metrics.filter(
    (metric) => metric.label !== "Highly Cited Papers"
  )

  // Handle scroll spy with container scroll
  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      let currentIndex = 0

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          // Check if section top is at or above the container top (with small offset)
          if (rect.top <= containerRect.top + 50) {
            currentIndex = index
          }
        }
      })

      if (currentIndex !== activeSection) {
        setActiveSection(currentIndex)
        // Scroll the active nav button into view (both mobile and desktop)
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
  }, [activeSection])

  const scrollToSection = (index: number) => {
    const container = contentRef.current
    const section = sectionRefs.current[index]
    if (container && section) {
      // Scroll within the container, not the whole page
      const containerTop = container.getBoundingClientRect().top
      const sectionTop = section.getBoundingClientRect().top
      const offset = sectionTop - containerTop + container.scrollTop
      container.scrollTo({ top: offset, behavior: "smooth" })
    }
    setActiveSection(index)
  }

  return (
    <Card className="ice-panel overflow-hidden md:col-span-2">
      <CardContent className="p-4 sm:p-5">
        {/* Two columns: Profile+Stats on left, Sections on right */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* Left column: Profile header + Intro + Stats */}
          <div className="min-w-0 space-y-4">
            {/* Profile header with image */}
            <div className="flex items-start gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-primary/10 sm:h-20 sm:w-20">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-primary">
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="notable" className="text-[0.55rem] tracking-[0.2em]">
                    GROUP LEAD
                  </Badge>
                  <Badge variant="outline" className="text-[0.55rem] tracking-[0.15em]">
                    {profile.affiliation}
                  </Badge>
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold sm:text-2xl">
                    {profile.name}
                  </h2>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {profile.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Intro */}
            <p className="text-sm leading-relaxed text-muted-foreground">{profile.focus}</p>

            {/* Stats in a row - prevent overflow */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {filteredMetrics.map((metric) => (
                <StatCard
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  note={metric.note}
                />
              ))}
            </div>
          </div>

          {/* Right column: Section navigator with content */}
          <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border/60 bg-background/50 p-3 lg:flex-row lg:gap-4 lg:p-4">
            {/* Section switchers */}
            <nav className="shrink-0 lg:w-36 lg:border-r lg:border-border/40 lg:pr-3">
              <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Sections
              </p>
              {/* Mobile: horizontal scroll with center-to-side gradient */}
              <div
                className="-mx-1 flex gap-1.5 overflow-x-auto px-4 py-1 lg:hidden"
                style={{
                  background: "linear-gradient(to right, transparent, var(--muted) 30%, var(--muted) 70%, transparent)",
                }}
              >
                  {profile.sections.map((section, index) => (
                    <button
                      key={section.title}
                      ref={(el) => { mobileNavRefs.current[index] = el }}
                      onClick={() => scrollToSection(index)}
                      className={cn(
                        "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
                        activeSection === index
                          ? "bg-primary/10 font-semibold text-primary"
                          : "bg-muted/30 text-muted-foreground"
                      )}
                    >
                      {section.title}
                    </button>
                ))}
              </div>
              {/* Desktop: vertical list */}
              <div className="hidden max-h-100 space-y-0.5 overflow-y-auto lg:block">
                {profile.sections.map((section, index) => (
                  <button
                    key={section.title}
                    ref={(el) => { navRefs.current[index] = el }}
                    onClick={() => scrollToSection(index)}
                    className={cn(
                      "block w-full rounded-md px-2.5 py-1.5 text-left text-xs transition-colors",
                      activeSection === index
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content area - scrollable container */}
            <div
              ref={contentRef}
              className="max-h-75 min-w-0 flex-1 space-y-6 overflow-y-auto overflow-x-hidden pr-2 lg:max-h-100"
            >
              {profile.sections.map((section, index) => (
                <div
                  key={section.title}
                  ref={(el) => { sectionRefs.current[index] = el }}
                  className="scroll-mt-4"
                >
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                    {section.title}
                  </h4>
                  <ul className="list-disc space-y-1.5 overflow-hidden wrap-break-word pl-5 text-sm text-muted-foreground">
                    {section.items.map((item, itemIndex) => (
                      <li key={`${section.title}-${itemIndex}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
