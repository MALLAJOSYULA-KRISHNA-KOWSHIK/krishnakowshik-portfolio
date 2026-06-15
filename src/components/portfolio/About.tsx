import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { scaleIn, slideLeft, staggerContainer } from "@/lib/motion";

const stats = [
  { value: 2500, label: "YouTube Community", suffix: "+", format: "k" as const },
  { value: 8.91, label: "B.Tech CGPA", suffix: "", decimals: 2, format: "number" as const },
  { value: 4, label: "HackerRank Stars", suffix: "★", format: "number" as const },
  { value: 5, label: "AI Models Deployed", suffix: "+", format: "number" as const },
];

const CountUp = ({ target, suffix, decimals = 0, format = "number" }: { target: number; suffix: string; decimals?: number; format?: "number" | "k" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const controls = animate(motionValue, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(latest),
    });

    return () => controls.stop();
  }, [inView, motionValue, target, prefersReducedMotion]);

  const display = format === "k" ? `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K` : decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const About = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader title="Professional Summary" />
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="md:col-span-3"
        >
          <p className="text-lg leading-relaxed text-muted-foreground font-sans">
            AI/ML Engineer with a strong foundation in <span className="font-semibold text-foreground">Computer Vision</span>, <span className="font-semibold text-foreground">NLP</span>, and <span className="font-semibold text-foreground">Generative AI</span>. I specialize in bridging the gap between theoretical machine learning research and scalable production systems. Currently pursuing a B.Tech in Computer Science Engineering(Data science) at MVGRCE, Vizianagaram, I am passionate about architecting intelligent solutions that solve complex real-world problems.
          </p>
        </motion.div>
        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="md:col-span-2 grid grid-cols-2 gap-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-card border border-white/5 p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="font-sans text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-400">
                <CountUp target={s.value} suffix={s.suffix} decimals={s.decimals} format={s.format} />
              </div>
              <div className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
