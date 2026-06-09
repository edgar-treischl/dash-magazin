# Copilot Instructions for Dash Magazin

## Quick Start

- **Dev environment**: `npm run dev` (starts preview app at http://localhost:3000)
- **Build**: `npm run build` (Next.js build in apps/preview)
- **Lint**: `npm run lint` (ESLint in apps/preview)

## Architecture

This is a **monorepo** (yarn workspaces) for a content publishing platform:

### Core Workspaces
- **apps/preview**: Next.js 16 application for story authoring and review
- **packages/story-runtime**: Reusable React components for story rendering

### Key Principles

1. **Self-Contained Stories**
   - Each story is independent: `stories/{slug}/`
   - Contains: `story.mdx`, `metadata.yaml`, assets, datasets, references
   - Must be portable and versionable without external dependencies
   - Can be moved or published independently

2. **Runtime Isolation**
   - Authors use only approved Story Runtime components: `<Callout />`, `<StoryChart />`, etc.
   - No arbitrary React imports; no application code in stories
   - Guarantees compatibility across preview and production

3. **MDX → Artifact Pipeline**
   - Authors write MDX source
   - CI validates and compiles to `story.json`
   - Production never compiles MDX (uses pre-built artifacts)
   - Published artifacts are immutable

4. **Preview as Truth**
   - Preview app uses same rendering pipeline as production
   - All story review/QA happens in preview before merge
   - Route: `/stories/{slug}`

## Story Structure

```
stories/
└── {slug}/
    ├── story.mdx          # Main content (MDX format)
    ├── metadata.yaml      # Metadata (title, slug, version required)
    ├── assets/            # Images and static files
    ├── datasets/          # Story-specific data
    └── references/        # Sources and citations
```

**Metadata format:**
```yaml
title: Story Title
slug: story-slug
version: 1.0.0
```

## TypeScript & Code Style

- TypeScript strict mode
- Components use React 19 with TypeScript typing
- Story Runtime exports from `packages/story-runtime/src/index.tsx`
- Next.js 16 has breaking changes; see `node_modules/next/dist/docs/` for latest APIs

## Development Notes

- **Monorepo scripts** run from root; individual workspaces have own `package.json`
- **Story Runtime** is built as a library (main entry: `packages/story-runtime/src/index.tsx`)
- **Preview App** uses Next.js App Router (not Pages Router)
- **Linting** via ESLint (Next.js config), run from root with `npm run lint`
- No testing framework currently configured; tests (if added) should validate story compilation and schema compliance

## Publishing Workflow (Editorial)

Author → Preview → PR → Review → Merge → CI Validation → Artifact Generation → Registry Update → Visibility

- Story validation, compilation, and artifact generation happen in CI
- Publishing and visibility are decoupled (admin controls registry)
