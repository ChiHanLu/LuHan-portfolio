import { posts } from "@/lib/posts";
import BlogPageClient from "./BlogPageClient";

export const metadata = {
  title: "部落格 — Chi Han Lu",
  description: "技術見解、專案心得與成長紀錄。",
};

export default function BlogPage() {
  return <BlogPageClient posts={posts} />;
}
