# Consuming Dash Magazin Stories

This guide explains how external websites can integrate and consume published stories/reports from the Dash Magazin platform.

## Overview

Dash Magazin publishes editorial stories as:
- **Static HTML packages** — ready to embed or integrate
- **Standalone stories** — complete, self-contained web experiences
- **Reusable components** — narrative primitives for composition
- **Data artifacts** — underlying datasets and visualizations

---

## Consumption Methods

### 1. **Embed as iframe**

The simplest integration method. Host the built story and embed it in your website.

```html
<!-- Your website -->
<iframe 
  src="https://stories.dash-magazin.com/2026/energy-transition/"
  width="100%" 
  height="800"
  frameborder="0"
  title="Energy Transition 2026 Report"
></iframe>
```

**Pros:**
- Complete isolation
- No dependency conflicts
- Works with any website platform

**Cons:**
- Limited styling control
- Extra HTTP requests
- Potential performance overhead

---

### 2. **Link to Standalone Story**

Direct users to the full story hosted on Dash Magazin.

```html
<!-- Your website -->
<div class="report-preview">
  <h3>Energy Transition 2026</h3>
  <p>Storage economics shifted dramatically...</p>
  <a href="https://stories.dash-magazin.com/2026/energy-transition/" 
     class="btn btn-primary">
    Read Full Story
  </a>
</div>
```

**Pros:**
- No integration overhead
- Best visual experience
- Full analytics on Dash Magazin side

**Cons:**
- External navigation
- Less integrated experience

---

### 3. **Import Story Components**

If you're using **Node.js/Astro/React**, import and use story components directly.

#### Prerequisites
- Node.js ≥22.12.0
- Your website uses Astro, React, or compatible framework

#### Installation

```bash
# Install the reports package
npm install @dash-magazin/reports
# or
yarn add @dash-magazin/reports
```

#### Usage in Astro

```astro
---
// src/pages/reports/energy-2026.astro
import EnergyTransition2026 from '@dash-magazin/reports/energy-transition-2026.astro';
---

<Layout title="Energy Transition 2026">
  <EnergyTransition2026 />
</Layout>
```

#### Usage in React

```jsx
// src/pages/EnergyReport.jsx
import { EnergyTransition2026 } from '@dash-magazin/reports';

export default function ReportPage() {
  return <EnergyTransition2026 />;
}
```

**Pros:**
- Full integration with your codebase
- Consistent styling
- No iframe overhead
- Can customize with props

**Cons:**
- Requires Node.js toolchain
- Version management
- Potential dependency conflicts

---

### 4. **Use JSON Data Exports**

Import the underlying data and build your own presentation.

#### API Endpoint

```bash
GET /api/stories/{story-id}/data.json
```

**Response Format**

```json
{
  "metadata": {
    "id": "energy-transition-2026",
    "title": "Energy Transition 2026",
    "authors": ["Analysis Team"],
    "publishDate": "2026-05-28",
    "summary": "How storage economics reshaped the energy transition"
  },
  "sections": [
    {
      "id": "intro",
      "type": "hero",
      "title": "Energy Transition 2026",
      "subtitle": "How storage economics reshaped the energy transition"
    },
    {
      "id": "insight-1",
      "type": "key-insight",
      "content": "Battery storage costs fell 40% year-over-year"
    },
    {
      "id": "chart-battery-costs",
      "type": "chart",
      "data": { /* chart data */ },
      "caption": "Battery cost trajectory"
    }
  ],
  "charts": {
    "battery-costs": { /* chart definition */ },
    "market-share": { /* chart definition */ }
  },
  "pdf": {
    "url": "https://assets.dash-magazin.com/energy-transition-2026.pdf",
    "downloadText": "Download Full Report"
  }
}
```

#### Example: Build Custom View

```javascript
// Fetch and render custom story view
fetch('https://stories.dash-magazin.com/api/energy-transition-2026/data.json')
  .then(res => res.json())
  .then(data => {
    // Render with your own components
    renderStory(data, {
      theme: 'dark',
      language: 'de'
    });
  });
```

**Pros:**
- Maximum flexibility
- Build custom interfaces
- Own the styling completely

**Cons:**
- Requires frontend development
- Need to handle rendering
- Maintain compatibility as stories evolve

---

### 5. **Publish to CDN / Package Registry**

For organizations publishing multiple stories, distribute via:

#### NPM Registry

```json
{
  "name": "@your-org/dash-reports",
  "version": "2026.05.28",
  "description": "Energy & Transition Reports",
  "main": "dist/index.js",
  "exports": {
    "./energy-transition-2026": "./dist/stories/energy-transition-2026.js",
    "./data": "./dist/data/index.js"
  }
}
```

Install in partner sites:
```bash
npm install @your-org/dash-reports
```

#### CDN Distribution

```html
<!-- Include from CDN -->
<script src="https://cdn.dash-magazin.com/stories/energy-transition-2026.min.js"></script>

<div id="story-container"></div>

<script>
  DashStories.render('energy-transition-2026', '#story-container');
</script>
```

---

## Architecture Patterns

### Pattern 1: Hub & Spoke

**Dash Magazin = Hub** (central story platform)
**Partner websites = Spokes** (embed via iframe or links)

```
┌─────────────────────┐
│  Dash Magazin       │
│  (Astro app)        │
│  - Stories hosted   │
│  - Data exported    │
└──────────┬──────────┘
           │
    ┌──────┴──────┬──────────┬────────────┐
    │             │          │            │
  Partner1    Partner2    Partner3    Partner4
  (iframe)    (API)       (component) (link)
```

### Pattern 2: Integrated Components

**Partner website** consumes story components like any other dependency.

```
┌─────────────────────┐
│  Partner Website    │
│  (Astro/React)      │
│                     │
│  import { Report }  │
│  from '@dash-mag'   │
│                     │
│  ├── Hero           │
│  ├── ChartNarrative │
│  └── Conclusion     │
└─────────────────────┘
```

### Pattern 3: Headless Data

**Dash Magazin** publishes structured data via API. **Partner website** builds custom UI.

```
┌─────────────────────┐           ┌─────────────────────┐
│  Dash Magazin       │           │  Partner Website    │
│  (data generation)  │──API─────▶│  (custom rendering) │
│                     │           │                     │
│  - Story metadata   │           │  - Own design       │
│  - Datasets         │           │  - Own components   │
│  - Chart configs    │           │  - Own interaction  │
└─────────────────────┘           └─────────────────────┘
```

---

## Implementation Guide

### Quick Start: Iframe Embed

1. **Build the story on Dash Magazin**
   ```bash
   cd apps/main-website
   yarn build
   ```

2. **Deploy to hosting** (e.g., Vercel, Netlify)
   ```bash
   # Output ready in ./dist/
   ```

3. **Embed in partner site**
   ```html
   <iframe src="https://your-deployed-site.com/story-name/"></iframe>
   ```

### Intermediate: NPM Component

#### Option A: Publish to Public NPM (Recommended for Public Distribution)

1. **Prepare root package** in `packages/reports/package.json`
   ```json
   {
     "name": "@dash-magazin/reports",
     "version": "2026.05.28",
     "description": "Dash Magazin editorial story components",
     "type": "module",
     "main": "./dist/index.js",
     "exports": {
       ".": "./dist/index.js",
       "./energy-transition-2026": "./dist/stories/energy-transition-2026.astro",
       "./energy-transition-2026/data": "./dist/stories/energy-transition-2026.json"
     },
     "files": ["dist"],
     "repository": {
       "type": "git",
       "url": "https://github.com/your-org/dash-magazin.git",
       "directory": "packages/reports"
     },
     "keywords": ["astro", "editorial", "stories", "reports"],
     "author": "Dash Magazin Team",
     "license": "MIT"
   }
   ```

2. **Build before publishing**
   ```bash
   cd packages/reports
   yarn build  # Generates dist/ folder
   ```

3. **Publish to NPM**
   ```bash
   # First time: npm adduser
   cd packages/reports
   npm publish --access public
   ```

4. **Consumer installs**
   ```bash
   yarn add @dash-magazin/reports@^2026.05.28
   ```

5. **Consumer uses**
   ```astro
   import EnergyTransition2026 from '@dash-magazin/reports/energy-transition-2026';
   <EnergyTransition2026 />
   ```

#### Option B: Git Reference (For Development / Private Distribution)

For consumer sites during development or for private distribution:

**Consumer package.json:**
```json
{
  "dependencies": {
    "@dash-magazin/reports": "git+https://github.com/your-org/dash-magazin.git#main",
    "@dash-magazin/reports": "github:your-org/dash-magazin#packages/reports"
  }
}
```

**Or via HTTPS:**
```bash
yarn add @dash-magazin/reports@git+https://github.com/your-org/dash-magazin.git#main
```

**With authentication (for private repos):**
```bash
# Set git credentials first
git config --global credential.helper osxkeychain

# Then add
yarn add @dash-magazin/reports@git+https://github.com/your-org/dash-magazin.git#main
```

**Consumer CI/CD:**
```yaml
# .github/workflows/build.yml
jobs:
  build:
    steps:
      - uses: actions/checkout@v4
      
      # For private repos, set up git credentials
      - name: Configure git credentials
        run: |
          git config --global url."https://${{ secrets.GITHUB_TOKEN }}@github.com/".insteadOf "https://github.com/"
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build
        run: yarn build
```

#### Option C: Monorepo Workspace Reference (For Local Development)

If consumer is also in a monorepo, reference locally:

**Consumer root package.json:**
```json
{
  "workspaces": [
    "apps/*",
    "../dash-magazin/packages/reports"
  ]
}
```

**Consumer site package.json:**
```json
{
  "dependencies": {
    "@dash-magazin/reports": "workspace:*"
  }
}
```

#### Option D: GitHub Packages (Enterprise / Private Distribution)

**Recommended for:**
- Private/internal distribution
- Enterprise teams
- GitHub-centric workflows

### Setup: Dash Magazin Team

**1. Verify package.json scope**

The package name must start with your GitHub org:
```json
{
  "name": "@edgar-treischl/reports",
  "version": "2026.05.28"
}
```

✅ Already configured in `packages/reports/package.json`

**2. Create `.npmrc` in `packages/reports/`**

```
@edgar-treischl:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

✅ Already created

**3. Set up automated publishing (GitHub Actions)**

On each tag push, automatically publish to GitHub Packages:

```bash
# Tag a new version
git tag v2026.05.28
git push origin v2026.05.28
```

This triggers `.github/workflows/publish-reports.yml` which:
- Checks types
- Publishes to GitHub Packages
- Creates a release

✅ Workflow already created

**4. Manual publish (One-time, if needed)**

```bash
# Authenticate (uses GITHUB_TOKEN from environment)
cd packages/reports

# Publish
npm publish
```

---

### Setup: Consumer Websites

**1. Configure `.npmrc` in root**

```bash
# Add this to your consumer repo's .npmrc
cat >> .npmrc << 'EOF'
@edgar-treischl:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
EOF
```

Or manually add to `.npmrc`:
```
@edgar-treischl:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

**2. Authenticate locally (Development)**

Generate a GitHub Personal Access Token:
- Go to https://github.com/settings/tokens/new
- Select scopes: `read:packages`
- Copy token

Export it:
```bash
export NPM_TOKEN="ghp_xxxxxxxxxxxx"
```

**3. Install the package**

```bash
yarn add @edgar-treischl/reports@2026.05.28
```

**4. Use in code**

```astro
---
import { EnergyTransition2026 } from '@edgar-treischl/reports';
---

<Layout>
  <EnergyTransition2026 />
</Layout>
```

---

### Setup: Consumer CI/CD (GitHub Actions)

**In consumer workflow:**

```yaml
# .github/workflows/build.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'
          cache: 'yarn'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@edgar-treischl'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
        env:
          NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build
        run: yarn build
```

**Key:** Use `${{ secrets.GITHUB_TOKEN }}` — it automatically has access to public packages in the same organization.

---

### Troubleshooting: GitHub Packages

**Error: "Not found" when installing**

```
error Error: https://npm.pkg.github.com/@edgar-treischl/reports: Not found
```

**Solutions:**
1. ✅ Check `.npmrc` has correct scope: `@edgar-treischl:registry=...`
2. ✅ Verify `package.json` name matches: `"name": "@edgar-treischl/reports"`
3. ✅ Ensure `NPM_TOKEN` is set (personal token or `GITHUB_TOKEN`)
4. ✅ Check package is actually published: https://github.com/edgar-treischl/dash-magazin/packages

**Error: "Unauthorized" when publishing**

```
npm ERR! 403 Forbidden
```

**Solutions:**
1. ✅ Check `.npmrc` auth token is valid
2. ✅ Verify token has `write:packages` scope
3. ✅ Confirm you're authenticated: `npm whoami`
4. ✅ Use workflow `${{ secrets.GITHUB_TOKEN }}` for CI/CD

**Error: "Not a valid GitHub URL"**

Use `git+https://` or `github:` prefix correctly:

```bash
# ❌ Wrong
yarn add @edgar-treischl/reports@github:dash-magazin#main

# ✅ Right
yarn add @edgar-treischl/reports@2026.05.28
```

---

## Publishing Workflow: Step-by-Step

### For Dash Magazin Maintainers

**When you have a new story version:**

```bash
# 1. Update version in packages/reports/package.json
vim packages/reports/package.json
# Change: "version": "2026.05.28" → "2026.06.15"

# 2. Commit the change
git add packages/reports/package.json
git commit -m "chore: release reports v2026.06.15"

# 3. Tag it
git tag v2026.06.15

# 4. Push
git push origin main
git push origin v2026.06.15
```

**GitHub Actions automatically:**
- ✅ Detects tag
- ✅ Runs type checks
- ✅ Publishes to GitHub Packages
- ✅ Creates GitHub Release

### For Consumer Websites

**When you want the latest story:**

```bash
# Check available versions
npm view @edgar-treischl/reports versions

# Install specific version
yarn add @edgar-treischl/reports@2026.06.15

# Update to latest
yarn upgrade @edgar-treischl/reports

# Lock version
yarn install --frozen-lockfile
```

---

## Version Strategy

Dash Magazin uses **date-based versioning**:

```
YYYY.MM.DD
2026.05.28  ← Today
2026.06.15  ← Next story
2026.12.31  ← End of year
```

This makes it clear when stories were published.

**Semver alternative** (if you prefer):

```json
{
  "version": "1.2.3"
}
```

Then consumers use:
```bash
yarn add @edgar-treischl/reports@^1.2.3
```

### Advanced: API-Driven Integration

1. **Set up API endpoints** in Astro
   ```astro
   // src/pages/api/stories/[id]/data.json.ts
   export async function GET({ params }) {
     const storyData = await fetchStory(params.id);
     return new Response(JSON.stringify(storyData));
   }
   ```

2. **Document schema** for partners
   ```markdown
   # Story Data Schema
   
   GET /api/stories/{id}/data.json
   
   Response includes:
   - metadata: title, authors, publishDate
   - sections: array of story elements
   - charts: chart data and configurations
   - pdf: downloadable report link
   ```

3. **Partners consume via their framework**
   ```javascript
   // Any framework
   const { data } = await fetch('/api/stories/energy-2026/data.json').then(r => r.json());
   renderCustomUI(data);
   ```

---

## Data Formats

### Story Metadata

```json
{
  "id": "energy-transition-2026",
  "title": "Energy Transition 2026",
  "slug": "energy-transition-2026",
  "authors": ["Analysis Team"],
  "publishDate": "2026-05-28",
  "lastUpdated": "2026-05-28T16:54:58Z",
  "summary": "How storage economics reshaped the energy transition",
  "image": "https://cdn.dash-magazin.com/energy-2026-cover.jpg",
  "tags": ["energy", "transition", "storage", "economics"]
}
```

### Story Sections

```json
{
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "title": "Energy Transition 2026",
      "subtitle": "How storage economics reshaped the energy transition"
    },
    {
      "id": "insight-battery-costs",
      "type": "key-insight",
      "title": "Battery costs fell 40% YoY",
      "content": "Storage economics shifted the entire energy transition..."
    },
    {
      "id": "chart-costs",
      "type": "chart",
      "chartId": "battery-costs",
      "caption": "Battery cost trajectory"
    },
    {
      "id": "quote",
      "type": "pull-quote",
      "text": "The market structure fundamentally changed.",
      "attribution": "Analysis Team"
    }
  ]
}
```

### Chart Data

```json
{
  "charts": {
    "battery-costs": {
      "type": "line",
      "title": "Battery Storage Costs",
      "xAxis": { "label": "Year", "type": "date" },
      "yAxis": { "label": "$/kWh", "type": "number" },
      "data": [
        { "year": 2020, "cost": 132 },
        { "year": 2021, "cost": 108 },
        { "year": 2022, "cost": 84 },
        { "year": 2023, "cost": 62 },
        { "year": 2024, "cost": 48 },
        { "year": 2025, "cost": 41 },
        { "year": 2026, "cost": 35 }
      ]
    }
  }
}
```

---

## Best Practices

### For Dash Magazin Team

- **Stable APIs** — Keep data formats backward-compatible
- **Version stories** — Tag releases so partners know when to update
- **Document clearly** — Provide schema, examples, and change logs
- **Monitor usage** — Track which partners consume what
- **Deprecation policy** — Announce breaking changes 6 weeks in advance

### For Partner Sites

- **Pin versions** — Don't auto-update; test before upgrading
- **Handle failures gracefully** — Show fallback if story fails to load
- **Cache appropriately** — Balance freshness vs. performance
- **Credit attribution** — Always link back to Dash Magazin
- **Test embeds** — Verify on different devices/browsers

---

## Performance Considerations

### Iframe Embed
- **Load time**: ~1-2s (separate app, own resources)
- **Bundle size**: Full story + dependencies (~200KB gzipped)
- **Isolation**: Complete, no CSS conflicts

### Component Import
- **Load time**: ~0.5s (bundled with your app)
- **Bundle size**: Shared dependencies, smaller delta (~50KB gzipped)
- **Isolation**: Shared context, must manage CSS carefully

### API + Custom Render
- **Load time**: Data fetch (~100-500ms) + your rendering
- **Bundle size**: Just JSON payload (~10-50KB)
- **Isolation**: Complete control, but most work

---

## Troubleshooting

### Iframe Display Issues
```html
<!-- Allow full features -->
<iframe 
  src="..."
  allow="geolocation; microphone; camera"
  sandbox="allow-same-origin allow-scripts allow-popups"
></iframe>
```

### CORS Issues (When Using API)
```javascript
// Dash Magazin must enable CORS
// Response headers should include:
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
```

### Component Import Errors
```bash
# Verify version compatibility
npm list @dash-magazin/reports

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be >= 22.12.0
```

### Styling Conflicts
```css
/* Use CSS modules or scoped styles */
.story-container { /* isolated styles */ }
```

---

## Examples

### Example 1: News Site + Dash Stories

```html
<!-- news-site.com -->
<article>
  <h1>Energy Crisis Averted</h1>
  <p>New analysis shows...</p>
  
  <!-- Embed related Dash story -->
  <figure>
    <iframe 
      src="https://stories.dash-magazin.com/2026/energy-transition/" 
      width="100%" height="600"></iframe>
    <figcaption>Related: Dash Magazin's full analysis on the energy transition</figcaption>
  </figure>
</article>
```

### Example 2: Research Platform + Dash Data

```javascript
// research-platform.com
async function loadRelatedStory(topic) {
  const response = await fetch(
    `https://api.dash-magazin.com/stories?topic=${topic}`
  );
  const stories = await response.json();
  
  // Display story cards with links
  stories.forEach(story => {
    console.log(`${story.title}: ${story.url}`);
  });
}
```

### Example 3: React App + Components

```jsx
// partner-app.jsx
import { EnergyTransition2026 } from '@dash-magazin/reports';

export default function Dashboard() {
  return (
    <div>
      <h1>Energy Analysis Dashboard</h1>
      <EnergyTransition2026 theme="dark" />
    </div>
  );
}
```

---

## Consumer Website CI/CD

This section explains how consumer websites should structure their CI/CD pipeline when importing Dash Magazin components.

### Build Pipeline Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Consumer Website CI/CD                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Checkout code                                           │
│  2. Install dependencies (including @dash-magazin/reports) │
│  3. Run type checks / linting                               │
│  4. Build website (Astro/Next/etc)                          │
│  5. Test story components integration                       │
│  6. Deploy to hosting                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Consumer package.json Setup

```json
{
  "name": "consumer-website",
  "type": "module",
  "version": "1.0.0",
  "engines": {
    "node": ">=22.12.0"
  },
  "dependencies": {
    "@dash-magazin/reports": "^2026.05.28",
    "astro": "^6.4.1",
    "@astrojs/mdx": "^6.0.1"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest"
  }
}
```

**Key points:**
- Pin the Dash Magazin version (don't use `*` or `latest`)
- Use `^` for patch updates only: `^2026.05.28` allows `2026.05.29` but not `2026.06.00`
- Node version >= 22.12.0 (same as Dash Magazin)

### GitHub Actions Example

```yaml
# .github/workflows/build-and-deploy.yml
name: Build & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: ['22.12.0']
    
    steps:
      # 1. Checkout code
      - uses: actions/checkout@v4
      
      # 2. Setup Node
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'yarn'
      
      # 3. Install dependencies
      - name: Install dependencies
        run: yarn install --frozen-lockfile
        
      # 4. Type check
      - name: Type check
        run: yarn check
        
      # 5. Lint
      - name: Lint code
        run: yarn lint --max-warnings 0
        
      # 6. Test components
      - name: Run tests
        run: yarn test
      
      # 7. Build
      - name: Build website
        run: yarn build
        
      # 8. Upload artifacts
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: ./dist
  
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    
    steps:
      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: build
          path: ./dist
      
      - name: Deploy to Vercel
        run: |
          yarn global add vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### Workflow: Update Dash Stories

When Dash Magazin publishes a new story version:

```bash
# 1. Consumer developer gets notified (changelog/release)
# 2. Update package.json
yarn upgrade @dash-magazin/reports

# 3. Verify compatibility (check for breaking changes)
yarn build

# 4. Test pages that use the story
yarn test

# 5. Commit and push
git add package.json yarn.lock
git commit -m "chore: upgrade Dash Magazin reports to 2026.06.01"
git push

# 6. CI/CD runs, builds, tests, deploys automatically
```

### Pre-Deployment Checklist

```yaml
# verifyDeployment.sh
#!/bin/bash

echo "🔍 Checking Node version..."
node --version | grep -q "22.12" || { echo "❌ Node 22.12+ required"; exit 1; }

echo "📦 Installing dependencies..."
yarn install --frozen-lockfile || { echo "❌ Install failed"; exit 1; }

echo "✅ Type checking..."
yarn check || { echo "❌ Type check failed"; exit 1; }

echo "🧪 Running tests..."
yarn test || { echo "❌ Tests failed"; exit 1; }

echo "🔨 Building..."
yarn build || { echo "❌ Build failed"; exit 1; }

echo "✨ Build verified successfully!"
```

### Handling Breaking Changes

When Dash Magazin releases a breaking change:

**Notification from Dash Magazin:**
```markdown
# Breaking Change: v2026.06.00

### What Changed
- Removed `<ChartNarrative>` prop: `useScrollama` (use `<StickyFigure>` instead)
- Renamed `<KeyInsight>` to `<Insight>`

### Migration Guide
```bash
yarn upgrade @dash-magazin/reports@2026.06.00
```

Update imports:
```diff
- import { KeyInsight } from '@dash-magazin/reports';
+ import { Insight } from '@dash-magazin/reports';
```
```

**Consumer CI/CD Response:**
```yaml
# .github/workflows/dependency-upgrade.yml
name: Dependency Upgrade

on:
  schedule:
    # Check for updates weekly
    - cron: '0 0 * * 1'

jobs:
  upgrade:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'
          cache: 'yarn'
      
      - name: Check for updates
        run: yarn upgrade-interactive --latest @dash-magazin/reports
      
      - name: Run tests
        run: yarn test
      
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'chore: update Dash Magazin reports'
          title: 'chore: update @dash-magazin/reports'
          body: 'Dependency update from automated check'
          branch: 'chore/dash-reports-upgrade'
```

### Environment-Specific Builds

For different deployment targets:

```yaml
# .github/workflows/multi-env-deploy.yml
name: Deploy to Multiple Environments

on:
  push:
    branches: [main, staging, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment:
          - { name: 'development', url: 'dev.consumer-site.com' }
          - { name: 'staging', url: 'staging.consumer-site.com' }
          - { name: 'production', url: 'consumer-site.com' }
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build for ${{ matrix.environment.name }}
        run: yarn build
        env:
          PUBLIC_API_URL: ${{ secrets[format('{0}_API_URL', matrix.environment.name)] }}
          PUBLIC_ANALYTICS_ID: ${{ secrets[format('{0}_ANALYTICS_ID', matrix.environment.name)] }}
      
      - name: Deploy ${{ matrix.environment.name }}
        run: |
          yarn global add vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }} \
            --scope consumer-org
```

### Monorepo Setup (Multiple Consumer Sites)

If you run multiple consumer sites:

```
consumer-org/
├── sites/
│  ├── site-a/          # News portal
│  ├── site-b/          # Research platform
│  └── site-c/          # Data dashboard
├── package.json        # Root (workspaces)
└── .github/workflows/
   └── build-all.yml
```

**Root package.json:**
```json
{
  "name": "consumer-org",
  "private": true,
  "workspaces": [
    "sites/*"
  ]
}
```

**CI/CD for all sites:**
```yaml
# .github/workflows/build-all.yml
name: Build All Sites

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'
          cache: 'yarn'
      
      - name: Install root dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build site-a
        run: yarn workspace site-a build
      
      - name: Build site-b
        run: yarn workspace site-b build
      
      - name: Build site-c
        run: yarn workspace site-c build
```

### Caching Strategy

Optimize CI/CD performance:

```yaml
# .github/workflows/optimized-build.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Cache Node modules
      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-node-
      
      # Cache build output
      - name: Cache Astro build
        uses: actions/cache@v4
        with:
          path: |
            .astro
            dist
          key: ${{ runner.os }}-astro-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-astro-
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'
          cache: 'yarn'
      
      - name: Install
        run: yarn install --frozen-lockfile
      
      - name: Build
        run: yarn build
```

### Testing Story Components

Example test for imported components:

```typescript
// src/components/__tests__/StoryIntegration.test.ts
import { describe, it, expect } from 'vitest';
import { EnergyTransition2026 } from '@dash-magazin/reports';

describe('Dash Magazin Stories Integration', () => {
  it('should import EnergyTransition2026 component', () => {
    expect(EnergyTransition2026).toBeDefined();
  });
  
  it('should render without errors', async () => {
    const html = await EnergyTransition2026.render();
    expect(html).toContain('Energy Transition 2026');
  });
});
```

**Run tests in CI:**
```yaml
- name: Test story components
  run: yarn test --coverage
```

---

## Support & Questions

For questions about consuming Dash Magazin stories:

- **Documentation**: [https://docs.dash-magazin.com](https://docs.dash-magazin.com)
- **API Reference**: [https://api.dash-magazin.com/docs](https://api.dash-magazin.com/docs)
- **GitHub Issues**: [github.com/dash-magazin/dash-magazin](https://github.com/dash-magazin/dash-magazin)
- **Email Support**: support@dash-magazin.com

---

## License

Stories and components published by Dash Magazin are available under the MIT License unless otherwise specified. See LICENSE file for details.
