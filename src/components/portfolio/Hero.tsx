import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Youtube, ExternalLink, ArrowRight, Download } from "lucide-react";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";

const socials = [
  { icon: Github, href: "https://github.com/MALLAJOSYULA-KRISHNA-KOWSHIK", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mallajosyula-krishna-kowshik-75a587272", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@koushiktales", label: "YouTube" },
  { icon: ExternalLink, href: "https://hackerrank.com/profile/kkowshik03", label: "HackerRank" },
];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const motionWrapperProps = prefersReducedMotion
    ? { initial: "visible", animate: "visible" as const }
    : { variants: staggerContainer, initial: "hidden" as const, animate: "visible" as const };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="orb-1" />
      <div className="orb-2" />

      <motion.div
        {...motionWrapperProps}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full text-center space-y-8"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Open to AI/ML Opportunities
          </div>
        </motion.div>

        <motion.div className="space-y-4">
          <motion.h1
            variants={fadeUp}
            className="font-sans font-extrabold text-foreground tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 1.1 }}
          >
            Architecting Scalable <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-text-gradient text-glow-cyan">
              AI Solutions.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="font-sans text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I am Krishna Kowshik Mallajosyula. I build high-performance machine learning models, optimize computer vision pipelines, and deploy generative AI architectures.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:glow-cyan transition-all duration-300 w-full sm:w-auto"
          >
            View Solutions
            <ArrowRight size={18} />
          </a>
          <button
            onClick={() => window.open("https://drive.google.com/file/d/19U82hj8tD9X7vsd0MBAkdcE_OTgF80Kr/view?usp=sharing", "_blank")}
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-primary/30 bg-background text-primary font-medium hover:glow-cyan-border transition-all duration-300 w-full sm:w-auto"
          >
            Download Resume
            <Download size={18} />
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center gap-6 pt-12">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <s.icon size={24} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-md py-4 mt-auto overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm font-medium text-muted-foreground">
          POWERED BY: PYTHON • OPENCV • YOLOv8 • NLP • MACHINE LEARNING • GEN AI • MLOPS • FASTAPI
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
