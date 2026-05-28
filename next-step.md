# Goal: Ship Stories/Reports as Packages and Consume Them in Another Website

## Context

We are building a digital editorial reporting system where “stories” or “reports” are not static pages or PDFs, but reusable, composable modules built with Astro and shared across multiple websites.

The goal is to treat each story as a **package dependency**, not a CMS export or API-driven runtime resource.

---

## Core Idea

Each story/report should be:

- A self-contained package (e.g. `@reports/climate-2026`)
- Built using reusable UI components (charts, insights, narrative blocks)
- Importable into any Astro (or similar) website
- Rendered at build time via CI/CD
- Fully static or hybrid-rendered after compilation

---

## Phase 1: Monorepo Setup (Recommended Starting Point)

We maintain a monorepo structure:

```
repo/
  apps/
    main-website/        # Astro site consuming reports
  packages/
    reports/
      climate-2026/
      energy-outlook/
    ui/
      charts/
      insights/
      narrative/
```

Each report is a package:

```
packages/reports/climate-2026/
  index.mdx
  data.ts
  assets/
  package.json
```

Example `package.json`:

```json
{
  "name": "@reports/climate-2026",
  "version": "1.0.0"
}
```

---

## Phase 2: Story Composition Model

Stories are composed using shared UI primitives:

```mdx
import { Insight, Chart, Evidence } from "@ui";

# Climate Risk 2026

<Insight>
Global exposure has increased by 14%.
</Insight>

<Chart type="line" data={data.climateTrend} />

<Evidence source="IPCC Report 2025" />
```

---

## Phase 3: Consumption in Another Website

In the Astro website:

```astro
---
import ClimateReport from "@reports/climate-2026";
---

<ClimateReport />
```

This means:
- The report is compiled at build time
- No runtime API calls required
- Fully integrated into the site’s bundle

---

## Phase 4: CI/CD Behavior

The CI/CD pipeline for the consuming website:

1. Checkout repository
2. Install dependencies (`pnpm install`)
3. Resolve workspace packages (`@reports/*`)
4. Build Astro site
5. Output static assets
6. Deploy

Important:
- Reports are compiled during build
- No runtime dependency on external services
- Changes in reports require a rebuild of the website

---

## Key Design Principles

- Reports are **packages**, not pages
- Composition happens via **shared UI components**
- Integration is **build-time**, not runtime
- The website is a **renderer of report modules**
- The system is optimized for **reuse, consistency, and scalability**

---

## Success Criteria for Phase 1

- A report can be imported as a module
- A second website can consume it without duplication
- CI/CD builds both reports and site together
- Shared components ensure consistent visual language
- No API or iframe dependency exists

---

## Outcome

We establish a foundation where editorial stories become:
- reusable software modules
- composable narrative systems
- portable across multiple Astro websites
- fully integrated into CI/CD pipelines

This sets the base for a scalable “reporting infrastructure layer” built on top of Astro and shared packages.