import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout, StoryHeader } from "@stories/runtime";

const components = {
  Callout,
  StoryHeader,
};

export default async function StoryRenderer({ content }: { content: string }) {
  return (
    <article className="mx-auto py-12 px-6 max-w-3xl prose prose-lg dark:prose-invert">
      <MDXRemote source={content} components={components} />
    </article>
  );
}
