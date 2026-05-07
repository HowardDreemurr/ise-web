# Events

Academic activities organised, chaired, or hosted by group members. Lives under the **Community** tab. Confirmed in design phase that PI runs these regularly, so the collection is real (not a placeholder).

## Schema

```yaml
id:        event-2024-egu-keynote                 # slug, also filename
title:     Resilient Sensing for Climate Hazards
type:      keynote                                # keynote | workshop | symposium | speaker-series | editorial | chair
date:      2024-07-15                             # ISO date or range start
endDate:   2024-07-17                             # optional, for multi-day events
venue:     EGU General Assembly, Vienna           # event name + location
role:      Speaker                                # Speaker | Organizer | Chair | Co-Chair | Editor

# People involved (internal members)
organizers:  [member-luo]                         # required, ≥ 1

# Optional
description: |
  Short paragraph. What the event was, why it mattered.
url:         https://...                          # event website / programme
slides:      /pdfs/2024-egu-keynote.pdf           # local copy of slides, optional
recurring:   true                                 # for speaker series, recurring workshops
seriesOf:    series-ise-seminar                   # if part of a recurring series, ref another event id
relatedPubs: [paper-2024-...]                     # if event presented a specific paper
tags:        [Climate, Keynote, EGU]
```

## Type enum

| Value | Meaning |
|---|---|
| `keynote`         | Invited keynote / plenary at a conference |
| `workshop`        | Workshop organised at a conference |
| `symposium`       | Standalone symposium / mini-conference |
| `speaker-series`  | Recurring talk series the group runs |
| `editorial`       | Editorial board service (journal name as `venue`) |
| `chair`           | Conference / track chair role |

`editorial` and `chair` cover the "Editorial Service" and "Conference Roles" sections currently in `lead/index.md` — they live as Events with no `date` or with a service period. This avoids creating yet another collection.

## Cross-references

Forward (stored): `organizers`, `seriesOf`, `relatedPubs`. All except `organizers` are optional.

Reverse (rendered, not stored):
| View | Query |
|---|---|
| Events organised/given by Luo | `Events.where(organizers.includes('member-luo'))` |
| All events in a series | `Events.where(seriesOf==='series-...')` |

## Page layout (`/community/events`)

Tabs or filter chips by `type`. Within each type, sort by `date` desc.

Card content: type badge · date (or date range) · title · venue · organizers (in-text labels) · short description · `[programme]` link.

For `editorial` and `chair` entries (which often don't have a single date), render in a dedicated "Service" section grouped by service period rather than as date-stamped cards.

No detail page in v1. All info fits on the card; external `url` is the canonical source.

## Migration from current state

There is no `events` collection yet. Create one. Initial seeds:

- `content/lead/index.md` `sections.Editorial Service` → `content/events/event-editorial-{journal}.md` per entry, with `type: editorial`, `venue: <journal name>`, `organizers: [member-luo]`, period in `date`/`endDate` if known
- `content/lead/index.md` `sections.Conference Roles` (track chair etc.) → `type: chair`, `venue: <conference>`, role detail in `role` field
- Past keynotes / invited talks scattered through PI's CV → `type: keynote`
- Speaker series the group runs (if any) → `type: speaker-series`, `recurring: true`

Most of these need PI to supply data — the existing `lead/index.md` doesn't surface keynotes/workshops as a structured list, only editorial service.
