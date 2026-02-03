"use client"

import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/useInView"
import type { ReactNode, HTMLAttributes } from "react"

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  delayMs?: number
  y?: number
}

export function Reveal({
  children,
  className,
  delayMs = 0,
  y = 12,
  ...props
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        transitionDelay: `${delayMs}ms`,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
