# Projects

Funded research projects (grants). Currently dumped as flat list in `content/lead/index.md`; needs to be one file per project.

## Schema

```yaml
id:               proj-instant                       # slug, also filename
title:            "INSTANT: Intelligent and Sustainable IoT Networks for Landslide Monitoring"
acronym:          INSTANT                            # optional, short label for compact rendering
status:           active                             # planned | under-review | active | completed | cancelled
period:           "2026-01 - 2029-12"                # YYYY-MM range; "ongoing" allowed in place of end
funder:           Horizon Europe
amount:           "€1,187,370"                       # display string with currency symbol
referenceNumber:  "..."                              # grant ref / project number, optional

# People — internal members only
pi:               member-luo                         # exactly one (the PI on this group's record)
coi:              [member-min, member-carpenter]     # zero or more, internal CoIs

# External collaborators (people from other institutions)
externalCoIs:
  - { name: "...", affiliation: "..." }

# Industry / external organizations (not individuals)
partners:
  - { name: "SpaceClipper", role: "Industry Partner" }

# Optional cross-refs
researchAreas:    [area-sensing-observations]        # which themes
relatedPubs:      [paper-2025-...]                   # publications that came out of this project

# Optional content
summary: |
  One short paragraph. What problem, what approach, what outcome.
tags:             [Landslide, IoT, Horizon Europe]
```

## Status enum

| Value | Meaning | Where it shows |
|---|---|---|
| `planned`        | Approved internally, not yet started | hidden from `/research/projects` by default |
| `under-review`   | Proposal submitted to funder, decision pending | hidden by default; PI can see in admin |
| `active`         | Currently funded and running | shown in "Active" group |
| `completed`      | Period ended, work finished | shown in "Completed" group |
| `cancelled`      | Started but terminated early | hidden by default |

`under-review` replaces what `lead/index.md` currently calls "Proposals under Review" — same collection, different status.

## People structure

`pi` is a **single** id, not an array. A project has one PI on this group's record. (The actual grant may have multiple PIs in real life, but only the one on the ISE side gets recorded here — others go in `externalCoIs`.)

`coi` is the array of internal CoIs. External CoIs go in `externalCoIs` with free-text name + affiliation, mirroring the `external` author pattern in [Publications.md](./Publications.md).

`partners` is for **organizations**, not people (RiskStop, SpaceClipper, Thales, BT). Keep separate from `externalCoIs`.

## Cross-references

Forward (stored on the project):
- `pi`, `coi[*]` → People
- `researchAreas[*]` → ResearchAreas
- `relatedPubs[*]` → Publications

Reverse (rendered, not stored):
| View | Query |
|---|---|
| All projects with Luo as PI | `Projects.where(pi==='member-luo')` |
| All projects with Luo involved | `Projects.where(pi==='member-luo' \|\| coi.includes('member-luo'))` |
| Projects in an area | `Projects.where(researchAreas.includes(area-id))` |
| Projects from a funder | filter UI on `/research/projects` |

## Page layout (`/research/projects`)

Shared `Chronology` layout — left rail buckets projects by **start year** of `period` (collapsible, scroll-spied), right column lists them under year headings, newest first. Within a year: live work first (`active` → `under-review` → `planned` → `completed` → `cancelled`), then by title. Status is just a badge on the card now, not a section.

Each project renders as a card: status badge · acronym (if present) · title · period · funder · amount · PI/CoIs · partners · `summary` inline. No detail page. (Funder/area/role filters — future work.)

## Migration from current state

`content/lead/index.md` `sections.Externally Funded Projects (since 2015)` lists ~25 grants in free text:

> `PI: NEOM: Vegetation Change Detection Tool, NEOM Community, £39,151.33, 1 Sep 2025 - 28 Feb 2026`

Migration: parse each line into one `content/projects/proj-{slug}.md` with fields above. Conventions:
- Role prefix `PI:` / `CoI:` → sets `pi: member-luo` or `coi: [member-luo]`
- Title before first comma after acronym → `title` (with acronym extracted)
- Amount segment → `amount`
- Date range → `period`
- Funder → `funder`
- Project numbers (e.g. `Project No. 2866087`, `Ref: 10031767`, `NE/V003402/1`) → `referenceNumber`
- Industry partners (e.g. `with RiskStop`, `with British Telecommunications`) → `partners[]`

`sections.Proposals under Review` → same migration but `status: under-review`.

Bulk migration: a one-off script can do 80% automatically; PI verifies and fills `coi`/`researchAreas` manually since those aren't in the source text.
