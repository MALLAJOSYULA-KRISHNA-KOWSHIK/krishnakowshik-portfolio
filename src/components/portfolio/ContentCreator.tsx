import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useMotionValue, animate } from "framer-motion";
import { Youtube, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, slideLeft, slideRight, staggerContainer } from "@/lib/motion";

const roles = [
  "Between Breaks Campus Ambassador",
  "Aadhrita 2026 Outreach & PR Lead",
  "GFG Campus Core",
  "HackerRank Campus Core",
  "Innoyudh 2025 External Ambassador",
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
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
  }, [inView, motionValue, prefersReducedMotion, target]);

  return (
    <span ref={ref}>
      {((value / 1000).toFixed(1).replace(/\.0$/, ""))}
      {suffix}
    </span>
  );
};

const ContentCreator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="creator" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader title="Community Leadership" />
      <motion.div
        ref={ref}
        className="grid md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        <motion.div
          variants={slideLeft}
          className="bg-card border border-white/5 rounded-2xl overflow-hidden p-8 hover:-translate-y-1 hover:shadow-xl hover:border-red-500/30 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <Youtube size={28} />
            </div>
            <div>
              <h3 className="font-sans text-xl font-bold text-foreground">@koushiktales</h3>
              <p className="font-sans text-sm text-muted-foreground">Technical Evangelism</p>
            </div>
          </div>
          <div className="font-sans text-5xl font-extrabold text-foreground mb-4">
            <CountUp target={2500} suffix="K+" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Building a community of developers and data enthusiasts, sharing tutorials, code breakdowns, and AI/ML concepts.
          </p>
          <a
            href="https://youtube.com/@koushiktales"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-sans text-sm font-medium px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            Visit Channel
          </a>
        </motion.div>

        <motion.div
          variants={slideRight}
          className="bg-card border border-white/5 rounded-2xl overflow-hidden p-8 hover:-translate-y-1 hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <div>
              <h3 className="font-sans text-xl font-bold text-foreground">Ambassadorships</h3>
              <p className="font-sans text-sm text-muted-foreground">Developer Relations</p>
            </div>
          </div>
          <motion.ul className="space-y-4">
            {roles.map((r, index) => (
              <motion.li
                key={r}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.07 }}
                className="font-sans text-[15px] font-medium text-foreground/80 flex items-center gap-3"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                {r}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContentCreator;
