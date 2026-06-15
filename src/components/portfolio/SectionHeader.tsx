import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionHeaderProps {
  number?: string;
  title: string;
  ext?: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <motion.div
    className="flex flex-col items-center justify-center gap-2 mb-16 text-center"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-sans capitalize">
      {title.toLowerCase().replace("_", " ")}
    </h2>
    <div className="h-[2px] w-16 bg-primary rounded-full mt-2 glow-cyan" />
  </motion.div>
);

export default SectionHeader;
