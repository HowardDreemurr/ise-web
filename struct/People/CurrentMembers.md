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

## Grouping & ordering

Sections are configured by a `GROUPS` array in `src/app/people/current/page.tsx`:

```ts
const GROUPS = [
  { label: "Staff",                     types: ["Staff"]   },
  { label: "Post-Doctoral Researchers", types: ["PostDoc"] },
  { label: "PhD Candidates",            types: ["PhD"]     },
  { label: "MPhil Students",            types: ["MPhil"]   },
]
```

Each entry maps **one or more** PersonTypes to a single section heading. Edit the array to merge/split groups without touching component code — e.g. `{ label: "Researchers", types: ["Staff", "PostDoc"] }` would aggregate two types into one section. Within each section, members sort by `period` start-year descending, then alphabetical.

## Card layout

Horizontal — 120-160px photo column on the left, body on the right (cybergis-style).

```
┌────────────────────────────────────────────────────┐
│ [PHOTO]    Name                                    │
│ [badge]    Role                                    │
│            Affiliation                             │
│            Period                                  │
│            Research: tag · tag · tag               │
│            ● Funding                               │
│ ──────────────────────────────────────────────     │
│ [✉] [🌐] [GS] [GH] [in]                            │
└────────────────────────────────────────────────────┘
```

The type/role **badge floats top-left over the photo** (on-dark pill: white/18 fill, white/30 border, blur). Same template for everyone — Staff isn't styled differently.

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
