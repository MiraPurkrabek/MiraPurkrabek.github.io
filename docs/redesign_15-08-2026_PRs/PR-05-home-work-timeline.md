# PR-05 — Homepage part 2: selected work and experience timeline

**Depends on:** [PR-04](PR-04-home-hero-impact.md)
**Branch:** `redesign/pr-05-home-work-timeline` → target `redesign`
**Size:** M · **Ships visually:** yes

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) and the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §5 Selected Work, §6 Experience timeline.

---

## Context

This is the visual heart of the site: computer-vision work should be *seen*. The old site shows
180px-tall thumbnails inside a text list; the new one gives each featured project a large figure
and a short, structured caption.

Remember the locked decision: **paper microsites stay external.** Every featured project links
*out* to its existing microsite — this site never builds a per-paper page.

## Goal

The `#work` and `#experience` sections of the homepage, driven entirely by the `projects` and
`experience` collections from [PR-03](PR-03-content-model.md).

## In scope

### 1. Selected work (`src/components/home/SelectedWork.astro` + `ProjectFeature.astro`)

Section id `work`. Eyebrow `SELECTED WORK` · Heading `Work I'd show first` ·
right-aligned link `All projects →` (`/work`).

Four featured entries in this order (`featuredOrder` from PR-03):

1. **BBox-Mask-Pose** — ICCV 2025, first author. Image `004806_BMP_loop.gif`.
   Links: Project (`https://mirapurkrabek.github.io/BBox-Mask-Pose/`),
   Paper, Code (`https://github.com/mirapurkrabek/BBoxMaskPose`),
   Demo (`https://huggingface.co/spaces/purkrmir/BBoxMaskPose-demo`).
2. **ProbPose** — CVPR 2025, first author. Image `McLaughlin.gif`.
   Links: Project (`https://mirapurkrabek.github.io/ProbPose/`), Paper, Code.
3. **S23DR 2026 challenge** — 1st place, CVPR 2026 workshop, with Jan Skvrna.
   Image: pick the most representative available asset; if none exists, render the card in the
   text-only variant (see below) and list the missing figure in the PR description.
   Links: Challenge (`https://huggingface.co/spaces/usm3d/S23DR2026`),
   Workshop (`https://usm3d.github.io`).
4. **FACIS — forensic image and video tools** — applied system, CTU + BUT, Ministry of the
   Interior. Image `PCR.png`. Links: Grant description
   (`https://starfos.tacr.cz/cs/projekty/VJ02010041`). No code/paper link exists — that is fine,
   the button row simply shows what exists.

**Card anatomy** (per the brief):

```text
┌───────────────────────────────────────────────┐
│              large project figure             │   16:9-ish, --radius-lg, 1px border
├───────────────────────────────────────────────┤
│ BBox-Mask-Pose                                │   --text-xl, 600
│ ICCV 2025 · First author                      │   mono, --text-xs, --text-subtle
│                                               │
│ Detection, segmentation and pose estimation   │   summary from the collection, --text-muted
│ improving each other in a feedback loop —     │   max 2 lines of copy, no abstracts
│ state of the art on crowded scenes.           │
│                                               │
│ [Project ↗] [Paper ↗] [Code ↗] [Demo ↗]       │   secondary/ghost buttons, --text-sm
└───────────────────────────────────────────────┘
```

**Desktop layout:** alternating two-column rows — figure left / text right, then figure right /
text left, and so on. Text column max ~460px, vertically centred. Gap `--space-7`.
**Tablet & mobile:** single column, figure always above text, full-bleed-to-gutter figure.

**Text-only variant:** when a project has no image, render the card as a bordered text block of
the same width — never a placeholder graphic, never a stretched logo.

**Motion:** figure gets `transform: scale(1.02)` on hover of the card at `--dur`, nothing else.
Under `prefers-reduced-motion` nothing moves. Cards are not wholly clickable; the title links to
the primary external destination and the button row carries the rest (avoids nested-link traps).

**Animated GIFs:** `004806_BMP_loop.gif` and `McLaughlin.gif` are heavy. Convert them to looping,
muted, `playsinline`, `preload="none"`, `loading=lazy`-equivalent **`<video>` (webm/mp4)** if the
conversion is straightforward with ffmpeg; otherwise keep the GIF but ensure it is below the fold
and lazily loaded. Whichever route you take, keep a still first frame so nothing pops in. Record
the decision in the PR description.

### 2. Experience timeline (`src/components/home/Timeline.astro`)

Section id `experience`. Eyebrow `TRAJECTORY` · Heading `Experience`.

Vertical list from the `experience` collection where `kind != 'leadership'`, newest first. One
row per entry:

```text
Jun – Dec 2026        QUALCOMM · AMSTERDAM
                       Research Intern, XR Labs
                       3D scene reconstruction and understanding
──────────────────────────────────────────────────────────────────
Dec 2025 – Mar 2026    UNIVERSITY OF TÜBINGEN
                       Research Visit — Real Virtual Humans (prof. Gerard Pons-Moll)
                       3D human understanding
──────────────────────────────────────────────────────────────────
2023 — present         CTU PRAGUE · VISUAL RECOGNITION GROUP
                       PhD Candidate & Researcher (advisor: prof. Jiří Matas)
                       Robust human understanding in images and video
──────────────────────────────────────────────────────────────────
2020–2022              PORSCHE ENGINEERING
                       Software Developer — Taycan & High Power Charging
                       Control-unit software for the Taycan and Porsche's
                       High Power Charging platform
```

Qualcomm is Miroslav's current position (as of writing). Tübingen is already completed — do not
phrase it as ongoing. Neither date range is a placeholder; use them exactly.

- Desktop: two columns — period (mono, `--text-subtle`, fixed ~160px) and the entry body.
  Mobile: period above the body, still mono and small.
- Separation by a hairline `--border` between rows, not by cards. No dots, no connector line, no
  icons, no animation (the brief explicitly asks for restraint here).
- End the section with a text link: `Full background on the About page →` (`/about`) and
  `CV (PDF) ↓`.
- Education is **not** repeated here — it lives on `/about`.

## Out of scope

- `/work` page itself (PR-07).
- Recognition, publications, personal, contact sections (PR-06).
- Image optimisation policy beyond what is stated above (PR-12 does the final pass).

## Acceptance criteria

- Four featured projects render with correct external links; every external link opens in a new
  tab with `rel="noopener"` and carries the external-link icon.
- Alternating layout on desktop, correct source order on mobile (figure never before its title
  in a screen-reader reading order that would confuse — figure + text live in one `<article>`
  with the heading first in the accessibility tree, or figure marked as `<figure>` after the
  header; state which pattern you used).
- No project summary exceeds 2 sentences; no abstracts on the homepage.
- Timeline entries match the fact sheet exactly, including the ⚠ dates (conservative values,
  flagged).
- Largest homepage image payload after this PR stays under ~1.2 MB total on first load
  (lazy-loaded media excluded).
- Both themes; figures keep a border so light figures do not bleed into the light background.

## Review checklist

- [ ] Featured order: BBox-Mask-Pose, ProbPose, S23DR, FACIS
- [ ] Every link target verified by hand
- [ ] `alt` text describes what the figure shows, not the project name
- [ ] No card links to a page that does not exist on this site
- [ ] Timeline does not include coaching
