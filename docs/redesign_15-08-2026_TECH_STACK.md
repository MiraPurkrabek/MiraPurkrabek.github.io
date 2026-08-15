# Technical Stack

## Goal

Build a fast, maintainable personal website for an AI / Computer Vision researcher that:

- works equally well on desktop and mobile,
- is easy to update without touching layout code,
- produces clean static HTML,
- is highly readable by search engines, screen readers, and LLMs,
- supports light and dark themes,
- has enough flexibility for modern visual design without becoming a heavy web application,
- can continue to be hosted at `MiraPurkrabek.github.io`.

---

## Core stack

### Astro

Use **Astro** as the static-site framework.

Why:

- static HTML by default,
- very little JavaScript shipped to the browser,
- excellent fit for a portfolio / research website,
- reusable components without committing to a heavy SPA framework,
- Markdown / MDX support for project and publication content,
- easy GitHub Pages deployment,
- good control over metadata and semantic HTML.

Do not introduce React, Vue, Svelte, or another client framework globally.

If a small interactive component genuinely benefits from JavaScript, use an isolated Astro island. Most of the site should remain plain HTML + CSS.

---

## Language

### TypeScript

Use TypeScript for:

- component props,
- content schemas,
- utility code,
- project/publication metadata validation.

The website itself should remain mostly static.

---

## Styling

### CSS

Prefer **plain modern CSS** with CSS variables.

Avoid a large UI framework.

Use CSS for:

- responsive layouts,
- grid / flexbox,
- typography,
- cards,
- spacing,
- light/dark themes,
- hover/focus states,
- minimal transitions.

A small utility layer is fine, but avoid turning every element into long utility-class strings.

### Design tokens

Define common variables centrally:

```css
:root {
  --page-bg: ...;
  --surface: ...;
  --surface-soft: ...;
  --text: ...;
  --text-muted: ...;
  --border: ...;
  --accent: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;

  --space-1: ...;
  --space-2: ...;
  --space-3: ...;
}
```

Dark mode should redefine the same tokens rather than maintaining a separate stylesheet.

---

## Light and dark mode

Support:

1. the user's operating-system preference by default,
2. an explicit theme toggle,
3. persistence of the user's selected mode.

Recommended behavior:

```text
No manual preference
        ↓
prefers-color-scheme
        ↓
Light / Dark

User selects theme
        ↓
Store choice in localStorage
        ↓
Respect explicit choice on future visits
```

Avoid a visible white/dark flash during page load.

All colors must maintain good text contrast in both themes.

---

## Content architecture

Separate **content** from **presentation**.

Suggested structure:

```text
src/
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── AffiliationStrip.astro
│   ├── ImpactCard.astro
│   ├── ProjectCard.astro
│   ├── ExperienceTimeline.astro
│   ├── PublicationItem.astro
│   ├── RecognitionItem.astro
│   ├── ThemeToggle.astro
│   └── Footer.astro
│
├── layouts/
│   ├── BaseLayout.astro
│   └── ProjectLayout.astro
│
├── pages/
│   ├── index.astro
│   ├── work.astro
│   ├── publications.astro
│   ├── about.astro
│   └── projects/
│
├── content/
│   ├── projects/
│   ├── publications/
│   ├── experience/
│   └── recognition/
│
├── styles/
│   ├── global.css
│   ├── tokens.css
│   └── components.css
│
└── assets/
    ├── images/
    ├── logos/
    └── icons/
```

The exact directory layout can change if Astro's current content APIs make another structure cleaner.

---

## Structured content

Project, publication, experience, and recognition data should be stored as structured content rather than duplicated directly in page templates.

Example project metadata:

```yaml
title: ProbPose
subtitle: Reliable human pose estimation under cropping
year: 2025
venue: CVPR
role: First author
featured: true

links:
  project: ...
  paper: ...
  code: ...
  models: ...
  dataset: ...

tags:
  - Human Pose Estimation
  - Robust Computer Vision
  - Probabilistic Modeling

impact:
  - Introduced explicit reasoning about body parts outside the image
  - Released code, models and benchmark data

thumbnail: /...
```

Benefits:

- one source of truth,
- easy ordering/filtering,
- easy generation of project cards,
- easy future redesign,
- machine-readable metadata.

---

## Main pages

Keep the main navigation shallow.

Recommended top-level pages:

```text
Home
Work
Publications
About
CV
```

The homepage should contain enough information that a visitor does not need to click deeper to understand the profile.

Subpages provide details rather than essential context.

---

## Semantic HTML

Use semantic elements consistently:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

Use real headings:

```html
<h1>Miroslav Purkrábek</h1>
<h2>Selected Work</h2>
<h2>Experience</h2>
```

Do not fake section headings with bold text or decorative divs.

Heading levels must follow a logical hierarchy.

---

## Machine readability

### Metadata

Every page should define:

- unique `<title>`,
- meta description,
- canonical URL,
- Open Graph title,
- Open Graph description,
- Open Graph image,
- Twitter / social preview metadata where appropriate.

### Structured data

Add JSON-LD for the main profile using `schema.org/Person`.

Include fields such as:

```text
name
url
image
jobTitle
affiliation
sameAs
knowsAbout
alumniOf / memberOf where appropriate
```

Use accurate language and avoid implying current affiliation where it is historical.

Publication/project pages can optionally expose appropriate structured metadata as well.

### Machine-readable CV information

Important experience should exist as visible HTML text, not only:

- images,
- logos,
- PDFs,
- hover states,
- animations.

For example, an affiliation card should contain text like:

```text
Qualcomm
Research Intern — XR Labs
2026
```

even if a logo is also displayed.

---

## Accessibility

Target WCAG-friendly behavior.

Requirements:

- sufficient contrast,
- keyboard-accessible navigation,
- visible focus states,
- meaningful link labels,
- descriptive image `alt` text,
- decorative images with empty alt text,
- no information available only through hover,
- support for `prefers-reduced-motion`,
- sensible document outline,
- responsive text sizing.

Important visual research figures should have concise but meaningful alt descriptions.

---

## Responsive design

Design mobile-first.

Suggested breakpoints should emerge from the layout rather than from specific device models.

General behavior:

### Small screens

- one-column layout,
- comfortable horizontal padding,
- project cards stack vertically,
- logos wrap into a compact grid,
- navigation collapses cleanly,
- buttons remain large enough to tap,
- no horizontal scrolling.

### Medium screens

- 2-column project / impact grids where useful,
- wider hero composition,
- experience entries gain more horizontal structure.

### Large screens

- maximum readable width rather than edge-to-edge text,
- richer asymmetric layouts,
- larger visual project cards,
- 3–5 column logo strip if appropriate.

Suggested content width:

```text
Text-heavy sections: ~700–850 px
General page container: ~1100–1200 px
```

Do not make body text span the whole width of a desktop display.

---

## Images and media

Computer vision work should be visual.

Use:

- optimized WebP / AVIF where appropriate,
- responsive `srcset`,
- lazy loading below the fold,
- explicit image dimensions to prevent layout shifts.

Prefer still images and short lightweight demonstrations over autoplay video.

Avoid decorative media that does not communicate anything.

---

## Animation

Keep motion restrained.

Allowed:

- subtle hover elevation,
- small opacity/color transitions,
- gentle card movement of a few pixels,
- simple section reveal only if it remains unobtrusive.

Avoid:

- parallax,
- scroll hijacking,
- excessive fade-ins,
- animated backgrounds,
- large motion effects,
- cursor gimmicks.

All motion should respect:

```css
@media (prefers-reduced-motion: reduce)
```

The website should remain fully usable with animations disabled.

---

## Icons

Use a small consistent icon set.

Suitable for:

- GitHub,
- Google Scholar,
- LinkedIn,
- email,
- external links,
- paper/code/data buttons.

Avoid mixing multiple icon styles.

Logos of institutions should remain their official marks.

---

## Fonts

Use one primary sans-serif family, possibly with one optional complementary display or serif family.

Requirements:

- highly readable,
- good Latin/Czech character support,
- variable font preferred,
- self-host or use a privacy-conscious delivery method where practical.

Avoid excessive font variety.

Two families maximum.

---

## Performance

The site should be lightweight.

Targets:

- static HTML wherever possible,
- minimal JavaScript,
- optimized images,
- no heavy animation libraries unless clearly justified,
- no unnecessary tracking scripts,
- no large client-side framework bundle.

Aim for strong Lighthouse scores without designing specifically for the score.

---

## Analytics

If analytics are retained, keep them lightweight.

Track only useful aggregate behavior such as:

- page visits,
- project-link clicks,
- CV downloads,
- contact-link clicks.

Do not let analytics delay rendering.

---

## Deployment

Continue hosting through **GitHub Pages**.

Recommended workflow:

```text
Push to main/master
        ↓
GitHub Actions
        ↓
Astro build
        ↓
Static output
        ↓
GitHub Pages
```

The public URL remains:

```text
https://MiraPurkrabek.github.io
```

Preserve important existing URLs where possible.

Where URLs change, add redirects or compatibility pages so links to existing project pages do not break.

---

## Migration strategy

Do not rewrite all content at once.

Recommended order:

1. create new Astro project,
2. implement global layout and design tokens,
3. build homepage,
4. migrate shared metadata,
5. migrate selected project pages,
6. migrate publication page,
7. migrate About / personal content,
8. preserve or redirect old URLs,
9. verify mobile layout,
10. verify light/dark mode,
11. verify accessibility and metadata,
12. replace old site only after the new build is complete.

---

## Non-goals

Do not build:

- a web application,
- a CMS unless maintaining Markdown becomes genuinely inconvenient,
- a complex animation system,
- a custom backend,
- authentication,
- an elaborate blog platform,
- unnecessary client-side state.

The technical implementation should remain simpler than the content it presents.
