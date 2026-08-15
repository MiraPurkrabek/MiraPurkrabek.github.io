# PR-10 — Article layout and the `/webcam_demo/` write-up

**Depends on:** [PR-02](PR-02-design-system.md)
**Branch:** `redesign/pr-10-article-webcam-demo` → target `redesign`
**Size:** S · **Ships visually:** yes

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md).

---

## Context

[`webcam_demo.md`](../../webcam_demo.md) — "How I did my CVPR poster-session live demo" — is the
one piece of genuinely useful writing on the site. It shows initiative, practicality and
willingness to help other people, which is exactly the "good to have in a team" signal the
redesign is chasing. It also has inbound links from the CVPR crowd, so **its URL must not change**.

It currently uses hand-rolled inline styles, a dark hard-coded TL;DR box (broken in dark mode)
and a `<video>` with autoplay.

## Goal

A reusable article layout plus the ported write-up at the same URL, styled by the design system.

## In scope

### 1. `ArticleLayout.astro` (`src/layouts/`)

- Props: `title`, `subtitle?`, `date?`, `description`, `noindex?`.
- Header block: `<h1>`, subtitle (`--text-lg`, `--text-muted`), meta line (mono, `--text-xs`) with
  date and estimated reading time (computed at build time from word count — no client JS).
- Body: `Prose` at `--width-text` with headings, lists, links, `code`, `pre`, blockquote,
  `figure`/`figcaption`, tables, and full-width media allowed to exceed the text column up to
  `--width-page` via a `.wide` class.
- Reuses `Callout.astro` (built in PR-09 — if PR-09 has not landed yet, build it here and note
  the overlap in the PR description; identical component, one implementation).
- Back link at the top: `← Work` or `← Home` (pick `← Home`, since the article is not a project).
- No comments, no share buttons, no author box, no "related posts".

### 2. Port the content

- Source: `webcam_demo.md`, published at **`/webcam_demo/`** (trailing slash preserved).
  Implement as `src/pages/webcam_demo.md` (or `.mdx`) using `ArticleLayout`, with
  `build.format: 'directory'` producing `/webcam_demo/index.html`.
- Keep the text as written — this is a port, not a rewrite. Allowed edits: fix typos, convert the
  inline-styled TL;DR block into a `Callout`, convert inline-styled divs into plain Markdown,
  replace the `<video autoplay>` with `controls muted loop playsinline preload="metadata"` and
  **no autoplay** (respect the reader; it is a 2 MB asset).
- Video stays at `/assets/videos/webcam_demo_muted.mp4`; add a `poster` frame (extract frame 0
  with ffmpeg, commit as `public/assets/videos/webcam_demo_poster.jpg`).
- Images referenced by the article keep working from `public/assets/img/`.
- Add `title`/`description` metadata suitable for sharing, since this page gets linked around.

### 3. Discoverability

- Link it from `/work` in a short closing block: **"Notes & write-ups"** → one line with the
  article title and a sentence of context.
- Do **not** build a blog index, tags, or an RSS feed. One article does not need infrastructure.
  If Miroslav writes more later, a `/notes` index becomes a separate PR.

## Out of scope

- Any new writing.
- A blog system, `_posts` migration (the two Jekyll demo posts are deleted in PR-13).

## Acceptance criteria

- `/webcam_demo/` renders with the new design in both themes; the old dark TL;DR box no longer
  hard-codes colours.
- Video does not autoplay, has a poster, and does not block page load.
- All original links and images still resolve.
- Article is readable at 320px; `pre`/code blocks scroll horizontally inside their own container
  rather than widening the page.
- Reading time is generated at build time; zero client JS added by this PR.

## Review checklist

- [ ] URL is exactly `/webcam_demo/`
- [ ] No inline `style` attributes remain
- [ ] Text not justified
- [ ] `alt` text on every image
- [ ] `Callout` component shared with PR-09, not duplicated
