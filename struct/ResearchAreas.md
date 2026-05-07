# Research Areas

Research themes/pillars the group works on. Acts as a **categorization layer** for Publications and Projects — does not store them.

## Schema

```yaml
id:          area-sensing-observations            # slug, also filename
title:       Sensing & Observations
subtitle:    Autonomous vehicles, IoT sensors, and networking for environmental monitoring
description: |
  Longer paragraph explaining the area's research questions and methods.
  2-3 short paragraphs max.

# Optional
order:       1                                    # display order on /research; auto if omitted
icon:        sensor                               # lucide icon name, optional
image:       /images/areas/sensing.jpg            # hero image, optional
```

That's it. **No `papers` array.** Inversion confirmed — papers and projects forward-reference areas, not the other way around.

## Cross-references

Forward (stored on the area): _none_ except `order`.

Reverse (rendered, not stored):
| View | Query |
|---|---|
| Papers in this area | `Publications.where(researchAreas.includes('area-sensing-observations'))` |
| Projects in this area | `Projects.where(researchAreas.includes('area-sensing-observations'))` |
| Members active in this area | derived from above two queries' authors/PIs |

The "Members active in this area" is a second-order reverse query — useful for an area page showing who works on it, but skip in v1 if costly.

## Page layout

`/research` (overview): grid of area cards. Each card shows: title · subtitle · paper count + project count (live counts via reverse query).

`/research/areas/[id]` (per-area page): hero with title + description, then two sections:
1. **Publications in this area** — sorted year desc, reuses the standard paper card from `/research/publications`
2. **Projects in this area** — reuses the standard project card from `/research/projects`

Per-area pages are required (not optional). Filters on `/research/publications` and `/research/projects` are an additional drill-down, not a replacement.

## Migration from current state

`content/research-areas/*.md` currently has `papers: []` inline (each area embeds full paper objects).

Migration:
1. For each `paper` inside an area's `papers[]`:
   - Move it to its own `content/publications/paper-{year}-{slug}.md`
   - Set `researchAreas: [area-{slug-of-current-area}]` on the new paper file
2. Delete the `papers` field from each `area-{slug}.md`
3. Schema in `keystatic.config.ts`: drop `papers: fields.array(paperSchema, ...)` from the `researchAreas` collection

Currently affected files: `content/research-areas/sensing-observations.md`, `processing-analysis.md`. Add a third file `content/research-areas/decision-making.md` to align with the three Vision Pillars on the home page (Sensing & Observation · Processing & Analysis · Decision Making).
