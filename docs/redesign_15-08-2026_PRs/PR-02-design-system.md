# PR-02 — Design system: tokens, base layout, header, footer, theme toggle

**Depends on:** [PR-01](PR-01-astro-scaffold.md)
**Branch:** `redesign/pr-02-design-system` → target `redesign`
**Size:** L · **Ships visually:** yes (`/styleguide` + chrome around the placeholder page)

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md), the
[design brief](../redesign_15-08-2026_DESIGN_BRIEF.md) §"Core visual system", §"Motion",
§"Dark mode", and the [tech stack](../redesign_15-08-2026_TECH_STACK.md) §"Styling", §"Fonts".

---

## Context

Every later PR builds pages out of the primitives created here. The design brief describes the
character (modern, technical, restrained, human) but not exact values. **This PR fixes the exact
values so no later PR has to invent one.** Anything not defined here must be added *here* rather
than hard-coded in a page.

Target feel: modern AI/CV portfolio crossed with a high-quality research site. Not a university
template, not a SaaS landing page.

## Goal

A complete, documented design system and page chrome: tokens, global styles, fonts, base layout,
header with navigation and theme toggle, footer, and a `/styleguide` page that renders every
primitive in both themes.

## In scope

### 1. Design tokens — `src/styles/tokens.css`

Use exactly these values. Light theme on `:root`; dark theme redefines **the same token names**.

```css
:root {
  /* colour — light */
  --page-bg:        #FBFAF8;   /* warm off-white */
  --surface:        #FFFFFF;
  --surface-soft:   #F3F1ED;   /* tinted cards, code blocks */
  --surface-hover:  #EDEAE4;
  --text:           #1A1A18;
  --text-muted:     #5C5F5B;
  --text-subtle:    #83867F;   /* metadata, captions */
  --border:         #E3E0D9;
  --border-strong:  #CFCBC2;
  --accent:         #0E5C68;   /* deep teal — links, buttons, small marks */
  --accent-hover:   #0A464F;
  --accent-soft:    #E2EFF1;   /* accent-tinted background */
  --accent-contrast:#FFFFFF;   /* text on accent */
  --focus-ring:     #0E5C68;
  color-scheme: light;
}

:root[data-theme='dark'] {
  --page-bg:        #131417;
  --surface:        #191B1F;
  --surface-soft:   #202328;
  --surface-hover:  #272B31;
  --text:           #ECEDEE;
  --text-muted:     #A6ABAF;
  --text-subtle:    #80868B;
  --border:         #2B2F35;
  --border-strong:  #3A3F46;
  --accent:         #4FC3D0;
  --accent-hover:   #7BD7E1;
  --accent-soft:    #163034;
  --accent-contrast:#0B1214;
  --focus-ring:     #4FC3D0;
  color-scheme: dark;
}
```

Both accent/background pairs are ≥ 7:1 contrast; keep it that way if you adjust anything.

```css
:root {
  /* typography */
  --font-sans: 'InterVariable', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, 'Cascadia Mono', monospace;

  --text-xs:   0.8125rem;                                   /* 13px — metadata */
  --text-sm:   0.9375rem;                                   /* 15px — captions, labels */
  --text-base: 1.0625rem;                                   /* 17px — body */
  --text-lg:   1.1875rem;                                   /* 19px — lead paragraphs */
  --text-xl:   clamp(1.375rem, 1.25rem + 0.5vw, 1.625rem);  /* card titles */
  --text-2xl:  clamp(1.625rem, 1.4rem + 1vw, 2.125rem);     /* section headings */
  --text-3xl:  clamp(2rem, 1.7rem + 1.5vw, 2.75rem);        /* page titles */
  --text-4xl:  clamp(2.5rem, 2rem + 2.5vw, 3.5rem);         /* hero name — hard cap 56px */

  --leading-tight: 1.15;
  --leading-snug:  1.35;
  --leading-body:  1.65;

  --tracking-tight: -0.02em;   /* headings */
  --tracking-wide:  0.08em;    /* uppercase eyebrows */

  /* spacing — 4px base */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;  --space-4: 1rem;
  --space-5: 1.5rem;   --space-6: 2rem;     --space-7: 2.5rem;   --space-8: 3rem;
  --space-9: 4rem;     --space-10: 5rem;    --space-11: 6rem;    --space-12: 8rem;

  --section-gap: clamp(3.5rem, 8vw, 6rem);   /* vertical rhythm between page sections */

  /* radii */
  --radius-sm: 8px;  --radius-md: 12px;  --radius-lg: 20px;  --radius-full: 999px;

  /* elevation — deliberately minimal */
  --shadow-none: none;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.04);
  --shadow-md: 0 4px 16px rgb(0 0 0 / 0.06);   /* hover only */

  /* layout */
  --width-page: 1120px;    /* general container */
  --width-text: 760px;     /* long-form prose */
  --width-narrow: 620px;
  --gutter: clamp(1.25rem, 5vw, 2.5rem);

  /* motion */
  --ease: cubic-bezier(0.2, 0, 0.2, 1);
  --dur-fast: 120ms;
  --dur: 200ms;
}
```

Dark mode also needs `--shadow-md: 0 4px 16px rgb(0 0 0 / 0.4);`.

### 2. Global styles — `src/styles/global.css`

- Light reset (`box-sizing: border-box`, margin reset, `img { max-width: 100%; display: block }`,
  `text-wrap: pretty` on paragraphs, `text-wrap: balance` on headings).
- `html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth }` (disabled under
  reduced-motion), `scroll-padding-top` matching the sticky header height.
- Body: `--font-sans`, `--text-base`, `--leading-body`, `--text` on `--page-bg`,
  `font-feature-settings: 'cv05' 1` optional, antialiasing on.
- Heading defaults using the type scale + `--tracking-tight` + `--leading-tight`.
- Links: `--accent`, underline with `text-underline-offset: 0.15em`, hover `--accent-hover`.
- `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; border-radius: 2px }`
  and remove default outline only where focus-visible is provided.
- `.visually-hidden` utility; skip-link styles.
- `@media (prefers-reduced-motion: reduce)`: all transitions/animations to `0.01ms`, no smooth
  scroll.
- **No `text-align: justify` anywhere, ever.**
- Selection colour using `--accent-soft`.

### 3. Fonts

- `npm i @fontsource-variable/inter`; import the **latin** and **latin-ext** subsets only
  (latin-ext is required for `á í ř á b e k`, `Jiří`, `Královské`).
- Import in `BaseLayout.astro` so it is bundled and self-hosted; `font-display: swap`.
- No second web font. Eyebrows/metadata use `--font-mono` (system stack, zero download).

### 4. Layout primitives — `src/components/`

| Component | Purpose |
|---|---|
| `Container.astro` | `width: min(100% - 2*var(--gutter), var(--width-page))`, centred; prop `size: 'page' \| 'text' \| 'narrow'` |
| `Section.astro` | `<section>` wrapper: id, vertical rhythm (`--section-gap`), optional `tone: 'default' \| 'soft'` background, slot for heading + content |
| `SectionHeading.astro` | eyebrow (mono, uppercase, `--tracking-wide`, `--text-subtle`) + `<h2>` + optional lead paragraph + optional right-aligned "see all" link |
| `Card.astro` | surface + `1px solid var(--border)` + `--radius-lg` + `--space-6` padding; props `as`, `href`, `tone`. Hover (only when interactive): border → `--border-strong`, `--shadow-md`, `translateY(-2px)`, `--dur` |
| `Button.astro` | renders `<a>` or `<button>`; variants `primary` (accent fill), `secondary` (border + surface), `ghost` (text + icon); sizes `md`, `sm`; supports leading/trailing icon; min tap target 44px |
| `Tag.astro` | small mono uppercase pill on `--surface-soft`; used sparingly — max 3 per card |
| `Icon.astro` | inline SVG from a local sprite/map; **currentColor**, `aria-hidden` unless labelled |
| `Prose.astro` | wrapper applying long-form typography (`--width-text`, paragraph spacing, list, blockquote, `h3/h4`, `code`, `figure/figcaption`, table) — used by About, Coaching, article layout |

Icon set needed now: `github`, `google-scholar`, `linkedin`, `orcid`, `mail`, `download`,
`arrow-up-right` (external), `arrow-right`, `sun`, `moon`, `menu`, `close`. One visual style
(1.5px stroke, 24×24 viewBox); do not mix icon families later.

### 5. `BaseLayout.astro` — `src/layouts/`

Props: `title`, `description`, `ogImage?`, `bodyClass?`, `noindex?`.
Renders `<!doctype html>` … `<html lang="en" data-theme>` with:

- charset, viewport, `<title>`, meta description, favicon set from `/assets/icons/…`
  (`favicon.ico`, 16/32 png, apple-touch-icon, `site.webmanifest`), `theme-color` per scheme.
- The **theme bootstrap script inline in `<head>`, before any body content** (no flash):
  ```js
  (() => { const s = localStorage.getItem('theme');
    const d = s ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = d; })();
  ```
- Skip link → `#main`, `<Header />`, `<main id="main">` + slot, `<Footer />`.
- Full SEO/OG/JSON-LD handling is **PR-11**; this PR only needs title/description/favicons and a
  `<slot name="head" />` for later additions.

### 6. `Header.astro`

Desktop (≥ 900px): **"Mira Purkrábek"** on the left as a link to `/` (text wordmark,
`font-weight: 600`, `--text-lg`, no avatar image — the old SKV club avatar is removed), nav on
the right: **Work · Publications · About · CV↗ · [theme toggle]**. See
[PR-00, "Naming"](PR-00-OVERVIEW.md#naming-mira-vs-miroslav-purkrábek) — the wordmark is casual
register, always "Mira", never "Miroslav" here.

- `CV` links to `/CV.pdf`, `target="_blank" rel="noopener"`, with the `download` icon and
  an accessible label "CV (PDF, opens in a new tab)".
- Current page marked with `aria-current="page"` and a subtle accent underline.
- Sticky top with `backdrop-filter: saturate(180%) blur(8px)`, background
  `color-mix(in srgb, var(--page-bg) 85%, transparent)`, bottom border appearing only after
  scroll > 8px (one tiny scroll listener, passive) — if this feels fragile, a permanent
  1px border is an acceptable simplification.

Mobile (< 900px): wordmark, theme toggle, hamburger button. The menu is a full-width panel
below the header (not an overlay drawer covering content), animated with a height/opacity
transition, closed on link click and on `Escape`, `aria-expanded` + `aria-controls` wired,
focus trapped while open, body scroll locked. Vanilla TS in the component's `<script>` — no
framework, no island library.

### 7. `Footer.astro`

Three-part, stacking to one column on mobile:

- Left: "Mira Purkrábek" + one line — *"Computer vision researcher and engineer. Prague ·
  currently Amsterdam."* (Amsterdam mention is driven by `src/data/site.ts`, easy to change.)
- Middle: page links (Work, Publications, About, Coaching, CV).
- Right: icon+label links — Email, GitHub, Google Scholar, LinkedIn, ORCID (values in the
  [fact sheet](PR-00-OVERVIEW.md#8-fact-sheet-single-source-of-truth)). External links get
  `rel="noopener"` and the external icon.
- Bottom line: `© <current year> Miroslav Purkrábek · Built with Astro`, `--text-xs`,
  `--text-subtle`. **This one line stays the full legal name** — see
  [PR-00, "Naming"](PR-00-OVERVIEW.md#naming-mira-vs-miroslav-purkrábek) — it is the
  copyright/legal register and one of the site's three searchability anchors for "Miroslav
  Purkrábek". Do not "fix" it to Mira.
- Email is a real `mailto:` link with visible address (no obfuscation gymnastics).

### 8. `ThemeToggle.astro`

- A single `<button>` that cycles **light → dark → system** and shows sun / moon / half-moon,
  with `aria-label` describing the *current* state ("Theme: dark. Switch to system.").
- Writes `theme` to `localStorage` (`'light' | 'dark'`, removed when back to system), updates
  `document.documentElement.dataset.theme`, and reacts to
  `matchMedia('(prefers-color-scheme: dark)')` changes while in system mode.
- If the three-state cycle complicates the icon logic, a two-state light/dark toggle that still
  honours the OS default on first visit is acceptable — decide once, document it in the PR.

### 9. `src/data/site.ts`

Typed site config consumed by header/footer/SEO: **`name: 'Mira Purkrábek'`** (casual — everything
in scope 1–9 above reads from this) and **`legalName: 'Miroslav Purkrábek'`** (official —
footer copyright and JSON-LD `name` read from this; see
[PR-00, "Naming"](PR-00-OVERVIEW.md#naming-mira-vs-miroslav-purkrábek)), role line, location
line, emails (`primary` = `mira.purkrabek@gmail.com`, `university` =
`miroslav.purkrabek@fel.cvut.cz`), socials, `cvPath: '/CV.pdf'`, `siteUrl`, default OG image
path, and an `availability` object (`{ show: true, text: 'Open to applied scientist and research
engineer roles' }`) used by later PRs so the line can be switched off in one place.

### 10. `/styleguide` page

Internal reference page (`noindex`) rendering: the colour tokens as swatches with their names,
the full type scale, spacing scale, all button variants and states, card variants, tags, icons,
prose sample (headings, list, blockquote, code, table, figure), and link states. Both themes
verifiable via the toggle. Later PRs extend this page; PR-13 decides whether to keep it (default:
keep, it is noindexed and useful).

## Out of scope

- Real page content of any kind (PR-04 onward).
- Content collections (PR-03).
- OG images, JSON-LD, sitemap, analytics (PR-11).

## Acceptance criteria

- `/styleguide` renders every primitive; switching the theme changes nothing but colour, and
  there is **no white flash** on reload in dark mode (hard-reload with cache disabled).
- Header nav works at 320 px (menu opens, traps focus, closes on Escape) and at 1440 px.
- Keyboard-only pass: skip link → nav → theme toggle → main → footer, focus always visible.
- No hard-coded colour, radius or spacing literal anywhere outside `tokens.css`
  (grep for `#` hex codes in `src/components` and `src/layouts` — only `currentColor` allowed).
- Text contrast ≥ 4.5:1 for body and ≥ 3:1 for large text in both themes (spot-check
  `--text-muted` and `--text-subtle` on `--surface-soft`).
- `npm run check` clean; total client JS on a page with header+footer stays **under 3 KB gzipped**.

## Review checklist

- [ ] `prefers-reduced-motion` kills every transition
- [ ] Czech diacritics render in Inter (check "Purkrábek", "Královské", "Jiří")
- [ ] Sticky header does not cover anchor targets (`scroll-padding-top` set)
- [ ] Footer email is a working `mailto:` and matches the fact sheet
- [ ] No avatar/logo image in the header (old site used the floorball club logo — intentionally
      dropped; the site is not about the club)
