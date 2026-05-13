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

Same photoless compact `PersonCard` template used on `/people/current`, with the alumni-specific `Now: <currentPosition>` line in the meta row.

```
┌────────────────────────────┐
│ [badge]                    │
│ Name                       │
│ Role                       │
│ Period (closed) · Now: …   │
│ Research: tag · tag        │
│ ──────────────────────     │
│ [scholar] [linkedin]       │
└────────────────────────────┘
```

`funding` is intentionally not rendered (kept in schema for archival). Citation metrics are skipped on this tab; the page focuses on placement.

## Badge label

The badge **does not say "Alumni"** for everyone — Alumni is an umbrella, like Staff. Each card's badge derives from the person's `role` field through the `ROLE_SHORT_FORMS` dictionary (see [CurrentMembers § Badge label rules](./CurrentMembers.md#badge-label-rules)):

| Role string | Badge |
|---|---|
| `MPhil (Lead supervision)` | `MPhil` |
| `Postdoctoral Research Fellow` | `PostDoc` |
| `PhD Candidate` | `PhD` |
| `BSc Project Student` | `Undergrad` |

The umbrella label `Alumni` appears only as the section heading on the page, never on individual cards.

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
