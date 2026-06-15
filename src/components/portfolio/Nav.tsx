import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#skills" },
  { label: "Solutions", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
];

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] origin-left bg-gradient-to-r from-primary to-secondary z-[60] shadow-[0_0_10px_rgba(0,245,255,0.8)]"
        style={{ scaleX }}
      />
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20"
        initial={prefersReducedMotion ? undefined : { y: -80, opacity: 0 }}
        animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="font-sans text-foreground text-xl font-bold tracking-tight flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            KRISHNA KOWSHIK
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/30 rounded-full hover:glow-cyan-border transition-all">
              Get in touch
            </a>
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
                className="font-sans text-2xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="mt-4 px-8 py-3 text-lg font-medium bg-primary text-primary-foreground rounded-full"
            >
              Get in touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
