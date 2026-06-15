import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

const categories: Record<string, { name: string; xp: number }[]> = {
  "Core ML": [
    { name: "Computer Vision", xp: 90 }, { name: "Deep Learning", xp: 85 }, { name: "NLP", xp: 80 },
    { name: "Predictive Modeling", xp: 82 }, { name: "Generative AI", xp: 75 }
  ],
  "Frameworks": [
    { name: "PyTorch", xp: 80 }, { name: "TensorFlow", xp: 75 }, { name: "OpenCV", xp: 88 },
    { name: "YOLOv8", xp: 92 }, { name: "Scikit-Learn", xp: 85 }, { name: "Hugging Face", xp: 78 }
  ],
  "Cloud & MLOps": [
    { name: "Model Deployment", xp: 80 }, { name: "Docker", xp: 75 }, { name: "FastAPI", xp: 85 },
    { name: "Flask", xp: 82 }, { name: "Git", xp: 85 }
  ],
  "Languages": [
    { name: "Python", xp: 95 }, { name: "C++", xp: 75 }, { name: "SQL", xp: 85 },
    { name: "TypeScript", xp: 70 }
  ],
};

const SkillCard = ({ name, xp, delay }: { name: string; xp: number; delay: number }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-4 hover:-translate-y-1 hover:glow-cyan-border transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <span className="font-sans font-medium text-foreground">{name}</span>
        <span className="text-primary font-medium text-sm">{xp}%</span>
      </div>
      <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${xp}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [tab, setTab] = useState("Core ML");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader title="Platform Capabilities" />
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {Object.keys(categories).map((t) => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
          >
            {tab === t && (
              <motion.span
                layoutId="skills-active-pill"
                className="absolute inset-0 rounded-full bg-primary text-primary-foreground shadow-md"
                style={{ zIndex: -1 }}
              />
            )}
            <span className={`relative z-10 ${tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories[tab].map((s, i) => (
            <SkillCard key={`${tab}-${s.name}`} name={s.name} xp={s.xp} delay={i * 0.05} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Skills;
