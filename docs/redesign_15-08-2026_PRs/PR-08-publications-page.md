# PR-08 — `/publications`: full publication list

**Depends on:** [PR-02](PR-02-design-system.md), [PR-03](PR-03-content-model.md)
**Branch:** `redesign/pr-08-publications-page` → target `redesign`
**Size:** M · **Ships visually:** yes

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) and the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §"Publications page".

---

## Context

The old `/papers` page is a stack of headings, bold author lines, 180px images and justified
abstract blobs. It is the page academics and hiring researchers will actually check, so it needs
to be precise, complete and easy to skim — while staying visually part of the new site.

Locked decision: the canonical landing page for each paper is its **external microsite**; this
page summarises and links out.

## Goal

A clean, complete, skimmable publication list rendered from the `publications` collection, with
abstracts available but not shouting, and correct citation material.

## In scope

### Page structure

```text
h1  Publications
    lead: Peer-reviewed work on robust human perception — pose estimation,
          segmentation and 3D understanding. Also on [Google Scholar ↗] and [ORCID ↗].

h2  2026
h2  2025
h2  2024
h2  Theses
```

Grouped by year, newest first, `<h2>` per year. Theses (MSc 2022, BSc 2020) in their own group
at the end so they never dilute the peer-reviewed list.

### Publication item (`src/components/PublicationItem.astro`)

```text
┌──────────┐  Title (links to project microsite, else arXiv)
│ thumbnail│  Authors — Miroslav Purkrábek in bold/accent
│ 160×110  │  Venue, year · role badge (only for "supervised")
└──────────┘  ★ Best Poster Award            <- accent text, only when present

              One-sentence plain-language summary.

              [Project ↗] [Paper ↗] [Code ↗] [Demo ↗] [Abstract ▾] [BibTeX ▾]
```

- Thumbnail from the collection; if absent, the row renders text-only with the columns collapsed.
- `Abstract` and `BibTeX` are native `<details>/<summary>` disclosures — **no JavaScript needed**.
  Abstract text uses the `Prose` component at `--width-text`, never justified.
- BibTeX renders in a `<pre>` with `--surface-soft` background, `--font-mono`, `--text-sm`, and a
  **Copy** button (small vanilla script, ~15 lines, with a "Copied" state and an
  `aria-live="polite"` announcement). If a BibTeX entry is missing from the collection, the
  disclosure is not rendered at all.
- The `supervised` role gets a small mono label `SUPERVISED STUDENT WORK` — this is a credibility
  signal for a would-be team lead, so do not hide it.
- Rows separated by a hairline border, not cards.

### Content

All 9 entries from the fact sheet: BMPv2 (arXiv 2026), SAM-pose2seg (CVWW 2026, Best Student
Paper, supervised), BBox-Mask-Pose (ICCV 2025), ProbPose (CVPR 2025), BLANKET (ICDL 2025,
co-author), PC-CSE (CVWW 2025, supervised), RePoGen (FG 2024, Best Poster), MSc thesis (2022),
BSc thesis (2020). Abstracts verbatim from [`papers.md`](../../papers.md).

### Nav & cross-links

- Header "Publications" active here; homepage `All publications →` points here.
- Page footer line: `Projects and systems behind these papers → /work`.
- `/papers` redirects here (PR-11).

## Out of scope

- Per-paper pages, citation counts, publication metrics, search or filters.
- Automatic BibTeX generation — entries come from the collection as authored in PR-03.

## Acceptance criteria

- All 9 entries present, correctly grouped and ordered; author lists exact.
- Every link works; external links open in a new tab with `rel="noopener"`.
- Abstract/BibTeX disclosures work with JavaScript disabled; only the copy button degrades.
- Page weight under 500 KB with thumbnails lazy-loaded.
- Skimmable at 320px: title, venue and links legible without horizontal scroll; thumbnails may
  drop out below 480px if they crowd the text — if you do that, keep them in the DOM with
  `display:none` off, i.e. hide via layout, not by removing content.
- Both themes; thumbnails with white backgrounds get a border.

## Review checklist

- [ ] Miroslav's name highlighted consistently, with diacritics
- [ ] Awards match the fact sheet exactly (venue + award name)
- [ ] `supervised` items clearly attributed to the student first author
- [ ] Theses separated from peer-reviewed work
- [ ] Google Scholar and ORCID links correct (`EDRJFLcAAAAJ`, `0009-0000-6142-6492`)
