import { getAllPosts } from "@/lib/md";
import BlogPreviewClient from "./BlogPreviewClient";

export default async function BlogPreview() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 3);

  return <BlogPreviewClient posts={posts} />;
}
