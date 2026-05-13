"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./card"
import Image from "next/image"
import Link from "next/link"
import type { HTMLAttributes } from "react"

export type TimelineItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  tag?: string
  content?: string
  imageUrl?: string
  links?: { label: string; href: string }[]
}

type TimelinePanelProps = HTMLAttributes<HTMLDivElement> & {
  items: TimelineItem[]
}

export function TimelinePanel({ items, className, ...props }: TimelinePanelProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "")
  const activeItem = items.find((item) => item.id === activeId) ?? items[0]

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-8", className)} {...props}>
      {/* Left: Timeline navigation */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <nav
          className="flex flex-row lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
          role="tablist"
          aria-label="Timeline"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === activeId}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "group relative text-left py-3 px-4 lg:pl-5 lg:pr-3 transition-all duration-300 rounded-xl lg:rounded-none shrink-0",
                "lg:border-l-2 border lg:border-y-0 lg:border-r-0",
                item.id === activeId
                  ? "border-primary bg-primary/5 lg:border-l-primary"
                  : "border-border lg:border-l-border hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              {/* Timeline dot - only on desktop */}
              <span
                className={cn(
                  "hidden lg:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300",
                  item.id === activeId
                    ? "bg-primary border-primary scale-125"
                    : "bg-background border-border group-hover:border-primary/50"
                )}
              />
              <time className="block text-[11px] text-muted-foreground mb-0.5">
                {item.date}
              </time>
              <span
                className={cn(
                  "block text-sm font-medium leading-snug transition-colors whitespace-nowrap lg:whitespace-normal",
                  item.id === activeId ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Right: Detail panel - scrollable */}
      <div className="min-h-[400px] lg:min-h-[500px]">
        <Card className="ise-panel overflow-hidden h-full flex flex-col">
          {activeItem?.imageUrl && (
            <div className="relative h-48 md:h-56 shrink-0">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <CardHeader className="shrink-0">
            <div className="flex items-center gap-3 flex-wrap">
              <CardDescription>{activeItem?.date}</CardDescription>
              {activeItem?.tag && <Badge variant="outline">{activeItem.tag}</Badge>}
            </div>
            <CardTitle className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
              {activeItem?.title}
            </CardTitle>
            {activeItem?.subtitle && (
              <CardDescription className="text-sm mt-1">
                {activeItem.subtitle}
              </CardDescription>
            )}
          </CardHeader>

          {activeItem?.content && (
            <CardContent className="flex-1 overflow-y-auto">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {activeItem.content}
              </p>
            </CardContent>
          )}

          {activeItem?.links && activeItem.links.length > 0 && (
            <CardFooter className="flex flex-wrap gap-2 shrink-0 border-t pt-4">
              {activeItem.links.map((link) => (
                <Button key={link.href} variant="ghost" size="sm" asChild>
                  <Link href={link.href}>
                    {link.label} &rarr;
                  </Link>
                </Button>
              ))}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
