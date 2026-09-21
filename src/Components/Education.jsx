import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { educationData } from "../data/portfolioData";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-white/[0.04]">
      {/* Background radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-10 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with fade-down */}
        <AnimateOnScroll animation="fade-down" duration={0.6} className="flex flex-col items-center md:items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
            Education &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Qualifications
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
            Formal engineering foundations in Information Technology, algorithms, database architectures, and computer science fundamentals.
          </p>
        </AnimateOnScroll>

        {/* Education Card with zoom-in-up */}
        <AnimateOnScroll animation="zoom-in-up" duration={0.7}>
          <motion.div
            whileHover={{ y: -4 }}
            className="glow-card p-6 sm:p-10 rounded-3xl relative overflow-hidden transition-shadow hover:shadow-xl cursor-default"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/[0.06]">
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-300 font-semibold cursor-default"
                  >
                    {educationData.grade}
                  </motion.span>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {educationData.period}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  {educationData.degree}
                </h3>
                <p className="text-lg text-cyan-700 dark:text-cyan-300/90 font-medium mt-1">
                  {educationData.institution}
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 w-fit"
              >
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-mono text-slate-700 dark:text-zinc-300">{educationData.location}</span>
              </motion.div>
            </div>

            <div className="pt-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 block mb-4">
                Academic Highlights & Technical Focus
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {educationData.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/05 flex items-start gap-3 transition-colors cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
