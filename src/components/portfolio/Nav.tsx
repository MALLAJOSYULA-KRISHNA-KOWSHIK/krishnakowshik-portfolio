import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "./about", href: "#about" },
  { label: "./skills", href: "#skills" },
  { label: "./projects", href: "#projects" },
  { label: "./freelance", href: "#freelance" },
  { label: "./contact", href: "#contact" },
];

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] origin-left bg-cyan-400 z-[60]"
        style={{ scaleX }}
      />
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10"
        initial={prefersReducedMotion ? undefined : { y: -80, opacity: 0 }}
        animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <a href="#" className="font-mono text-primary text-lg font-bold">
            kowshik_<span className="animate-blink">|</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity mr-1">&gt;</span>
                {l.label}
              </motion.a>
            ))}
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="text-foreground">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="absolute top-4 right-4 text-foreground">
              <X size={28} />
            </button>
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
                className="font-mono text-2xl text-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary mr-2">&gt;</span>{l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
