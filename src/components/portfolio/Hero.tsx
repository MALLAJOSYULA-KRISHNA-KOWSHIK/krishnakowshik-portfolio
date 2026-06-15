import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { CursorGradientText } from "@/components/ui/CursorGradientText";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";

const phrases = [
  "Building Full Stack Web Apps",
  "Exploring Generative AI",
  "Teaching 2.5K+ students on YouTube",
  "Turning ideas into shipped products",
];

const tickerItems = "PYTHON • REACTJS • FASTAPI • NEXT.JS • GEN AI • OPENCV • MONGODB • JAVASCRIPT • TYPESCRIPT • GIT • LINUX • SUPABASE";

const socials = [
  { icon: Github, href: "https://github.com/MALLAJOSYULA-KRISHNA-KOWSHIK", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mallajosyula-krishna-kowshik-75a587272", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@koushiktales", label: "YouTube" },
  { icon: ExternalLink, href: "https://hackerrank.com/profile/kkowshik03", label: "HackerRank" },
];

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const current = phrases[phraseIndex];
    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setPhraseIndex((p) => (p + 1) % phrases.length);
    } else {
      timeoutRef.current = setTimeout(
        () => setDisplayed(isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1)),
        isDeleting ? 30 : 60
      );
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, phraseIndex]);

  const motionWrapperProps = prefersReducedMotion
    ? { initial: "visible", animate: "visible" as const }
    : { variants: staggerContainer, initial: "hidden" as const, animate: "visible" as const };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none z-[1]" />
      <ParticleCanvas />

      <motion.div
        {...motionWrapperProps}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 w-full space-y-6"
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-body text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider">
            Available for Hire
          </span>
          <span className="font-body text-xs text-muted-foreground flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            STATUS: OPEN TO OPPORTUNITIES
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="font-body text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
          Hello, I am
        </motion.div>

        <motion.div className="relative inline-flex items-center">
          <motion.div
            className="absolute -inset-x-8 top-24 mx-auto h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.h1
            variants={fadeUp}
            className="font-sans font-extrabold leading-[1.05] tracking-tighter"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            <CursorGradientText>Krishna Kowshik</CursorGradientText>
            <br />
            <CursorGradientText>Mallajosyula</CursorGradientText>
          </motion.h1>
        </motion.div>

        <motion.p variants={fadeUp} className="font-body text-base md:text-lg text-muted-foreground">
          Full Stack Developer & Generative AI Builder
        </motion.p>

        <motion.div variants={fadeUp} className="font-body text-lg sm:text-xl text-foreground h-8 font-medium">
          {displayed}
          <span className="inline-block w-[2px] h-5 ml-1 align-middle bg-primary animate-pulse" />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
          <motion.a
            href="#projects"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="font-body text-sm px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            View Projects
          </motion.a>
          <motion.button
            onClick={() => window.open("https://drive.google.com/file/d/1JPVaNKgMnPYiXDJI-WLfO-Nrigk5_3Vt/view?usp=drive_link", "_blank")}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="font-body text-sm px-6 py-3 border border-primary/20 bg-primary/5 text-foreground font-medium rounded-full hover:bg-primary/10 transition-all cursor-pointer"
          >
            Download Resume
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex gap-4 pt-2">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.2, rotate: [-3, 3, 0] }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-11 h-11 rounded-full border border-primary/20 bg-card/50 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all shadow-sm"
            >
              <s.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative z-10 border-t border-b border-primary/10 py-3 mt-auto overflow-hidden"
      >
        <div className="animate-marquee whitespace-nowrap flex gap-0">
          <span className="font-sans text-xs font-semibold text-muted-foreground tracking-widest uppercase">
            {tickerItems} • {tickerItems} •&nbsp;
          </span>
          <span className="font-sans text-xs font-semibold text-muted-foreground tracking-widest uppercase">
            {tickerItems} • {tickerItems} •&nbsp;
          </span>
        </div>
      </motion.div>
    </section>
  );
};

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const count = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(0,0%,100%,0.3)";
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(0,0%,100%,${0.1 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default Hero;
