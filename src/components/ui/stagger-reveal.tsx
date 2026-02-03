"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type StaggerRevealProps = {
  delayMs?: number
  durationMs?: number
  y?: number
  once?: boolean
  rootMargin?: string
  threshold?: number
  className?: string
  children?: React.ReactNode
}

function StaggerReveal({
  delayMs = 0,
  durationMs = 450,
  y = 10,
  once = true,
  rootMargin = "0px 0px 20% 0px",
  threshold = 0.05,
  className,
  children,
}: StaggerRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return (
    <div
      ref={ref}
      className={cn("stagger-reveal", visible && "is-visible", className)}
      style={
        {
          "--stagger-delay": `${delayMs}ms`,
          "--stagger-duration": `${durationMs}ms`,
          "--stagger-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

export { StaggerReveal }
