# ISE Group Website

Next.js 16 site for the ISE (Intelligent Sensing & Environment) research group at the University of Exeter. Statically exported to GitHub Pages.

## Stack

- Next.js 16 (App Router) + React 19 + Tailwind 4
- TypeScript (strict)
- Content as markdown in `content/` (loaded via `gray-matter`)
- Keystatic admin (local mode) for editing content

## Development

```bash
npm install
npm run dev
```

The site is served at `http://localhost:3000/ise-web` (note the basePath).

The Keystatic admin is available at `http://localhost:3000/ise-web/keystatic` in dev mode only. Edits made there write directly to files in `content/` and `public/images/`.

## Editing content

All editable content lives in `content/`:

```
content/
├── news/                      # one .md per news item
├── members/
│   ├── current/               # current PhD/PostDoc members
│   └── alumni/                # graduated members
├── projects/                  # active projects
├── publications/              # selected publications (page-level summaries)
├── research-areas/            # research areas, each with nested papers
├── code-and-data/             # open-source code and datasets
├── impact/                    # industry impact case studies
├── awards/                    # honours and awards
└── lead/index.md              # lead professor singleton
```

Two ways to edit:

1. **Keystatic admin (recommended for non-developers)** — run `npm run dev`, open `/keystatic`, edit, save. Then commit the resulting filesystem changes.
2. **Direct markdown** — edit the `.md` files in your editor. Frontmatter fields are documented in `keystatic.config.ts`.

Images uploaded through Keystatic land in `public/images/news/` or `public/images/lead/` and are committed to the repo.

## Editorial workflow

1. Create a feature branch: `git checkout -b content/<topic>`
2. Edit content (via Keystatic admin or directly)
3. `npm run typecheck && npm run build` to verify
4. Commit and push, open a PR
5. CI runs typecheck + lint + build on the PR
6. Merge → master → CI deploys to GitHub Pages

## Scripts

- `npm run dev` — dev server with Keystatic admin enabled
- `npm run build` — static export to `out/` (no admin)
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint
- `npm run parse-cv` — one-shot CV parser (legacy; only when migrating from `cv_web.docx`)

## CI/CD

`.github/workflows/deploy.yml` runs on:
- `push` to `master` → typecheck + lint + build + deploy to Pages
- `pull_request` to `master` → typecheck + lint + build only (no deploy)

Dependabot is enabled (`.github/dependabot.yml`) for weekly npm updates and monthly GitHub Actions updates.

## Deployment topology

Two deployments run from the same repo:

| Target | What it serves | When admin is enabled |
|---|---|---|
| **GitHub Pages** (`<owner>.github.io/ise-web`) | Static export — public site | No |
| **Vercel** (`<project>.vercel.app`) | Full Next.js — public site + Keystatic admin | Yes |

Editors only need the Vercel URL. The Pages site is the canonical public URL but is read-only.

The two modes are auto-detected at build time:
- `process.env.VERCEL === "1"` → admin routes included, no static export, no `basePath`
- Otherwise → static export to `out/` with `basePath: "/ise-web"`

## Vercel setup (one-time)

### 1. GitHub OAuth App

[github.com/settings/developers](https://github.com/settings/developers) → **New OAuth App**:

- **Homepage URL**: `https://<your-vercel-project>.vercel.app`
- **Authorization callback URL**: `https://<your-vercel-project>.vercel.app/api/keystatic/github/oauth/callback`

After creation, note the **Client ID** and generate a **Client Secret** (store securely — only shown once).

### 2. Vercel project

1. [vercel.com/new](https://vercel.com/new) → import the GitHub repo
2. Framework preset: Next.js (auto-detected)
3. Add **Environment Variables** before first deploy:
   - `KEYSTATIC_GITHUB_CLIENT_ID` — from step 1
   - `KEYSTATIC_GITHUB_CLIENT_SECRET` — from step 1
   - `KEYSTATIC_SECRET` — random 32+ char string (e.g. from `openssl rand -hex 32`); used to sign Keystatic session cookies
4. Deploy. Vercel will assign the project a domain.
5. **Update the OAuth App** (step 1) with the real Vercel URL if it differs from your guess.

### 3. Verify

- Open `https://<project>.vercel.app/keystatic` → click **Sign in with GitHub** → authorize
- Edit any field, save → Keystatic commits to the repo
- GitHub Actions sees the push and rebuilds Pages

### Notes

- `KEYSTATIC_SECRET` must stay stable; rotating it logs everyone out.
- Storage is hard-coded to `HowardDreemurr/ise-web` in `keystatic.config.ts` — change if the repo moves.
- Local dev still uses `local` storage (writes filesystem). To test GitHub mode locally, add `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` and the three env vars above to `.env.local`.
