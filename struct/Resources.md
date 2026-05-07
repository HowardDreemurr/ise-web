# Resources

Code repositories, datasets, and tools/demos. **One schema, one `resources` collection.** A `type` field discriminates the three sub-tabs.

Sub-tabs (each described in a child file):
- [Resources/Code.md](./Resources/Code.md) — code repositories
- [Resources/Data.md](./Resources/Data.md) — datasets / benchmarks
- [Resources/Tools.md](./Resources/Tools.md) — demos / software / pre-trained models

## Schema

```yaml
id:           res-swed-dataset                 # slug, also filename
title:        SWED — Sentinel-2 Wetland Extraction Dataset
type:         dataset                          # code | dataset | tools
link:         https://github.com/...           # canonical external URL (required)
description:  |
  One short paragraph. What it is, what it's for. Optional.

# All optional below
license:      MIT                              # for code/tools; "CC BY 4.0" for data
version:      v1.2                             # for tools/code
size:         12 GB                            # for data
relatedPubs:  [paper-2024-...]                 # publications that introduced or cite it
relatedProjs: [proj-instant]                   # projects that produced it
researchAreas: [area-sensing-observations]     # which themes
tags:         [Sentinel-2, Wetland, Segmentation]
thumbnail:    /images/resources/swed.jpg
```

Sub-tab files describe **type-specific rules** (which fields are typical for each type, card layout differences) without redefining the schema.

## Cross-references

Forward (stored): `relatedPubs`, `relatedProjs`, `researchAreas`. All optional.

Reverse (rendered, not stored):
| View | Query |
|---|---|
| Code/data linked from a paper | already forward-stored on Paper as `code` (single ref) |
| Resources from a project | `Resources.where(relatedProjs.includes(proj-id))` |
| Resources for an area | `Resources.where(researchAreas.includes(area-id))` |

## Page layout (`/resources`)

Three tabbed sections (Code · Data · Tools), each backed by one of the sub-files. Default sort within a tab: alphabetical by `title`. Filter by `researchAreas` shared across tabs.

Each item renders as a card: thumbnail · type badge · title · description · `[link]` button · related pubs/projects as small refs at the bottom. Clicking the title or button goes to the external `link`.

## Migration from current state

`content/code-and-data/*.md` already exists with `type: code | dataset` only. Migration:
1. Rename collection `codeAndData` → `resources` in `keystatic.config.ts`
2. Add `tools` to the type enum
3. Add the optional fields (`license`, `version`, `size`, `relatedPubs`, `relatedProjs`, `researchAreas`, `tags`, `thumbnail`)
4. Move existing files from `content/code-and-data/` to `content/resources/`
5. Rename ID prefix from whatever they have to `res-{slug}`
