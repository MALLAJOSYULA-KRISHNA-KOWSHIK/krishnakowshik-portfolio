import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, slideRight, staggerContainer } from "@/lib/motion";

const categories: Record<string, { name: string; xp: number }[]> = {
  "--frontend": [
    { name: "HTML", xp: 85 }, { name: "CSS", xp: 80 }, { name: "JavaScript", xp: 82 },
    { name: "ReactJS", xp: 78 }, { name: "TypeScript", xp: 55 },
  ],
  "--backend": [
    { name: "Python", xp: 88 }, { name: "Flask", xp: 70 }, { name: "FastAPI", xp: 68 },
    { name: "C++", xp: 72 }, { name: "Gen AI", xp: 60 },
  ],
  "--database": [
    { name: "MariaDB", xp: 70 }, { name: "MongoDB", xp: 55 },{ name: "PostgreSQL", xp: 60 }
  ],
  "--tools": [
    { name: "Git", xp: 80 }, { name: "VS Code", xp: 85 }, { name: "Postman", xp: 75 },
    { name: "Cursor", xp: 70 }, { name: "Power BI", xp: 50 }, { name: "Linux", xp: 68 },
    { name: "Windows", xp: 85 }, { name: "Excel", xp: 65 },{ name: "Lovable", xp: 85 }
  ],
};

const XPBar = ({ name, xp, delay }: { name: string; xp: number; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className="flex items-center gap-4 font-mono text-sm py-2"
    >
      <span className="w-24 text-foreground/80 shrink-0">{name}</span>
      <div className="relative flex-1 h-3 bg-muted rounded-sm overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-sm"
          initial={{ width: 0 }}
          animate={inView ? { width: `${xp}%` } : {}}
          transition={{ duration: 1, ease: "easeOut", delay }}
          viewport={{ once: true }}
        />
        {!prefersReducedMotion && (
          <motion.div
            className="absolute right-0 top-0 h-full w-3 rounded-full bg-white/40 blur-xl"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay }}
          />
        )}
      </div>
      <span className="w-10 text-right text-primary">{xp}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [tab, setTab] = useState("--frontend");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader number="04" title="SKILLS" ext="json" />
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.keys(categories).map((t) => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-full px-4 py-2 text-sm font-mono transition-colors"
          >
            {tab === t && (
              <motion.span
                layoutId="skills-active-pill"
                className="absolute inset-0 rounded-full bg-primary/10"
              />
            )}
            <span className={`relative z-10 ${tab === t ? "text-primary" : "text-muted-foreground"}`}>
              {t}
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="max-w-2xl"
        >
          {categories[tab].map((s, i) => (
            <XPBar key={`${tab}-${s.name}`} name={s.name} xp={s.xp} delay={i * 0.05} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Skills;
