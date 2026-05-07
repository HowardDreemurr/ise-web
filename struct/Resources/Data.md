# Resources → Data

Sub-tab of [Resources](../Resources.md). Datasets and benchmarks released or maintained by the group.

## Who appears

`type: dataset`.

## Typical fields for this type

| Field | Use |
|---|---|
| `link`         | required — Zenodo / Hugging Face / institution-hosted URL |
| `license`      | typical — `CC BY 4.0`, `CC BY-NC 4.0`, `CC0`, etc. |
| `size`         | typical — display string (`12 GB`, `4.2 M images`, `56k labeled samples`) |
| `version`      | optional — only if dataset has versioned releases |
| `relatedPubs`  | strongly encouraged — the dataset paper |
| `tags`         | domain / sensor / modality (e.g. `Sentinel-2`, `Aerial`, `Segmentation`) |

## Card layout

```
┌─────────────────────────────────────┐
│  [thumbnail]   title         [Data] │
│  12 GB · CC BY 4.0                  │
│  one-line description               │
│  [Sentinel-2] [Wetland]             │
│  Cited in: paper-2024-...           │
│  [→ Download]                       │
└─────────────────────────────────────┘
```

Size + license shown as a sub-line. `relatedPubs` rendered as "Cited in: …". Primary CTA links to the host (Zenodo / HF / etc.).
