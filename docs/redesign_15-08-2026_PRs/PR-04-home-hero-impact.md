# PR-04 — Homepage part 1: hero, affiliation strip, selected impact

**Depends on:** [PR-02](PR-02-design-system.md), [PR-03](PR-03-content-model.md)
**Branch:** `redesign/pr-04-home-hero-impact` → target `redesign`
**Size:** M · **Ships visually:** yes — this is the first real page

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) and the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §2 Hero, §3 Experience & affiliations,
§4 Selected impact.

---

## Context

The top of the homepage decides whether a hiring manager keeps reading. The old site opens with
a subtitle that reads *"Computer Vision Researcher and Floorball Coach"* and a justified wall of
text. The new opening must say, within one screen: who he is, what he does, that he is credible,
and that the work reaches real systems.

Positioning target: **applied scientist / research engineer in industry**. Research and shipped
systems get equal billing. Coaching does not appear above the fold at all.

## Goal

The first three sections of the homepage, built from PR-03 content, final copy included.

## In scope

### 1. Hero (`src/components/home/Hero.astro`)

Desktop (≥ 900px): two columns, text left (~60%), portrait right (~40%), vertically centred,
generous top padding (`--space-10`), no full-viewport-height gimmick — the impact section should
peek above the fold on a 900px-tall screen. Mobile: portrait *below* the text block (text first),
max-width ~320px, or omitted if it crowds — text always first in DOM order.

**Copy — use verbatim:**

```text
[availability pill]  Open to applied scientist and research engineer roles

Mira Purkrábek
(Miroslav Purkrábek)

Computer vision researcher and engineer

I build visual perception that survives contact with reality — crowded scenes,
cropped bodies, unusual viewpoints. First-author papers at CVPR and ICCV, code
and models people actually run, and systems that went into production.

PhD candidate at CTU Prague · currently research intern at Qualcomm, Amsterdam

Human understanding · 2D & 3D vision · Robust perception

[Selected work →]  [CV (PDF) ↓]  [Email]
```

Notes:

- `<h1>` is **"Mira Purkrábek"**. Directly underneath it, render `(Miroslav Purkrábek)` as a
  small `<p>` — `--text-sm`, `--text-subtle`, not part of the `<h1>`. It exists so the full legal
  name is real, crawlable text near the site's most prominent name mention; see
  [PR-00, "Naming"](PR-00-OVERVIEW.md#naming-mira-vs-miroslav-purkrábek). Do not make it a link,
  do not style it to compete with the `<h1>`.
- The role line is a `<p>` styled at `--text-xl`, `--text-muted` — **not** an
  `<h2>` (see [PR-00 §6](PR-00-OVERVIEW.md#6-shared-working-conventions-apply-to-every-pr)).
- Availability pill: small, `--accent-soft` background, mono uppercase label, driven by
  `site.availability` from `src/data/site.ts` so it can be switched off in one line.
- The keyword line is plain text with `·` separators in `--text-subtle`, mono, uppercase, small —
  not tags/pills (the brief warns against pill soup).
- `Selected work` scrolls to `#work`; `CV (PDF)` → `/CV.pdf` new tab; `Email` → `mailto:` primary
  address. Primary button = "Selected work".
- The tagline **"Computer vision for the last 10%"** is *not* used in the hero; it appears once,
  as the eyebrow of the "Selected impact" section (§3), where the tiles immediately back it up.
- Hero name may use `--text-4xl` (capped at 56px). Do not exceed it.

**Portrait:** use `assets/img/CV_picture_PS_square.jpg` through `astro:assets` — square,
`--radius-lg`, subtle 1px border, no drop shadow, no circular crop, no decorative blobs.
`alt="Mira Purkrábek"`. Serve AVIF/WebP with an explicit width/height and `fetchpriority="high"`.

If the portrait looks weak at that crop, the acceptable alternative is a two-cell composition:
portrait plus one research figure (`004806_BMP_loop.gif` or `McLaughlin.gif`) stacked with equal
radius and border. Decide once, do not build both.

### 2. Affiliation strip (`src/components/home/Affiliations.astro`)

Heading: `Experience & affiliations` (eyebrow: `WHERE I'VE WORKED`).

Four cards from `experience` where `inStrip: true`, newest first:

| Organisation | Role line | Period |
|---|---|---|
| Qualcomm | Research Intern · XR Labs, Amsterdam | Jun – Dec 2026 |
| Czech Technical University in Prague | PhD Candidate & Researcher · Visual Recognition Group | 2023 — present |
| University of Tübingen | Research Visit · Real Virtual Humans | Dec 2025 – Mar 2026 |
| Porsche Engineering | Software Developer · Taycan & High Power Charging | 2020–2022 |

Layout: 4-up grid on desktop, 2-up on tablet, 2-up (or 1-up if cramped) on mobile. Cards are
low-key: `--surface-soft`, thin border, no hover elevation (they are not links unless an
`orgUrl` exists — if it does, the org name is the link, not the whole card).

**Logos:** no institution logos exist in the repo. Build the component logo-optional:

- If `logo` is set, render it inside a fixed-height (32px) neutral box, `object-fit: contain`,
  centred; in dark mode place it on a `--surface` chip with 8px padding so dark marks stay
  legible. **Never** apply `filter: invert()` to an official logo.
- If `logo` is absent (the current state), render the organisation name as a text wordmark in
  the same slot — `--text-lg`, `font-weight: 600`, `--tracking-tight`.
- The organisation name, role and period are **always** real text regardless of the logo.

List the missing logo files in the PR description so Miroslav can drop them in later
(`public/assets/logos/{qualcomm,ctu,tuebingen,porsche}.svg`); the component must need no code
change when they appear.

**Do not** put Sokol Královské Vinohrady in this strip — leadership belongs to `/about` and
`/coaching`.

### 3. Selected impact (`src/components/home/Impact.astro`)

Eyebrow: `COMPUTER VISION FOR THE LAST 10%` · Heading: `Selected impact`
Optional lead (one line): *"Four things I would point at first."*

Four tiles, 2×2 on desktop, 1 column on mobile. Each tile: mono uppercase label, one large
memorable fact (`--text-2xl`, `--tracking-tight`), one or two explanatory lines
(`--text-muted`). No icons, no links inside the tiles (the following sections carry the detail).

**Copy — use verbatim (fallbacks noted):**

```text
DEPLOYED SYSTEM
Forensic tools for the Czech Police
Image and video analysis for the Criminal Police Service, commissioned by the
Ministry of the Interior with Brno University of Technology — now in active
use, and named the ministry's top project for research results in 2025.

PRODUCTION SOFTWARE
170,000+ Taycans on the road
Two years on Porsche's EV engineering team — control-unit software for the
Taycan and software across Porsche's High Power Charging platform.

RESEARCH
First author at CVPR and ICCV
ProbPose (CVPR 2025) and BBox-Mask-Pose (ICCV 2025), with public code, models
and datasets.

COMPETITION
1st place, S23DR at CVPR 2026
Structured 3D reconstruction challenge, won with Jan Skvrna. $5,000 prize.
```

Both tiles above are confirmed, final copy — see
[PR-00 §8, "Facts confirmed by Miroslav"](PR-00-OVERVIEW.md#facts-confirmed-by-miroslav-2026-08-15--supersedes-all-earlier--flags).
Do not soften, re-flag, or reword them. Note on the Porsche tile: "170,000+ Taycans on the road"
is a scale illustration, not a personal-attribution claim — do not reword it into something
implying Miroslav caused those sales; the explanatory line already scopes his actual
contribution correctly. Similarly, do not add any claim about how the Police *feel* about the
FACIS system — "now in active use" is the checkable fact, stop there.

### 4. Page assembly

`src/pages/index.astro` uses `BaseLayout` with
`title: "Mira Purkrábek — Computer vision researcher and engineer"` (see
[PR-11](PR-11-seo-metadata-redirects.md) for the final, authoritative metadata) and a description
drawn from the hero paragraph. Sections in order: Hero → Affiliations → Impact, separated by
`--section-gap`, no horizontal rules. Remaining homepage sections arrive in PR-05/PR-06 — leave
clearly marked placeholders (an HTML comment, not visible text).

## Out of scope

- Selected work, timeline, recognition, publications, personal teaser, contact (PR-05, PR-06).
- JSON-LD / OG metadata (PR-11).
- Sourcing actual logo files (Miroslav supplies them; the component must tolerate their absence).

## Acceptance criteria

- Hero readable and well-proportioned at 320 / 768 / 1024 / 1440 px; no horizontal scroll.
- On a 1440×900 desktop viewport, the top of the impact section is visible or nearly visible
  without scrolling more than one screen.
- All hero and impact copy is real HTML text (a text-only browser shows every claim).
- Portrait ships as AVIF/WebP with explicit dimensions; no layout shift (CLS ≈ 0).
- Affiliation cards render correctly with **no** logo files present.
- Both themes verified; the accent appears at most twice above the fold (availability pill,
  primary button).
- `npm run check` clean.

## Review checklist

- [ ] `<h1>` is exactly "Mira Purkrábek", appears once; the small "(Miroslav Purkrábek)" caption
      sits directly under it as its own element, not inside the `<h1>`
- [ ] No coaching/floorball reference anywhere in this PR's output
- [ ] No text is justified
- [ ] Availability pill can be disabled from `src/data/site.ts` alone
- [ ] The word "passionate" does not appear anywhere on the page
