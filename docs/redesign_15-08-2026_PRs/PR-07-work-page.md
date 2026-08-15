# PR-07 — `/work`: research projects and applied systems

**Depends on:** [PR-02](PR-02-design-system.md), [PR-03](PR-03-content-model.md)
(independent of PR-04…06 — can be built in parallel)
**Branch:** `redesign/pr-07-work-page` → target `redesign`
**Size:** M · **Ships visually:** yes

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) and the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §"Project pages" (adapted: we build one
index page, not per-project pages).

---

## Context

The old `/projects` page is an undifferentiated list where a police forensic system, a hobby
tool and a Porsche charger all look the same, and where the research papers are missing entirely
(they live on `/papers`).

The new `/work` page is the evidence room for the positioning: **research that ships** and
**systems that run**. It replaces `/projects` (which redirects here in PR-11).

Locked decision: paper microsites stay external. `/work` entries link out; there are no
per-project pages on this site.

## Goal

One page listing all 12 entries of the `projects` collection, grouped so a reader can tell
research from delivery at a glance, each with enough substance to be judged and links to go
deeper.

## In scope

### Page structure

```text
h1  Work
    lead: Research on robust human perception, and the systems that put it to use.
          Papers link to their project pages; systems link to code or a write-up
          where it exists.

h2  Research
    · BBox-Mask-Pose (+ BMPv2)
    · ProbPose
    · RePoGen
    · S23DR 2026 — structured 3D reconstruction
    · Infant sensorimotor development
    · Animal identification from camera traps
    · Floorball player tracking

h2  Applied systems
    · FACIS — forensic image and video tools for the Criminal Police Service
    · Revie — instant clip retrieval for a sports hall
    · Automatic download from SKV cameras
    · Porsche — Taycan & High Power Charging

h2  Tools & open source
    · PoseAnnotator

closing: Publications with abstracts and BibTeX → /publications
```

Ordering inside each group comes from `order` in the collection: most significant first, roughly
reverse-chronological.

### Entry component (`src/components/ProjectEntry.astro`)

A horizontal card: thumbnail left (fixed 240px wide on desktop, `--radius-md`, 1px border),
content right. Stacks on mobile with the image above. Content:

- Title (`--text-xl`) — links to the primary external destination when one exists, otherwise
  plain text
- Meta line (mono, `--text-xs`, `--text-subtle`): `years · role · org` — e.g.
  `2025 · First author · CTU Prague, VRG` or `2020–2022 · Software developer · Porsche Engineering`
- Tagline + 2–4 sentence description (from the collection body)
- Up to 3 `highlights` as a compact bullet list where they add facts (numbers, deployment,
  awards) — skip the list entirely rather than padding it
- Up to 3 tags
- Button row of whatever links exist: `Project ↗ · Paper ↗ · Code ↗ · Demo ↗ · Models ↗ ·
  Dataset ↗ · Grant ↗ · Article ↗`
- Entries with no public link end with a plain line: *"Internal system — happy to talk about it."*
  (Revie, SKV downloader, FACIS where applicable)

Card hover: border + shadow only, as defined by the design system. Cards are **not** wholly
clickable.

### Content specifics to get right

- **BBox-Mask-Pose** entry covers both the ICCV 2025 paper and the BMPv2 arXiv follow-up and the
  supervised SAM-pose2seg work — one coherent line of research, not three cards.
- **FACIS** uses the confirmed wording (see
  [PR-00 §8, "Facts confirmed by Miroslav"](PR-00-OVERVIEW.md#facts-confirmed-by-miroslav-2026-08-15--supersedes-all-earlier--flags)):
  commissioned by the Ministry of the Interior for the Police of the Czech Republic's Criminal
  Police Service, built with BUT, **now in active use by the Police**, awarded Excellent Research
  Results in 2025. Do not add any claim about how the Police feel about it — usage is the
  checkable fact.
- **Revie** must carry its concrete numbers: under 0.5 s latency, 6+ simultaneous 4K cameras,
  30-second retro-clip, local mini-PC backend, used in matches and training. This entry is one of
  the strongest engineering signals on the site — write it properly.
- **SKV camera download**: Python backend + Power Automate + OneDrive, 30-day history, logging
  and failure alerts, 400+ videos served.
- **Porsche — Taycan & High Power Charging**: two years on Porsche's EV engineering team —
  control-unit software for the Taycan (170,000+ delivered worldwide, 2020–2025, source: Porsche
  sales figures) and software across the components of Porsche's High Power Charging platform,
  one of the most powerful EV chargers of its generation. Link the reference article. Do **not**
  state a charger count or claim the charging network is "currently running in Europe and
  China" — Porsche's self-built China network is being wound down from March 2026 and no
  reliable public figure exists for total installations.
- **PoseAnnotator**: local alternative to CVAT/LabelStudio, built for the RePoGen dataset, reused
  across several datasets, open source with a GitHub link.
- **Floorball player tracking** ties the BSc/MSc theses to the applied interest in sports video —
  it is also the honest origin story of the Revie system.

### Nav & cross-links

- Header "Work" is active on this page.
- Homepage `All projects →` points here.
- Page ends with a link to `/publications`; `/about` is reachable from nav and footer only.

## Out of scope

- Per-project detail pages (explicitly not built).
- Filtering/search UI (the brief calls it optional; 12 entries do not need it).
- Redirect from `/projects` (PR-11).

## Acceptance criteria

- All 12 collection entries appear exactly once, in the right group.
- Every external link verified by hand; all open in a new tab with `rel="noopener"`.
- No entry duplicates the abstract from `/publications` — descriptions here are about the work
  and the contribution, not the paper text.
- Page is readable and scannable at 320px; thumbnails never overflow.
- `<h1>Work</h1>` once, group headings as `<h2>`, entry titles as `<h3>`.
- Both themes; screenshots with white backgrounds (`Revie-screenshot.png`,
  `poseAnnotator_screenshot.png`) get a border so they do not glow in dark mode.

## Review checklist

- [ ] Research vs applied grouping matches the `kind` field, not intuition
- [ ] Every number on the page traces to the fact sheet
- [ ] No claim that a closed system is open source
- [ ] Images lazy-loaded below the fold with explicit dimensions
