import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

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
    title: "Worker Safety System",
    category: "COMPUTER VISION",
    stars: 5,
    desc: "Situation: Lack of real-time PPE monitoring.\nTask: Build a live detection pipeline.\nAction: Engineered custom YOLOv8 model with OpenCV.\nResult: ~92.4% real-time accuracy for safety compliance.",
    tech: ["Python", "OpenCV", "YOLOv8", "Deep Learning"],
    gradient: "from-amber-500/20 to-primary/10",
  },
  {
    title: "ATS Resume Analyzer",
    category: "NLP",
    stars: 4,
    desc: "Situation: Manual resume screening is slow.\nTask: Automate parsing and scoring.\nAction: Implemented NLP entity extraction via Flask.\nResult: Instant surface of top candidates, reducing screening time.",
    tech: ["Python", "Flask", "ReactJS", "NLP"],
    live: "https://resumerrs.vercel.app",
    gradient: "from-green-500/20 to-cyan-500/10",
  },
  {
    title: "Medi Mitr",
    category: "FULL STACK",
    stars: 4,
    desc: "Situation: Fragmented hospital records.\nTask: Centralize digital health data.\nAction: Built scalable backend using Node.js & PostgreSQL.\nResult: Streamlined patient management system.",
    tech: ["ReactJS", "Node.js", "PostgreSQL", "Supabase"],
    gradient: "from-cyan-500/20 to-green-500/10",
  },
  {
    title: "ColabX",
    category: "FULL STACK",
    stars: 3,
    desc: "Situation: Remote teams need real-time syncing.\nTask: Develop a collaboration platform.\nAction: Integrated Firebase for live updates.\nResult: Seamless, real-time multi-user synchronization.",
    tech: ["ReactJS", "Firebase", "OAuth", "Vercel"],
    live: "https://collebx.vercel.app",
    gradient: "from-primary/20 to-blue-500/10",
  },
  {
    title: "Aqua Bites",
    category: "APPLIED AI / DEV",
    stars: 3,
    desc: "Freelanced e-commerce site delivery with complete UI/UX and payment integration.",
    tech: ["HTML", "CSS", "JS"],
    live: "https://aquabites.vercel.app/",
    gradient: "from-cyan-500/30 to-amber-500/10",
  },
  {
    title: "EndureUp",
    category: "APPLIED AI / DEV",
    stars: 3,
    desc: "Client-spec freelance delivery.",
    tech: ["HTML", "CSS", "JS", "ReactJS"],
    live: "https://endureup.vercel.app/",
    gradient: "from-blue-500/20 to-primary/10",
  },
  {
    title: "Gowrav Food Stall",
    category: "APPLIED AI / DEV",
    stars: 3,
    desc: "Client-spec freelance delivery.",
    tech: ["HTML", "CSS", "JS", "ReactJS","Typescript","Google firebase"],
    live: "https://gowravfood.vercel.app/",
    gradient: "from-blue-500/20 to-primary/10",
  },
];

const filters = ["ALL", "COMPUTER VISION", "NLP", "FULL STACK"];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group bg-card border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:glow-cyan-border ${hasLive ? "cursor-pointer" : ""}`}
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
      <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative p-6 text-center`}>
        {hasLive ? (
          <img 
            src={`https://www.google.com/s2/favicons?domain=${project.live}&sz=128`} 
            alt={`${project.title} icon`}
            className="w-20 h-20 object-contain drop-shadow-lg rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <h3 className={`font-sans text-xl font-bold text-foreground/80 tracking-tight drop-shadow-md ${hasLive ? 'hidden' : ''}`}>{project.title}</h3>
        <AnimatePresence>
          {hovered && hasLive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center"
            >
              <span className="font-sans font-medium text-primary flex items-center gap-2">
                Launch App <ArrowRight size={16} />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">{project.category}</span>
        </div>
        <h3 className="font-sans text-xl text-foreground font-bold">{project.title}</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t, techIndex) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 + techIndex * 0.04 }}
              className="font-sans font-medium text-[11px] px-2.5 py-1 bg-muted/50 text-muted-foreground rounded-full border border-white/5"
            >
              {t}
            </motion.span>
          ))}
        </div>
        <div className="flex gap-4 pt-4 border-t border-white/5 mt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={16} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
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
  const filtered = filter === "ALL" ? projects.filter(p => p.category !== "APPLIED AI / DEV") : projects.filter((p) => p.category === filter);
  const appliedProjects = projects.filter(p => p.category === "APPLIED AI / DEV");

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader title="Our Solutions" />
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setFilter(f)}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
          >
            {filter === f && (
              <motion.span
                layoutId="projects-active-pill"
                className="absolute inset-0 rounded-full bg-primary text-primary-foreground shadow-md"
                style={{ zIndex: -1 }}
              />
            )}
            <span className={`relative z-10 ${filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {f}
            </span>
          </motion.button>
        ))}
      </div>
      <motion.div
        variants={prefersReducedMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        {filtered.map((p, i) => (
          <ProjectCard key={`${p.title}-${filter}`} project={p} index={i} />
        ))}
      </motion.div>

      {appliedProjects.length > 0 && (
        <div id="freelance" className="mt-24">
          <SectionHeader title="Applied Deployments" />
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {appliedProjects.map((p, i) => (
              <ProjectCard key={`${p.title}-applied`} project={p} index={i} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;
