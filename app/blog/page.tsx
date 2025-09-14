import { getAllPosts } from "@/lib/md";
import BlogPageClient from "./BlogPageClient";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return <BlogPageClient posts={posts} />;
}
