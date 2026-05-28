“The story defines the interface, not the other way around.”
# Digital Editorial Reporting Platform — Plan

## Goal

Transform analytical PDF reports into:
- modern web-native editorial stories
- magazine-style narratives
- interactive longform experiences

while still providing:
- downloadable full PDF reports

The web experience becomes:
- shorter
- curated
- narrative-driven
- visually immersive

---

# Core Philosophy

Separate:

```txt
Analysis / Data / PDF generation
≠
Presentation / Storytelling / Editorial UX
```

Quarto remains:
- analysis pipeline
- PDF generation tool

Astro becomes:
- presentation shell
- editorial platform
- storytelling engine

---

# Architecture

## Core Stack

### Framework
- Astro

### Content Authoring
- MDX

### Styling
- Tailwind CSS

### Motion / Animation
- Framer Motion

### Scrollytelling
- Scrollama

### UI Utilities
- shadcn/ui (light usage only)

### Charts
- Start with static exports from R
- Later:
  - JS Framework

---

# Architectural Principles

## Avoid
- CMS
- giant React app architecture
- dashboard mentality
- overengineered frontend systems
- heavy client-side state management

## Prefer
- static-first architecture
- content-first design
- progressive enhancement
- lightweight interactivity
- narrative-driven UX

---

# Editorial Design Language

Build reusable narrative primitives/components:

## Core Components
- Hero
- ChapterIntro
- KeyInsight
- PullQuote
- StatGrid
- StorySection
- ChartNarrative
- StickyFigure
- ExecutiveSummary
- FullBleedVisual
- QuoteBlock
- MethodologyNote

These become:
- the publication vocabulary
- the reusable storytelling system

---

# Team Workflow

## Platform / Design Layer
Creates:
- layouts
- templates
- visual system
- reusable components
- animation primitives
- typography system

## Analysts / Authors
Write:
- MDX content
- narrative copy
- insights
- structured story blocks

NOT:
- frontend architecture
- complex JS
- CSS systems

---

# Authoring Model

Authors write:

```mdx
<Hero title="Energy Transition 2026" />

<KeyInsight>
Storage economics shifted dramatically.
</KeyInsight>

<ChartNarrative chart="battery-costs" />

<PullQuote>
The market structure fundamentally changed.
</PullQuote>
```

Goal:
- component composition
- not frontend engineering

---

# Motion Philosophy

Use motion sparingly:
- section reveals
- chart transitions
- narrative pacing
- sticky storytelling
- scroll-driven explanation

Avoid:
- excessive animation
- app-like transitions
- gimmicky effects

---

# Scrollytelling Usage

Use Scrollama for:
- sticky charts
- progressive explanations
- narrative walkthroughs
- chapter-based visualization evolution

Only in:
- high-value story sections

Not everywhere.

---

# Visual Identity Priorities

Most important:
1. Typography
2. Spacing rhythm
3. Narrative pacing
4. Grid/layout system
5. Chart consistency
6. Motion consistency

Less important:
- framework complexity
- advanced frontend engineering

---

# Initial Milestone

Build ONE flagship report:
- homepage
- editorial landing
- chapter navigation
- animated story sections
- embedded charts
- downloadable PDF

Goal:
- validate workflow
- establish design language
- teach component-based storytelling

---

# Long-Term Vision

Create:
- a reusable editorial publishing platform
- for digital-first analytical storytelling

where:
- reports become stories
- PDFs become companion artifacts
- authors compose narratives from reusable blocks
- the platform remains lightweight and maintainable