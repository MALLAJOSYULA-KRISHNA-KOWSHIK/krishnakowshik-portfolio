import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Youtube, ExternalLink, Copy, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const socials = [
  { icon: Github, href: "https://github.com/MALLAJOSYULA-KRISHNA-KOWSHIK", label: "GitHub", shadow: "0 0 18px rgba(255,255,255,0.1)" },
  { icon: Linkedin, href: "https://linkedin.com/in/mallajosyula-krishna-kowshik-75a587272", label: "LinkedIn", shadow: "0 0 18px rgba(10,102,194,0.25)" },
  { icon: Youtube, href: "https://youtube.com/@koushiktales", label: "YouTube", shadow: "0 0 18px rgba(255,0,0,0.25)" },
  { icon: ExternalLink, href: "https://hackerrank.com/profile/kkowshik03", label: "HackerRank", shadow: "0 0 18px rgba(0,245,255,0.2)" },
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

  const heading = "LET'S  BUILD SOMETHING.";

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <SectionHeader number="08" title="CONTACT" ext="sh" />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-6"
      >
        <h2 className="font-mono text-3xl sm:text-5xl font-bold text-foreground inline-flex flex-wrap justify-center gap-0">
          {heading.split("").map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.03, duration: 0.4 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>

        <motion.p
          variants={fadeUp}
          className="font-mono text-muted-foreground"
          transition={{ delay: 0.5 }}
        >
          &gt; Open to internships, freelance projects & collaborations
        </motion.p>

        <motion.button
          onClick={copyEmail}
          variants={scaleIn}
          className="font-mono text-primary text-lg hover:text-glow-cyan inline-flex items-center gap-2 group transition-colors"
          transition={{ delay: 0.7 }}
        >
          kkowshik03@gmail.com
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <Check size={16} className="text-green" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy size={16} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
          variants={staggerContainer}
        >
          {socials.map((s, idx) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="border border-primary/20 flex items-center justify-center text-muted-foreground transition-all rounded-sm p-4"
              style={{ boxShadow: s.shadow }}
              variants={fadeUp}
            >
              <s.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
