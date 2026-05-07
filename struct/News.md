# News

Time-stamped announcements: paper acceptances, project launches, awards, media mentions, group milestones. Lives under the **Community** tab.

## Schema

```yaml
id:        news-2025-01-best-paper                # slug, also filename
title:     ISE wins best paper award for ice hazard forecasting
date:      2025-01-10                             # ISO date, used for sort + URL
tag:       Award                                  # Award | Paper | Project | Talk | Media | Milestone
subtitle:  Recognition at the International Conference on Environmental AI

# Optional
imageUrl:  /images/news/2025-01-best-paper.jpg
content: |                                        # markdown body, multi-paragraph OK
  Full announcement text. This is the long form — News is one of the few
  places where multi-paragraph prose is appropriate.

# Optional cross-refs (the value of News as a hub)
relatedPeople:  [member-luo, member-carpenter]
relatedProjs:   [proj-instant]
relatedPubs:    [paper-2025-ice-aware]
relatedAwards:  [award-best-paper-2025]
relatedEvents:  [event-2025-icea-keynote]

# Optional external links
links:
  - { label: "Read the paper", href: "https://..." }
  - { label: "Press release",  href: "https://..." }
```

## Tag enum

Predefined to keep the filter UI clean:
- `Award` — won something
- `Paper` — paper accepted/published, big result
- `Project` — grant awarded, project kicked off
- `Talk` — keynote / invited talk delivered
- `Media` — press coverage, blog post about us
- `Milestone` — group-level (new lab, new hire, anniversary)

If something doesn't fit, add a tag — don't reach for free-text.

## Cross-references

News is a **terminal aggregator** — many entities reference INTO it via the `relatedX` arrays, but nothing reverse-queries News. (No "all news mentioning Luo" page; that would just be noise.)

| Forward field | Used for |
|---|---|
| `relatedPeople`  | render "Featuring: Luo, Carpenter" line on the news card |
| `relatedProjs`   | render "Project: INSTANT" tag |
| `relatedPubs`    | render "Paper: …" link |
| `relatedAwards`  | render "Award: …" link |
| `relatedEvents`  | render "Event: …" link |

All forward refs are optional. A news item with no refs is fine (e.g. a Milestone post).

## Page layout

`/community/news` (list): reverse-chronological, paginated or infinite scroll. Each card shows: date · tag badge · title · subtitle · thumbnail · related-refs row.

`/community/news/[slug]` (detail): hero image · date · tag · title · full markdown content · related items at the bottom.

Detail page IS rendered (unlike People) because news has long-form `content`. Otherwise it'd just be a teaser.

## Migration from current state

`content/news/*.md` already has: `title`, `date`, `subtitle`, `tag`, `imageUrl`, `links`, `content` (markdoc). Migration is additive only:
- Add `relatedPeople`, `relatedProjs`, `relatedPubs`, `relatedAwards`, `relatedEvents` arrays (all optional)
- Constrain `tag` to the enum above (currently free text)
- Existing 4 news files stay valid; backfill cross-refs where obvious
