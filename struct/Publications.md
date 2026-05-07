# Publications

Papers published by group members. The cross-reference center — every paper links back to People (authors) and forward to ResearchAreas.

## Schema

```yaml
id:       paper-2025-ice-aware-forecasting   # slug, also filename
title:    Ice-Aware Forecasting With Hybrid Remote Sensing Inputs
year:     2025
venue:    Remote Sensing of Environment
type:     journal                             # journal | conference | workshop | preprint

# Authors — ordered list, internal members + external co-authors mixed
authors:
  - { type: member,   id: member-luo }        # internal (any People type incl. Affiliated)
  - { type: external, name: "X. Wang" }       # not in our People collection
  - { type: member,   id: member-carpenter }
  - { type: external, name: "J. Smith" }

# All optional below
researchAreas: [area-sensing-observations]    # which themes this paper belongs to
featured:       true                          # show on /research highlight rail
doi:            10.1016/j.rse.2025.xxxxx
link:           https://...                   # fallback if no DOI
pdf:            /pdfs/2025-ice-aware.pdf      # local copy, optional
code:           res-ice-classifier            # ref to Resources entry, optional
abstract: |
  Short abstract paragraph. Optional.
```

## Authors — design notes

A single ordered array is the only safe representation: academic papers care about position (first author, last author). Splitting into `internal` + `external` arrays would lose order.

Each entry has a `type` discriminator:
- `member` → `id` references a `People` collection entry (any type: Lead/PostDoc/PhD/MPhil/Affiliated/Alumni)
- `external` → `name` is a display string only

Display rule: `member` renders as a name label (no link, since we have no detail page); `external` renders as plain text. Order preserved verbatim. Hover/title attribute on members may show their role.

## Cross-references

Forward (stored on the paper):
- `authors[*].id` → People
- `researchAreas` → ResearchAreas
- `code` → Resources (optional, when paper has an associated repo/dataset entry)

Reverse (rendered, not stored):
| View | Query |
|---|---|
| All papers by Luo | `Publications.where(authors.some(a => a.type==='member' && a.id==='member-luo'))` |
| Papers in an area | `Publications.where(researchAreas.includes(area-id))` |
| Featured publications | `Publications.where(featured===true).orderBy(year desc)` |

## Page layout (`/research/publications`)

Default sort: `year` descending, then by `featured` (featured first within year).

Filter UI:
- By year (auto-generated from data)
- By research area (auto-generated)
- By type (journal / conference / etc.)
- Free-text search over title + venue + author names

Each paper renders as a compact card showing: year badge · type badge · title · authors line · venue · DOI link · optional thumbnail. No "view detail" page — the DOI/link is the canonical source.

## Migration from current state

| Current | Issue | Target |
|---|---|---|
| `authors: "Chen, Rao, ISE Group"` (free text) | unsearchable, unlinkable | rewrite as ordered array of `{type, id/name}` entries |
| `researchAreas` collection embeds `papers: []` inline | duplication of paper data | drop the inline array; let ResearchAreas reference paper IDs only (see [ResearchAreas.md](./ResearchAreas.md)) |
| No `type` field | can't filter journal vs conference | add the discriminator |
| Year stored as string `"2025"` | can't sort numerically | change to integer |
| Many publications missing entirely (currently only 3 in `content/publications/`) | research record looks thin | bulk-import from PI's BibTeX / Scholar export |
