import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { scaleIn, slideLeft, staggerContainer } from "@/lib/motion";

const tabs = ["EXPERIENCE", "EDUCATION", "CERTIFICATIONS"] as const;

type TimelineItem = { title: string; subtitle?: string; detail?: string; active?: boolean };

const experience: TimelineItem[] = [
  { title: "Jr Full Stack Dev Intern", subtitle: "Clientura", detail: "Full stack development internship" },
  { title: "YouTube Content Creator", subtitle: "@koushiktales", detail: "2.5K+ subscribers", active: true },
  { title: "Freelance Developer", detail: "Client project delivery" },
];

const education: TimelineItem[] = [
  { title: "B.Tech CSE (Data Science)", subtitle: "MVGR College of Engineering", detail: "CGPA: 8.91", active: true },
  { title: "Intermediate MPC", subtitle: "Sri Chaitanya Junior College", detail: "90.5%" },
  { title: "Secondary CISCE", subtitle: "St. Paul's High School", detail: "77%" },
];

const certifications: TimelineItem[] = [
  { title: "Intro to GenAI", subtitle: "Google" },
  { title: "Programming in C", subtitle: "CISCO" },
  { title: "Python Essentials 1 & 2", subtitle: "CISCO" },
  { title: "HackerRank 4★ C", subtitle: "HackerRank" },
  { title: "HackerRank 3★ Python", subtitle: "HackerRank" },
  { title: "HackerRank 3★ C++ OOP", subtitle: "HackerRank" },
  { title: "SIH 2025 Internal Selection", subtitle: "Smart India Hackathon" },
  { title: "HackWithVizag 3.0", subtitle: "NSRIT" },
  { title: "Innoyudh 2025 – 16th place", subtitle: "NSRIT" },
  { title: "Vibe Coding 2026", subtitle: "ANITS" },
  { title: "LNIT SUMMIT Hacktriad 2.0", subtitle: "Lendi" },
];

const dataMap: Record<string, TimelineItem[]> = {
  EXPERIENCE: experience,
  EDUCATION: education,
  CERTIFICATIONS: certifications,
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      <motion.span
        variants={scaleIn}
        className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background"
      />
      <div className="absolute left-[5px] top-5 bottom-0 w-[1px] border-l border-dashed border-primary/30 last:hidden" />
      <div className="bg-card border border-primary/10 rounded-sm p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-mono text-sm font-semibold text-foreground">{item.title}</h4>
          {item.active && (
            <motion.span
              animate={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono text-[10px] px-2 py-0.5 bg-green/10 text-green rounded-sm flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              ACTIVE
            </motion.span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
        {item.detail && <p className="text-xs text-primary mt-1 font-mono">{item.detail}</p>}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [tab, setTab] = useState<string>("EXPERIENCE");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader number="06" title="EXPERIENCE" ext="log" />
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-mono text-sm px-4 py-2 rounded transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <motion.div className="relative max-w-2xl pl-6">
        <motion.div
          className="absolute left-2 top-0 h-full w-px bg-primary/30 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {dataMap[tab].map((item, i) => (
              <TimelineCard key={`${tab}-${item.title}`} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Experience;
