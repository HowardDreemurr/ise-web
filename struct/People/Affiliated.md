# People → Affiliated Faculty & Collaborators

Sub-tab of [People](../People.md). External researchers connected to ISE through co-authored papers, joint projects, or formal affiliation — but not formally on the group payroll.

**Visibility rule:** the Affiliated section on `/people` is hidden when zero people have `type: Affiliated`. The schema option remains in Keystatic so a person can be added later without code changes.

## Who appears

`type: Affiliated`. Common cases:
- External co-PIs / CoIs on funded projects
- Co-authors on multiple ISE papers
- Visiting scholars
- Faculty at partner institutions with active collaboration

## Required fields (in addition to People schema)

| Field | Required for Affiliated |
|---|---|
| `affiliation`      | required — their **external** institution, not Exeter |
| `role`             | required — their title there (e.g. "Professor at NUDT") |
| `period`           | optional — affiliations are usually open-ended |
| `funding`          | not used |
| `interests`        | optional |
| `email`            | optional — usually shown as external link to their page |

`roleHighlights` and `bio` are typically omitted; affiliated profiles are intentionally lighter than internal ones.

## Ordering on `/people`

Sort alphabetical by surname. No grouping by sub-type.

## Card layout

```
┌─────────────────────────────────────┐
│  [photo]   Name        [Affiliated] │
│            role · affiliation       │← affiliation is primary
│            [website] [scholar]      │
└─────────────────────────────────────┘
```

Affiliation is the primary subtitle (replacing `period`), since "where they are" matters more than "when they joined". No internal email, no funding tag.

## Example

```yaml
id: member-min
name: Geyong Min
type: Affiliated
role: Professor of High-Performance Computing
affiliation: University of Exeter, Computer Science
links:
  website: https://...
  scholar:  https://...
```

## Cross-reference behavior

When an affiliated person appears as a paper author or project CoI, they get the same in-text label as internal members. They DO NOT get reverse-rendered into anywhere else — the People card is their only home page on this site.
