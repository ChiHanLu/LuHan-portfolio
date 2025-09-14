import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="font-sans min-h-screen">
      <Hero />
      <About />
      <Projects />
      {/* Blog list is a server component (fetches FS) */}
      <BlogPreview />
      <Contact />
    </main>
  );
}
