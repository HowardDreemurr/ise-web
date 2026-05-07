# Impact

Two related but distinct collections, both surfaced on `/research/impact`:

1. **Industry Impacts** — collaborations with companies / sector partners
2. **Awards** — recognitions received by group members

Kept as two collections (matches current Keystatic setup) because their fields don't overlap meaningfully. Documented together because they share a page.

---

## Industry Impacts

### Schema

```yaml
id:           impact-thales-atd-atr               # slug, also filename
title:        Low-pixel Automatic Target Detection and Recognition
partner:      Thales & CENSIS                     # company / org name (free text)
description:  |
  Short paragraph. What the collaboration did, what was delivered, what the outcome was.

# Optional
period:        "2015 - 2016"
amount:        £139K                              # if disclosable
people:        [member-luo]                       # internal members involved
relatedProjs:  [proj-thales-challenge]            # the funded project this collab maps to
relatedPubs:   [paper-2016-...]                   # outputs from the collaboration
tags:          [Defence, Computer Vision]
```

### Cross-references

Forward (stored): `people`, `relatedProjs`, `relatedPubs`. All optional.

Reverse: members involved in industry collaborations → `Impacts.where(people.includes(member-id))`.

Note: `partner` is **free text**, not a People reference. Companies are not modelled as entities (would over-complicate). If a company also appears as a project `partners[]` entry, the names just need to match by convention.

---

## Awards

### Schema

```yaml
id:            award-knowledge-transfer-medal     # slug, also filename
title:         Knowledge Transfer Medal
organization:  Scottish Funding Council
year:          2016                               # integer
description:   |
  Short paragraph explaining what the award was for. Optional but encouraged.

# Optional
holders:       [member-luo]                       # who received it (one or more)
relatedProjs:  [proj-thales-challenge]            # if award was for a specific project
relatedPubs:   [paper-2016-...]                   # if award was for a paper
```

### Cross-references

Forward (stored): `holders`, `relatedProjs`, `relatedPubs`.

Reverse: awards held by a member → `Awards.where(holders.includes(member-id))`.

`holders` is what enables "Awards held" rendering on People — but per the no-detail-page decision, the rendering currently happens inline on `/research/impact` (awards section), not on a member's card. The reverse query stays useful for filtering ("show only awards held by current members").

---

## Page layout (`/research/impact`)

Two sections in this order:

1. **Industry Collaborations** — grid of cards, sorted by `period` end year desc. Each card shows: partner badge · title · description · tags · people involved (in-text labels).
2. **Awards & Recognition** — grid of compact cards, sorted by `year` desc. Each card shows: trophy icon · title · organization · year · holders (in-text labels) · description.

## Migration from current state

Both collections already exist:
- `content/impact/*.md` — has `title`, `description`, `partner`, `tags`. Add `people`, `relatedProjs`, `relatedPubs`, `period`, `amount`.
- `content/awards/*.md` — has `title`, `organization`, `year`, `description`. Add `holders`, `relatedProjs`, `relatedPubs`.

Specifically, current awards (e.g. `un-sustainability-award.md`, `highly-cited-researcher.md`, `top-2-percent-scientists.md`, `editorial-board.md`) need `holders: [member-luo]` added — most of these are PI-personal awards.

`year` in awards is currently a string in some files; convert to integer for sortability.
