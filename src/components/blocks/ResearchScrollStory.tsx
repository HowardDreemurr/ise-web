"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Handshake,
  Mail,
} from "lucide-react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react"

import { cn, withBasePath } from "@/lib/utils"

/*
 * Scroll-driven story for /research.
 *
 * Eight scenes, one per ResearchSlides.pptx slide. Each scene ships two
 * renders:
 *
 *   DESKTOP (pin variant active — ≥ 768px wide AND ≥ 880px tall)
 *     A 4:3 stage that fills the available viewport. Every image and text
 *     block sits at its exact EMU coordinate from the original pptx, so
 *     the slide's composition is preserved.
 *
 *   MOBILE / SHORT VIEWPORT (pin variant inactive)
 *     The same slide content reflows into a vertical column — a title
 *     header, then a card grid of images + captions. Each "slide" is one
 *     scrollable section; nothing is squeezed into a tiny 4:3 box.
 *
 * Both renders share the same `--scene-p` scroll-progress variable, so the
 * scroll-driven reveal works identically in either mode.
 */

// ──────────────────────────────────────────────────────────────────────────
// EMU → percent of 4:3 stage
// ──────────────────────────────────────────────────────────────────────────

const EMU_W = 9144000
const EMU_H = 6858000

function emuPos(x: number, y: number, w: number, h: number): CSSProperties {
  return {
    position: "absolute",
    left: `${(x / EMU_W) * 100}%`,
    top: `${(y / EMU_H) * 100}%`,
    width: `${(w / EMU_W) * 100}%`,
    height: `${(h / EMU_H) * 100}%`,
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Scroll-driven animation — compressed into the first 55% of scene
// progress, so the back half is dwell.
// ──────────────────────────────────────────────────────────────────────────

const ANIM_P = "min(1, calc(var(--scene-p, 0) / 0.55))"
const VIS = `clamp(0, calc((${ANIM_P} - var(--ti, 0)) / var(--td, 1)), 1)`

type LayerTiming = { ti: number; td: number; lift?: number }

function timingVars({ ti, td, lift = 24 }: LayerTiming): CSSProperties {
  return {
    "--ti": ti,
    "--td": td,
    "--lift": `${lift}px`,
  } as CSSProperties
}

const LAYER_BASE: CSSProperties = {
  opacity: VIS as unknown as number,
  transform: `translateY(calc((1 - ${VIS}) * var(--lift, 24px)))`,
  willChange: "opacity, transform",
}

// ──────────────────────────────────────────────────────────────────────────
// Scene wrapper
// ──────────────────────────────────────────────────────────────────────────

type SceneProps = {
  index: number
  total: number
  bg?: string
  length?: number
  children: ReactNode
}

function Scene({
  index,
  total,
  bg = "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
  length = 1.6,
  children,
}: SceneProps) {
  const wrapperRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)

  const update = useCallback(() => {
    const wrap = wrapperRef.current
    const stage = stageRef.current
    if (!wrap || !stage) return
    const rect = wrap.getBoundingClientRect()
    const vh = window.innerHeight
    const total = rect.height + vh
    const passed = vh - rect.top
    const p = Math.max(0, Math.min(1, passed / total))
    stage.style.setProperty("--scene-p", String(p))
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [update])

  useLayoutEffect(update, [update])

  return (
    <section
      ref={wrapperRef}
      data-scene={index}
      className="relative pin:min-h-[var(--scene-min-h)]"
      style={
        {
          "--scene-min-h": `calc(${length} * 100vh + 100vh)`,
        } as CSSProperties
      }
    >
      <div
        ref={stageRef}
        // Pin 80 px below the viewport top so the site's sticky header
        // (h-[80px], z-50) doesn't crop the scene's title ribbon.
        className="relative w-full pin:sticky pin:top-[80px] pin:h-[calc(100vh-80px)] pin:overflow-hidden"
        style={{
          background: bg,
          ...({ "--scene-p": 0 } as CSSProperties),
        }}
      >
        {/* Slim scene index — desktop with room only. */}
        <ol
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 select-none pin:right-5 pin:block"
        >
          {Array.from({ length: total }, (_, i) => (
            <li key={i} className="my-2">
              <span
                className="block rounded-full"
                style={{
                  width: i === index ? "3px" : "2px",
                  height: i === index ? "18px" : "6px",
                  background:
                    i === index
                      ? "rgba(30,58,138,0.9)"
                      : "rgba(30,58,138,0.22)",
                }}
              />
            </li>
          ))}
        </ol>

        {/* Outer holder. Mobile: vertical padding for flow. Desktop: flex
            centred so the 4:3 stage sits in the middle of the viewport. */}
        <div className="relative mx-auto w-full max-w-[1800px] px-4 py-14 sm:px-6 sm:py-20 pin:flex pin:h-full pin:items-center pin:justify-center pin:px-4 pin:py-0">
          {children}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// Desktop primitives — used inside the 4:3 stage
// ══════════════════════════════════════════════════════════════════════════

function DesktopStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative mx-auto hidden w-full pin:block"
      style={{
        aspectRatio: "4 / 3",
        // Height budget excludes the 80 px header and a small breathing
        // margin so the stage never touches the header band.
        maxWidth: "min(98vw, calc((100vh - 96px) * 4 / 3))",
      }}
    >
      {children}
    </div>
  )
}

function PicLayer({
  src,
  alt,
  emuRect,
  timing,
  fit = "contain",
  rounded = true,
}: {
  src: string
  alt: string
  emuRect: [number, number, number, number]
  timing: LayerTiming
  fit?: "cover" | "contain"
  rounded?: boolean
}) {
  const [x, y, w, h] = emuRect
  return (
    <div
      className={cn(
        "overflow-hidden bg-white/40 shadow-[0_8px_22px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/5",
        rounded && "rounded-md",
      )}
      style={{
        ...LAYER_BASE,
        ...emuPos(x, y, w, h),
        ...timingVars(timing),
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 1100px, 96vw"
        className={fit === "cover" ? "object-cover" : "object-contain"}
        unoptimized
        draggable={false}
      />
    </div>
  )
}

function TextLayer({
  emuRect,
  timing,
  align = "left",
  children,
  className,
}: {
  emuRect: [number, number, number, number]
  timing: LayerTiming
  align?: "left" | "center" | "right"
  children: ReactNode
  className?: string
}) {
  const [x, y, w, h] = emuRect
  return (
    <div
      className={cn(
        "flex items-center",
        align === "center" && "justify-center text-center",
        align === "right" && "justify-end text-right",
        className,
      )}
      style={{
        ...LAYER_BASE,
        ...emuPos(x, y, w, h),
        ...timingVars(timing),
      }}
    >
      <div className="w-full">{children}</div>
    </div>
  )
}

function TitleRibbon({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute flex items-center rounded-md px-4 text-white shadow-[0_6px_18px_-6px_rgba(30,58,138,0.55)]"
      style={{
        left: "6.8%",
        top: "4.2%",
        width: "86.3%",
        height: "7%",
        background: "linear-gradient(90deg, #1e3a8a 0%, #0369a1 100%)",
        ...LAYER_BASE,
        ...timingVars({ ti: 0, td: 0.1, lift: -8 }),
      }}
    >
      <span
        className="font-serif font-bold leading-none tracking-tight"
        style={{ fontSize: "clamp(14px, 1.6vw, 22px)" }}
      >
        {children}
      </span>
    </div>
  )
}

function Subtitle({
  children,
  ti = 0.04,
}: {
  children: ReactNode
  ti?: number
}) {
  return (
    <div
      className="absolute"
      style={{
        left: "6.8%",
        top: "12.5%",
        width: "86.3%",
        ...LAYER_BASE,
        ...timingVars({ ti, td: 0.14 }),
      }}
    >
      <span
        className="font-serif font-bold"
        style={{ color: "#1e3a8a", fontSize: "clamp(12px, 1.25vw, 18px)" }}
      >
        {children}
      </span>
    </div>
  )
}

function SubSubtitle({
  children,
  ti = 0.08,
}: {
  children: ReactNode
  ti?: number
}) {
  return (
    <div
      className="absolute"
      style={{
        left: "6.8%",
        top: "18%",
        width: "86.3%",
        ...LAYER_BASE,
        ...timingVars({ ti, td: 0.14 }),
      }}
    >
      <span
        className="font-sans font-semibold"
        style={{ color: "#1e3a8a", fontSize: "clamp(11px, 1.1vw, 16px)" }}
      >
        {children}
      </span>
    </div>
  )
}

function Caption({
  emuRect,
  timing,
  align = "center",
  children,
}: {
  emuRect: [number, number, number, number]
  timing: LayerTiming
  align?: "left" | "center" | "right"
  children: ReactNode
}) {
  return (
    <TextLayer emuRect={emuRect} timing={timing} align={align}>
      <span
        className="font-sans leading-snug text-foreground/85"
        style={{ fontSize: "clamp(10px, 0.95vw, 13px)" }}
      >
        {children}
      </span>
    </TextLayer>
  )
}

// Horizontal arrow connector — line + chevron tip on the right.
function ArrowLayer({
  emuRect,
  timing,
}: {
  emuRect: [number, number, number, number]
  timing: LayerTiming
}) {
  const [x, y, w] = emuRect
  // Render at the line's y, with a small allowance for the arrowhead height.
  const renderH = 240000 // EMU — fixed visual band
  return (
    <div
      className="flex items-center"
      style={{
        ...LAYER_BASE,
        ...emuPos(x, y - renderH / 2, w, renderH),
        ...timingVars(timing),
      }}
    >
      <span className="block h-[2px] flex-1 bg-[#1e3a8a]/55" />
      <span
        aria-hidden
        className="block h-0 w-0 shrink-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-[#1e3a8a]/65"
      />
    </div>
  )
}

// PowerPoint "cloud" auto-shape, as an SVG path.
function CloudShape({
  emuRect,
  timing,
  children,
}: {
  emuRect: [number, number, number, number]
  timing: LayerTiming
  children: ReactNode
}) {
  const [x, y, w, h] = emuRect
  return (
    <div
      className="relative"
      style={{
        ...LAYER_BASE,
        ...emuPos(x, y, w, h),
        ...timingVars(timing),
      }}
    >
      <svg
        viewBox="0 0 240 130"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <path
          d="M48,108
             C18,108 6,86 22,68
             C2,58 14,30 42,32
             C46,10 96,4 110,28
             C140,12 184,22 184,48
             C214,46 232,72 218,92
             C220,118 184,124 168,110
             C158,124 128,124 118,110
             C100,124 70,124 62,112
             C56,118 50,116 48,108 Z"
          fill="white"
          stroke="#0369a1"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative flex h-full w-full items-center justify-center px-2">
        {children}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// Mobile primitives — used in the vertical reflow
// ══════════════════════════════════════════════════════════════════════════

function MobileFlow({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto block w-full max-w-3xl pin:hidden">{children}</div>
  )
}

function MobileHeader({
  title,
  subtitle,
  subsubtitle,
  intro,
}: {
  title: string
  subtitle?: ReactNode
  subsubtitle?: ReactNode
  intro?: ReactNode
}) {
  return (
    <header className="mb-7">
      <div
        className="flex items-center rounded-lg px-4 py-3 text-white shadow-[0_8px_22px_-10px_rgba(30,58,138,0.55)]"
        style={{
          background: "linear-gradient(90deg, #1e3a8a 0%, #0369a1 100%)",
          ...LAYER_BASE,
          ...timingVars({ ti: 0, td: 0.1, lift: -8 }),
        }}
      >
        <span className="font-serif text-lg font-bold leading-none tracking-tight sm:text-xl">
          {title}
        </span>
      </div>
      {subtitle && (
        <div
          className="mt-3 font-serif text-base font-bold leading-tight text-[#1e3a8a] sm:text-lg"
          style={{ ...LAYER_BASE, ...timingVars({ ti: 0.04, td: 0.14 }) }}
        >
          {subtitle}
        </div>
      )}
      {subsubtitle && (
        <div
          className="mt-1.5 font-sans text-sm font-semibold text-[#1e3a8a] sm:text-[15px]"
          style={{ ...LAYER_BASE, ...timingVars({ ti: 0.08, td: 0.14 }) }}
        >
          {subsubtitle}
        </div>
      )}
      {intro && (
        <div
          className="mt-4 text-[14.5px] leading-relaxed text-foreground/80"
          style={{ ...LAYER_BASE, ...timingVars({ ti: 0.12, td: 0.18 }) }}
        >
          {intro}
        </div>
      )}
    </header>
  )
}

type MobileCardProps = {
  src: string
  alt: string
  caption?: ReactNode
  fit?: "cover" | "contain"
  aspect?: string
  ti: number
  className?: string
}

function MobileCard({
  src,
  alt,
  caption,
  fit = "contain",
  aspect = "16/10",
  ti,
  className,
}: MobileCardProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl bg-white/70 shadow-[0_10px_22px_-14px_rgba(15,23,42,0.35)] ring-1 ring-black/5",
        className,
      )}
      style={{
        ...LAYER_BASE,
        ...timingVars({ ti, td: 0.18, lift: 20 }),
      }}
    >
      <div
        className="relative w-full bg-[#f4f6fb]"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 360px, 90vw"
          className={fit === "cover" ? "object-cover" : "object-contain p-1.5"}
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="px-3 py-2.5 text-[12.5px] leading-snug text-foreground/80">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function MobileSectionHeader({
  children,
  ti,
}: {
  children: ReactNode
  ti: number
}) {
  return (
    <h4
      className="mb-3 mt-6 border-l-[3px] border-[#0369a1] pl-3 font-serif text-base font-bold leading-tight text-[#0c4a6e] sm:text-[17px]"
      style={{
        ...LAYER_BASE,
        ...timingVars({ ti, td: 0.16 }),
      }}
    >
      {children}
    </h4>
  )
}

function PillarTile({
  label,
  cloud = false,
}: {
  label: string
  cloud?: boolean
}) {
  if (cloud) {
    return (
      <div className="relative flex flex-1 items-center justify-center">
        <svg
          viewBox="0 0 240 130"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path
            d="M48,108 C18,108 6,86 22,68 C2,58 14,30 42,32 C46,10 96,4 110,28 C140,12 184,22 184,48 C214,46 232,72 218,92 C220,118 184,124 168,110 C158,124 128,124 118,110 C100,124 70,124 62,112 C56,118 50,116 48,108 Z"
            fill="white"
            stroke="#0369a1"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative px-1.5 py-3 font-serif text-[11.5px] font-bold leading-tight text-[#0c4a6e]">
          {label}
        </span>
      </div>
    )
  }
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg bg-white/70 px-1.5 py-3 ring-1 ring-black/5">
      <span className="font-serif text-[11.5px] font-bold leading-tight text-[#0c4a6e]">
        {label}
      </span>
    </div>
  )
}

function ArrowDivider() {
  return (
    <div className="flex w-4 shrink-0 items-center justify-center">
      <span className="block h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-[#1e3a8a]/60" />
    </div>
  )
}

function MobileGrid({
  cols = 2,
  children,
}: {
  cols?: 1 | 2 | 3
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        cols === 1
          ? "grid-cols-1"
          : cols === 3
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2",
      )}
    >
      {children}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Asset paths
// ──────────────────────────────────────────────────────────────────────────

const IMG = (n: string) => withBasePath(`/research/slides/${n}`)

const SCENE_COUNT = 9

// ══════════════════════════════════════════════════════════════════════════
// 1. Vision
// ══════════════════════════════════════════════════════════════════════════

function SceneVision() {
  const intro = (
    <>
      Novel machine-learning and intelligent-sensing methods for acquiring and
      processing environment observations. We envision these scientific
      investigations to advance important real-world applications including
      natural-disaster management, environmental protection, and the digital
      economy.
    </>
  )
  return (
    <Scene
      index={0}
      total={SCENE_COUNT}
      length={1.6}
      bg="radial-gradient(ellipse at 50% 25%, #eef4ff 0%, #f8fbff 60%, #ffffff 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>1. Vision</TitleRibbon>

        {/* Intro paragraph — PPTX positions. */}
        <TextLayer
          emuRect={[624187, 1180000, 7895622, 750000]}
          timing={{ ti: 0.1, td: 0.2 }}
        >
          <p
            className="font-sans leading-relaxed text-foreground/80"
            style={{ fontSize: "clamp(11px, 1.05vw, 15px)" }}
          >
            {intro}
          </p>
        </TextLayer>

        <PicLayer
          src={IMG("image2.jpeg")}
          alt="Earth globe"
          emuRect={[2312064, 1875085, 4519867, 2542425]}
          timing={{ ti: 0.18, td: 0.24, lift: 40 }}
          rounded={false}
        />
        <PicLayer
          src={IMG("image3.jpeg")}
          alt="Wildfire"
          emuRect={[1366958, 2906316, 1427594, 799453]}
          timing={{ ti: 0.3, td: 0.18 }}
        />
        <PicLayer
          src={IMG("image4.png")}
          alt="Hurricane impact"
          emuRect={[6397013, 2861036, 1427594, 712635]}
          timing={{ ti: 0.34, td: 0.18 }}
        />
        <PicLayer
          src={IMG("image6.jpeg")}
          alt="Flooded city"
          emuRect={[1995032, 4057424, 1427594, 852945]}
          timing={{ ti: 0.38, td: 0.18 }}
        />
        <PicLayer
          src={IMG("image5.png")}
          alt="Landslide"
          emuRect={[4047987, 4396314, 1314735, 754147]}
          timing={{ ti: 0.42, td: 0.18 }}
        />
        <PicLayer
          src={IMG("image7.jpeg")}
          alt="Foggy skyline"
          emuRect={[6043019, 4124858, 1786427, 714571]}
          timing={{ ti: 0.46, td: 0.18 }}
        />

        {/* Three pillars connected by arrows; Decision Making sits inside
            a cloud — all at the exact PPTX EMU positions. */}
        <TextLayer
          emuRect={[1761507, 5523903, 2016899, 307777]}
          timing={{ ti: 0.52, td: 0.18 }}
          align="center"
        >
          <span
            className="font-serif font-bold"
            style={{
              color: "#0c4a6e",
              fontSize: "clamp(12px, 1.25vw, 18px)",
            }}
          >
            Sensing &amp; Observation
          </span>
        </TextLayer>

        <ArrowLayer
          emuRect={[3778406, 5677791, 313590, 1]}
          timing={{ ti: 0.55, td: 0.16 }}
        />

        <TextLayer
          emuRect={[4091996, 5523902, 1949316, 307777]}
          timing={{ ti: 0.57, td: 0.18 }}
          align="center"
        >
          <span
            className="font-serif font-bold"
            style={{
              color: "#0c4a6e",
              fontSize: "clamp(12px, 1.25vw, 18px)",
            }}
          >
            Processing &amp; Analysis
          </span>
        </TextLayer>

        <ArrowLayer
          emuRect={[6041312, 5677791, 284167, 1]}
          timing={{ ti: 0.6, td: 0.16 }}
        />

        <CloudShape
          emuRect={[6296711, 5222603, 1527896, 914400]}
          timing={{ ti: 0.62, td: 0.2 }}
        >
          <span
            className="font-serif font-bold"
            style={{
              color: "#0c4a6e",
              fontSize: "clamp(11px, 1.15vw, 17px)",
            }}
          >
            Decision Making
          </span>
        </CloudShape>

        {/* Tagline — runs under all three pillars. */}
        <TextLayer
          emuRect={[1498049, 6205803, 6147901, 369332]}
          timing={{ ti: 0.7, td: 0.18 }}
          align="center"
        >
          <span
            className="font-sans italic text-foreground/70"
            style={{ fontSize: "clamp(11px, 1vw, 14px)" }}
          >
            Better performance · Timelier processing · Higher resolution
          </span>
        </TextLayer>

        {/* "Updated in 2025" — bottom-right, as in the PPTX. */}
        <TextLayer
          emuRect={[7913713, 6587023, 1212191, 277000]}
          timing={{ ti: 0.78, td: 0.16 }}
          align="right"
        >
          <span
            className="font-sans font-semibold text-foreground/55"
            style={{ fontSize: "clamp(10px, 0.85vw, 12px)" }}
          >
            Updated in 2025
          </span>
        </TextLayer>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="1. Vision"
          subtitle={<span className="text-foreground/65">Updated in 2025</span>}
          intro={intro}
        />

        <div
          className="mb-5"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.18, td: 0.22, lift: 24 }),
          }}
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-white shadow-[0_10px_22px_-14px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
            <Image
              src={IMG("image2.jpeg")}
              alt="Earth globe"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        <MobileGrid cols={2}>
          <MobileCard
            src={IMG("image3.jpeg")}
            alt="Wildfire"
            fit="cover"
            aspect="4/3"
            ti={0.3}
          />
          <MobileCard
            src={IMG("image4.png")}
            alt="Hurricane"
            fit="cover"
            aspect="4/3"
            ti={0.34}
          />
          <MobileCard
            src={IMG("image6.jpeg")}
            alt="Flood"
            fit="cover"
            aspect="4/3"
            ti={0.38}
          />
          <MobileCard
            src={IMG("image5.png")}
            alt="Landslide"
            fit="cover"
            aspect="4/3"
            ti={0.42}
          />
          <MobileCard
            src={IMG("image7.jpeg")}
            alt="Foggy skyline"
            fit="cover"
            aspect="4/3"
            ti={0.46}
            className="col-span-2"
          />
        </MobileGrid>

        {/* Pillar flow: three labels connected by arrows; Decision Making
            sits inside the cloud shape, mirroring the slide. */}
        <div
          className="mt-7 flex items-stretch gap-1.5 text-center"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.56, td: 0.2 }),
          }}
        >
          <PillarTile label="Sensing & Observation" />
          <ArrowDivider />
          <PillarTile label="Processing & Analysis" />
          <ArrowDivider />
          <PillarTile label="Decision Making" cloud />
        </div>

        <p
          className="mt-4 text-center text-[12.5px] italic text-foreground/65"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.66, td: 0.18 }),
          }}
        >
          Better performance · Timelier processing · Higher resolution
        </p>

        <p
          className="mt-6 text-right text-[11.5px] font-semibold text-foreground/50"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.74, td: 0.16 }),
          }}
        >
          Updated in 2025
        </p>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 2. UN Sustainable Development Goals
// ══════════════════════════════════════════════════════════════════════════

const SDG_CHECKS: Array<[number, number, number, number]> = [
  [2180117, 1391803, 659336, 681160],
  [3539405, 1391803, 659336, 681160],
  [4949194, 1486479, 659336, 681160],
  [864664, 2816206, 659336, 681160],
  [2240275, 2817407, 659336, 681160],
  [7470001, 2755645, 659336, 681160],
  [2180117, 4189377, 659336, 681160],
  [3539405, 4152007, 659336, 681160],
  [4890595, 4239635, 659336, 681160],
]

function SceneSDGs() {
  // Calibration: 9 ticks calibrated as % of the SDG poster itself (1200×598,
  // ratio 2.007). Used for the mobile render where the poster fills the
  // width.
  const MOBILE_CHECKS = SDG_CHECKS.map(([x, y, w, h]) => {
    // poster on slide: offset (550948, 1153241), size (8042104, 4007090)
    const posterX0 = 550948
    const posterY0 = 1153241
    const posterW = 8042104
    const posterH = 4007090
    return {
      // tick centre relative to poster
      cx: ((x + w / 2 - posterX0) / posterW) * 100,
      cy: ((y + h / 2 - posterY0) / posterH) * 100,
      sz: (w / posterW) * 100,
    }
  })

  return (
    <Scene
      index={1}
      total={SCENE_COUNT}
      length={1.6}
      bg="radial-gradient(ellipse at 50% 40%, #f1f7ff 0%, #ffffff 70%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>1. Vision</TitleRibbon>
        <Subtitle>
          Relevant United Nations Sustainable Development Goals
        </Subtitle>

        <PicLayer
          src={IMG("image8.png")}
          alt="UN Sustainable Development Goals poster"
          emuRect={[550948, 1153241, 8042104, 4007090]}
          timing={{ ti: 0.05, td: 0.22, lift: 24 }}
          rounded={false}
          fit="contain"
        />

        {SDG_CHECKS.map((rect, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...LAYER_BASE,
              ...emuPos(rect[0], rect[1], rect[2], rect[3]),
              ...timingVars({ ti: 0.3 + i * 0.04, td: 0.16, lift: -10 }),
            }}
          >
            <Image
              src={IMG("image9.png")}
              alt=""
              fill
              className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
              unoptimized
            />
          </div>
        ))}
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="1. Vision"
          subtitle="Relevant United Nations Sustainable Development Goals"
        />

        <div
          className="relative w-full overflow-hidden rounded-xl bg-white shadow-[0_10px_22px_-14px_rgba(15,23,42,0.35)] ring-1 ring-black/5"
          style={{
            aspectRatio: "1200 / 598",
            ...LAYER_BASE,
            ...timingVars({ ti: 0.12, td: 0.22, lift: 22 }),
          }}
        >
          <Image
            src={IMG("image8.png")}
            alt="UN Sustainable Development Goals poster"
            fill
            className="object-contain"
            sizes="(min-width: 640px) 720px, 92vw"
            unoptimized
          />

          {MOBILE_CHECKS.map((c, i) => (
            <div
              key={i}
              className="pointer-events-none absolute"
              style={{
                left: `${c.cx}%`,
                top: `${c.cy}%`,
                width: `${c.sz}%`,
                aspectRatio: "1 / 1",
                ...LAYER_BASE,
                ...timingVars({
                  ti: 0.34 + i * 0.04,
                  td: 0.16,
                  lift: -8,
                }),
              }}
            >
              <div
                className="absolute inset-0"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <Image
                  src={IMG("image9.png")}
                  alt=""
                  fill
                  className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 3. Sensing & Observations — Autonomous vehicles
// ══════════════════════════════════════════════════════════════════════════

function SceneAutonomous() {
  return (
    <Scene
      index={2}
      total={SCENE_COUNT}
      length={1.7}
      bg="linear-gradient(180deg, #f8fbff 0%, #eef4fc 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>2. Research</TitleRibbon>
        <Subtitle>2.1 Sensing &amp; Observations</Subtitle>
        <SubSubtitle>
          Autonomous vehicles and optimisation strategies
        </SubSubtitle>

        <PicLayer
          src={IMG("image11.png")}
          alt="UAV-based wireless network monitoring a landslide site"
          emuRect={[1090246, 1631481, 2598457, 1601426]}
          timing={{ ti: 0.06, td: 0.18 }}
          fit="cover"
        />
        <Caption
          emuRect={[885701, 3325630, 3052557, 460000]}
          timing={{ ti: 0.18, td: 0.14 }}
        >
          UAV-based wireless network for disaster management
        </Caption>

        <PicLayer
          src={IMG("image10.png")}
          alt="Vehicular network with mobile edge computing"
          emuRect={[4138295, 1975691, 2263927, 1347058]}
          timing={{ ti: 0.16, td: 0.18 }}
        />
        <Caption
          emuRect={[3937550, 3325630, 3052557, 600000]}
          timing={{ ti: 0.27, td: 0.14 }}
        >
          Vehicular network with mobile computing
          <br />
          <span className="opacity-70">(Deep reinforcement learning)</span>
        </Caption>

        <PicLayer
          src={IMG("image13.png")}
          alt="3-D beamforming for 5G UAV broadcasting"
          emuRect={[1185545, 3985824, 2952750, 1660000]}
          timing={{ ti: 0.34, td: 0.18 }}
        />
        <Caption
          emuRect={[799441, 5780000, 3088640, 440000]}
          timing={{ ti: 0.46, td: 0.14 }}
        >
          Future networks supported by a swarm of autonomous vehicles
        </Caption>

        <PicLayer
          src={IMG("image12.png")}
          alt="Bird flock alongside drone V-formation"
          emuRect={[5024395, 4651303, 1200883, 815609]}
          timing={{ ti: 0.5, td: 0.18 }}
        />
        <Caption
          emuRect={[4214285, 5720647, 3052557, 460000]}
          timing={{ ti: 0.62, td: 0.14 }}
        >
          Bird flocks inspired autonomous-vehicle{" "}
          <b>coordination and formation</b>
        </Caption>

        <PicLayer
          src={IMG("image14.jpeg")}
          alt="Lab footage panels (a–d)"
          emuRect={[7190852, 1904358, 1561129, 4292858]}
          timing={{ ti: 0.7, td: 0.2 }}
          fit="cover"
        />

        {/* Citations — PPTX position. */}
        <TextLayer
          emuRect={[553066, 6197216, 7956582, 661720]}
          timing={{ ti: 0.78, td: 0.16 }}
          align="left"
        >
          <p
            className="font-sans leading-tight text-foreground/55"
            style={{ fontSize: "clamp(7px, 0.65vw, 9.5px)" }}
          >
            W. Zhan et al., &ldquo;Deep-Reinforcement-Learning-Based
            Offloading Scheduling for Vehicular Edge Computing,&rdquo;{" "}
            <i>IEEE Internet of Things Journal</i>, 7(6), 2020. ·{" "}
            C. Luo, W. Miao, H. Ullah, S. McClean, G. Parr, G. Min.
            Unmanned aerial vehicles for disaster management.{" "}
            <i>Geological disaster monitoring based on sensor networks</i>,
            83-107. ·{" "}
            J. Wu, C. Luo, Y. Luo, K. Li. Distributed UAV swarm formation
            and collision avoidance strategies over fixed and switching
            topologies. <i>IEEE T-CYB</i>, 2021. ·{" "}
            W. Miao, C. Luo, G. Min, Z. Zhao. Lightweight 3-D beamforming
            design in 5G UAV broadcasting communications.{" "}
            <i>IEEE T-BC</i>, 2020.
          </p>
        </TextLayer>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="2. Research"
          subtitle="2.1 Sensing & Observations"
          subsubtitle="Autonomous vehicles and optimisation strategies"
        />
        <MobileGrid cols={2}>
          <MobileCard
            src={IMG("image11.png")}
            alt="UAV wireless network for disaster monitoring"
            fit="cover"
            aspect="4/3"
            caption="UAV-based wireless network for disaster management"
            ti={0.18}
          />
          <MobileCard
            src={IMG("image10.png")}
            alt="Vehicular network with MEC"
            aspect="4/3"
            caption={
              <>
                Vehicular network with mobile computing
                <br />
                <span className="opacity-70">(Deep reinforcement learning)</span>
              </>
            }
            ti={0.24}
          />
          <MobileCard
            src={IMG("image13.png")}
            alt="3-D beamforming for 5G UAVs"
            aspect="4/3"
            caption="Future networks supported by a swarm of autonomous vehicles"
            ti={0.3}
          />
          <MobileCard
            src={IMG("image12.png")}
            alt="Bird flock and drone formation"
            aspect="4/3"
            caption={
              <>
                Bird flocks inspired autonomous-vehicle{" "}
                <b>coordination and formation</b>
              </>
            }
            ti={0.36}
          />
        </MobileGrid>
        <div className="mt-3">
          <MobileCard
            src={IMG("image14.jpeg")}
            alt="Lab footage panels (a–d)"
            fit="cover"
            aspect="16/9"
            caption="Lab footage of formation and coordination experiments."
            ti={0.44}
          />
        </div>

        <div
          className="mt-6 space-y-1.5 text-[10.5px] leading-snug text-foreground/55"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.56, td: 0.18 }),
          }}
        >
          <p>
            W. Zhan et al. &ldquo;Deep-Reinforcement-Learning-Based
            Offloading Scheduling for Vehicular Edge Computing.&rdquo;{" "}
            <i>IEEE Internet of Things Journal</i>, 7(6), 2020.
          </p>
          <p>
            C. Luo, W. Miao, H. Ullah, S. McClean, G. Parr, G. Min. &ldquo;Unmanned
            aerial vehicles for disaster management.&rdquo;{" "}
            <i>Geological disaster monitoring based on sensor networks</i>,
            83-107.
          </p>
          <p>
            J. Wu, C. Luo, Y. Luo, K. Li. &ldquo;Distributed UAV swarm
            formation and collision avoidance strategies.&rdquo;{" "}
            <i>IEEE T-CYB</i>, 2021.
          </p>
          <p>
            W. Miao, C. Luo, G. Min, Z. Zhao. &ldquo;Lightweight 3-D
            beamforming design in 5G UAV broadcasting communications.&rdquo;{" "}
            <i>IEEE T-BC</i>, 2020.
          </p>
        </div>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 4. Sensing & Observations — IoT sensors and networking
// ══════════════════════════════════════════════════════════════════════════

function SceneIoT() {
  return (
    <Scene
      index={3}
      total={SCENE_COUNT}
      length={2.0}
      bg="linear-gradient(180deg, #eef4fc 0%, #e7eef9 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>2. Research</TitleRibbon>
        <Subtitle>2.1 Sensing &amp; Observations</Subtitle>
        <SubSubtitle>IoT sensors and networking</SubSubtitle>

        {/* Upper group — IoT field sensors. */}
        <PicLayer
          src={IMG("image15.png")}
          alt="Schematic of an IoT sensor network for landslides"
          emuRect={[823694, 1562633, 1838960, 1664816]}
          timing={{ ti: 0.06, td: 0.16 }}
        />
        <PicLayer
          src={IMG("image16.jpeg")}
          alt="Digital surface model with sensor positions"
          emuRect={[2662654, 1571871, 1750249, 1470126]}
          timing={{ ti: 0.1, td: 0.16 }}
          fit="cover"
        />
        <PicLayer
          src={IMG("image17.jpeg")}
          alt="Slidecube battery-powered motion sensor"
          emuRect={[4466141, 1608724, 1074600, 606668]}
          timing={{ ti: 0.14, td: 0.16 }}
          fit="cover"
        />
        <PicLayer
          src={IMG("image18.jpeg")}
          alt="Motion sensor (Tag) inside a boulder enclosure"
          emuRect={[4701791, 2366958, 603300, 624247]}
          timing={{ ti: 0.18, td: 0.16 }}
          fit="cover"
        />
        <Caption
          emuRect={[5457232, 1694210, 1148071, 461665]}
          timing={{ ti: 0.2, td: 0.14 }}
          align="left"
        >
          Motion sensor
          <br />
          <span className="opacity-70">(Tag)</span>
        </Caption>
        <Caption
          emuRect={[5305091, 2477006, 1653642, 461665]}
          timing={{ ti: 0.24, td: 0.14 }}
          align="left"
        >
          <b>Slidecube</b>
          <br />
          <span className="opacity-70">
            (sensor part: 13 × 23 mm, 3 g)
          </span>
        </Caption>
        <PicLayer
          src={IMG("image21.png")}
          alt="Lab flume tank"
          emuRect={[6958733, 1568677, 1962570, 1476513]}
          timing={{ ti: 0.28, td: 0.16 }}
          fit="cover"
        />

        {/* Section caption between the two groups. */}
        <TextLayer
          emuRect={[514095, 3235918, 8407207, 276999]}
          timing={{ ti: 0.32, td: 0.16 }}
          align="center"
        >
          <span
            className="font-serif font-bold text-[#0c4a6e]"
            style={{ fontSize: "clamp(11px, 1.05vw, 15px)" }}
          >
            IoT sensors-based network for monitoring the real-time movement
            of lands and water (SENSUM project)
          </span>
        </TextLayer>

        {/* Lower-left: UxV network. */}
        <PicLayer
          src={IMG("image19.jpg")}
          alt="UxV networks across air, ground, and water"
          emuRect={[1100293, 3872892, 3088640, 1805886]}
          timing={{ ti: 0.38, td: 0.2 }}
          fit="cover"
        />
        <Caption
          emuRect={[1136376, 5678778, 3052557, 461665]}
          timing={{ ti: 0.52, td: 0.14 }}
        >
          Large-scale collaborative network
          <br />
          for environment observation
        </Caption>

        {/* Lower-right: IoT hardware platforms. */}
        <PicLayer
          src={IMG("image20.jpeg")}
          alt="AR.Drone 2.0 and a custom hexacopter platform"
          emuRect={[4701791, 3928504, 1932131, 1140094]}
          timing={{ ti: 0.46, td: 0.16 }}
          fit="cover"
        />
        <PicLayer
          src={IMG("image22.png")}
          alt="Raspberry Pi based IoT gateway prototype"
          emuRect={[6895484, 3911973, 1536065, 863600]}
          timing={{ ti: 0.52, td: 0.16 }}
          fit="cover"
        />
        <PicLayer
          src={IMG("image24.jpeg")}
          alt="IoT hardware shown next to 1st-class stamps for scale"
          emuRect={[4299488, 5056628, 1656397, 916137]}
          timing={{ ti: 0.58, td: 0.16 }}
          fit="cover"
        />
        <PicLayer
          src={IMG("image23.jpeg")}
          alt="Drone with on-board compute and a laptop ground station"
          emuRect={[5868144, 4581128, 2643286, 1339617]}
          timing={{ ti: 0.62, td: 0.16 }}
          fit="cover"
        />
        <TextLayer
          emuRect={[4955069, 5902207, 3088640, 276999]}
          timing={{ ti: 0.68, td: 0.14 }}
          align="left"
        >
          <span
            className="font-serif font-bold text-[#0c4a6e]"
            style={{ fontSize: "clamp(11px, 1.05vw, 15px)" }}
          >
            IoT hardware
          </span>
        </TextLayer>

        {/* Citations — small text block at the bottom. */}
        <TextLayer
          emuRect={[553066, 6197216, 8103254, 738664]}
          timing={{ ti: 0.78, td: 0.16 }}
          align="left"
        >
          <p
            className="font-sans leading-tight text-foreground/55"
            style={{ fontSize: "clamp(7px, 0.65vw, 9.5px)" }}
          >
            Li, Zhuhui, Geyong Min, Peng Ren, Cai Luo, Liang Zhao, Chunbo
            Luo. &ldquo;Ubiquitous and Robust UxV Networks: Overviews,
            Solutions, Challenges, and Opportunities.&rdquo;{" "}
            <i>IEEE Network</i>, 2024. ·{" "}
            Zhang J, Luo C, Carpenter M, Min G. &ldquo;Federated Learning for
            Distributed IIoT Intrusion Detection using Transfer
            Approaches,&rdquo; <i>IEEE Trans. Industrial Informatics</i>,
            2022. ·{" "}
            Newby K, Bennett G, Roskilly K, Sgarabotto A, Luo C, Manzella I.
            Smart boulders for real-time detection of hazardous movement on
            landslides. <i>EGU24-394</i>, 2024. ·{" "}
            Sgarabotto A, Manzella I, Roskilly K, Clark MJ, Bennett GL, Luo
            C, Franco AM. Evaluating the use of smart sensors in
            ground-based monitoring of landslide movement with laboratory
            experiments. <i>EGUsphere</i>, 2023.
          </p>
        </TextLayer>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="2. Research"
          subtitle="2.1 Sensing & Observations"
          subsubtitle="IoT sensors and networking"
        />

        <MobileSectionHeader ti={0.16}>
          IoT sensors-based network for monitoring the real-time movement of
          lands and water{" "}
          <span className="opacity-70">(SENSUM project)</span>
        </MobileSectionHeader>
        <MobileGrid cols={2}>
          <MobileCard
            src={IMG("image15.png")}
            alt="IoT sensor network schematic"
            aspect="4/3"
            ti={0.2}
            caption="Sensor network schematic"
          />
          <MobileCard
            src={IMG("image16.jpeg")}
            alt="DSM with sensor positions"
            fit="cover"
            aspect="4/3"
            ti={0.24}
            caption="DSM with sensor positions"
          />
          <MobileCard
            src={IMG("image17.jpeg")}
            alt="Slidecube"
            fit="cover"
            aspect="4/3"
            ti={0.28}
            caption={
              <>
                <b>Slidecube</b>{" "}
                <span className="opacity-70">
                  (sensor part: 13 × 23 mm, 3 g)
                </span>
              </>
            }
          />
          <MobileCard
            src={IMG("image18.jpeg")}
            alt="Boulder enclosure tag"
            fit="cover"
            aspect="4/3"
            ti={0.32}
            caption={
              <>
                Motion sensor{" "}
                <span className="opacity-70">(Tag)</span>
              </>
            }
          />
          <MobileCard
            src={IMG("image21.png")}
            alt="Lab flume tank"
            fit="cover"
            aspect="4/3"
            ti={0.36}
            caption="Lab flume tank"
            className="col-span-2"
          />
        </MobileGrid>

        <MobileSectionHeader ti={0.42}>
          Large-scale collaborative network for environment observation
        </MobileSectionHeader>
        <MobileCard
          src={IMG("image19.jpg")}
          alt="UxV networks across air, ground and water"
          fit="cover"
          aspect="16/9"
          ti={0.46}
        />

        <MobileSectionHeader ti={0.52}>IoT hardware</MobileSectionHeader>
        <MobileGrid cols={2}>
          <MobileCard
            src={IMG("image20.jpeg")}
            alt="Drone platforms"
            fit="cover"
            aspect="4/3"
            ti={0.56}
            caption="Drone platforms"
          />
          <MobileCard
            src={IMG("image22.png")}
            alt="Raspberry Pi gateway"
            fit="cover"
            aspect="4/3"
            ti={0.58}
            caption="Raspberry Pi gateway"
          />
          <MobileCard
            src={IMG("image23.jpeg")}
            alt="Drone with on-board compute"
            fit="cover"
            aspect="4/3"
            ti={0.6}
            caption="Drone + ground station"
          />
          <MobileCard
            src={IMG("image24.jpeg")}
            alt="IoT hardware shown for scale"
            fit="cover"
            aspect="4/3"
            ti={0.62}
            caption="Hardware shown for scale"
          />
        </MobileGrid>

        <div
          className="mt-6 space-y-1.5 text-[10.5px] leading-snug text-foreground/55"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.72, td: 0.18 }),
          }}
        >
          <p>
            Li Z, Min G, Ren P, Luo C, Zhao L, Luo C. &ldquo;Ubiquitous and
            Robust UxV Networks.&rdquo; <i>IEEE Network</i>, 2024.
          </p>
          <p>
            Zhang J, Luo C, Carpenter M, Min G. &ldquo;Federated Learning for
            Distributed IIoT Intrusion Detection using Transfer
            Approaches.&rdquo; <i>IEEE Trans. Industrial Informatics</i>,
            2022.
          </p>
          <p>
            Newby K, Bennett G, Roskilly K, Sgarabotto A, Luo C, Manzella I.
            &ldquo;Smart boulders for real-time detection of hazardous
            movement on landslides.&rdquo; <i>EGU24-394</i>, 2024.
          </p>
          <p>
            Sgarabotto A, Manzella I, Roskilly K, et al. &ldquo;Evaluating
            smart sensors in ground-based monitoring of landslide
            movement.&rdquo; <i>EGUsphere</i>, 2023.
          </p>
        </div>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 5. Processing & Analysis — Benchmark datasets
// ══════════════════════════════════════════════════════════════════════════

function SceneDatasets() {
  return (
    <Scene
      index={4}
      total={SCENE_COUNT}
      length={1.6}
      bg="linear-gradient(180deg, #f4f8ff 0%, #eaf1fa 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>2. Research</TitleRibbon>
        <Subtitle>2.2 Processing &amp; Analysis</Subtitle>
        <SubSubtitle>Benchmark datasets</SubSubtitle>

        <PicLayer
          src={IMG("image25.png")}
          alt="CCTV frames covering 11 wind categories"
          emuRect={[624187, 1612022, 3228233, 1815882]}
          timing={{ ti: 0.06, td: 0.18 }}
          fit="cover"
        />
        <Caption
          emuRect={[624187, 3470000, 3228233, 320000]}
          timing={{ ti: 0.2, td: 0.14 }}
        >
          CCTV video data — 11 categories of wind for{" "}
          <b>visual anemometry</b>
        </Caption>

        <PicLayer
          src={IMG("image26.png")}
          alt="Coastline masks from Sentinel-2 imagery"
          emuRect={[5106047, 1675959, 3540113, 3963334]}
          timing={{ ti: 0.18, td: 0.22 }}
          fit="contain"
        />
        <Caption
          emuRect={[5106047, 5700000, 3540113, 320000]}
          timing={{ ti: 0.4, td: 0.14 }}
        >
          Coastline detection (Sentinel-2)
        </Caption>

        <PicLayer
          src={IMG("image27.png")}
          alt="DisasterScope — aerial frames"
          emuRect={[361827, 4167327, 4514973, 1575104]}
          timing={{ ti: 0.45, td: 0.2 }}
          fit="cover"
        />
        <Caption
          emuRect={[624187, 5763713, 4076937, 276999]}
          timing={{ ti: 0.62, td: 0.14 }}
          align="left"
        >
          Disaster images captured by UAVs
        </Caption>

        {/* Citations — PPTX position. */}
        <TextLayer
          emuRect={[553066, 6197216, 7956582, 738664]}
          timing={{ ti: 0.78, td: 0.16 }}
          align="left"
        >
          <p
            className="font-sans leading-tight text-foreground/55"
            style={{ fontSize: "clamp(7px, 0.65vw, 9.5px)" }}
          >
            Q. Zhang, J. Xu, M. Crane, C. Luo (2022). See the wind: Wind
            scale estimation with optical flow and VisualWind dataset.{" "}
            <i>Science of The Total Environment</i>, 846, 157204. ·{" "}
            C. Seale, T. Redfern, P. Chatfield, C. Luo, K. Dempsey (2022).
            Coastline detection in satellite imagery: A deep learning
            approach on new benchmark data.{" "}
            <i>Remote Sensing of Environment</i>, 278, 113044. ·{" "}
            Z. Liu, C. Luo, G. Min, Z. Liu, Z. Li. &ldquo;DisasterScope: A
            Comprehensive Dataset and RTMDet-based Methodology for Object
            Detection in Disaster-Related Remote Sensing Images,&rdquo;{" "}
            <i>IGARSS 2024</i>, pp. 7769-7772.
          </p>
        </TextLayer>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="2. Research"
          subtitle="2.2 Processing & Analysis"
          subsubtitle="Benchmark datasets"
        />
        <div className="space-y-4">
          <MobileCard
            src={IMG("image25.png")}
            alt="CCTV wind categories"
            fit="cover"
            aspect="16/9"
            ti={0.18}
            caption={
              <>
                CCTV video — 11 categories of wind for{" "}
                <b>visual anemometry</b>
              </>
            }
          />
          <MobileCard
            src={IMG("image26.png")}
            alt="Coastline detection from Sentinel-2"
            aspect="3/4"
            ti={0.28}
            caption="Coastline detection (Sentinel-2)"
          />
          <MobileCard
            src={IMG("image27.png")}
            alt="DisasterScope aerial dataset"
            fit="cover"
            aspect="16/9"
            ti={0.38}
            caption="Disaster images captured by UAVs"
          />
        </div>

        <div
          className="mt-6 space-y-1.5 text-[10.5px] leading-snug text-foreground/55"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.52, td: 0.18 }),
          }}
        >
          <p>
            Q. Zhang, J. Xu, M. Crane, C. Luo (2022). &ldquo;See the
            wind.&rdquo; <i>Science of The Total Environment</i>, 846,
            157204.
          </p>
          <p>
            C. Seale, T. Redfern, P. Chatfield, C. Luo, K. Dempsey (2022).
            &ldquo;Coastline detection in satellite imagery.&rdquo;{" "}
            <i>Remote Sensing of Environment</i>, 278, 113044.
          </p>
          <p>
            Z. Liu, C. Luo, G. Min, Z. Liu, Z. Li. &ldquo;DisasterScope:
            RTMDet-based methodology for object detection.&rdquo;{" "}
            <i>IGARSS 2024</i>.
          </p>
        </div>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 6. Processing & Analysis — ML models
// ══════════════════════════════════════════════════════════════════════════

function SceneModels() {
  return (
    <Scene
      index={5}
      total={SCENE_COUNT}
      length={1.7}
      bg="linear-gradient(180deg, #eaf1fa 0%, #e0e9f5 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>2. Research</TitleRibbon>
        <Subtitle>2.2 Processing &amp; Analysis</Subtitle>
        <SubSubtitle>Machine-learning models to analyse data</SubSubtitle>

        <PicLayer
          src={IMG("image28.png")}
          alt="Super-resolution: Sentinel-2 vs Planet"
          emuRect={[1153653, 1473931, 2563582, 1741000]}
          timing={{ ti: 0.06, td: 0.18 }}
        />
        <Caption
          emuRect={[755877, 3268701, 3088640, 320000]}
          timing={{ ti: 0.2, td: 0.14 }}
          align="left"
        >
          <b>Super-resolution</b> of remote-sensing images{" "}
          <span className="opacity-70">(Sentinel-2 and Planet)</span>
        </Caption>

        <PicLayer
          src={IMG("image31.png")}
          alt="Remote-sensing scene classification examples"
          emuRect={[4572000, 1312336, 3403600, 2230000]}
          timing={{ ti: 0.18, td: 0.2 }}
          fit="contain"
        />
        <Caption
          emuRect={[4545464, 3611036, 3535049, 540000]}
          timing={{ ti: 0.34, td: 0.14 }}
          align="left"
        >
          Remote-sensing <b>scene classification</b> with a CNN
          <br />
          <span className="opacity-70">
            (currently the 2nd-highest-cited paper in this journal)
          </span>
        </Caption>

        <PicLayer
          src={IMG("image30.png")}
          alt="Whole-life carbon prediction pipeline"
          emuRect={[1153653, 3865094, 2851905, 1768395]}
          timing={{ ti: 0.4, td: 0.18 }}
        />
        <Caption
          emuRect={[797164, 5689669, 3384550, 320000]}
          timing={{ ti: 0.56, td: 0.14 }}
          align="left"
        >
          ML models to predict whole-life carbon emissions for buildings
        </Caption>

        <PicLayer
          src={IMG("image29.png")}
          alt="Two-stage optical-flow + CNN-LSTM classifier"
          emuRect={[4571997, 4560599, 2800000, 1100000]}
          timing={{ ti: 0.5, td: 0.18 }}
        />
        {/* "Optical flow" label — PPTX position sits to the right of the
            image, not below it. */}
        <Caption
          emuRect={[7482550, 4873997, 1530925, 830997]}
          timing={{ ti: 0.66, td: 0.14 }}
          align="left"
        >
          <b>Optical flow</b>
          <br />
          <span className="opacity-80">
            assessment of movements using deep flow networks
          </span>
        </Caption>

        {/* Citations — PPTX position. */}
        <TextLayer
          emuRect={[553066, 6197216, 7956582, 738664]}
          timing={{ ti: 0.78, td: 0.16 }}
          align="left"
        >
          <p
            className="font-sans leading-tight text-foreground/55"
            style={{ fontSize: "clamp(7px, 0.65vw, 9.5px)" }}
          >
            X. Yu, X. Wu, C. Luo, P. Ren. Deep learning in remote sensing
            scene classification: a data augmentation enhanced CNN framework.{" "}
            <i>GIScience &amp; Remote Sensing</i>, 54(5), 741-758. ·{" "}
            Q. Zhang, J. Xu, M. Crane, C. Luo (2022). See the wind.{" "}
            <i>Science of The Total Environment</i>, 846. (IF 10.2) ·{" "}
            H. Zhang, C. Luo, Q. Wang, M. Kitchin, A. Parmley, J.
            Monge-Alvarez. A novel infrared video surveillance system using
            deep learning based techniques.{" "}
            <i>Multimedia Tools and Applications</i>, 77, 26657-26676.
          </p>
        </TextLayer>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="2. Research"
          subtitle="2.2 Processing & Analysis"
          subsubtitle="Machine-learning models to analyse data"
        />
        <MobileGrid cols={2}>
          <MobileCard
            src={IMG("image28.png")}
            alt="Super-resolution comparison"
            aspect="4/3"
            ti={0.18}
            caption={
              <>
                <b>Super-resolution</b> (Sentinel-2 → Planet)
              </>
            }
          />
          <MobileCard
            src={IMG("image31.png")}
            alt="Scene classification"
            aspect="4/3"
            ti={0.22}
            caption={
              <>
                <b>Scene classification</b> with a CNN
                <br />
                <span className="opacity-70">
                  (2nd-highest-cited paper in this journal)
                </span>
              </>
            }
          />
          <MobileCard
            src={IMG("image30.png")}
            alt="Whole-life carbon"
            aspect="4/3"
            ti={0.28}
            caption="Whole-life carbon for buildings"
          />
          <MobileCard
            src={IMG("image29.png")}
            alt="Optical-flow CNN-LSTM"
            aspect="4/3"
            ti={0.34}
            caption={
              <>
                <b>Optical flow</b> — movement assessment with deep flow
                networks
              </>
            }
          />
        </MobileGrid>

        <div
          className="mt-6 space-y-1.5 text-[10.5px] leading-snug text-foreground/55"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.5, td: 0.18 }),
          }}
        >
          <p>
            X. Yu, X. Wu, C. Luo, P. Ren. &ldquo;Deep learning in
            remote-sensing scene classification.&rdquo;{" "}
            <i>GIScience &amp; Remote Sensing</i>, 54(5).
          </p>
          <p>
            Q. Zhang, J. Xu, M. Crane, C. Luo (2022). &ldquo;See the
            wind.&rdquo; <i>Science of The Total Environment</i>, 846.
          </p>
          <p>
            H. Zhang, C. Luo, Q. Wang, et al. &ldquo;Infrared video
            surveillance with deep learning.&rdquo;{" "}
            <i>Multimedia Tools and Applications</i>, 77.
          </p>
        </div>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 7. Industry impacts
// ══════════════════════════════════════════════════════════════════════════

const IMPACT_BLOCKS: Array<{ title: string; body: ReactNode }> = [
  {
    title: "Automated AI generated 3-D treescapes",
    body: "for woodland creation and agroforestry project concept designs. Generative AI visualises treescapes and forests for forest planning and carbon markets.",
  },
  {
    title: "Rebuilding insurance estimation",
    body: "Using remote-sensing data to automate the rebuilding insurance estimation. With RiskStop — ML / remote-sensing techniques.",
  },
  {
    title: "Woodland creation",
    body: "Using ML methods with remote-sensing data for woodland creation. With Space Clipper — assessing suitability of woodlands creation using ML and Earth observations.",
  },
  {
    title: "Thales — low-pixel ATD/ATR",
    body: "Scottish Funding Council with CENSIS and Thales — Knowledge Transfer Medal winner.",
  },
]

function SceneImpact() {
  return (
    <Scene
      index={6}
      total={SCENE_COUNT}
      length={1.6}
      bg="linear-gradient(180deg, #fff4e8 0%, #ffe8d2 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>3. Industry impacts</TitleRibbon>
        <Subtitle>
          Apply research outcomes into real-world applications
        </Subtitle>

        <TextLayer
          emuRect={[624000, 1500000, 4500000, 800000]}
          timing={{ ti: 0.08, td: 0.18 }}
        >
          <p
            className="font-sans leading-snug text-foreground/85"
            style={{ fontSize: "clamp(10px, 0.9vw, 13px)" }}
          >
            <b className="text-foreground">
              Automated AI generated 3-D treescapes
            </b>{" "}
            for woodland creation and agroforestry project concept designs.
            Generative AI visualises treescapes and forests for forest
            planning and carbon markets.
          </p>
        </TextLayer>

        <TextLayer
          emuRect={[624000, 2380000, 4500000, 800000]}
          timing={{ ti: 0.2, td: 0.18 }}
        >
          <p
            className="font-sans leading-snug text-foreground/85"
            style={{ fontSize: "clamp(10px, 0.9vw, 13px)" }}
          >
            Using remote-sensing data to automate the{" "}
            <b className="text-foreground">
              rebuilding insurance estimation
            </b>
            . With RiskStop — ML / remote-sensing techniques.
          </p>
        </TextLayer>

        <TextLayer
          emuRect={[624000, 3260000, 4500000, 800000]}
          timing={{ ti: 0.32, td: 0.18 }}
        >
          <p
            className="font-sans leading-snug text-foreground/85"
            style={{ fontSize: "clamp(10px, 0.9vw, 13px)" }}
          >
            Using ML methods with remote-sensing data for{" "}
            <b className="text-foreground">woodland creation</b>. With Space
            Clipper — assessing suitability of woodlands creation using ML
            and Earth observations.
          </p>
        </TextLayer>

        <TextLayer
          emuRect={[624000, 4140000, 4500000, 900000]}
          timing={{ ti: 0.44, td: 0.18 }}
        >
          <p
            className="font-sans leading-snug text-foreground/85"
            style={{ fontSize: "clamp(10px, 0.9vw, 13px)" }}
          >
            <b className="text-foreground">
              Thales challenge — low-pixel Automatic Target Detection &amp;
              Recognition (ATD/ATR)
            </b>
            . Scottish Funding Council with CENSIS and Thales — Knowledge
            Transfer Medal winner.
          </p>
        </TextLayer>

        <PicLayer
          src={IMG("image33.png")}
          alt="AI-generated 3-D treescapes"
          emuRect={[5325412, 1432815, 3542924, 1537902]}
          timing={{ ti: 0.18, td: 0.2 }}
        />
        <Caption
          emuRect={[5325412, 3060000, 3542924, 320000]}
          timing={{ ti: 0.34, td: 0.14 }}
        >
          AI generated trees and forests
        </Caption>

        <PicLayer
          src={IMG("image32.png")}
          alt="NIR vehicle detection — Thales ATD/ATR"
          emuRect={[5638800, 3882227, 3384550, 1537902]}
          timing={{ ti: 0.5, td: 0.2 }}
          fit="cover"
        />
        <Caption
          emuRect={[5638800, 5500000, 3384550, 420000]}
          timing={{ ti: 0.66, td: 0.14 }}
        >
          Near-infrared image for extremely small-object detection
        </Caption>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="3. Industry impacts"
          subtitle="Apply research outcomes into real-world applications"
        />

        <div className="space-y-4">
          <MobileCard
            src={IMG("image33.png")}
            alt="AI-generated 3-D treescapes"
            aspect="16/9"
            ti={0.18}
            caption="AI generated trees and forests"
          />

          <div className="space-y-3">
            {IMPACT_BLOCKS.map((it, i) => (
              <div
                key={it.title}
                className="rounded-xl bg-white/70 p-4 ring-1 ring-black/5"
                style={{
                  ...LAYER_BASE,
                  ...timingVars({ ti: 0.26 + i * 0.06, td: 0.18 }),
                }}
              >
                <p className="font-sans text-[14px] leading-snug text-foreground/85">
                  <b className="text-foreground">{it.title}</b> {it.body}
                </p>
              </div>
            ))}
          </div>

          <MobileCard
            src={IMG("image32.png")}
            alt="NIR vehicle detection — Thales challenge"
            fit="cover"
            aspect="16/9"
            ti={0.58}
            caption="Near-infrared image for extremely small-object detection"
          />
        </div>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 8. Code & Data Access
// ══════════════════════════════════════════════════════════════════════════

type LinkRow = { label: string; href: string }

const CODE_LINKS: LinkRow[] = [
  {
    label: "Software-defined vehicular-network simulator",
    href: "https://github.com/a824899245/SDVN-platform",
  },
  {
    label: "Federated learning framework",
    href: "https://github.com/LaplaceZhang/FedTradaBoost",
  },
  {
    label: "Deep-learning Sentinel-2 land-cover classifier",
    href: "https://github.com/HowardDreemurr/SentinelClassifier",
  },
  {
    label: "Disaster map (global natural-disaster display)",
    href: "https://github.com/lc796/disaster_display_backend?tab=readme-ov-file",
  },
]

const DATA_LINKS: LinkRow[] = [
  {
    label: "SWED — Sentinel-2 Water Edges Dataset",
    href: "https://openmldata.ukho.gov.uk",
  },
  {
    label: "VISUAL WIND — 6 000 video clips across 11 Beaufort categories",
    href: "https://sme.uds.exeter.ac.uk/folders/48caf5102d6196b9645fab1f46e494ec",
  },
  {
    label: "Aerial video dataset of natural disasters",
    href: "https://2024.ieeeigarss.org/view_paper.php?PaperNum=2265",
  },
]

function LinkRowCard({ link }: { link: LinkRow }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-md border border-foreground/10 bg-white/75 px-3 py-2 transition-colors hover:border-primary/40 hover:bg-white"
    >
      <p
        className="font-sans font-semibold text-foreground"
        style={{ fontSize: "clamp(11px, 0.95vw, 13.5px)" }}
      >
        {link.label}
      </p>
      <p
        className="mt-0.5 text-foreground/60"
        style={{
          fontSize: "clamp(9.5px, 0.78vw, 11.5px)",
          wordBreak: "break-all",
        }}
      >
        {link.href.replace(/^https?:\/\//, "")}
      </p>
    </a>
  )
}

function SceneCode() {
  return (
    <Scene
      index={7}
      total={SCENE_COUNT}
      length={1.5}
      bg="linear-gradient(180deg, #f2f6fc 0%, #e6eef8 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>4. Code &amp; Data Access</TitleRibbon>
        <Subtitle>
          The code and hard work were mostly done by my students and postdocs.
        </Subtitle>

        {/* Left column — Code. Narrower with a clear gap before the
            Datasets column. */}
        <TextLayer
          emuRect={[624000, 1450000, 3500000, 430000]}
          timing={{ ti: 0.04, td: 0.14 }}
        >
          <span
            className="font-serif font-bold"
            style={{
              color: "#1e3a8a",
              fontSize: "clamp(14px, 1.4vw, 20px)",
            }}
          >
            Code
          </span>
        </TextLayer>
        {CODE_LINKS.map((link, i) => (
          <TextLayer
            key={link.href}
            emuRect={[
              624000,
              1900000 + i * 720000,
              3500000,
              640000,
            ]}
            timing={{ ti: 0.08 + i * 0.06, td: 0.14 }}
          >
            <LinkRowCard link={link} />
          </TextLayer>
        ))}

        {/* Right column — Datasets. ~700 000 EMU gap from Code (≈ 7.7%). */}
        <TextLayer
          emuRect={[4824000, 1450000, 3500000, 430000]}
          timing={{ ti: 0.2, td: 0.14 }}
        >
          <span
            className="font-serif font-bold"
            style={{
              color: "#1e3a8a",
              fontSize: "clamp(14px, 1.4vw, 20px)",
            }}
          >
            Datasets
          </span>
        </TextLayer>
        {DATA_LINKS.map((link, i) => (
          <TextLayer
            key={link.href}
            emuRect={[
              4824000,
              1900000 + i * 720000,
              3500000,
              640000,
            ]}
            timing={{ ti: 0.24 + i * 0.06, td: 0.14 }}
          >
            <LinkRowCard link={link} />
          </TextLayer>
        ))}

        {/* Featured demo card — image + label, bottom-right. */}
        <div
          className="absolute overflow-hidden rounded-lg bg-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45),0_6px_14px_-8px_rgba(15,23,42,0.25)] ring-1 ring-black/5"
          style={{
            ...LAYER_BASE,
            ...emuPos(5500000, 4250000, 3300000, 1880000),
            ...timingVars({ ti: 0.5, td: 0.2, lift: 24 }),
          }}
        >
          <a
            href="https://github.com/HowardDreemurr/SentinelClassifier"
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full w-full"
          >
            <div className="relative h-[78%] w-full bg-[#f4f6fb]">
              <Image
                src={IMG("image34.jpeg")}
                alt="Sentinel Classifier web UI"
                fill
                sizes="(min-width: 1024px) 540px, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                unoptimized
              />
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-foreground/75 ring-1 ring-black/5">
                Featured demo
              </span>
            </div>
            <div className="flex h-[22%] items-center px-3">
              <span
                className="font-serif font-bold text-[#1e3a8a]"
                style={{ fontSize: "clamp(10px, 0.95vw, 13px)" }}
              >
                Sentinel-2 landcover classifier
              </span>
            </div>
          </a>
        </div>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="4. Code & Data Access"
          subtitle={
            <span className="text-foreground/70">
              The code and hard work were mostly done by my students and
              postdocs.
            </span>
          }
        />

        <h3
          className="mb-2 mt-3 font-serif text-lg font-bold text-[#1e3a8a]"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.12, td: 0.14 }),
          }}
        >
          Code
        </h3>
        <div className="space-y-2">
          {CODE_LINKS.map((link, i) => (
            <div
              key={link.href}
              style={{
                ...LAYER_BASE,
                ...timingVars({ ti: 0.16 + i * 0.05, td: 0.16 }),
              }}
            >
              <LinkRowCard link={link} />
            </div>
          ))}
        </div>

        <h3
          className="mb-2 mt-6 font-serif text-lg font-bold text-[#1e3a8a]"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.36, td: 0.14 }),
          }}
        >
          Datasets
        </h3>
        <div className="space-y-2">
          {DATA_LINKS.map((link, i) => (
            <div
              key={link.href}
              style={{
                ...LAYER_BASE,
                ...timingVars({ ti: 0.4 + i * 0.05, td: 0.16 }),
              }}
            >
              <LinkRowCard link={link} />
            </div>
          ))}
        </div>

        <a
          href="https://github.com/HowardDreemurr/SentinelClassifier"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 block overflow-hidden rounded-xl bg-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.4)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_24px_50px_-18px_rgba(15,23,42,0.55)]"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.58, td: 0.2, lift: 22 }),
          }}
        >
          <div className="relative aspect-[16/9] w-full bg-[#f4f6fb]">
            <Image
              src={IMG("image34.jpeg")}
              alt="Sentinel Classifier web UI"
              fill
              sizes="(min-width: 640px) 720px, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/75 ring-1 ring-black/5">
              Featured demo
            </span>
          </div>
          <div className="px-4 py-3">
            <p className="font-serif text-[16px] font-bold text-[#1e3a8a]">
              Sentinel-2 landcover classifier
            </p>
            <p className="mt-1 text-[12.5px] text-foreground/65">
              Generate land-cover maps over any AOI from Sentinel-2 with a
              deep-learning model and an interactive map UI.
            </p>
          </div>
        </a>
      </MobileFlow>
    </Scene>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// 9. We need you — closing call-to-action
// ══════════════════════════════════════════════════════════════════════════

type JoinCTA = {
  href: string
  label: string
  body: string
  icon: typeof GraduationCap
}

const JOIN_CTAS: JoinCTA[] = [
  {
    href: "/join/phd",
    label: "PhD opportunities",
    body: "Fully funded studentships and self-funded routes across our research areas.",
    icon: GraduationCap,
  },
  {
    href: "/join/postdoc",
    label: "Postdoc & research staff",
    body: "Open postdoc and research-fellow positions in environmental ML and sensing.",
    icon: Briefcase,
  },
  {
    href: "/join/industry",
    label: "Industry collaboration",
    body: "Joint projects, KTPs and consultancy — bring your real-world problems.",
    icon: Handshake,
  },
  {
    href: "/join/contact",
    label: "Get in touch",
    body: "General enquiries — research questions, visiting researchers, talks, press.",
    icon: Mail,
  },
]

// 2×2 layout in the 4:3 stage. EMU coordinates picked to leave a generous
// left/right margin and a comfortable row gap, mirroring the other slides.
const JOIN_CARD_RECTS: Array<[number, number, number, number]> = [
  [800000, 1900000, 3700000, 1850000], // top-left
  [4644000, 1900000, 3700000, 1850000], // top-right
  [800000, 3950000, 3700000, 1850000], // bottom-left
  [4644000, 3950000, 3700000, 1850000], // bottom-right
]

function JoinCard({
  cta,
  timing,
}: {
  cta: JoinCTA
  timing: LayerTiming
}) {
  const Icon = cta.icon
  return (
    <Link
      href={cta.href}
      className="group flex h-full w-full flex-col rounded-2xl bg-white p-5 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35),0_6px_14px_-8px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_24px_50px_-18px_rgba(15,23,42,0.55)]"
      style={{ ...LAYER_BASE, ...timingVars(timing) }}
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
        }}
      >
        <Icon className="h-4 w-4" strokeWidth={1.9} />
      </span>
      <h3
        className="mt-4 font-serif font-bold leading-tight text-[#0c4a6e]"
        style={{ fontSize: "clamp(13px, 1.25vw, 18px)" }}
      >
        {cta.label}
      </h3>
      <p
        className="mt-1.5 flex-1 leading-snug text-foreground/70"
        style={{ fontSize: "clamp(10px, 0.85vw, 13px)" }}
      >
        {cta.body}
      </p>
      <span
        className="mt-3 inline-flex items-center gap-1 font-semibold text-[#1e3a8a]"
        style={{ fontSize: "clamp(10px, 0.8vw, 12px)" }}
      >
        Learn more
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

function SceneJoin() {
  return (
    <Scene
      index={8}
      total={SCENE_COUNT}
      length={1.6}
      bg="radial-gradient(ellipse at 50% 30%, #eaf2fb 0%, #f7faff 60%, #ffffff 100%)"
    >
      {/* ───── Desktop ───── */}
      <DesktopStage>
        <TitleRibbon>5. We need you</TitleRibbon>
        <Subtitle>Join the group</Subtitle>

        <TextLayer
          emuRect={[624000, 1180000, 7900000, 600000]}
          timing={{ ti: 0.1, td: 0.18 }}
        >
          <p
            className="font-sans leading-relaxed text-foreground/80"
            style={{ fontSize: "clamp(11px, 1.05vw, 15px)" }}
          >
            We&apos;re always looking for curious researchers — at any
            level — and for industry partners with real-world problems.
            Four ways to start a conversation.
          </p>
        </TextLayer>

        {JOIN_CTAS.map((cta, i) => (
          <div
            key={cta.href}
            className="absolute"
            style={{
              ...emuPos(
                JOIN_CARD_RECTS[i][0],
                JOIN_CARD_RECTS[i][1],
                JOIN_CARD_RECTS[i][2],
                JOIN_CARD_RECTS[i][3],
              ),
            }}
          >
            <JoinCard
              cta={cta}
              timing={{ ti: 0.22 + i * 0.06, td: 0.22, lift: 32 }}
            />
          </div>
        ))}

        <TextLayer
          emuRect={[624000, 6080000, 7900000, 460000]}
          timing={{ ti: 0.6, td: 0.18 }}
          align="center"
        >
          <span
            className="font-sans italic text-foreground/65"
            style={{ fontSize: "clamp(11px, 1vw, 14px)" }}
          >
            See all openings on{" "}
            <Link
              href="/join"
              className="font-semibold text-[#1e3a8a] underline-offset-2 hover:underline"
            >
              /join
            </Link>
            .
          </span>
        </TextLayer>
      </DesktopStage>

      {/* ───── Mobile ───── */}
      <MobileFlow>
        <MobileHeader
          title="5. We need you"
          subtitle="Join the group"
          intro="We're always looking for curious researchers — at any level — and for industry partners with real-world problems. Four ways to start a conversation."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {JOIN_CTAS.map((cta, i) => (
            <JoinCard
              key={cta.href}
              cta={cta}
              timing={{ ti: 0.22 + i * 0.06, td: 0.2, lift: 24 }}
            />
          ))}
        </div>

        <p
          className="mt-6 text-center text-[12.5px] italic text-foreground/65"
          style={{
            ...LAYER_BASE,
            ...timingVars({ ti: 0.5, td: 0.18 }),
          }}
        >
          See all openings on{" "}
          <Link
            href="/join"
            className="font-semibold text-[#1e3a8a] underline-offset-2 hover:underline"
          >
            /join
          </Link>
          .
        </p>
      </MobileFlow>
    </Scene>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Top-level export
// ──────────────────────────────────────────────────────────────────────────

export function ResearchScrollStory() {
  return (
    <div className="relative">
      <SceneVision />
      <SceneSDGs />
      <SceneAutonomous />
      <SceneIoT />
      <SceneDatasets />
      <SceneModels />
      <SceneImpact />
      <SceneCode />
      <SceneJoin />
    </div>
  )
}
