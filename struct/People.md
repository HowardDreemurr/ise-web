# People

PI, research staff, students, alumni, affiliated. **One schema, one `people` collection.** A `type` field discriminates roles.

PI has no special UI section — they appear as a regular card under **Current Members** on `/people` with `type: Staff` (which also covers research programmers, RAs, and any non-academic staff). No `lead` singleton in Keystatic.

People page sub-tabs:
- **Current Members** (types: `Staff`, `PostDoc`, `PhD`, `MPhil`) — Staff first, then by start year
- **Alumni** (type: `Alumni`)
- **Affiliated Faculty & Collaborators** (type: `Affiliated`)

## Schema

```yaml
id:          member-luo              # slug, also filename
name:        Chunbo Luo
type:        Staff                   # Staff | PostDoc | PhD | MPhil | Affiliated | Alumni
role:        Lead Professor, ISE Group
affiliation: University of Exeter
email:       c.luo@exeter.ac.uk
photo:       /images/people/luo.jpg

# All optional below
links:
  website:  https://...
  scholar:  https://...
  github:   ...
  orcid:    ...
  linkedin: ...

interests:                            # short tags, not paragraphs
  - Remote sensing
  - Edge AI

period:           "2014 - present"    # current member or alumni dates
funding:          EPSRC CASE          # students only
currentPosition:  ...                 # alumni only — where they are now

# Optional — positions of authority (PI-typical, but any role can fill)
roleHighlights:
  - "Deputy Director of Research and Impact, Computer Science (2024 - date)"
  - "Theme Lead, Centre of Environmental Intelligence (2025 - date)"

bio: |                                # markdown body, 1-2 short paragraphs MAX
  One-paragraph research positioning. No CV dump.
```

## What this schema does NOT store

There is **no individual person page**. Cards on `/people` are terminal — they show profile basics + external links only. Cross-references render on the destination pages instead:

| Cross-ref | Where it shows |
|---|---|
| Member as paper author | inline on `/research/publications` cards |
| Member as project PI / CoI | inline on `/research/projects` cards |
| Member as award holder | inline on `/research/impact` (awards section) |
| Member as event organizer | inline on `/community/events` cards |
| **Citation metrics** (citations, h-index, i10) | compact line on the member's own card, fetched from `links.scholar` — see [Metrics fetching](#metrics-fetching) |

## Examples

**PI** (`content/people/member-luo.md`):
```yaml
id: member-luo
name: Chunbo Luo
type: Staff
role: Lead Professor, ISE Group
affiliation: University of Exeter
email: c.luo@exeter.ac.uk
photo: /images/people/luo.jpg
links:
  website: https://experts.exeter.ac.uk/...
  scholar: https://scholar.google.com/citations?user=XXXX
roleHighlights:
  - "Deputy Director of Research and Impact, Computer Science (2024 - date)"
  - "Theme Lead, Centre of Environmental Intelligence (2025 - date)"
bio: |
  Research lead in intelligent sensing for environmental observation,
  with a focus on autonomous vehicles, IoT networks, and ML for Earth
  observation.
```

**PhD** (`content/people/member-carpenter.md`):
```yaml
id: member-carpenter
name: Marcus Carpenter
type: PhD
role: PhD Candidate
period: "2019 - present"
funding: EPSRC CASE
interests: [Malware detection, Federated learning]
```

## Metrics fetching

`links.scholar` is **optional for every type** (Staff, PostDoc, PhD, MPhil, Affiliated, Alumni). Citation count, h-index, and i10-index are **derived** — never stored in the markdown.

- If `links.scholar` is set → metrics get tracked and rendered as a compact line on the card.
- If absent → no metrics line, no impact on layout.

Implementation: GitHub Actions cron (weekly) → SerpApi Scholar endpoint → `content/_generated/scholar-metrics.json` committed back. Free tier (250 searches/mo) covers ~30 active scholar links comfortably. Pages read the json at build time; runtime never touches the API. `SERPAPI_KEY` lives in GitHub Actions secrets only.

Fallback: if a fetch fails for one person, the previous value is reused. If the json is missing entirely, metrics simply don't render.

## Migration from current state

| Current location | What to do |
|---|---|
| `content/lead/index.md` (singleton, 26K tokens) | → become a regular `content/people/member-luo.md` with `type: Staff`. Drop singleton from Keystatic. |
| `content/lead/index.md` `sections.Externally Funded Projects` | → split into `content/projects/*.md` (one per grant); store `pi: member-luo` or `coi: [...]` there |
| `content/lead/index.md` `sections.Editorial Service`, `Conference Roles` | → `content/events/*.md` with `type: editorial` or `type: chair`, `organizers: [member-luo]` |
| `content/lead/index.md` `sections.Teaching` | → static page or drop |
| `content/members/current/*.md` `research` field | → keep, but rename to `interests` (array of tags) |
| `content/members/current/*.md` (no email/photo/links) | → add the optional fields above |
