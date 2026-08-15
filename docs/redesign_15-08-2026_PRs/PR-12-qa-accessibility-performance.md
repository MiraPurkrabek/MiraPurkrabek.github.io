# PR-12 — Accessibility, dark-mode, responsive and performance pass

**Depends on:** [PR-11](PR-11-seo-metadata-redirects.md) (whole site must exist)
**Branch:** `redesign/pr-12-qa-pass` → target `redesign`
**Size:** M · **Ships visually:** fixes only

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md), the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §"Mobile behavior", §"Dark mode",
§"Motion", and the [tech stack](../redesign_15-08-2026_TECH_STACK.md) §"Accessibility",
§"Responsive design", §"Images and media", §"Performance".

---

## Context

Each page PR checked its own work; this PR checks the site as a whole, before it replaces the
live one. It is an audit-and-fix PR: find issues, fix the small ones here, and open follow-ups
only for anything that would require redesigning a section.

## Goal

A site that is accessible, correct in both themes at every width, and fast — with the audit
documented so the result is verifiable.

## In scope — audit and fix

### 1. Accessibility

- Automated: `axe` (CLI or DevTools) and Lighthouse a11y on all seven pages; **zero serious or
  critical violations**.
- Manual keyboard pass on every page: skip link works, tab order matches visual order, focus
  always visible, mobile menu traps and restores focus, `<details>` disclosures operable,
  copy-BibTeX button announces its state, no keyboard trap anywhere.
- Screen-reader smoke test of the homepage and `/publications` (VoiceOver/NVDA/Orca — whichever
  is available; state which in the PR description): heading outline sensible, link text
  meaningful out of context (no bare "here"/"link"), images described or explicitly decorative.
- Contrast: every text/background pair ≥ 4.5:1 (≥ 3:1 for ≥ 24px text) in **both** themes,
  including `--text-subtle` on `--surface-soft`, buttons in all states, and the availability pill.
- `prefers-reduced-motion`: verify every transition and the GIF/video behaviour.
- Language: `lang="en"` on `<html>`, `lang="cs"` on Czech titles and quotes.
- Zoom: page usable at 200% browser zoom and at 320px width without horizontal scrolling.

### 2. Dark mode

Walk every page in dark mode and check specifically: figures and screenshots with white
backgrounds (border or subtle neutral chip, never `invert()`), the GIF/video posters, the
`--surface-soft` bands, code blocks, borders that vanish, focus rings against dark surfaces, the
OG/portrait image edges, and any logo added since PR-04.

### 3. Responsive

Check 320, 360, 414, 768, 1024, 1280, 1440, 1920. Look for: horizontal overflow (`document
.documentElement.scrollWidth > clientWidth`), text lines longer than ~85 characters at large
widths, orphan single-column grids at tablet width, tap targets under 44px, sticky-header overlap
with anchor targets, and images that grow beyond their container.

### 4. Performance

- Convert remaining raster images to AVIF/WebP with responsive `srcset` through `astro:assets`;
  explicit `width`/`height` everywhere; `loading="lazy"` + `decoding="async"` below the fold;
  `fetchpriority="high"` on the hero portrait only.
- Deal with the animated GIFs decisively (`004806_BMP_loop.gif` ~ heavy, `McLaughlin.gif`,
  `Duplantis.gif`, `043+076+174.gif`, `BLANKET_video.gif`): convert to `<video>` (webm+mp4,
  muted, loop, playsinline, `preload="none"`, poster) unless PR-05 already did.
- Font: verify only the needed Inter subsets ship, `font-display: swap`, preloaded woff2 for the
  weight used above the fold.
- Budget check (report actual numbers in the PR description):
  - homepage: HTML+CSS+JS ≤ 120 KB gzipped, total first load ≤ 600 KB, JS ≤ 6 KB
  - every page: LCP < 2.0 s and CLS < 0.02 on a simulated Fast 3G / 4× CPU throttle
  - Lighthouse: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100 on `/`,
    `/work`, `/publications`
- No render-blocking third-party requests; confirm nothing external is fetched except (in prod)
  GA.

### 5. Content correctness sweep

- Every external link on the site returns 200 (write a throwaway link-check script or use
  `lychee`; do not commit the tool as a dependency unless it is genuinely useful in CI).
- Spelling pass, including the ones already visible on the old site: "papaper" → "paper",
  "Februray" → "February", "addmission" → "admission", "downloded" → "downloaded",
  "redection" → "redetection" (check the thesis title against the DSpace record before
  "fixing" it).
- Diacritics consistent: Purkrábek, Jiří Matas, Královské Vinohrady, Skvrna, Suchánek.
- Consistent venue formatting site-wide, consistent date formatting, consistent "PhD candidate"
  wording (never "PhD student" in one place and "candidate" in another).
- Name register audit against
  [PR-00, "Naming"](PR-00-OVERVIEW.md#naming-mira-vs-miroslav-purkrábek): grep the built `dist/`
  for "Miroslav" and check every hit is one of the three sanctioned spots (hero caption, footer
  copyright, publication/citation content) or JSON-LD; grep for "Mira " and confirm it's used
  everywhere else a name is shown to a visitor, including the OG image and `<title>` tags.

## Out of scope

- New features or sections.
- Redesigning anything — if a fix requires a design change, open an issue and note it in the PR
  description instead.

## Deliverables

- Fixes committed.
- An audit summary in the PR description: tool versions, scores per page (before → after), the
  list of issues found, what was fixed here, and what was deferred with a reason.
- Optional but welcome: a `npm run audit` script wiring up the link checker and Lighthouse CI for
  future use.

## Acceptance criteria

- Zero serious/critical axe violations across all pages, both themes.
- Lighthouse thresholds above met and pasted into the PR description.
- No horizontal scroll at any tested width in either theme.
- All external links resolve.
- `npm run build` and `npm run check` clean.
