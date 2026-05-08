# ISE Group Website

Public site for the Intelligent Sensing & Environment research group at the University of Exeter.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4
- Keystatic CMS — content as markdown in `content/`, edited via `/keystatic`
- Static export to GitHub Pages; full Next runtime on Vercel (admin only)

## Where the design lives

**[`struct/`](./struct/structure.md)** is the canonical data + IA design — read it first.
- `struct/structure.md` — site map (6 nav tabs) + entity relationship diagram
- `struct/People.md`, `Publications.md`, `Projects.md`, … — per-entity schemas
- `struct/People/`, `struct/Resources/` — sub-tab specs

Brand reference (colours, type, components, preview HTML) ships separately as a Claude Design handoff under `.design-pkg/` — gitignored, treat as read-only.

## Conventions

- **Cross-references are forward-only.** Papers store `authors`; member→papers is a reverse query.
- **No individual person page.** `/people/*` cards are terminal; clicking a name does not navigate internally.
- **PI is a `Staff` member**, not a separate `Lead` type. **Staff** and **Alumni** are umbrellas for many sub-roles (Lead Prof / GRA / RA / RE / TA / programmers / former PhDs / former postdocs / undergrads). Per-card badge derives from each person's `role` field via `ROLE_SHORT_FORMS` (regex dictionary in `PersonCard.tsx`) — e.g. "Postdoctoral Research Fellow" → "PostDoc", "MPhil (Lead supervision)" → "MPhil". Casing is preserved as the dict defines it. Non-umbrella types (PostDoc / PhD / MPhil / Affiliated) ignore `role` and use the fixed short `TYPE_LABEL`.
- **`/people/current` grouping is configurable** via the `GROUPS` array in that page — `{ label, types[] }` mapping multiple PersonTypes to one section heading.
- **IDs = filename slug.** `member-luo`, `paper-2025-…`, `proj-…`, `area-…`, etc.
- **Type system fonts** (`next/font/google`): Inter (sans) + Source Serif 4 (serif headings) + Archivo Black (wordmark) + Space Grotesk (wordmark tagline).
- **Wordmark**: SVG with `textLength` lock so "ISE LAB" and the tagline share identical width — see `src/components/site/Wordmark.tsx`.

## Layout invariants

- 6 top-level tabs: Home · Community · Research · People · Resources · Contact.
- Community / Research / People / Resources have dropdowns. Contact is a primary-blue CTA leaf at the right end of nav.
- **Header is right-aligned** (no centred nav, no separate Join Us CTA — Contact is part of the nav). Hamburger collapse threshold is `lg:` (1024px).
- **Mobile drawer is an accordion** — only one parent expands at a time, animated via `max-height` transition. Auto-expands the parent containing the current route on open.
- **Sub-page hero** = navy→cerulean diagonal gradient banner with subtle ring decoration (`SubPageHero.tsx`) — no photography, ~120-140px tall. Used on every page except `/`.
- **PageHero** (home) = full-bleed image + horizontal scrim (78%→55%→10% navy) so white text reads.
- **PersonCard heights** are equalized at runtime via `MeasuredPeopleSections` (client component) — measures all `[data-person-card]` `offsetHeight`, stamps the max as `min-height`. Cross-section uniform without server-side estimation.
- `Section` wraps only its kicker/title in `Container`; pages provide their own `Container` for content (no double-padding).

## Scripts

- `npm run dev` — local dev (Keystatic admin off)
- `npm run dev:admin` — local dev with Keystatic admin at `/keystatic`
- `npm run build` — static export to `out/`
- `npm run typecheck` · `npm run lint`

## CI

`.github/workflows/deploy.yml` typechecks + lints + builds on every push and PR; deploys `master` to Pages.
