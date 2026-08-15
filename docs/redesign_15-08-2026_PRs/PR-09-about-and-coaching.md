# PR-09 — `/about` and `/coaching`: the human side, properly framed

**Depends on:** [PR-02](PR-02-design-system.md), [PR-03](PR-03-content-model.md)
**Branch:** `redesign/pr-09-about-coaching` → target `redesign`
**Size:** M · **Ships visually:** yes

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) and the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §"About page", §8 Beyond computer vision.

---

## Context

Miroslav's instruction, verbatim: *keep the stuff about coaching, reading, nature and travel, but
push it to a side page instead of pitching me as a coach.*

So: `/about` is the page where a hiring manager who liked the homepage finds out what kind of
person and colleague he is — professional story first, personality after, all of it honest and
none of it a LinkedIn summary. `/coaching` survives as the deep dive for anyone who follows the
thread, because 200+ top-league matches as a head coach at 27 is genuinely unusual and worth a
full page — it just must not be the headline.

Current sources to migrate/rewrite: [`coaching.md`](../../coaching.md) (good content, keep almost
all of it), [`teaching.md`](../../teaching.md) (thin, folds into About),
[`aboutme.md`](../../aboutme.md) (joke placeholder — delete, do not migrate).

## Goal

Two pages: a substantial `/about` with the full narrative, and a restyled `/coaching` deep dive.

## In scope

### A. `/about`

Layout: `Prose` column at `--width-text`, with a portrait or a photo at the top and one or two
supporting visuals further down. Long-form, first person, no cards-in-cards.

Sections (each an `<h2>` with a stable `id`, because `/teaching` redirects to `#teaching`):

1. **Intro** (`#top`) — 3–4 sentences: who he is now, PhD at VRG/CTU under Jiří Matas, currently
   at Qualcomm in Amsterdam, what he works on, and the through-line: *making computer vision work
   where the benchmark assumptions stop holding.*
2. **How I got here** (`#story`) — the trajectory as a narrative rather than a table: cybernetics
   and robotics → sports video (BSc/MSc thesis on floorball tracking) → two years shipping
   production software at Porsche Engineering (control units for the Taycan, then Porsche's High
   Power Charging platform) → back to research for the PhD → a research visit in Tübingen
   (Dec 2025 – Mar 2026) → industry research at Qualcomm (Jun – Dec 2026, current). Make the
   point explicitly: he chose research *after* knowing what production feels like. Do not state a
   PhD completion date anywhere in this section — see
   [PR-00 §8](PR-00-OVERVIEW.md#facts-confirmed-by-miroslav-2026-08-15--supersedes-all-earlier--flags).
3. **How I work** (`#how-i-work`) — the research-philosophy section, 3–5 short paragraphs or a
   compact list. Anchor ideas, all supported by real work:
   - The last 10% is the interesting part — out-of-image keypoints (ProbPose), crowded scenes
     (BBox-Mask-Pose), rare viewpoints (RePoGen).
   - Evaluation before modelling: several of his contributions are datasets and metrics
     (CropCOCO, Ex-OKS, OCHuman-Pose) because you cannot fix what you cannot measure.
   - Ship it: public code, models, demos; internal tools that other people actually use
     (PoseAnnotator, Revie).
   - Work with the people using the output — police forensics, infant-development researchers,
     coaches.
4. **Teaching and supervision** (`#teaching`) — RPZ (Pattern Recognition and Machine Learning) at
   CTU with the CourseWare link; supervised student papers that turned into publications
   (SAM-pose2seg — Best Student Paper at CVWW 2026; PC-CSE); open to supervising theses and to
   research discussions. Keep the practical note from the old page ("no fixed consultation hours,
   contact me in advance") in one line.
5. **Leading a team, off the field** (`#leadership`) — 2–3 paragraphs summarising the coaching
   story with the transferable framing (decisions under uncertainty, feedback, roles, building a
   competitive team without a budget). Ends with `The full story →` linking `/coaching`.
6. **Away from work** (`#personal`) — one short paragraph: mountains and nature, travel,
   psychology and epic fantasy. Light, specific, no bucket list. One photograph if a good one
   exists (`path.jpg` or `eurasian-lynx.jpg` are the only candidates in the repo — use only if
   they genuinely fit; otherwise text-only).
7. **Education** (`#education`) — compact list from the `education` collection: PhD in
   Informatics (2023–, state doctoral exam with distinction), MSc Computer Science / AI with
   minors in Computer Vision and Cyber Security (2020–2022, thesis link), BSc Cybernetics and
   Robotics (2016–2020, thesis link). Mention the Erasmus stay in Ljubljana in one clause.
8. **Contact** (`#contact`) — reuse the homepage contact component; do not write new copy.

Word budget: **700–1000 words total.** If it grows past that, cut adjectives, not facts.

### B. `/coaching`

Restyle the existing page, do not rewrite its substance. Keep: the intro, the stepping-down note,
"Leading the Men's Team", "The Juniors", "Beginnings in SKV", "More than Coaching", the podcast
card, and all external links (florbal.cz, skvflorbal.cz, iDnes).

Changes to make:

- New page chrome, `Prose` typography, no justified text, no inline `style=` attributes (the old
  page is full of them).
- The stepping-down note becomes a proper callout component (`--surface-soft`, left accent
  border, `--text-sm`) — build it as a small reusable `Callout.astro` since PR-10 needs one too.
- Sub-sections become `<h2>`, periods (`2022–2025`) render as the mono meta line, matching the
  timeline styling from PR-05.
- The podcast card becomes a real `<a>` (the old one is a `div` with an `onclick` — not
  keyboard-accessible). Use the existing `skv_podcast.jpeg` thumbnail, Czech title, and mark the
  language: `lang="cs"` on the Czech text, and add "(in Czech)" to the visible label.
- Add the results the old news list carried, if not already present: best regular-season points
  total in club history (2023/24), top-8 finish (2024/25), head-coach appointment in 2024.
- Add a short "Back to /about" link at the end.
- Page title/description positions it as leadership experience, not as a coaching CV:
  `title: "Coaching — Mira Purkrábek"`, description mentioning Superliga head coach and what
  it taught him.

## Out of scope

- Redirects from `/teaching` and `/aboutme` (PR-11).
- The homepage Beyond teaser (already built in PR-06 — reuse its copy, don't contradict it).
- Deleting the old Jekyll `.md` files (PR-13).

## Acceptance criteria

- `/about` reads as one coherent story, first person, 700–1000 words, no bullet-point CV dump.
- The professional half comes before the personal half, and the personal half is real, not
  performative.
- `/teaching#…` anchor exists (`id="teaching"`) so the PR-11 redirect lands correctly.
- `/coaching` keeps every external link from the old page and adds no unverified claims.
- No inline `style` attributes anywhere; no `text-align: justify`.
- Podcast card is a keyboard-focusable link with a visible focus ring.
- Both themes; photographs bordered consistently with the rest of the site.

## Review checklist

- [ ] Nothing on `/about` contradicts the homepage copy (dates, roles, claims)
- [ ] Czech titles carry `lang="cs"`
- [ ] `aboutme.md` content is *not* migrated (it is a joke placeholder)
- [ ] Coaching content never appears above the fold on `/about`
- [ ] Word count checked and stated in the PR description
