# People → Current Members

Sub-tab of [People](../People.md). PI lives here with `type: Staff`. **Staff is an umbrella** covering PI, GRA (Graduate Research Assistants), RA (Research Assistants), RE (Research Engineers), TAs (teaching assistants / 助教), and research programmers — i.e. anyone in-residence who isn't a PostDoc / PhD / MPhil.

## Who appears

`type ∈ {Staff, PostDoc, PhD, MPhil}` AND `period` is open-ended (`"YYYY - present"`).

## Required fields (in addition to People schema)

| Field | Staff | PostDoc | PhD | MPhil |
|---|---|---|---|---|
| `period`            | required | required | required | required |
| `funding`           | optional | optional | optional | optional |
| `interests`         | optional | optional | optional | optional |
| `roleHighlights`    | typical  | optional | —        | —        |

Empty optional fields don't render — except the bottom links bar, which always reserves space so the icon row stays anchored at the same baseline across cards.

**`funding` is editable but never rendered on the card.** It stays in the schema for archival / CV purposes and to support future per-person export, but the card surface is photoless and density-first — funding info was removed so all members fit on one screen. `photo` is the same: still in the schema for downstream use, not rendered.

## Grouping & ordering

**No section headings.** The page renders a single flat grid — the type badge on each card carries the role, so per-section labels were redundant and wasted vertical space. Members sort by:

1. `type`, in the priority order defined by `TYPE_ORDER` in `src/app/people/current/page.tsx` (`Staff → PostDoc → PhD → MPhil`)
2. `period` start year, descending
3. `name`, alphabetical

To change the role order, edit the `TYPE_ORDER` array.

## Card layout

Photoless, dense, single-column flow — designed so the whole group fits in one viewport. Grid is `sm:grid-cols-2 lg:grid-cols-3`.

```
┌────────────────────────┐
│ [badge]                │
│ Name                   │
│ Role                   │
│ Affiliation            │
│ Period                 │
│ Research: tag · tag    │
│ ──────────────────     │
│ [✉] [🌐] [GS] [GH] [in]│
└────────────────────────┘
```

The type/role **badge is an inline pill at the top** (subtle primary-tinted fill: `bg-primary/10`, `border-primary/25`, `text-primary`). Same template for everyone — Staff isn't styled differently.

## Badge label rules

- **Non-Staff/Alumni types** (PostDoc, PhD, MPhil, Affiliated) always use the short fixed `TYPE_LABEL` (`PostDoc`, `PhD Candidate`, `MPhil Student`, `Affiliated`). The person's `role` field can be any length without affecting the badge.
- **Staff and Alumni** are umbrella types — their badge derives from each person's `role` field, normalized through a `ROLE_SHORT_FORMS` dictionary in `PersonCard.tsx` (~30 regex patterns covering UK/US academic titles):

| Role string | Badge |
|---|---|
| `Lead Professor, ISE Group` | `Lead Professor` |
| `Postdoctoral Research Fellow` | `PostDoc` |
| `MPhil (Lead supervision)` | `MPhil` |
| `PhD Candidate` | `PhD` |
| `Senior Research Fellow` | `Senior PostDoc` |
| `Research Assistant` | `RA` |
| `Graduate Research Assistant` | `GRA` |
| `Teaching Assistant` | `TA` |
| `Visiting Scholar` | `Visiting` |
| `Associate Professor` | `Assoc. Prof` |

Casing is **preserved as the dictionary defines it** — no auto-uppercasing. Fallback chain: dictionary match → first comma/paren segment if ≤18 chars → `TYPE_LABEL`.

## Uniform card height across sections

Cards across all sections on a page share the same height — measured from the actual rendered DOM, not estimated. The page wraps every PersonCard inside `<MeasuredPeopleSections>` (`src/components/blocks/MeasuredPeopleSections.tsx`):

1. After mount, `useLayoutEffect` queries `[data-person-card]` elements
2. Resets each `min-height` and reads `offsetHeight`
3. Stamps the max back as `min-height` on every card
4. Re-runs on container resize via `ResizeObserver` and on font-load

Result: shorter cards get their flex space **above** the link icon row (`mt-auto`), so the icon bar always anchors to the bottom edge across the page.

**No individual `/people/[id]` page.** Cards are terminal — external links go to Scholar / personal site. Reverse-query content (papers, projects, awards) is rendered on the destination pages instead.
