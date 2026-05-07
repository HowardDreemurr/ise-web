# People → Current Members

Sub-tab of [People](../People.md). Lead Professor lives here as a normal card with `type: Lead`.

## Who appears

`type ∈ {Lead, PostDoc, PhD, MPhil}` AND `period` is open-ended (`"YYYY - present"`).

## Required fields (in addition to People schema)

| Field | Lead | PostDoc | PhD | MPhil |
|---|---|---|---|---|
| `period`            | required | required | required | required |
| `funding`           | optional | optional | optional | optional |
| `interests`         | optional | optional | optional | optional |
| `roleHighlights`    | typical  | optional | —        | —        |

Empty optional fields simply don't render.

## Ordering on `/people` page

1. `type: Lead` first (single card, full-width or accent-styled)
2. `type: PostDoc` group, sorted by `period` start year descending
3. `type: PhD` group, sorted by `period` start year descending
4. `type: MPhil` group, sorted by `period` start year descending

Sort within group is by start year extracted from `period`.

## Card layout (what shows on `/people`)

```
┌─────────────────────────────────────┐
│  [photo]   Name              [type] │
│            role · period            │
│            interests as tags        │
│            citations · h-index      │← only if links.scholar set
│            [email] [scholar] [GH]   │
└─────────────────────────────────────┘
```

Same card template for everyone. Lead is just the first card by sort order (no special component, no extra styling).

**No individual `/people/[id]` page.** Cards are terminal — clicking a name does nothing internal; external links go to Scholar / personal site. Reverse-query content (papers, projects, awards) is rendered on the destination pages instead (e.g. `/research/publications` shows authors as in-text labels; `/research/projects` shows PI/CoI as labels).
