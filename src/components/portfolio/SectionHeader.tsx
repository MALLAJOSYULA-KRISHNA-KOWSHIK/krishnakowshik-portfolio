import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  ext?: string;
}

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1 },
};

const lineTransition = { duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

const SectionHeader = ({ number, title, ext = "tsx" }: SectionHeaderProps) => (
  <motion.div
    className="flex items-center gap-2 mb-12 font-mono text-sm text-muted-foreground select-none"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.span variants={lineVariants} transition={lineTransition} className="hidden sm:inline origin-left">
      ────
    </motion.span>
    <span>
      [<span className="text-primary">{number}</span>]
    </span>
    <span className="uppercase tracking-wider">{title}.{ext}</span>
    <motion.span variants={lineVariants} transition={lineTransition} className="hidden sm:inline flex-1 overflow-hidden whitespace-nowrap text-muted-foreground/30 origin-left">
      {"─".repeat(60)}
    </motion.span>
  </motion.div>
);

export default SectionHeader;
