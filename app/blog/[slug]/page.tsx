import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { ArticleShell } from "@/components/article/ArticleShell";
import { posts, getPost, getAdjacent } from "@/lib/posts";

import Resistance from "@/content/articles/from-resistance-to-ai-driven-dev";
import MidPlatforms from "@/content/articles/building-commercial-mid-platforms";
import AiAssisted from "@/content/articles/ai-assisted-development";
import SoulCraft from "@/content/articles/building-soulcraft-journal";
import Confusion from "@/content/articles/from-confusion-to-direction";

const registry: Record<string, ComponentType> = {
  "from-resistance-to-ai-driven-dev": Resistance,
  "building-commercial-mid-platforms": MidPlatforms,
  "ai-assisted-development": AiAssisted,
  "building-soulcraft-journal": SoulCraft,
  "from-confusion-to-direction": Confusion,
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getPost(slug);
  const Content = registry[slug];
  if (!meta || !Content) return notFound();
  const { prev, next } = getAdjacent(slug);
  return (
    <ArticleShell meta={meta} prev={prev} next={next}>
      <Content />
    </ArticleShell>
  );
}
