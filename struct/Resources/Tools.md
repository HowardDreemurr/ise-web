# Resources → Tools

Sub-tab of [Resources](../Resources.md). Online demos, deployable software, and pre-trained models meant to be **used** rather than just read.

## Who appears

`type: tools`.

Examples: a browser-based change-detection demo, a Hugging Face Space, a downloadable QGIS plugin, a Docker image, a pre-trained model checkpoint with a usage UI.

## Typical fields for this type

| Field | Use |
|---|---|
| `link`         | required — live URL (demo) or download/install URL (software) |
| `version`      | typical — for software/checkpoints |
| `license`      | optional — usage license, esp. for model weights |
| `relatedPubs`  | encouraged — paper backing the model/demo |
| `relatedProjs` | encouraged — project the tool came out of |
| `tags`         | use case (`Demo`, `Plugin`, `Model`) + tech (`HF Space`, `Docker`, `QGIS`) |
| `size`         | not used |

## Card layout

```
┌─────────────────────────────────────┐
│  [thumbnail]   title       [Tools]  │
│  v0.3                               │
│  one-line description               │
│  [Demo] [HF Space]                  │
│  Backed by: paper-2025-...          │
│  [→ Try it]                         │
└─────────────────────────────────────┘
```

CTA label varies by sub-kind: `Try it` for demos, `Download` for software, `Open in HF` for Spaces. Determined by the destination URL or tags.
