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

const SectionHeader = ({ number, title }: SectionHeaderProps) => (
  <motion.div
    className="flex items-center gap-4 mb-16 select-none w-full"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <span className="font-body text-lg md:text-xl font-bold text-primary opacity-80">{number}.</span>
    <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-foreground tracking-tight capitalize">
      {title.toLowerCase().replace('_', ' ')}
    </h2>
    <motion.div 
      variants={lineVariants} 
      transition={lineTransition} 
      className="h-px bg-gradient-to-r from-primary/40 to-transparent flex-1 ml-4 md:ml-8 origin-left" 
    />
  </motion.div>
);

export default SectionHeader;
