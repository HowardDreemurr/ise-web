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
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.18, ...options },
    )
    obs.observe(el)

    // An IntersectionObserver never fires for an element that's already
    // entirely above the viewport — which is exactly where scroll restoration
    // lands a lot of content after a back-navigation (Next re-mounts the page,
    // so every Reveal resets to opacity-0). Without this it stays stuck hidden.
    // After layout, reveal anything that's in or above the viewport in one shot.
    const raf = requestAnimationFrame(() => {
      const node = ref.current
      if (node && node.getBoundingClientRect().top < window.innerHeight) {
        setInView(true)
        obs.disconnect()
      }
    })

    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return { ref, inView } as const
}
