import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";

type Project = {
  title: string;
  category: string;
  stars: number;
  desc: string;
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
};

const projects: Project[] = [
  {
    title: "Medi Mitr",
    category: "FULL STACK",
    stars: 4,
    desc: "Hospital digital Health system.",
    tech: ["ReactJS", "Node.js", "MongoDB","supabase","postgreSQL"],
    gradient: "from-cyan/20 to-green/10",
  },
  {
    title: "ColabX",
    category: "FULL STACK",
    stars: 3,
    desc: "Web collaboration platform.",
    tech: ["ReactJS", "JS", "Vercel","google firebase","google oauth"],
    live: "https://collebx.vercel.app",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    title: "Worker Safety System",
    category: "AI/ML",
    stars: 5,
    desc: "YOLOv8 + OpenCV, ~92.4% accuracy real-time detection.",
    tech: ["Python", "OpenCV", "YOLOv8"],
    gradient: "from-amber/20 to-primary/10",
  },
  {
    title: "ATS Resume Analyzer",
    category: "AI/ML",
    stars: 4,
    desc: "PDF parsing, skill extraction, ATS score.",
    tech: ["Flask", "Python", "ReactJS", "NLP"],
    live: "https://resumerrs.vercel.app",
    gradient: "from-green/20 to-cyan/10",
  },
  {
    title: "Aqua Bites",
    category: "FREELANCE",
    stars: 3,
    desc: "First freelanced e-commerce site.",
    tech: ["HTML", "CSS", "JS"],
    live: "https://aquabites.vercel.app/",
    gradient: "from-cyan/30 to-amber/10",
  },
  {
    title: "EndureUp",
    category: "FREELANCE",
    stars: 3,
    desc: "Client-spec freelance delivery.",
    tech: ["HTML", "CSS", "JS", "ReactJS"],
    live: "https://endureup.vercel.app/",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    title: "Gowrav Food Stall",
    category: "FREELANCE",
    stars: 3,
    desc: "Client-spec freelance delivery.",
    tech: ["HTML", "CSS", "JS", "ReactJS","Typescript","Google firebase"],
    live: "https://gowravfood.vercel.app/",
    gradient: "from-accent/20 to-primary/10",
  },
];

const filters = ["ALL", "FULL STACK", "AI/ML"];
const freelanceProjects = projects.filter((p) => p.category === "FREELANCE");
const projectFilters = projects.filter((p) => p.category !== "FREELANCE");

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const hasLive = Boolean(project.live);

  const openLiveLink = () => {
    if (project.live) {
      window.open(project.live, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={prefersReducedMotion ? undefined : { y: -8, borderColor: "#00F5FF", boxShadow: "0 8px 40px rgba(0,245,255,0.18)" }}
      className={`group bg-card border border-primary/10 rounded-sm overflow-hidden transition-all duration-300 ${hasLive ? "cursor-pointer" : ""}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={hasLive ? openLiveLink : undefined}
      onKeyDown={(event) => {
        if (hasLive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          openLiveLink();
        }
      }}
      role={hasLive ? "button" : undefined}
      tabIndex={hasLive ? 0 : undefined}
    >
      <div className={`h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
        <span className="font-mono text-xs text-muted-foreground/60">{project.title.toUpperCase()}</span>
        <AnimatePresence>
          {hovered && hasLive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/80 flex items-center justify-center"
            >
              <span className="font-mono text-primary text-sm">&gt; VIEW LIVE</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-sm">{project.category}</span>
          <span className="text-amber text-sm">{"★".repeat(project.stars)}{"☆".repeat(5 - project.stars)}</span>
        </div>
        <h3 className="font-mono text-foreground font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.desc}</p>
        <div className="flex flex-wrap gap-1">
          {project.tech.map((t, techIndex) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.2 + techIndex * 0.04 }}
              className="font-mono text-[10px] px-2 py-0.5 bg-muted text-muted-foreground rounded-sm"
            >
              {t}
            </motion.span>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("ALL");
  const prefersReducedMotion = useReducedMotion();
  const filtered = filter === "ALL" ? projectFilters : projectFilters.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader number="05" title="PROJECTS" ext="dir" />
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setFilter(f)}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-full px-4 py-2 text-sm font-mono transition-colors"
          >
            {filter === f && (
              <motion.span
                layoutId="projects-active-pill"
                className="absolute inset-0 rounded-full bg-primary/10"
              />
            )}
            <span className={`relative z-10 ${filter === f ? "text-primary" : "text-muted-foreground"}`}>
              [{f}]
            </span>
          </motion.button>
        ))}
      </div>
      <motion.div
        variants={prefersReducedMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((p, i) => (
          <ProjectCard key={`${p.title}-${filter}`} project={p} index={i} />
        ))}
      </motion.div>

      {freelanceProjects.length > 0 && (
        <div id="freelance" className="mt-16">
          <SectionHeader number="06" title="FREELANCE" ext="dir" />
          <div className="mb-8">
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              My freelance engagements.
            </p>
          </div>
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {freelanceProjects.map((p, i) => (
              <ProjectCard key={`${p.title}-freelance`} project={p} index={i} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;
