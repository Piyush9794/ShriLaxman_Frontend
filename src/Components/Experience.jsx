// import { motion } from "framer-motion";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";


import { Briefcase, Calendar, Building2, CheckCircle2 } from "lucide-react";
import { experienceData } from "../data/portfolioData";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Experience() {

  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const indicatorTop = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with fade-down */}
        <AnimateOnScroll animation="fade-down" duration={0.6} className="flex flex-col items-center md:items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Work Experience
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
            Hands-on track record building production frontend web applications, architecting responsive layouts, and collaborating across development teams.
          </p>
        </AnimateOnScroll>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-300 dark:border-white/10 ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 space-y-12">
          {experienceData.map((exp, idx) => (
            <AnimateOnScroll
              key={exp.id}
              animation={idx % 2 === 0 ? "fade-right" : "fade-up-right"}
              delay={idx * 0.15}
              duration={0.7}
              className="relative group"
            >
              {/* Glowing Node on Timeline Line with continuous pulse */}
              <div className="absolute -left-[32px] sm:-left-[48px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-[#08080a] border-2 border-cyan-500 dark:border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                <span className="absolute -inset-1 rounded-full bg-cyan-400/30 animate-ping" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-300" />
              </div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glow-card p-6 sm:p-8 rounded-3xl relative transition-shadow hover:shadow-xl cursor-default"
              >
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-700 dark:text-cyan-300 font-medium">
                        {exp.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 text-slate-700 dark:text-zinc-300 font-medium text-sm sm:text-base">
                      <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/[0.03] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/05">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities List */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 block">
                    Key Responsibilities & Deliverables
                  </span>
                  {exp.responsibilities.map((item, rIdx) => (
                    <motion.div
                      key={rIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.1 + rIdx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 shrink-0" />
                      <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
                  {exp.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300 hover:border-cyan-400 cursor-default transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
