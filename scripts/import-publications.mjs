#!/usr/bin/env node
/**
 * Bulk-import the Publications section of cv_web.docx into content/publications/*.md.
 *
 *   node scripts/import-publications.mjs            # write the missing entries
 *   node scripts/import-publications.mjs --dry-run  # print what would be written
 *
 * - Reads cv_web.docx (gitignored — keep it at the repo root).
 * - Sub-sections map to publication types:
 *     Chapters in Books            -> book-chapter
 *     Journal Papers               -> journal
 *     Review Articles in Journals  -> journal
 *     Selected Papers in Conferences -> conference
 *     Report                       -> report
 * - Skips any entry whose (normalised) title already has a file in content/publications/.
 * - Author / venue / DOI parsing is best-effort across the CV's several citation
 *   formats — review the generated frontmatter (esp. author lists and venues).
 */
import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const PUBS_DIR = path.join(ROOT, "content", "publications")
const DOCX = path.join(ROOT, "cv_web.docx")
const DRY = process.argv.includes("--dry-run")

// ── member dictionary: [regex on normalised "X. Surname", member id, minYear?] ──
const MEMBERS = [
  [/^c\.?\s*luo$/i, "member-luo"], // PI — always in these papers (first match only)
  [/^m\.?\s*carpenter$/i, "member-carpenter"],
  [/^j\.?\s*nightingale$/i, "alumni-nightingale"],
  [/^l\.?\s*menz$/i, "alumni-menz"],
  [/^s\.?\s*goult$/i, "alumni-goult"],
  [/^a\.?\s*navaneethanathan$/i, "alumni-navaneethanathan"],
  [/^r\.?\s*vandaele$/i, "member-vandaele"],
  [/^t\.?\s*nowak$/i, "member-nowak"],
  [/^a\.?\s*sundar$/i, "member-sundar"],
  [/^h\.?\s*ouyang$/i, "member-ouyang-hanyu", 2024],
  [/^w\.?\s*miao$/i, "alumni-miao-wang", 2014],
  [/^y\.?\s*mi$/i, "alumni-mi-yang", 2017],
  [/^z\.?\s*li$/i, "member-li-zhuhui", 2021],
  [/^j\.?\s*zhang$/i, "alumni-zhang-jiazhen", 2019],
  [/^q\.?\s*zhang$/i, "alumni-zhang-qin", 2018],
  [/^h\.?\s*zhang$/i, "alumni-zhang-huaizhong", 2015],
  [/^q\.?\s*liu$/i, "alumni-liu-qinglan", 2021],
  [/^l\.?\s*zhu$/i, "member-zhu-lulin", 2024],
  [/^l\.?\s*zhang$/i, "member-zhang-luyang", 2023],
  [/^j\.?\s*lu$/i, "member-lu-jiawei", 2023],
  [/^n\.?\s*bachiller/i, "member-bachiller-jareno", 2024],
  [/^j\.?\s*dare/i, "member-dare-cullen", 2023],
]

// ── 1. docx -> plain-text lines ──────────────────────────────────────────────
function docxLines() {
  const xml = execSync(`unzip -p "${DOCX}" "word/document.xml"`, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
  return xml
    .replace(/<w:p[ >]/g, "\n<w:p ")
    .replace(/<w:tab\/>/g, " ")
    .replace(/<w:br\/>/g, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .split("\n")
    .map((s) =>
      s
        .replace(/\s+/g, " ")
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/[–—]/g, "-")
        .trim(),
    )
    .filter(Boolean)
}

// ── 2. collect citation lines under the Publications sub-sections ────────────
// (Book chapters are skipped — the 5 of them are already in content/publications/.)
const SECTION_TYPE = {
  "journal papers": "journal",
  "review articles in journals": "journal",
  "selected papers in conferences": "conference",
  report: "report",
}
function collectEntries(lines) {
  const out = []
  let active = null
  let inPubs = false
  for (const line of lines) {
    const low = line.toLowerCase().replace(/\s+/g, " ").trim()
    if (low === "publications") { inPubs = true; continue }
    if (!inPubs) continue
    if (low === "datasets and codes") break
    if (SECTION_TYPE[low] !== undefined) { active = SECTION_TYPE[low]; continue }
    if (!active) continue
    if (/^citation metrics|^citations:|^highest-cited/i.test(line)) continue
    if (line.length < 25) { active = SECTION_TYPE[line.toLowerCase().trim()] ?? active; continue }
    out.push({ type: active, raw: line })
  }
  return out
}

// ── 3. parse one citation line ──────────────────────────────────────────────
const isInitial = (x) => /^[A-Z]\.?$/.test(x) || /^[A-Z]{2,3}\.?$/.test(x) // "J." or "AH" / "SI"
const expandInit = (x) => x.replace(/\.$/, "").split("").map((c) => c + ".").join(" ") // "AH" -> "A. H."

/** Normalise one author token to "X. Surname" (or "X. Y. Surname"). */
function normName(tok) {
  const t = tok.replace(/^(?:and|&)\s+/i, "").replace(/^[).,;\s]+|[.,;…\s]+$/g, "").trim()
  if (!t) return ""
  // "Surname, X." or "Surname, X. Y." (APA, surname-first)
  if (t.includes(",")) {
    const ci = t.indexOf(",")
    const sur = t.slice(0, ci).trim()
    const inits = t.slice(ci + 1).trim().split(/\s+/).filter(Boolean).map((x) => expandInit(x)).join(" ")
    return inits ? `${inits} ${sur}` : sur
  }
  const parts = t.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0]
  // trailing initials: "Khan K. A." -> "K. A. Khan", "Wu J" -> "J. Wu", "McClean SI" -> "S. I. McClean"
  let i = parts.length
  while (i > 1 && isInitial(parts[i - 1])) i--
  if (i < parts.length) {
    return `${parts.slice(i).map((x) => expandInit(x)).join(" ")} ${parts.slice(0, i).join(" ")}`
  }
  // leading initials: "S. I. McClean", "C. Luo"
  let j = 0
  while (j < parts.length - 1 && isInitial(parts[j])) j++
  if (j > 0) return `${parts.slice(0, j).map((x) => expandInit(x)).join(" ")} ${parts.slice(j).join(" ")}`
  // "Firstname Surname"
  return `${parts[0][0].toUpperCase()}. ${parts.slice(1).join(" ")}`
}

function splitAuthors(raw) {
  let s = raw.trim().replace(/\bet al\.?/gi, "").replace(/[.,;\s]+$/, "")
  const apa = /^[A-Z][a-z]+,\s*[A-Z]\./.test(s) // starts with "Surname, X." -> surname-first APA list
  const parts = apa
    ? s.split(/(?<=[A-Z]\.)\s*,\s*|\s*&\s*|\s+and\s+|\s*;\s*/)
    : s.split(/\s*,\s*|\s+and\s+|\s*&\s*|\s*;\s*/)
  return parts
    .map((x) => x.trim().replace(/^(?:and|&)\s+/i, "").replace(/^[).,;\s]+|[.,;\s]+$/g, ""))
    .filter((x) => x && x.length > 1 && /[A-Za-z]/.test(x) && !/^\d/.test(x))
}

function toAuthorRefs(raw, year) {
  const tokens = splitAuthors(raw).map(normName).filter(Boolean)
  let usedLuo = false
  return tokens.map((n) => {
    for (const [re, id, minYear] of MEMBERS) {
      if (re.test(n) && (!minYear || year >= minYear)) {
        if (id === "member-luo") {
          if (usedLuo) return { discriminant: "external", value: n }
          usedLuo = true
        }
        return { discriminant: "member", value: id }
      }
    }
    return { discriminant: "external", value: n }
  })
}

// Recognised venue starters — used to find where the title ends.
const VENUE_CUE = /^(?:IEEE|ACM|Springer|Elsevier|Wiley|IET|MDPI|Frontiers|Copernicus|Nature|Science(?:\s|$)|Proceedings|Proc\.|In:?\s|Remote Sensing|GIScience|Cognitive|Multimedia|Applied Energy|Energy and Buildings|Journal of|International Journal|International Symposium|International Conference|EURASIP|IGI Global|Taylor|University of|Information Resources|Healthcare Informatics|Web-Based Services|Mobile Networks|5G-Enabled|SPIE|EGU|AGU|NeurIPS|NurIPS|AAAI|BMVC|CVPR|ICASSP|ICC[-,\s]|GLOBECOM|Globecom|PIMRC|EUSIPCO|GeoScience|The \d+(?:st|nd|rd|th)\b|\d+(?:st|nd|rd|th) International|\d{4} IEEE|\d{4} International|Progress in)/i
function cleanVenue(v) {
  return (v || "")
    .replace(/^(?:in:?\s+)/i, "")
    .replace(/^(?:19|20)\d{2}\s+/, "") // leading year ("2019 IEEE …")
    .replace(/[(,]\s*(?:vol\.?|volume|no\.?|pp\.?|pages|p\.|article no\.?|pp)\b.*$/i, "")
    .replace(/\.?\s*DOI:.*$/i, "")
    .replace(/\s*-\s*Proceedings\b.*$/i, "")
    .replace(/\s*Conference Abstracts?\b.*$/i, "")
    .replace(/\s*\(p+\.?\s*\d.*$/i, "")
    .replace(/\s*\(Vol\.?\s*\d.*$/i, "")
    .replace(/,?\s*\d+\s*[-–]\s*\d+.*$/, "")
    .replace(/,?\s*\(?\d+\)?\s*$/, "")
    .replace(/\([^()]*(?:CORE|Flagship|Cited|Impact Factor|Q1|Web of Science|Best paper)[^()]*\)/gi, "")
    .replace(/[-,;:.\s]+$/, "")
    .trim()
}

/** Find where the title ends in `rest` — prefer a recognised venue cue
 *  (", IEEE …" / ". Proceedings …" / "In: …"), otherwise the first ". "
 *  followed by a capital, otherwise the first ", ". Returns {title, venue}. */
function splitTitleVenue(rest) {
  rest = rest.trim()
  // quoted title?  "Title," in Venue …
  const q = rest.match(/^["']([^"']+)["']/)
  if (q) {
    return { title: q[1].trim(), venue: cleanVenue(rest.slice(q[0].length).replace(/^(?:,?\s*in\s+|[,.\s]+)/i, "")) }
  }
  // venue cue: scan for ", " or ". " or "In " / "In: " that is followed by a venue starter
  let best = -1, cueLen = 0
  for (const m of rest.matchAll(/(?:,\s+|\.\s+|\s+(?=In:?\s))/g)) {
    const after = rest.slice(m.index + m[0].length)
    if (VENUE_CUE.test(after)) { best = m.index; cueLen = m[0].length; break }
  }
  let cut, skip
  if (best >= 0) { cut = best; skip = cueLen }
  else {
    const dot = rest.search(/\.\s+[A-Z(]/)
    const com = rest.indexOf(", ")
    if (dot >= 0 && (com < 0 || dot < com)) { cut = dot; skip = 2 }
    else if (com >= 0) { cut = com; skip = 2 }
    else { cut = rest.length; skip = 0 }
  }
  const title = rest.slice(0, cut).trim().replace(/[,.;:\s]+$/, "")
  let after = rest.slice(cut + skip).replace(/^(?:in:?\s+|[,.\s]+)/i, "")
  const stop = after.search(/,\s|\.\s|\s+\d/)
  return { title, venue: cleanVenue(stop >= 0 ? after.slice(0, stop) : after) }
}

function parseEntry(raw, type) {
  let s = raw.replace(/^\[invited paper\]\s*/i, "").replace(/^\*\s*/, "").trim()

  let doi
  const dm = s.match(/\bdoi:?\s*(10\.[^\s,;)\]]+)/i) || s.match(/doi\.org\/(10\.[^\s,;)\]]+)/i)
  if (dm) doi = dm[1].replace(/[.,]$/, "")

  // year: prefer (YYYY…) right after the authors; else last 4-digit year in the line
  let year = null, splitIdx = -1, splitLen = 0
  const pm = [...s.matchAll(/\(((?:19|20)\d{2})(?:,[^)]*)?\)/g)]
  if (pm.length) { year = parseInt(pm[0][1], 10); splitIdx = pm[0].index; splitLen = pm[0][0].length }
  if (year == null) {
    const all = [...s.matchAll(/\b((?:19|20)\d{2})\b/g)]
    if (all.length) year = parseInt(all[all.length - 1][1], 10)
  }
  if (year == null) return null

  let authorsRaw, titleVenue
  if (splitIdx >= 0) {
    authorsRaw = s.slice(0, splitIdx).trim().replace(/[.,]\s*$/, "")
    titleVenue = splitTitleVenue(s.slice(splitIdx + splitLen).trim().replace(/^[).,\s]+/, ""))
  } else {
    // no "(YYYY)" — title is in quotes, authors before it, venue after
    const q = s.match(/["']([^"']+)["']/)
    if (!q) return null
    const qi = s.indexOf(q[0])
    authorsRaw = s.slice(0, qi).trim().replace(/[.,]\s*$/, "")
    titleVenue = { title: q[1].trim(), venue: cleanVenue(s.slice(qi + q[0].length).replace(/^[,.\s]+/, "")) }
  }

  let title = titleVenue.title.replace(/\s+/g, " ").replace(/^["']|["']$/g, "").replace(/[,;]+\s*$/, "").trim()
  if (!title || title.length < 6 || title.length > 200) return null // bad parse — title/venue got mushed
  let venue = (titleVenue.venue || "").replace(/\s+/g, " ").trim()
  if (venue.length > 90) venue = "" // probably grabbed junk
  return { authors: toAuthorRefs(authorsRaw, year), year, title, venue, doi, type }
}

// ── 4. slug + markdown ──────────────────────────────────────────────────────
const STOP = new Set("a an the of for in on and or to with using based via from at as by is are this that new towards toward over under between into out about case study survey".split(" "))
function slugFromTitle(title, year, taken) {
  const words = title.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w))
  let base = `paper-${year}-${words.slice(0, 4).join("-")}`.replace(/-+/g, "-").replace(/-$/, "")
  let slug = base
  let i = 2
  while (taken.has(slug)) slug = `${base}-${i++}`
  taken.add(slug)
  return slug
}
// dedup key: first 40 alphanumerics of the lowercased title (tolerant of
// "RL" vs "Reinforcement Learning", "MMANet" vs "Mmanet", trailing junk, …)
const titleKey = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40)

function yaml(p, slug) {
  const a = p.authors.map((r) => `  - discriminant: ${r.discriminant}\n    value: ${r.discriminant === "member" ? r.value : JSON.stringify(r.value)}`).join("\n")
  return [
    "---",
    `title: ${JSON.stringify(p.title)}`,
    `year: ${p.year}`,
    `venue: ${JSON.stringify(p.venue || "")}`,
    `type: ${p.type}`,
    p.doi ? `doi: ${JSON.stringify(p.doi)}` : null,
    "authors:",
    a,
    "---",
    "",
  ].filter((x) => x !== null).join("\n")
}

// ── run ─────────────────────────────────────────────────────────────────────
const mdFiles = fs.readdirSync(PUBS_DIR).filter((f) => f.endsWith(".md"))
const existingKeys = new Set(
  mdFiles.map((f) => {
    const m = fs.readFileSync(path.join(PUBS_DIR, f), "utf8").match(/^title:\s*(.+)$/m)
    return m ? titleKey(m[1].replace(/^"|"$/g, "")) : ""
  }),
)
const taken = new Set(mdFiles.map((f) => f.replace(/\.md$/, "")))

const entries = collectEntries(docxLines())
let created = 0, skipped = 0, failed = 0
for (const { raw, type } of entries) {
  const p = parseEntry(raw, type)
  if (!p) { failed++; console.warn("  ! could not parse:", raw.slice(0, 95)); continue }
  if (existingKeys.has(titleKey(p.title))) { skipped++; continue }
  const slug = slugFromTitle(p.title, p.year, taken)
  if (DRY) console.log(`+ ${slug}.md  [${type}/${p.year}]  "${p.title}"  ::  ${p.venue || "(no venue)"}  ::  ${p.authors.map((a) => a.value).join(", ")}`)
  else fs.writeFileSync(path.join(PUBS_DIR, `${slug}.md`), yaml(p, slug), "utf8")
  existingKeys.add(titleKey(p.title))
  created++
}
console.log(`\n${DRY ? "[dry run] " : ""}publications: ${created} new, ${skipped} already present, ${failed} unparsed (of ${entries.length} citation lines).`)
