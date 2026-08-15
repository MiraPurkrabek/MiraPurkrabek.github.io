# PR-11 — Metadata, structured data, redirects, 404, analytics

**Depends on:** PR-04…PR-10 (all pages must exist)
**Branch:** `redesign/pr-11-seo-metadata` → target `redesign`
**Size:** M · **Ships visually:** small (404 page only)

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) §4 URL map and the
[tech stack](../redesign_15-08-2026_TECH_STACK.md) §"Machine readability".

---

## Context

Two audiences never see the design: search engines and the LLM-powered tools recruiters
increasingly use to screen candidates. The tech-stack brief is explicit — every major claim must
exist as real HTML text, and the profile should be machine-readable. This PR makes the site
legible to both, and makes sure no existing link into the site breaks.

## Goal

Complete per-page metadata, a correct `schema.org/Person` graph, sitemap/robots/llms.txt,
working legacy redirects, a rebuilt 404 page, and analytics that do not slow anything down.

## In scope

### 1. `Seo.astro` component, wired into `BaseLayout`

Per page: `<title>` (unique, ≤ 60 chars), meta description (≤ 155 chars, hand-written per page —
no truncated body text), canonical URL (absolute, from `site` in `astro.config.mjs`),
`og:type/title/description/url/image/image:alt/site_name/locale`, `twitter:card=summary_large_image`,
`twitter:title/description/image`, `robots` (`noindex` support for `/styleguide`).

Page titles and descriptions (use these). Titles use "Mira" (casual register, see
[PR-00, "Naming"](PR-00-OVERVIEW.md#naming-mira-vs-miroslav-purkrábek)); the full legal name is
carried instead by the homepage hero caption and the JSON-LD below, so descriptions don't need
to repeat it:

| Page | Title | Description |
|---|---|---|
| `/` | `Mira Purkrábek — Computer vision researcher and engineer` | Applied computer vision: first-author CVPR/ICCV research on robust human perception, plus systems in production. PhD candidate at CTU Prague, research intern at Qualcomm. |
| `/work` | `Work — Mira Purkrábek` | Research on robust human perception and the applied systems built from it: forensic tooling, low-latency video systems, open-source annotation tools. |
| `/publications` | `Publications — Mira Purkrábek` | Peer-reviewed computer vision publications, including first-author papers at CVPR 2025 and ICCV 2025, with code, models and BibTeX. |
| `/about` | `About — Mira Purkrábek` | How I got from production software at Porsche to computer-vision research, how I work, who I teach, and what I do away from a screen. |
| `/coaching` | `Coaching — Mira Purkrábek` | Eight years coaching floorball, including head coach of a Czech Superliga men's team — what leading a team taught me. |
| `/webcam_demo/` | `How I ran a live webcam demo at my CVPR poster` | A practical guide to running a live GPU-backed demo from a tablet at a poster session. |
| `/404` | `Page not found — Mira Purkrábek` | (noindex) |

### 2. JSON-LD — `schema.org/Person` on the homepage

`name: "Miroslav Purkrábek"` (the official register — this is what has to match Google Scholar,
ORCID and LinkedIn for entity resolution to work), `alternateName: ["Mira Purkrábek", "Miroslav
Purkrabek"]` (the casual name, plus the no-diacritics spelling — both are things people search),
`url`, `image`, `email`, `jobTitle: "Computer Vision Researcher"`,
`description`, `affiliation` (CTU Prague / VRG as `Organization`),
`worksFor` (Qualcomm — **only while the internship is current, i.e. through December 2026**; add
a code comment stating it must be removed once the internship ends), `alumniOf` (CTU Prague),
`knowsAbout` (human pose estimation,
computer vision, machine learning, 3D reconstruction, video analysis, robust perception),
`sameAs` (GitHub, Google Scholar, ORCID, LinkedIn), `nationality`/address omitted.

Accuracy rule from the tech brief: never imply current affiliation for a historical one.
Tübingen and Porsche appear in visible HTML but **not** as `worksFor`.

Optionally add `ScholarlyArticle` JSON-LD per publication on `/publications` — nice-to-have; skip
if it complicates the build. If you do, its `author` field is `"Miroslav Purkrábek"` per the
publications-page naming rule ([PR-08](PR-08-publications-page.md)), independent of the Person
JSON-LD above.

### 3. OG image

One static default at `public/og/default.png`, 1200×630: warm off-white background, **"Mira
Purkrábek"** in Inter 600 as the large name (with a small "(Miroslav Purkrábek)" caption beneath
it, matching the hero — see
[PR-00, "Naming"](PR-00-OVERVIEW.md#naming-mira-vs-miroslav-purkrábek)), one role line, one
accent rule, portrait on the right, `mirapurkrabek.github.io` small at the bottom. Generate it
once (an SVG rendered to PNG with a committed `scripts/make-og.mjs` using sharp is the preferred
route — it keeps the source editable), commit the PNG, and reference it from `Seo.astro`. No
per-page dynamic OG generation.

### 4. Sitemap, robots, llms.txt

- `@astrojs/sitemap` integration; exclude `/styleguide` and any redirect stubs.
- `public/robots.txt`: allow all, point at `https://mirapurkrabek.github.io/sitemap-index.xml`.
  Do **not** block AI crawlers — being readable by them is a stated goal.
- `public/llms.txt`: a short Markdown profile — who he is, current role, expertise, four to six
  key facts (CVPR/ICCV first-author papers, S23DR 1st place, FACIS/Ministry award, Porsche
  production experience), links to `/work`, `/publications`, `/about`, `/CV.pdf`, and contact.
  Keep it under 60 lines and generate it by hand from the fact sheet (not auto-derived). Open
  with an explicit disambiguation line, since this file is read by machines, not skimmed by
  people: *"Goes by Mira; publishes and is credited academically as Miroslav Purkrábek."*

### 5. Legacy redirects

Add to `astro.config.mjs` `redirects` (Astro emits meta-refresh + canonical stubs, which is the
only option on GitHub Pages):

```js
redirects: {
  '/projects': '/work',
  '/projects/': '/work',
  '/papers': '/publications',
  '/papers/': '/publications',
  '/aboutme': '/about',
  '/aboutme/': '/about',
  '/teaching': '/about#teaching',
  '/teaching/': '/about#teaching',
}
```

Verify `public/BBox-MaskPose/index.html` still ships untouched and still points at
`/BBox-Mask-Pose/`. Confirm the build never emits anything at `/ProbPose/`, `/RePoGen-paper/` or
`/BBox-Mask-Pose/` — those paths belong to other repositories.

### 6. 404 page

Rebuild `src/pages/404.astro` with the new design: heading, one friendly line, and useful links —
Home, Work, Publications, About, plus the four external project microsites (BBox-Mask-Pose,
ProbPose, RePoGen, BLANKET) as the old page did. Drop the South Park image. `noindex`.

### 7. Analytics

Keep GA4 `G-1YMZGNY57C`. Load `gtag.js` with `async`, only when `import.meta.env.PROD`, after the
page content; no analytics on `/styleguide`. Nothing render-blocking, no other third-party
scripts, no cookie banner work in this PR (flag it if Miroslav wants EU-consent handling — the
current site already runs GA without one).

## Out of scope

- Deployment workflow and Pages settings (PR-13).
- Performance/a11y fixes (PR-12).

## Acceptance criteria

- Every page has a unique title, description and canonical; `view-source` confirms it.
- JSON-LD validates (Google Rich Results test or `schema.org` validator) with no errors and no
  claim contradicting the visible page.
- `sitemap-index.xml` lists exactly the seven real pages, excludes `/styleguide` and stubs.
- Each legacy URL from the map lands on the right target in a built `dist/` preview.
- OG image renders correctly in a link-preview debugger (test at least one).
- Lighthouse SEO score 100 on `/` and `/publications`.
- No JS is added to the critical path; GA absent from dev builds.

## Review checklist

- [ ] `worksFor` carries the "remove when the internship ends" comment
- [ ] every page `<title>` says "Mira Purkrábek"; JSON-LD `name` says "Miroslav Purkrábek" with
      "Mira Purkrábek" in `alternateName`
- [ ] `llms.txt` contains no claim absent from the site, and opens with the name disambiguation
- [ ] `robots.txt` does not accidentally disallow `/assets`
- [ ] 404 links all resolve
- [ ] Descriptions read like sentences a human wrote, not keyword strings
