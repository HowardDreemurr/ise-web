"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Reveal-when-visible hook with back-navigation safety.
 *
 * The plain IntersectionObserver case handles the normal "scroll something
 * into view" animation. Everything else here is rescue logic for the case
 * where Next remounts a page after a browser back-navigation:
 *
 *   - Every Reveal resets to `opacity-0` (state is local to the mount).
 *   - Scroll position is restored asynchronously *after* render, so anything
 *     that ends up above the viewport never triggers IO (IO fires for the
 *     "below → in" transition, not "below → above").
 *   - Programmatic scrolls (Next's restore uses `window.scrollTo`, often with
 *     `behavior: "instant"`) may not fire a `scroll` event at all in some
 *     browsers — so a one-shot scroll listener can miss it.
 *
 * Strategy: do a rect-check at several points after mount so at least one of
 * them runs *after* scroll restoration regardless of timing. Once revealed,
 * the `done` flag short-circuits everything.
 */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let done = false
    const reveal = () => {
      if (done) return
      done = true
      setInView(true)
    }

    // Reveal if the element is in *or above* the viewport.
    const checkRect = () => {
      if (done) return
      const node = ref.current
      if (!node) return
      if (node.getBoundingClientRect().top < window.innerHeight) reveal()
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal()
      },
      { threshold: 0.18, ...options },
    )
    obs.observe(el)

    // Rescue checks at multiple timings — at least one fires *after* the
    // browser's scroll-restoration tick on back-navigation.
    const raf = requestAnimationFrame(checkRect)
    const t1 = setTimeout(checkRect, 50)
    const t2 = setTimeout(checkRect, 250)
    const t3 = setTimeout(checkRect, 600)

    // Extra rescue: scroll event (e.g. user starts scrolling, or restoration
    // fires one synchronous scroll); pageshow (bfcache restore).
    const onScroll = () => checkRect()
    window.addEventListener("scroll", onScroll, { passive: true })
    const onPageShow = () => checkRect()
    window.addEventListener("pageshow", onPageShow)

    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pageshow", onPageShow)
    }
    // `options` is intentionally not in deps — call sites always pass a
    // literal (or undefined), so rebuilding the observer on every render
    // would flood the page with new IO instances.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, inView } as const
}
