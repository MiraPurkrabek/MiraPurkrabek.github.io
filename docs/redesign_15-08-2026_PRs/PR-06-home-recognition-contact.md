# PR-06 — Homepage part 3: recognition, selected publications, beyond CV, contact

**Depends on:** [PR-05](PR-05-home-work-timeline.md)
**Branch:** `redesign/pr-06-home-recognition-contact` → target `redesign`
**Size:** M · **Ships visually:** yes — completes the homepage

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) and the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §7 Recognition and publications,
§8 Beyond computer vision, §9 Contact.

---

## Context

The homepage must work as a complete portfolio for someone who never clicks further. This PR
closes the story: external validation, what he has published, one honest glimpse of the person,
and an obvious way to get in touch.

The "beyond" section is where Miroslav's instruction matters most: *keep the human side, stop
pitching me as a coach.* One tile, one paragraph, one link — the leadership framing, not the
sports-CV framing.

## Goal

Sections `#recognition`, `#publications`, `#beyond`, `#contact` on the homepage, completing it.

## In scope

### 1. Recognition (`src/components/home/Recognition.astro`)

Eyebrow `EXTERNAL VALIDATION` · Heading `Recognition`.

A two-column list on desktop (single column on mobile) of `recognition` entries with
`selected: true`, newest first. Each row: year (mono, `--text-subtle`), title, issuing body.
No cards, no medals, no icons — a clean list reads more confident.

```text
2026    1st place · S23DR challenge, CVPR 2026 workshop
2026    Best Student Paper · CVWW 2026 (SAM-pose2seg, supervised)
2025    Excellent Research Results · Czech Ministry of the Interior (FACIS)
2025    Outstanding Reviewer (top ~5%) · CVPR 2025
2024    Best Poster · Face & Gesture 2024 (RePoGen)
```

Below the list, one small line of service in `--text-muted`:
*"Reviewer for CVPR, ICCV, ECCV and IJCV · Technical organizer, CVWW 2026."*

Rows with a `link` make the title a link; rows without stay plain text.

### 2. Selected publications (`src/components/home/SelectedPublications.astro`)

Eyebrow `PEER-REVIEWED` · Heading `Selected publications` · right link `All publications →`
(`/publications`).

The `publications` entries with `selected: true` (3–4), newest first, as a compact list —
**no thumbnails here** (the work section already carries the visuals):

```text
BBox-Mask-Pose — Detection, pose estimation and segmentation for multiple bodies
ICCV 2025 · Purkrábek, Matas                                    [Project ↗] [Paper ↗]

ProbPose — A probabilistic approach to 2D human pose estimation
CVPR 2025 · Purkrábek, Matas                                    [Project ↗] [Paper ↗]

RePoGen — Improving 2D human pose estimation in rare camera views with synthetic data
FG 2024 · Purkrábek, Matas · Best Poster Award                  [Project ↗] [Paper ↗]
```

Award, when present, appears as small accent-coloured text after the author list — not a badge
component. Add one line under the list: *"Full list, including supervised student work, on the
publications page."* plus a Google Scholar link.

### 3. Beyond computer vision (`src/components/home/Beyond.astro`)

Eyebrow `OFF THE CLOCK` · Heading `Beyond computer vision`.

Two-column block (image left ~40%, text right ~60%; stacked on mobile, image first is fine here).
Use `assets/img/SKV_circle.png` only if no better photograph exists — prefer a real floorball or
mountains photograph if Miroslav has added one; otherwise ship text-only and list the missing
photo in the PR description. **Do not** use the club logo as a decorative graphic.

**Copy — use verbatim:**

```text
Before I coached models, I coached people. From 2017 I worked my way from assistant
to head coach of Sokol Královské Vinohrady's men's floorball team in the Czech
Superliga — 200+ matches, over 100 of them at the top level, and the best results in
the club's history with one of the smallest budgets in the league. I stepped down in
2025 to focus on research and stayed on as a consultant.

It taught me the things research doesn't: making decisions with incomplete
information, giving feedback people can act on, and getting a group of very different
individuals to pull in the same direction.

Away from both, I'm usually in the mountains, travelling, or reading psychology and
epic fantasy.

[More about me →]
```

The link goes to `/about`. Do **not** link straight to `/coaching` from the homepage — About is
the hub; Coaching is the deep dive behind it.

### 4. Contact (`src/components/home/Contact.astro`)

Section id `contact`, `tone="soft"` (subtle `--surface-soft` band) to close the page.

```text
Interested in working together?

I'm finishing my PhD and looking for applied scientist and research engineer roles in
computer vision. I'm also open to selected consulting work.

[Email me]  [CV (PDF) ↓]  [LinkedIn ↗]  [GitHub ↗]  [Google Scholar ↗]
```

- Heading is an `<h2>`; the paragraph is `--text-lg`.
- `Email me` is the primary button and shows the address as visible text underneath
  (`mira.purkrabek@gmail.com`) so it can be copied without clicking.
- The availability sentence comes from `site.availability` (same source as the hero pill) so both
  places change together.
- No contact form, no third-party embeds.
- The footer still exists below this section — keep it lighter so the two do not read as
  duplicates (footer = navigation + icons, contact = the ask).

### 5. Homepage completion

- Verify the full section order: Hero → Affiliations → Impact → Selected work → Experience →
  Recognition → Selected publications → Beyond → Contact.
- Remove the placeholder comments left by PR-04.
- Section rhythm: `--section-gap` everywhere; the only tonal change is the contact band.

## Out of scope

- `/publications` and `/about` pages themselves (PR-08, PR-09).
- Metadata/JSON-LD (PR-11).

## Acceptance criteria

- Homepage tells the complete story with JavaScript disabled.
- Reading the page top to bottom answers, in order: who · what · why credible · what built ·
  where worked · what recognition · what person · how to contact.
- Total homepage weight (HTML+CSS+JS+eagerly loaded images) under **600 KB**, JS under **6 KB**
  gzipped.
- Heading outline is exactly one `<h1>` followed by `<h2>`s per section, no skipped levels
  (verify with an outline tool).
- Both themes; the `soft` contact band is distinguishable but not heavy in dark mode.

## Review checklist

- [ ] The word "coach" appears exactly once above the footer, inside the Beyond section
- [ ] Consulting is mentioned once, in one clause, nowhere else
- [ ] No duplicated links between contact section and footer beyond the intended overlap
- [ ] Every award claim matches the fact sheet wording
- [ ] Mobile: contact buttons are ≥ 44px tall and wrap cleanly at 320px
