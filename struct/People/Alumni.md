# People → Alumni

Sub-tab of [People](../People.md). Former group members who have moved on.

## Who appears

`type: Alumni` AND `period` is closed (`"YYYY - YYYY"`).

When a current member graduates / leaves, change `type` to `Alumni`, close `period`, and fill `currentPosition`.

## Required fields (in addition to People schema)

| Field | Required for Alumni |
|---|---|
| `period`           | required, **closed range** `"YYYY - YYYY"` |
| `currentPosition`  | required — what they do now and where |
| `funding`          | optional — keep if they had a notable funder |
| `interests`        | optional |
| `links.scholar`    | optional, but encouraged for citation continuity |

`roleHighlights` is dropped for alumni.

## Ordering on `/people`

Sort by `period` end year **descending** (most recent graduates first).
Same-year ties: sort by name alphabetical.

## Card layout

```
┌─────────────────────────────────────┐
│  [photo]   Name           [Alumni]  │
│            period (closed)          │
│            Now: currentPosition     │← prominent, alumni-specific
│            [scholar] [linkedin]     │
└─────────────────────────────────────┘
```

Photo is optional — falls back to initials avatar (same default as current members). Email is hidden by default (no longer @exeter). Citation metrics are skipped on this tab; the page focuses on placement.

```yaml
id: member-carpenter
name: Marcus Carpenter
type: Alumni
period: "2019 - 2024"
funding: EPSRC CASE
currentPosition: Senior ML Engineer at <company>
```

## Migration from current state

`content/members/alumni/*.md` currently has `type: PhD/PostDoc/MPhil` + `currentPosition`. Migration is a one-line change per file: set `type: Alumni`. The original role is no longer recorded — the user accepted this trade-off for schema simplicity.
