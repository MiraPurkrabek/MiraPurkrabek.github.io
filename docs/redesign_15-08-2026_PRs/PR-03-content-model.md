# PR-03 — Content model and full data migration

**Depends on:** [PR-01](PR-01-astro-scaffold.md) (can be developed in parallel with PR-02)
**Branch:** `redesign/pr-03-content-model` → target `redesign`
**Size:** L · **Ships visually:** no (data only, verified through `/styleguide`)

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) — especially §8 the fact sheet — and the
[tech stack](../redesign_15-08-2026_TECH_STACK.md) §"Content architecture", §"Structured content".

---

## Context

Today every fact lives inside presentation markup: `index.html` (news, awards, education),
`papers.md` (publications + abstracts), `projects.md` (projects), `coaching.md`, `teaching.md`.
Reordering anything means editing HTML.

The redesign separates data from presentation. **This PR is the single largest content task and
every later page PR consumes its output.** Getting the schema and the data right here is what
makes the rest of the project fast.

The **news section is being deleted** (Miroslav's decision). Nothing in it may be lost — each
item must land in one of the collections below (see §"News redistribution map").

## Goal

Typed Astro content collections holding every fact about Miroslav that the new site shows, with
zero content duplicated between collections, plus a data-inspection view on `/styleguide`.

## In scope

### 1. Collections (`src/content.config.ts` with Zod schemas)

Use Astro's current content-collections API (glob loaders + `defineCollection`). File format:
Markdown with frontmatter where a body is useful (`projects`, `publications`), plain
YAML/TS data where it is not (`experience`, `recognition`, `education`).

**`projects`** — one entry per project/system (`src/content/projects/<slug>.md`)

```yaml
title: string
tagline: string            # ≤ 90 chars, appears under the title
kind: 'research' | 'applied' | 'tool'
years: string              # "2023–", "2020–2022", "2026"
role: string               # "First author", "Lead developer", "Contributor"
org: string?               # "CTU Prague · VRG", "Porsche Engineering"
featured: boolean          # shown on the homepage
featuredOrder: number?     # 1..4, homepage ordering
order: number              # ordering inside its group on /work
summary: string            # 1–2 sentences, homepage/card copy
highlights: string[]       # 1–3 bullet facts, /work page
tags: string[]             # max 3, from the controlled list below
links:                     # all optional; label/url pairs rendered as buttons
  project: url?            # external microsite — the canonical page for papers
  paper: url?
  code: url?
  demo: url?
  models: url?
  dataset: url?
  grant: url?
  article: url?
image: { src: string, alt: string }?   # from src/assets/img/
status: 'active' | 'completed' | 'internal'?
```

Body (Markdown) = the longer description used on `/work`.

**`publications`** — one entry per paper/thesis

```yaml
title, authors: string[]           # exact order; Miroslav written "Miroslav Purkrábek"
venue: string                      # "CVPR 2025"
venueLong: string                  # "IEEE/CVF Conference on Computer Vision and Pattern Recognition"
year: number
type: 'conference' | 'workshop' | 'preprint' | 'thesis'
role: 'first-author' | 'co-author' | 'supervised'
awards: string[]                   # "Best Poster Award"
selected: boolean                  # shown on the homepage
summary: string                    # ONE sentence, plain language, not the abstract
abstract: string                   # reuse verbatim from papers.md
links: { project?, paper?, arxiv?, code?, demo?, models?, dataset?, bibtex? }
thumbnail: { src, alt }
bibtex: string?                    # raw BibTeX, used by the copy button on /publications
```

**`experience`** (`src/content/experience/*.yaml` or a single typed TS array — pick one and
document it)

```yaml
org, orgUrl?, role, location
start: string    # "2023-02" — ISO-ish, month precision
end: string | null   # null = ongoing
displayPeriod: string  # "2023 — present", "2020–2022"
kind: 'research' | 'industry' | 'internship' | 'visit' | 'leadership'
summary: string        # one line for the timeline
details: string[]      # optional extra bullets for /about
logo: string?          # public path; may be absent
inStrip: boolean       # appears in the homepage affiliation strip
order: number          # newest first
```

**`recognition`**

```yaml
title, org, year, month?
kind: 'award' | 'competition' | 'service' | 'selection' | 'talk'
description: string?   # one short line
link: url?
selected: boolean      # homepage
order: number
```

**`education`** — degree, field, institution, period, note?, thesisLink?, order.

### 2. Data to enter

Everything in [fact sheet §8](PR-00-OVERVIEW.md#8-fact-sheet-single-source-of-truth). Concretely:

- **projects** (9): FACIS forensic tools *(applied)*, BBox-Mask-Pose *(research)*,
  ProbPose *(research)*, RePoGen *(research)*, S23DR 2026 challenge *(research)*,
  Revie *(applied)*, SKV automatic camera download *(applied)*, PoseAnnotator *(tool)*,
  Porsche High Power Charging *(applied)*, infant sensorimotor development *(research)*,
  camera-trap animal identification *(research)*, floorball player tracking *(research)*.
  (That is 12 — enter all of them; `/work` groups them, the homepage shows 4.)
- **publications** (9): the 7 papers + 2 theses from the fact sheet, abstracts copied verbatim
  from [`papers.md`](../../papers.md).
- **experience** (5): Qualcomm, Tübingen, CTU/VRG, Porsche Engineering, SKV (leadership,
  `inStrip: false`).
- **recognition** (~10): S23DR 1st place, MoI Excellent Research Results, CVPR 2025 Outstanding
  Reviewer, CVWW 2026 Best Student Paper, FG 2024 Best Poster, CVWW 2026 technical organizer,
  reviewer for CVPR/ICCV/ECCV/IJCV, AI4Sports 2024 invited talk, ICVSS 2025 admission,
  state doctoral exam with distinction.
- **education** (3): PhD, MSc, BSc.

Rules while entering data:

- Copy facts, do not paraphrase into stronger claims. No new numbers.
- `summary` fields are **new one-sentence copy** written by you following the voice rules in
  [PR-00 §7](PR-00-OVERVIEW.md#7-voice-and-copy-rules) — factual, concrete, no marketing.
- Tag vocabulary (controlled, reuse only these):
  `Human Pose Estimation`, `Segmentation`, `Detection`, `3D Reconstruction`,
  `Robustness`, `Probabilistic Modeling`, `Synthetic Data`, `Tracking`, `Video Systems`,
  `Deployment`, `Tooling`, `Embedded / C++`.
- For the ⚠ items in the fact sheet: enter the conservative version, add a
  `# TODO(verify): …` comment in the file, and list them in the PR description.

### 3. News redistribution map (nothing may be lost)

| Old news item | New home |
|---|---|
| S23DR challenge win, $5k, CVPR 2026 | `recognition` (selected) + `projects/s23dr` |
| Qualcomm internship, Amsterdam | `experience` |
| SAM-pose2seg best paper + acceptance, CVWW 2026 | `publications` (awards) + `recognition` |
| Tübingen research visit | `experience` |
| FACIS selected by Ministry of the Interior | `recognition` (selected) + `projects/facis` |
| CVWW 2026 technical organizer | `recognition` (`kind: service`) |
| ICCV 2025 presentation, Hawaii | `recognition` (`kind: talk`, not selected) |
| BBoxMaskPose code + HuggingFace demo release | `projects`/`publications` links |
| BBox-Mask-Pose ICCV acceptance | `publications` |
| BLANKET ICDL acceptance | `publications` |
| CVPR 2025 outstanding reviewer | `recognition` (selected) |
| ICVSS 2025 admission | `recognition` (`kind: selection`) |
| Floorball top-8 season result | `/coaching` page content (PR-09) |
| ProbPose CVPR acceptance, CVWW 2025 presentation | `publications` + `recognition` (talk) |
| State doctoral exam with distinction | `education` note + `recognition` |
| PC-CSE acceptance / release | `publications` |
| AI4Sports 2024 co-organization + talk | `recognition` (`kind: talk`) |
| ECCV 2024 attendance | drop (no signal) |
| RePoGen best poster + FG presentation | `publications` (award) + `recognition` |
| Head coach appointment 2024, playoff results | `/coaching` page content (PR-09) |
| PhD start Feb 2023 | `experience` |
| MSc thesis defence 2022 | `publications` (thesis) + `education` |

### 4. Verification surface

Extend `/styleguide` with a "Content" section listing, per collection, the number of entries and
a compact table of key fields (title, year, flags). This is how the reviewer confirms the data
landed without any page existing yet. Keep it `noindex`.

## Out of scope

- Rendering any of this on real pages (PR-04 onward).
- Page-level prose (hero copy, About narrative) — that lives in the page PRs.
- Image optimisation decisions (PR-12); just reference the existing files.

## Images

Move the images that the new site will use from `public/assets/img/` into `src/assets/img/` so
`astro:assets` can optimise them, **except** files whose URL must stay stable (none of these are
externally linked, so moving is safe — but keep `public/assets/img/` for anything you do not
move). Images needed: `PCR.png`, `Infants_image.png`, `eurasian-lynx.jpg`, `master_image.png`,
`poseAnnotator_screenshot.png`, `Revie-screenshot.png`, `Porsche_HPC.jpg`,
`004806_BMP_loop.gif`, `McLaughlin.gif`, `Duplantis.gif`, `043+076+174.gif`,
`SAM-pose2seg_comparison.png`, `PC-CSE_example.png`, `BLANKET_video.gif`, `BLANKET_example.png`,
`ProbPose_McLaughlin.png`, `bachelor_image.png`, `CV_picture_PS_square.jpg`,
`skv_podcast.jpeg`, `SKV_circle.png`.

Every image entry must carry meaningful `alt` text describing **what the figure shows**, e.g.
*"Pose estimation overlaid on two overlapping athletes; the occluded player's keypoints stay on
the correct body."* Not *"ProbPose figure"*.

## Acceptance criteria

- `npx astro check` clean; all collections type-safe, no `any`.
- Every entry from §2 present; counts visible on `/styleguide`.
- Every row of the redistribution map §3 accounted for (state it in the PR description).
- No fact appears in two collections with two different wordings.
- No claim beyond the fact sheet; every ⚠ item marked with a TODO and listed in the PR body.

## Review checklist

- [ ] Author lists exact and in the original order, with Czech diacritics
- [ ] Venue strings consistent (`"CVPR 2025"`, not `"IEEE/CVF CVPR'25"`)
- [ ] External links resolve (spot-check each one; arXiv IDs: 2601.08982 SAM-pose2seg,
      2512.15542 BLANKET, 2501.08815 PC-CSE)
- [ ] `featured` projects are exactly 4 and their `featuredOrder` is 1–4
- [ ] `selected` publications are exactly 3–4
- [ ] BibTeX entries valid (if a paper has no official BibTeX yet, leave the field empty rather
      than inventing keys)
