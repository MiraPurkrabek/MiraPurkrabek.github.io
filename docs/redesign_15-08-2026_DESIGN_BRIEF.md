# Rough Design Brief

## Objective

Create a personal website that presents Miroslav Purkrábek as:

> **a Computer Vision researcher and PhD candidate with strong research results, substantial practical engineering experience, and evidence that his work reaches real systems.**

The site must be accurate about career stage.

It should not imitate a senior researcher whose employer or title is sufficient on its own.

Instead, the website should build credibility through:

- concrete work,
- real-world impact,
- respected institutions,
- publications and awards,
- clear technical positioning,
- selected personal story.

The visual style should feel modern and polished without becoming a generic startup landing page.

---

# Design character

Keywords:

```text
modern
technical
visual
confident
clean
human
precise
restrained
```

Avoid:

```text
academic-template look
corporate buzzwords
excessive gradients
glassmorphism everywhere
animated blobs
huge marketing slogans
scroll effects
dense CV tables
too many pills / tags
```

The target feel is roughly:

> modern AI / computer-vision portfolio + high-quality research website

rather than:

> university profile page

or:

> SaaS landing page

---

# Core visual system

## Layout

Use a centered page container with generous whitespace.

Desktop:

```text
┌──────────────────────────────────────────────────────────┐
│                       navigation                         │
├──────────────────────────────────────────────────────────┤
│                                                          │
│               spacious main content                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Maximum general width:

```text
~1100–1200 px
```

Long-form text should be narrower:

```text
~700–850 px
```

Use vertical rhythm to separate sections rather than heavy horizontal rules.

---

## Tiles and cards

Rounded tiles are encouraged, but not every element should be a tile.

Use them for:

- selected impact,
- selected work,
- experience summaries,
- recognition,
- affiliations where appropriate.

Suggested character:

```text
border radius: medium / large
thin border
very subtle shadow or no shadow
soft surface contrast
generous internal padding
```

Avoid:

- strong floating shadows,
- multiple nested cards,
- glass effects,
- cards inside cards inside cards.

A card should communicate a meaningful unit of information.

---

## Color

### Light mode

Use:

- warm or neutral off-white background,
- near-black primary text,
- muted gray secondary text,
- slightly tinted cards,
- one restrained accent color.

### Dark mode

Use:

- dark charcoal rather than pure black,
- slightly lighter surfaces for cards,
- off-white text,
- muted cool gray secondary text,
- same accent hue adapted for contrast.

Do not use different brand identities between themes.

The two themes should feel like the same site.

---

## Typography

Primary type should be a modern readable sans-serif.

Visual hierarchy:

```text
Name / hero                 large
Section titles              strong but restrained
Project titles              prominent
Body text                   comfortable and readable
Metadata                    smaller and muted
```

Avoid gigantic 80–100 px landing-page headings.

The person's work should dominate, not typography.

Body text should never be justified.

---

# Homepage information architecture

The homepage should work as a complete portfolio.

A visitor who never clicks another page should still understand:

- who Miroslav is,
- current career stage,
- main expertise,
- strongest professional evidence,
- important institutions,
- best projects,
- industry/research trajectory,
- major recognition,
- some personal character,
- how to contact him.

The page should be long enough to tell the story but visually segmented enough to remain easy to scan.

Recommended order:

```text
1. Navigation
2. Hero
3. Experience & affiliations
4. Selected impact
5. Selected work
6. Experience timeline
7. Recognition / selected publications
8. Beyond computer vision
9. Contact / footer
```

---

# 1. Navigation

Desktop:

```text
Miroslav Purkrábek        Work   Publications   About   CV   ◐
```

Mobile:

```text
Miroslav Purkrábek                            ☰   ◐
```

Keep navigation simple.

No multi-level dropdowns.

Recommended items:

```text
Work
Publications
About
CV
```

Home is accessible through the name/logo.

Theme toggle remains visible.

---

# 2. Hero

The hero should clearly state both professional identity and career stage.

Example structure:

```text
Miroslav Purkrábek

Computer Vision Researcher
& PhD Candidate

I work on robust visual perception —
especially the difficult cases where
clean benchmark assumptions break.

Human understanding · 2D/3D vision · Robust CV

[Selected Work] [CV] [Email]
```

Possible positioning idea:

> **Computer vision for the last 10%.**

This can be used if the final copy feels natural and specific enough.

It should be supported immediately by concrete examples further down the page.

### Visual treatment

Desktop may use a split layout:

```text
┌──────────────────────────────┬──────────────────────────┐
│                              │                          │
│ Name                         │       portrait or        │
│ Role                         │   strong CV research     │
│ Positioning                  │        visual            │
│ Buttons                      │                          │
│                              │                          │
└──────────────────────────────┴──────────────────────────┘
```

On mobile, stack vertically.

Do not use a generic stock illustration.

Use either:

- a good portrait,
- a visually striking research image,
- or a carefully composed combination.

---

# 3. Experience & affiliations

This is an important credibility section.

Possible heading:

## Experience & Affiliations

Logo-based presentation:

```text
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Qualcomm │ │   CTU    │ │Tübingen  │ │ Porsche  │
│  logo    │ │   logo   │ │  logo    │ │   logo   │
│          │ │          │ │          │ │          │
│ Research │ │ PhD /    │ │ Research │ │ Software │
│ Intern   │ │ Research │ │ Visit    │ │ Engineer │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

Potential institutions:

- Qualcomm
- Czech Technical University / Visual Recognition Group
- University of Tübingen
- Porsche / Porsche Engineering
- University of Ljubljana, if relevant enough

Every logo must be accompanied by text.

Do not rely on logos alone.

Be explicit about relationship:

```text
Research Intern
PhD Candidate / Researcher
Research Visit
Software Developer
Research Intern
```

This avoids implying that all logos represent current employment.

SKV should probably not appear in the same technical affiliation row.

It belongs later as part of the leadership/personal story.

---

# 4. Selected impact

This section should differentiate the profile from a generic PhD homepage.

Heading options:

```text
Selected Impact
Research into Practice
Work Beyond Benchmarks
```

Use 3–4 rounded tiles.

Example composition:

```text
┌────────────────────────┐ ┌────────────────────────┐
│ DEPLOYED SYSTEM        │ │ PRODUCTION SOFTWARE    │
│                        │ │                        │
│ Used by Czech Police   │ │ 100k+ vehicles        │
│                        │ │                        │
│ Computer-vision system │ │ Production software   │
│ used operationally...  │ │ shipped in Porsche... │
└────────────────────────┘ └────────────────────────┘

┌────────────────────────┐ ┌────────────────────────┐
│ RESEARCH               │ │ COMPETITIVE RESULT     │
│                        │ │                        │
│ CVPR + ICCV            │ │ 1st place             │
│                        │ │                        │
│ First-author work...   │ │ CVPR 2026 challenge...│
└────────────────────────┘ └────────────────────────┘
```

The large text should be the memorable fact:

```text
Used by Czech Police
100k+ vehicles
CVPR + ICCV
1st place
```

Then explain context in one or two lines.

Avoid marketing language.

Use exact claims that can be defended.

---

# 5. Selected Work

This should be the most visual part of the site.

Show only ~3–4 projects on the homepage.

Each project should answer:

```text
What problem?
What did I contribute?
Why does it matter?
What evidence exists?
```

Suggested visual card:

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                  large project image                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ ProbPose                                                 │
│ CVPR 2025 · First author                                 │
│                                                          │
│ Reliable human pose estimation when parts of a person    │
│ leave the image.                                         │
│                                                          │
│ [Project] [Paper] [Code] [Models]                        │
└──────────────────────────────────────────────────────────┘
```

Desktop can alternate image/text alignment:

```text
[visual] [text]

[text]   [visual]

[visual] [text]
```

This creates rhythm without animation.

Mobile always becomes:

```text
[visual]
[text]
```

Likely featured projects:

- BBoxMaskPose
- ProbPose
- S23DR / structured 3D reconstruction
- one strong applied system

Do not put full abstracts on homepage cards.

---

# 6. Experience timeline

This section explains the career path more explicitly than the logo strip.

Example:

```text
2026
QUALCOMM XR LABS · AMSTERDAM
Research Intern
3D scene reconstruction and understanding
──────────────────────────────────────────────

2025–2026
UNIVERSITY OF TÜBINGEN
Research Visit
3D human understanding / related research
──────────────────────────────────────────────

2023–
CTU PRAGUE · VISUAL RECOGNITION GROUP
PhD Candidate & Researcher
Robust human understanding in images and video
──────────────────────────────────────────────

2020–2022
PORSCHE ENGINEERING
Software Development
Production C/C++ systems
```

Keep homepage descriptions short.

Detailed experience can live on an About / CV page.

Use restrained timeline styling.

Do not use excessive icons or animation.

---

# 7. Recognition and publications

Do not recreate a full academic CV on the homepage.

Show selected recognition:

```text
CVPR 2026 Challenge — 1st place
CVPR 2025 — Outstanding Reviewer
FG 2024 — Best Poster
CVWW 2026 — Best Student Paper
Ministry of Interior — Excellent Research Results
```

Then selected publications:

```text
BBoxMaskPose — ICCV 2025
ProbPose — CVPR 2025
RePoGen — FG 2024
```

A link leads to:

```text
View all publications →
```

This keeps the homepage readable while making achievements visible.

---

# 8. Beyond computer vision

Use this section to make the site personal without weakening the technical positioning.

Possible structure:

```text
┌──────────────────────────┬───────────────────────────────┐
│                          │ Beyond Computer Vision        │
│   floorball photograph   │                               │
│                          │ For several years I have also │
│                          │ coached competitive floorball│
│                          │ including as head coach in... │
│                          │                               │
│                          │ [Read the story →]            │
└──────────────────────────┴───────────────────────────────┘
```

The point is not:

> AI researcher + sports hobby

The point is:

> technical researcher with substantial leadership experience outside academia.

Keep mountains/books/travel secondary unless the final visual design has room for a small personal note.

---

# 9. Contact

End with a clean contact block.

Example:

```text
Interested in working together?

Email
LinkedIn
GitHub
Google Scholar
CV
```

Do not require visitors to hunt through the footer for contact information.

---

# Project pages

Individual research/project pages can remain richer.

Suggested structure:

```text
Project title
Venue / year / role

One-sentence result

[main visual]

TL;DR

Contribution

Results

Demo / figures

Paper · Code · Models · Dataset

Citation
```

Use the same design system as the homepage.

Project pages should feel like part of one portfolio rather than independent conference microsites.

---

# Publications page

Use a clean visual list.

Each publication:

```text
[thumbnail]

Title
Authors
Venue / year

One-sentence description

Paper · Project · Code · BibTeX
```

Filters by year/topic are optional.

Do not over-engineer search unless the publication list becomes much larger.

---

# About page

The About page can contain the fuller narrative that does not fit on the homepage.

Possible sections:

```text
Professional story
Research philosophy
Coaching / leadership
Teaching / mentoring
Personal interests
```

It should still remain professionally relevant.

---

# Mobile behavior

Mobile is a first-class layout, not a compressed desktop page.

Rules:

- one main column,
- cards stack,
- affiliation logos form a 2-column grid or horizontal wrap,
- large research visuals stay full width,
- text sizes reduce smoothly rather than abruptly,
- buttons remain tappable,
- navigation becomes a simple drawer/menu,
- no content hidden only because the viewport is small.

Avoid horizontal carousels for essential information.

Users should be able to scroll normally through the whole story.

---

# Dark mode

Every section must be designed for both themes from the beginning.

Do not simply invert colors.

Check:

- logos,
- borders,
- screenshots,
- charts,
- link colors,
- code blocks,
- muted text,
- cards.

Institutional logos may need:

- transparent versions,
- monochrome alternatives,
- subtle neutral containers.

Never apply arbitrary inversion filters to official logos.

---

# Motion

The website should feel alive through:

- responsive hover states,
- subtle button transitions,
- slightly elevated cards,
- gentle image zoom on hover where appropriate.

It should not rely on animation for personality.

Avoid:

```text
scroll-triggered flying elements
animated gradients
typewriter text
parallax
3D card tilt
mouse-follow effects
large entrance animations
```

A visitor should be able to read the page normally even if all transitions are removed.

---

# Machine readability

Visual design must never hide core information.

Good:

```text
[Qualcomm logo]
Qualcomm XR Labs
Research Intern · 2026
```

Bad:

```text
[Qualcomm logo only]
```

Good:

```text
Used operationally by Czech Police
Computer-vision system for forensic image/video analysis.
```

Bad:

```text
[Police/project image]
"Real-world impact"
```

All major claims must exist as real HTML text.

---

# Tone of copy

The writing should be:

```text
specific
short
factual
confident
non-boastful
```

Prefer:

> Production software deployed in 100k+ vehicles.

over:

> Proven ability to create high-impact scalable solutions.

Prefer:

> First-author work at CVPR 2025 and ICCV 2025.

over:

> Published at world-leading conferences.

Concrete evidence should do the selling.

---

# Visual hierarchy

The intended attention order is:

```text
1. Who is this?
2. What does he work on?
3. Why is he worth paying attention to?
4. What has he actually built/researched?
5. Where has he worked?
6. What external recognition exists?
7. What kind of person is he?
8. How do I contact him?
```

The page should make this sequence obvious without the user consciously thinking about it.

---

# Overall principle

The site should not try to look senior through titles.

It should look professional through:

- clarity,
- strong visual work,
- credible institutions,
- concrete outcomes,
- good writing,
- careful design.

The desired reaction is:

> "He is still finishing his PhD, but he already has serious research, engineering, deployment, and leadership experience."
