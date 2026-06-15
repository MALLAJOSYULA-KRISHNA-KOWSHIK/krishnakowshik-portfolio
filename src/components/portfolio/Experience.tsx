import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type ExperienceItem = {
  title: string;
  org: string;
  time: string;
  desc: string[];
  type: "work" | "edu";
  active?: boolean;
};

const experience: ExperienceItem[] = [
  {
    title: "AI and ML Intern",
    org: "JNTU-Hyderabad (AICTE)",
    time: "2026",
    type: "work",
    desc: [
      "Contributed to the DST-NGP 2025 sponsored project 'UrbanVision' for structural health monitoring of bridges and urban infrastructure.",
      "Executed the design, training, and optimization of machine learning models for infrastructure anomaly detection.",
      "Leveraged drone-based computer vision and geospatial technologies for advanced infrastructure analysis."
    ],
  },
  {
    title: "Jr Full Stack Intern",
    org: "Clientura",
    time: "2024",
    type: "work",
    desc: [
      "Contributed to the development and maintenance of scalable full-stack web applications.",
      "Collaborated with cross-functional teams to implement robust features and optimize performance."
    ],
  },
  {
    title: "B.Tech in Computer Science Engineering",
    org: "M V G R College of Engineering, Vizianagaram",
    time: "2024 — 2028",
    type: "edu",
    active: true,
    desc: [
      "Specializing in Data Science.",
      "CGPA: 8.91(Currently in 3rd year)",
    ],
  },
  {
    title: "Class XII (MPC)",
    org: "Sri Chaitanya Junior College,Srikakulam",
    time: "2022 — 2024",
    type: "edu",
    desc: ["Percentage: 92%"],
  },
  {
    title: "Class X(ICSE)",
    org: "St.Paul's High School,Srikakulam",
    time: "2021 — 2022",
    type: "edu",
    desc: ["Percentage: 80%"],
  },
];

const TimelineItem = ({ item, index }: { item: ExperienceItem; index: number }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.15 }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:flex items-center justify-between md:mb-2">
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <div className="absolute left-[-21px] md:relative md:left-auto md:flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-background z-10 hidden">
            <div className={`h-3 w-3 rounded-full ${item.active ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-sans text-foreground">{item.title}</h3>
            <p className="font-sans font-medium text-primary">{item.org}</p>
          </div>
        </div>
        <div className="font-sans text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full w-fit">
          {item.time}
        </div>
      </div>
      <div className="md:pl-[56px] mt-4 space-y-2 text-muted-foreground text-sm font-sans leading-relaxed">
        {item.desc.map((d, i) => (
          <p key={i} className="flex gap-2">
            <span className="text-primary opacity-50 mt-1">•</span>
            <span>{d}</span>
          </p>
        ))}
      </div>
      {/* Mobile timeline dot */}
      <div className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-background md:hidden bg-muted-foreground" />
    </motion.div>
  );
};

const Experience = () => {
  const workExp = experience.filter(e => e.type === "work");
  const eduExp = experience.filter(e => e.type === "edu");

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-24">
      {workExp.length > 0 && (
        <div>
          <SectionHeader title="Work Experience" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative space-y-12"
          >
            <div className="absolute left-[5px] md:left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-border to-transparent -z-10" />
            {workExp.map((item, index) => (
              <TimelineItem key={`${item.title}-${index}`} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      )}

      {eduExp.length > 0 && (
        <div id="education">
          <SectionHeader title="Education" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative space-y-12"
          >
            <div className="absolute left-[5px] md:left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-border to-transparent -z-10" />
            {eduExp.map((item, index) => (
              <TimelineItem key={`${item.title}-${index}`} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Experience;
