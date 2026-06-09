# Preview App

This is a Next.js 16 application for authoring, previewing, and reviewing stories before they are published.

## Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

The app will be available at `http://localhost:3000`

## Architecture

### Story Discovery

Stories are automatically discovered from the `../../stories/` directory. Each story must have:

- **`story.mdx`** - MDX content with YAML front matter
- **`metadata.yaml`** - Story metadata (title, slug, version)
- **`assets/`** - Static images and resources (optional)
- **`datasets/`** - Story-specific data files (optional)

### Front Matter Format

The `story.mdx` file must include YAML front matter:

```mdx
---
title: Story Title
slug: story-slug
version: 1.0.0
---

# Your content here
```

### Routes

- **`/`** - Story index (lists all stories)
- **`/stories/[slug]`** - Individual story page

### Story Rendering

Stories use the Story Runtime component library (`@stories/runtime`) for rendering. Available components:

- `<Callout>` - Highlighted callout box
- `<StoryChart>` - Chart component (expandable)
- `<KeyFinding>` - Key finding callout
- More coming soon...

## Adding a New Story

### Manual Method

1. Create a directory in `stories/` with your story slug:
   ```
   stories/my-story/
   ├── story.mdx
   ├── metadata.yaml
   └── assets/
   ```

2. Create `story.mdx` with front matter:
   ```mdx
   ---
   title: My Story
   slug: my-story
   version: 1.0.0
   ---

   # Content here
   ```

3. Create `metadata.yaml`:
   ```yaml
   title: My Story
   slug: my-story
   version: 1.0.0
   ```

### Using Make

From the repo root:

```bash
make new-story
```

Then visit `http://localhost:3000/stories/my-story` after `npm run dev`.

## Building for Distribution

The story artifacts (compiled MDX, metadata, assets) will be generated during CI/CD:

1. MDX is compiled to JavaScript functions
2. Artifacts are packaged as JSON
3. Uploaded to MinIO (later)
4. Registry updated to control visibility

The preview app uses the same rendering pipeline as production consumers, so what you see here is what users will see.

## TypeScript & Dependencies

- React 19 + TypeScript
- Next.js 16 App Router
- Tailwind CSS 4
- MDX support via next-mdx-remote
- ESLint for code quality

## Troubleshooting

**Story not appearing?**
- Check that `metadata.yaml` has all required fields: `title`, `slug`, `version`
- Verify story directory is at `stories/{slug}/`
- Run `npm run dev` again to refresh

**Component not rendering?**
- Only use components from `@stories/runtime`
- Don't import arbitrary React components
- Check browser console for MDX rendering errors

## Story Testing

Before submitting a PR:

1. Preview the story: `npm run dev` → `http://localhost:3000/stories/your-slug`
2. Check mobile view (use browser DevTools)
3. Verify all links and images work
4. Test interactive components
5. Run linter: `npm run lint`
