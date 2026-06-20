import { posts } from "@/lib/posts";
import BlogPreviewClient from "./BlogPreviewClient";

export default function BlogPreview() {
  return <BlogPreviewClient posts={posts.slice(0, 3)} />;
}
