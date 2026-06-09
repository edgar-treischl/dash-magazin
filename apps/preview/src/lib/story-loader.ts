import path from "path";
import fs from "fs";
import matter from "gray-matter";

export interface StoryMetadata {
  title: string;
  slug: string;
  version: string;
  [key: string]: unknown;
}

export interface Story {
  slug: string;
  metadata: StoryMetadata;
  content: string;
}

function getStoriesDir(): string {
  // When running from apps/preview, process.cwd() is the preview app root
  // From there, go up one level (..) to monorepo root, then into stories/
  const storiesDir = path.join(process.cwd(), "..", "..", "stories");
  return storiesDir;
}

export function getStoryBySlug(slug: string): Story | null {
  try {
    const storiesDir = getStoriesDir();
    const storyPath = path.join(storiesDir, slug, "story.mdx");

    if (!fs.existsSync(storyPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(storyPath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    return {
      slug,
      metadata: frontmatter as StoryMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error loading story ${slug}:`, error);
    return null;
  }
}

export function getAllStories(): Story[] {
  try {
    const storiesDir = getStoriesDir();
    
    if (!fs.existsSync(storiesDir)) {
      return [];
    }

    const storyDirs = fs.readdirSync(storiesDir).filter((file) => {
      const fullPath = path.join(storiesDir, file);
      try {
        return fs.statSync(fullPath).isDirectory();
      } catch {
        return false;
      }
    });

    return storyDirs
      .map((dir) => getStoryBySlug(dir))
      .filter((story): story is Story => story !== null);
  } catch (error) {
    console.error("Error loading stories:", error);
    return [];
  }
}

export function listStorySlugs(): string[] {
  return getAllStories().map((story) => story.slug);
}
