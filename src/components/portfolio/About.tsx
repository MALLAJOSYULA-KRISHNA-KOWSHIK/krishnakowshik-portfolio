import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { scaleIn, slideLeft, staggerContainer } from "@/lib/motion";

const stats = [
  { value: 2500, label: "YouTube Subscribers", suffix: "+", format: "k" as const },
  { value: 8.91, label: "B.Tech CGPA", suffix: "", decimals: 2, format: "number" as const },
  { value: 4, label: "HackerRank C", suffix: "★", format: "number" as const },
  { value: 5, label: "Projects Shipped", suffix: "+", format: "number" as const },
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
      <SectionHeader number="03" title="ABOUT" ext="md" />
      <div className="grid md:grid-cols-5 gap-12">
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="md:col-span-3"
        >
          <p className="text-lg leading-relaxed text-foreground/90">
            <span className="text-primary text-4xl font-mono font-bold float-left mr-3 mt-1 leading-none">A</span>
            spiring Software Developer skilled in Full Stack Development and Generative AI, aiming to leverage AI-driven technologies and modern web frameworks to develop innovative and impactful applications. Currently pursuing B.Tech in CSE (Data Science) at MVGR College of Engineering, Vizianagaram with a CGPA of 8.91.
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
              whileHover={{ y: -4, borderColor: "#00F5FF", boxShadow: "0 0 20px rgba(0,245,255,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border-t-2 border-primary bg-card p-4 rounded-sm"
            >
              <div className="font-mono text-2xl font-bold text-primary">
                <CountUp target={s.value} suffix={s.suffix} decimals={s.decimals} format={s.format} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
