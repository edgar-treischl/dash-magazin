import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug, listStorySlugs } from "@/lib/story-loader";
import StoryRenderer from "../story-renderer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = listStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  if (!resolvedParams?.slug) {
    return {
      title: "Story Not Found",
    };
  }

  const story = getStoryBySlug(resolvedParams.slug);

  if (!story) {
    return {
      title: "Story Not Found",
    };
  }

  return {
    title: story.metadata.title,
    description: `Version ${story.metadata.version}`,
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const story = getStoryBySlug(resolvedParams.slug);

  if (!story) {
    notFound();
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <nav
        style={{
          borderBottom: "1px solid rgb(229, 231, 235)",
          backgroundColor: "rgb(249, 250, 251)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "1rem 1.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#008DC9",
              textDecoration: "none",
            }}
          >
            ← Back to Stories
          </Link>
        </div>
      </nav>
      <StoryRenderer content={story.content} />
    </div>
  );
}
