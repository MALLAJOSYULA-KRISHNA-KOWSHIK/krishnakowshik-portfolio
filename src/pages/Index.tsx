import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import ContentCreator from "@/components/portfolio/ContentCreator";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => (
  <div className="min-h-screen bg-background dot-grid overflow-hidden">
    <Nav />
    <div className="transform md:-rotate-1 origin-center w-full transition-transform duration-300">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <ContentCreator />
      <Contact />
      <Footer />
    </div>
  </div>
);

export default Index;
