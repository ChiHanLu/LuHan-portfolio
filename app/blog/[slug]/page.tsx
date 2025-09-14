import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXContent } from "@/lib/mdx";
import ReactMarkdown from "@/components/mdx/ReactMarkdownClient";
import styles from "./post.module.css";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const base = path.join(process.cwd(), "content", "blog");
  try {
    const files = await fs.readdir(base);
    return files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map((f) => ({ slug: f.replace(/\.(md|mdx)$/, "") }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const base = path.join(process.cwd(), "content", "blog");
  const filePathMd = path.join(base, `${slug}.md`);
  const filePathMdx = path.join(base, `${slug}.mdx`);
  let raw: string | null = null;
  let sourceExt: ".md" | ".mdx" | null = null;
  // Prefer .md if present (treat .md as pure markdown), otherwise fallback to .mdx
  try {
    raw = await fs.readFile(filePathMd, "utf8");
    sourceExt = ".md";
  } catch {}
  if (!raw) {
    try {
      raw = await fs.readFile(filePathMdx, "utf8");
      sourceExt = ".mdx";
    } catch {}
  }
  if (!raw) return notFound();
  const { data, content } = matter(raw);

  // Respect explicit frontmatter flag first
  const mdOnlyFlag = Boolean(data?.mdOnly);
  // Decide renderer: prefer explicit frontmatter, else based on file extension
  const useMDX = mdOnlyFlag ? false : sourceExt === ".mdx";
  
  return (
    <main className="min-h-screen bg-background">

      <div className="container py-16">

        <article className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              {String(data.title ?? slug)}
            </h1>
            <div className="flex items-center justify-center gap-4 text-primary-400">
              <time className="text-lg font-medium">{String(data.date ?? "")}</time>
            </div>
          </header>
          
          <div className={`${styles.article} max-w-none`}> 
            {useMDX ? ( 
              <MDXContent source={content} />
            ) : (
              <ReactMarkdown content={content} />
            )}
          </div>

        </article>
      </div>
    </main>
  );
}
