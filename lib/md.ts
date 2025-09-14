import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
};

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
        .map(async (file) => {
          const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
          const { data } = matter(raw);
          const slug = file.replace(/\.(md|mdx)$/, "");
          return {
            slug,
            title: String(data.title ?? slug),
            date: String(data.date ?? ""),
            excerpt: data.excerpt ? String(data.excerpt) : undefined,
          } satisfies PostMeta;
        })
    );
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return posts;
  } catch {
    return [];
  }
}
