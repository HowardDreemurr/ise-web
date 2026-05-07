# Resources → Code

Sub-tab of [Resources](../Resources.md). Code repositories — open-source libraries, reference implementations, training pipelines.

## Who appears

`type: code`.

## Typical fields for this type

| Field | Use |
|---|---|
| `link`         | required — GitHub / GitLab / Zenodo URL |
| `license`      | typical — `MIT`, `Apache-2.0`, `GPL-3.0`, etc. |
| `version`      | optional — latest release tag if relevant |
| `relatedPubs`  | strongly encouraged — the paper(s) this code implements |
| `tags`         | language / framework (e.g. `Python`, `PyTorch`) |
| `size`         | not used |

## Card layout

```
┌─────────────────────────────────────┐
│  [thumbnail]   title         [Code] │
│  v1.2 · MIT                         │
│  one-line description               │
│  [Python] [PyTorch]                 │
│  Implements: paper-2024-edge-...    │
│  [→ GitHub]                         │
└─────────────────────────────────────┘
```

Version + license shown as a sub-line under the title. `relatedPubs` rendered as "Implements: …" link. Primary CTA is the GitHub link.
