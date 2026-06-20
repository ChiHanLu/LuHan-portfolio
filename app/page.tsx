import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="font-sans">
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Projects />
      <Experience />
      {/* Blog list 為 server component */}
      <BlogPreview />
      <Contact />
    </main>
  );
}
