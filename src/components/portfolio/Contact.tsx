import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Youtube, ExternalLink, Copy, Check, Mail } from "lucide-react";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const socials = [
  { icon: Github, href: "https://github.com/MALLAJOSYULA-KRISHNA-KOWSHIK", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mallajosyula-krishna-kowshik-75a587272", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@koushiktales", label: "YouTube" },
  { icon: ExternalLink, href: "https://hackerrank.com/profile/kkowshik03", label: "HackerRank" },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("kkowshik03@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.15 }}
        className="bg-card border border-white/5 rounded-3xl p-12 md:p-20 relative overflow-hidden group hover:glow-cyan-border transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 space-y-8">
          <motion.div variants={fadeUp}>
            <h2 className="font-sans text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight mb-6">
              Ready to scale your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-text-gradient text-glow-cyan">
                AI initiatives?
              </span>
            </h2>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Open to AI/ML engineering roles, research collaborations, and technical consulting. Let's build the future together.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a
              href="mailto:kkowshik03@gmail.com"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
            >
              <Mail size={20} />
              Contact Me
            </a>
            
            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-foreground font-medium text-lg hover:bg-white/5 transition-all w-full sm:w-auto relative overflow-hidden group"
            >
              kkowshik03@gmail.com
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-green-500"
                  >
                    <Check size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    <Copy size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6 pt-12 border-t border-white/5 mt-12"
            variants={staggerContainer}
          >
            {socials.map((s, idx) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center justify-center h-12 w-12 rounded-full bg-white/5 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                variants={fadeUp}
              >
                <s.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
