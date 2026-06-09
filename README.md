“The story defines the interface, not the other way around.”

# Dash Magazin

## Purpose and Architecture

Create a dedicated repository for publishing data-driven stories and analytical articles derived from research reports, dashboards, datasets, and business analyses.

The repository is the editorial source of truth and is completely independent from the corporate website.

Stories should be:

- Written and maintained by analysts, researchers, and content authors.
- Self-contained and portable.
- Versioned and reproducible.
- Previewable before publication.
- Published as immutable content artifacts.
- Consumed by one or more external applications (e.g. a Next.js corporate website).
- Rendered without runtime MDX compilation in production.


## Core Principles

### Self-Contained Stories

Each story is an independent content package containing:

- Content (MDX source)
- Metadata
- Images
- Datasets
- Chart configurations
- References
- Story-specific assets

Example:

```text
stories/
└── energy-transition-2026/
    ├── story.mdx
    ├── metadata.yaml
    ├── assets/
    ├── datasets/
    └── references/
```

A story should be movable, versionable, and publishable without depending on files outside its own directory.

---

### Shared Runtime

Authors may only use approved components provided by a shared Story Runtime library.

Examples:

```mdx
<StoryChart />
<Callout />
<KeyFinding />
<InsightBox />
```

Authors should not import arbitrary React components or application code.

This guarantees compatibility across previews and production environments.

---

### Author Preview Experience

The repository includes a Next.js Preview Application.

Purpose:

- Local story development
- Story review
- Editorial QA
- Stakeholder approval

Example:

```text
apps/
└── preview/
```

Authors should be able to:

```bash
npm run dev
```

and preview stories at:

```text
/storys/[slug]
```

The preview application uses the same rendering pipeline as production.

---

## Publishing Model

Stories are authored as MDX but are NOT served as MDX in production.

Publishing performs:

```text
MDX Source
    ↓
Validation
    ↓
Compilation
    ↓
Artifact Generation
    ↓
Upload to MinIO (LATER)
```

The production website never compiles MDX.

---

## Published Artifact Structure

Publishing generates immutable artifacts:

```text
stories/
└── energy-transition-2026/
    └── 1.0.0/
        ├── manifest.json
        ├── story.json
        ├── metadata.json
        ├── assets/
        └── datasets/
```

Where:

- `story.json` = compiled story representation
- `manifest.json` = entrypoint and metadata
- `assets/` = images and static assets
- `datasets/` = story datasets

No source MDX is required by consumers.

---

## MinIO as Content Artifact Store (LATER)

MinIO acts as the publishing target. (LATER)

Purpose:

- Store published story artifacts
- Store versioned assets
- Store published metadata
- Serve content to consuming applications

MinIO is NOT a source repository.

Git remains the source of truth.

---

## Story Registry

Published stories are exposed through a registry.

Example:

```json
[
  {
    "slug": "energy-transition-2026",
    "version": "1.0.0",
    "status": "published"
  }
]
```

The registry controls visibility.

Publishing a story and making it publicly visible are separate actions.

---

## Consumer Architecture

External applications (e.g. corporate websites) consume stories through:

```text
Registry
    ↓
Manifest
    ↓
Story Artifact
    ↓
Render
```

The consuming application:

- Does not own content.
- Does not store story source files.
- Does not compile MDX.
- Only renders published artifacts.

---

## Editorial Workflow

### Author

```text
Create Story
    ↓
Preview Locally
    ↓
Submit Pull Request
```

### Reviewer

```text
Review Content
    ↓
Approve
    ↓
Merge
```

### CI/CD

```text
Validate Schema
    ↓
Validate Assets
    ↓
Compile Story
    ↓
Generate Artifact
    ↓
Upload to MinIO
```

### Administrator

```text
Select Published Version
    ↓
Update Registry
    ↓
Story Becomes Visible
```

No website deployment is required to publish new content.

---

## Technology Stack

### Authoring

- TypeScript
- MDX
- Zod
- Node.js

### Preview

- Next.js
- Story Runtime Components

### Publishing

- GitHub Actions
- MinIO SDK (LATER)
- Artifact Builder

### Storage

- MinIO (LATER)

### Consumption

- Next.js Corporate Website
- Registry-Based Content Discovery

---

## Success Criteria

The repository should function as a standalone publishing platform where:

- Authors can create and preview stories.
- Stories remain fully self-contained.
- Publishing produces immutable artifacts.
- MinIO stores published versions (LATER)
- Production systems never compile MDX.
- Websites consume only published artifacts.
- Story visibility is controlled through a registry.
- New stories can be published without deploying the corporate website.