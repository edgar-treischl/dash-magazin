# Copilot Instructions — Dash Magazin

## Project Overview

Dash Magazin is a digital editorial reporting platform that transforms analytical PDF reports into modern web-native editorial stories. It uses **Astro** as the publishing framework with a static-first, content-driven architecture designed for narrative-driven longform experiences.

**Core Philosophy**: Separate analysis/data/PDF generation from presentation/storytelling/editorial UX.

## Setup & Development

### Prerequisites
- **Node.js**: ≥22.12.0 (check `package.json` for engine requirement)
- **Yarn**: Used as package manager

### Getting Started
```bash
yarn install        # Install dependencies
yarn dev            # Start dev server at http://localhost:4321
yarn build          # Build production site to ./dist/
yarn preview        # Preview build locally before deploying
```

### Development Commands
- **Check TypeScript**: `yarn astro check`
- **Add integrations**: `yarn astro add [integration-name]`
- **General Astro CLI**: `yarn astro -- --help`

## Architecture Overview

### Directory Structure
```
src/
├── assets/          # Static images, SVGs (optimized by Astro)
├── components/      # Reusable Astro/MDX components
├── layouts/         # Page layouts (base template wrapper)
└── pages/           # Routes (Astro/MDX files → URL structure)
public/             # Static files (favicon, robots.txt, etc.)
```

### Tech Stack
- **Framework**: Astro 6+ (static site generation with island architecture)
- **Content**: Astro components + MDX support (for future markdown authoring)
- **Styling**: Inline scoped CSS in `.astro` files (Tailwind CSS planned for future use)
- **Motion**: Framer Motion (planned integration)
- **Scrollytelling**: Scrollama (planned for sticky/progressive narratives)
- **Charts**: Static exports from R initially, later JS framework
- **UI**: Minimal shadcn/ui usage

### Design Principles
**Avoid**:
- CMS dependency
- Giant React app architecture
- Overengineered frontend systems
- Heavy client-side state management

**Prefer**:
- Static-first architecture
- Content-first design
- Progressive enhancement
- Lightweight interactivity
- Narrative-driven UX

## Key Conventions

### Component Development

#### Location & Structure
- All reusable components live in `src/components/`
- Use `.astro` file extension for Astro components
- Component names follow PascalCase (e.g., `Welcome.astro`)

#### Authoring Model for Future
Components will provide a **storytelling vocabulary** for analysts to compose narratives without writing frontend code. Example components planned:
- `Hero` — Story opening with title/subtitle
- `KeyInsight` — Highlighted insight blocks
- `ChartNarrative` — Chart with contextual narrative
- `PullQuote` — Emphasized quotes
- `StatGrid` — Structured data displays
- `StickyFigure` — Scrollytelling-driven visualizations
- `ExecutiveSummary` — Content summaries
- `FullBleedVisual` — Full-width images/videos
- `MethodologyNote` — Transparency boxes

#### Styling
- Use scoped `<style>` blocks within `.astro` components
- Avoid global CSS for component-specific styles
- Tailwind CSS will be integrated later; don't add it yet
- Media queries should follow mobile-first approach

#### Import Assets
- Import images/SVGs directly: `import logo from '../assets/logo.svg'`
- Astro auto-optimizes images; use `.src` property to access URL
- Set `fetchpriority="high"` on hero images

### Layout Conventions
- Layouts wrap page content and provide base HTML structure
- Use `<slot />` to inject page content
- `src/layouts/Layout.astro` is the main base layout
- All pages should use a layout via frontmatter

### File Organization
- Keep related assets near components that use them
- Organize `src/pages/` to mirror URL structure
- Use index files for directory-level routes

## Content Authoring (MDX Future-Ready)

When MDX support is added, authors will compose stories like:

```mdx
<Hero title="Energy Transition 2026" />
<KeyInsight>Storage economics shifted dramatically.</KeyInsight>
<ChartNarrative chart="battery-costs" />
<PullQuote>The market structure fundamentally changed.</PullQuote>
```

**Goal**: Component composition, not frontend engineering.

## Deployment & Building

### Production Build
```bash
yarn build
```

Output goes to `./dist/`. This is a fully static site ready for any CDN.

### Pre-deployment Checklist
- Run `yarn build` to verify no errors
- Test with `yarn preview` locally
- Check TypeScript with `yarn astro check`

## Astro-Specific Notes

### Island Architecture
Astro renders components to static HTML by default. Use the `client:` directive to hydrate interactive components:
- `client:load` — Load immediately
- `client:idle` — Load after page idle
- `client:visible` — Load when element enters viewport

### Frontmatter
Astro components use YAML frontmatter for configuration/imports:
```astro
---
import Component from '../components/Component.astro';
---
```

### Type Checking
- `tsconfig.json` extends `astro/tsconfigs/strict`
- Always run `yarn astro check` before committing to catch type issues

## Future Integrations

These are planned but not yet implemented:
- **Tailwind CSS** for utility-first styling (add when needed)
- **Framer Motion** for smooth animations
- **Scrollama** for scroll-driven narrative experiences
- **Dynamic chart framework** (TBD) for interactive data visualizations
- **MDX support** for flexible markdown authoring

When adding these, use `yarn astro add [integration]` to scaffold properly.

## Common Tasks

### Adding a New Page
1. Create `.astro` file in `src/pages/` (filename becomes URL)
2. Import layout in frontmatter
3. Use layout as wrapper

### Adding a New Component
1. Create `.astro` file in `src/components/`
2. Use `<style>` for scoped CSS
3. Import and use in layouts/pages

### Importing Assets
```astro
---
import hero from '../assets/hero.jpg';
---
<img src={hero.src} alt="description" />
```

## References

- **README.md** — Project philosophy and long-term vision
- **astro.md** — Starter template guide (can be deleted once project evolves)
- **Official Docs**: https://docs.astro.build
- **Type Safety**: `tsconfig.json` uses Astro strict mode

