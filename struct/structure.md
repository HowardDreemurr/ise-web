# ISE Site Structure

## Site Map

```
/                       Home     (hero + recent news)
/news                   News     (chronology archive — single leaf, no dropdown)
/people                 People   ── /current · /alumni · /affiliated
/research               Research ── /publications · /projects · /impact
/resources              Resources ── /code · /data · /tools
/join                   Contact  (CTA leaf)
```

`/news` (formerly `/community`), `/research/publications` ("All papers") and
`/research/projects` share the `Chronology` layout — a year-bucketed left index
+ entries under year headings. Events was retired from the nav; its content lives
on in `content/events/` + `struct/Events.md` as a candidate for a future
"Service" section on Research → Impact.

## Entities

| File | What it holds |
|---|---|
| **[People.md](./People.md)** | Master schema: PI, members, alumni, affiliated |
| &nbsp;&nbsp;├ [People/CurrentMembers.md](./People/CurrentMembers.md) | Sub-tab: Staff + PostDoc + PhD + MPhil |
| &nbsp;&nbsp;├ [People/Alumni.md](./People/Alumni.md) | Sub-tab: graduates with `currentPosition` |
| &nbsp;&nbsp;└ [People/Affiliated.md](./People/Affiliated.md) | Sub-tab: external collaborators |
| **[Resources.md](./Resources.md)** | Master schema: Code, Data, Tools |
| &nbsp;&nbsp;├ [Resources/Code.md](./Resources/Code.md) | Sub-tab: code repositories |
| &nbsp;&nbsp;├ [Resources/Data.md](./Resources/Data.md) | Sub-tab: datasets / benchmarks |
| &nbsp;&nbsp;└ [Resources/Tools.md](./Resources/Tools.md) | Sub-tab: demos / software |
| [Publications.md](./Publications.md) | Papers |
| [Projects.md](./Projects.md) | Funded grants |
| [ResearchAreas.md](./ResearchAreas.md) | Research themes |
| [Impact.md](./Impact.md) | Industry collabs + Awards |
| [News.md](./News.md) | Announcements (the whole `/news` tab) |
| [Events.md](./Events.md) | Talks · Workshops · Symposia · Service — **retired from nav**, content preserved |

> Master files define the **shared schema**. Sub-tab files define **view-specific rules** (which types appear, ordering, required fields per type, card layout) without redefining the schema.

## Relationships

```
        Publications ─authors──► People
              ▲                    ▲
        ResearchAreas              │
        (papers, projects)         │
              │                    │
              ▼                    │
           Projects ──pi, coi─────►┘

   News, Events, Impact ─optional refs──► (any of the above)
```

Forward refs only. ID = filename slug (`member-luo`, `paper-2025-ice-aware`). Reverse views (e.g. "Luo's papers") are computed at render time.
