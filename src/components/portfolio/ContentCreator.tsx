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
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader number="07" title="CONTENT_CREATOR" ext="yml" />
      <motion.div
        ref={ref}
        className="grid md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        <motion.div
          variants={slideLeft}
          className="bg-card border border-primary/10 rounded-sm overflow-hidden"
          whileHover={prefersReducedMotion ? undefined : { y: -5, borderColor: "#FF0000", boxShadow: "0 0 30px rgba(255,0,0,0.12)" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="h-1 bg-[hsl(0,100%,50%)]" />
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Youtube size={28} className="text-[hsl(0,100%,50%)]" />
              <div>
                <h3 className="font-mono text-foreground font-semibold">@koushiktales</h3>
                <p className="font-mono text-xs text-muted-foreground">YouTube Channel</p>
              </div>
            </div>
            <div className="font-mono text-3xl font-bold text-primary">
              <CountUp target={2500} suffix="K+" />
            </div>
            <p className="text-sm text-muted-foreground">Subscribers & growing community</p>
            <a
              href="https://youtube.com/@koushiktales"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-sm px-4 py-2 border border-[hsl(0,100%,50%)]/30 text-[hsl(0,100%,50%)] hover:bg-[hsl(0,100%,50%)]/10 transition-colors rounded-sm"
            >
              Visit Channel →
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={slideRight}
          className="bg-card border border-primary/10 rounded-sm overflow-hidden"
          whileHover={prefersReducedMotion ? undefined : { y: -5, borderColor: "#FFB800", boxShadow: "0 0 30px rgba(255,184,0,0.12)" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="h-1 bg-amber" />
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Users size={28} className="text-amber" />
              <div>
                <h3 className="font-mono text-foreground font-semibold">Community Roles</h3>
                <p className="font-mono text-xs text-muted-foreground">Leadership & Ambassadorship</p>
              </div>
            </div>
            <motion.ul className="space-y-2">
              {roles.map((r, index) => (
                <motion.li
                  key={r}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.07 }}
                  className="font-mono text-sm text-foreground/80 flex items-center gap-2"
                >
                  <span className="text-amber text-xs">▸</span> {r}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContentCreator;
