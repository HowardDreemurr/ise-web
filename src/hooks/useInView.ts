"use client"

import { useEffect, useRef, useState } from "react"

export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.18, ...options }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, inView } as const
}
