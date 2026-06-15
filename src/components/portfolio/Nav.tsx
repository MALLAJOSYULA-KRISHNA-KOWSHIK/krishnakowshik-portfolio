import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Freelance", href: "#freelance" },
  { label: "Experience", href: "#experience" },
  { label: "Creator", href: "#creator" },
  { label: "Contact", href: "#contact" },
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
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-background/60 backdrop-blur-xl border border-primary/20 rounded-full px-6 shadow-2xl shadow-primary/5"
        initial={prefersReducedMotion ? undefined : { y: -80, opacity: 0, x: "-50%" }}
        animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="flex items-center justify-between h-14 w-full md:w-auto gap-12">
          <a href="#" className="font-sans text-foreground text-xl font-bold tracking-tight">
            Kowshik<span className="text-primary">.</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                transition={{ duration: 0.2 }}
                className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group relative px-1 py-2"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
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
                className="font-sans text-2xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
