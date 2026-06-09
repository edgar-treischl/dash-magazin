.PHONY: help install dev build lint clean test publish-artifact validate-story list-stories kill

# Default target
help:
	@echo "📖 Dash Magazin - Story Publishing Platform"
	@echo ""
	@echo "DEVELOPMENT:"
	@echo "  make install          - Install dependencies (yarn workspaces)"
	@echo "  make dev              - Start preview app (http://localhost:3000)"
	@echo "  make kill             - Kill local development server (port 3000)"
	@echo "  make build            - Build preview app for production"
	@echo "  make lint             - Run ESLint on all code"
	@echo ""
	@echo "STORIES:"
	@echo "  make list-stories     - List all available stories"
	@echo "  make new-story        - Create a new story (prompts for slug)"
	@echo "  make validate-story   - Validate story structure and metadata"
	@echo ""
	@echo "PUBLISHING:"
	@echo "  make publish-artifact - Build story artifacts for distribution"
	@echo ""
	@echo "MAINTENANCE:"
	@echo "  make clean            - Clean build artifacts and node_modules"
	@echo "  make test             - Run tests (if configured)"
	@echo "  make info             - Show repository structure and workflow"
	@echo ""

install:
	@echo "📦 Installing dependencies..."
	yarn install

dev:
	@lsof -ti:3000 | xargs kill -9 2>/dev/null || true
	@echo "🚀 Starting preview app..."
	@echo "📍 Open http://localhost:3000 to view stories"
	@cd apps/preview && npm run dev

kill:
	@echo "🛑 Killing development server on port 3000..."
	@lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No process found on port 3000"
	@echo "✅ Server stopped"

build:
	@echo "🔨 Building preview app for production..."
	@cd apps/preview && npm run build
	@echo "✅ Build complete"

lint:
	@echo "🔍 Running linter..."
	@cd apps/preview && npm run lint

clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf node_modules apps/*/node_modules packages/*/node_modules
	rm -rf apps/preview/.next packages/*/dist
	@echo "✅ Cleaned"

test:
	@echo "⚠️  No tests configured yet"
	@echo "Tests should validate:"
	@echo "  - Story schema compliance"
	@echo "  - MDX compilation"
	@echo "  - Component rendering"
	@echo ""
	@echo "Configure testing in apps/preview/package.json"

# Story Management
list-stories:
	@echo "📚 Available Stories:"
	@find stories -maxdepth 2 -name "metadata.yaml" | while read f; do \
		slug=$$(dirname $$f | xargs basename); \
		title=$$(grep '^title:' $$f | cut -d' ' -f2-); \
		version=$$(grep '^version:' $$f | cut -d' ' -f2-); \
		echo "  • $$slug (v$$version): $$title"; \
	done

new-story:
	@echo "📝 Creating new story..."
	@read -p "Enter story slug (e.g., my-story): " slug; \
	read -p "Enter story title: " title; \
	mkdir -p stories/$$slug; \
	echo "---" > stories/$$slug/story.mdx; \
	echo "title: $$title" >> stories/$$slug/story.mdx; \
	echo "slug: $$slug" >> stories/$$slug/story.mdx; \
	echo "version: 1.0.0" >> stories/$$slug/story.mdx; \
	echo "---" >> stories/$$slug/story.mdx; \
	echo "" >> stories/$$slug/story.mdx; \
	echo "# $$title" >> stories/$$slug/story.mdx; \
	echo "" >> stories/$$slug/story.mdx; \
	echo "Add your story content here." >> stories/$$slug/story.mdx; \
	mkdir -p stories/$$slug/assets stories/$$slug/datasets; \
	@echo "✅ Story created at stories/$$slug"; \
	@echo "📍 View at: http://localhost:3000/stories/$$slug (after 'make dev')"

validate-story:
	@echo "✔️  Validating stories..."
	@for file in stories/*/metadata.yaml; do \
		if [ -f "$$file" ]; then \
			slug=$$(dirname $$file | xargs basename); \
			if grep -q "^title:" $$file && grep -q "^slug:" $$file && grep -q "^version:" $$file; then \
				echo "  ✅ $$slug"; \
			else \
				echo "  ❌ $$slug - missing required fields (title, slug, version)"; \
			fi; \
		fi; \
	done

publish-artifact:
	@echo "🚀 Publishing story artifacts..."
	@echo "This step would:"
	@echo "  1. Validate all stories"
	@echo "  2. Compile MDX to artifacts"
	@echo "  3. Generate manifests"
	@echo "  4. Upload to MinIO (configured later)"
	@echo ""
	@echo "Currently not implemented - set up CI/CD in GitHub Actions"

# Repository Structure
info:
	@echo "📁 Repository Structure:"
	@echo ""
	@echo "apps/preview/"
	@echo "  └─ Next.js 16 app for story authoring and preview"
	@echo "     • Load stories from ../../stories/{slug}/"
	@echo "     • Render with MDX and story runtime components"
	@echo "     • Routes: / (list), /stories/{slug} (view)"
	@echo ""
	@echo "packages/story-runtime/"
	@echo "  └─ React component library for story rendering"
	@echo "     • Exports: Callout, StoryChart, KeyFinding, etc."
	@echo "     • Consumed by preview app and distribution"
	@echo ""
	@echo "stories/"
	@echo "  └─ Story content directories (authored here)"
	@echo "     • Each story: {slug}/story.mdx + metadata.yaml"
	@echo "     • Self-contained with assets, datasets, references"
	@echo ""
	@echo "WORKFLOW:"
	@echo "  Author writes/edits stories/ ──→ Preview app loads and renders"
	@echo "                                   ├─ Local development: http://localhost:3000"
	@echo "                                   └─ Pre-merge review in PR"
	@echo "                                       ↓"
	@echo "  Merge to main              ──→ CI validates and builds artifacts"
	@echo "                                   ├─ Run tests"
	@echo "                                   ├─ Compile MDX"
	@echo "                                   ├─ Generate story.json"
	@echo "                                   ├─ Generate manifest.json"
	@echo "                                   └─ Upload to MinIO (later)"
	@echo "                                       ↓"
	@echo "  Registry update            ──→ Admin selects version for visibility"
	@echo "                                   └─ Story visible to consumers"
	@echo ""
	@echo "  Consumers fetch manifests  ──→ Render story artifacts"
	@echo "                                   └─ No MDX compilation needed"
