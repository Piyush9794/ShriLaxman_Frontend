import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import { projectsData } from "../data/portfolioData";
import AnimateOnScroll from "./AnimateOnScroll";

function ProjectCard({ project, onSelect, index }) {
  const cardAnimations = ["fade-right", "zoom-in-up", "fade-left"];
  const animationType = cardAnimations[index % cardAnimations.length];

  return (
    <AnimateOnScroll
      animation={animationType}
      delay={index * 0.15}
      duration={0.7}
      className="h-full"
    >
      <motion.div
        layout
        whileHover={{ y: -8, scale: 1.02 }}
        onClick={() => onSelect(project)}
        className="group relative glow-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full cursor-pointer overflow-hidden border border-slate-200/80 dark:border-white/[0.08] transition-shadow duration-300 hover:shadow-2xl"
      >
        {/* Background Gradient Accents */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.colorTheme} opacity-20 dark:opacity-40 group-hover:opacity-60 dark:group-hover:opacity-90 transition-opacity duration-500 pointer-events-none`}
        />

        <div>
          {/* Top meta & Action with 3D layer depth */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-zinc-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <span>{project.category}</span>
            </motion.div>

            <motion.div
              whileHover={{ rotate: 45, scale: 1.15 }}
              className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-zinc-400 group-hover:text-slate-950 dark:group-hover:text-white group-hover:border-cyan-400/40 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10 transition-all"
            >
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.div>
          </div>

          {/* Project Title & Subtitle */}
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
            {project.subtitle}
          </p>

          {/* Mock UI Composition / Visual Graphic */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="my-6 p-4 rounded-2xl bg-slate-900 dark:bg-zinc-950/80 border border-slate-800 dark:border-white/[0.06] flex flex-col gap-2.5 overflow-hidden relative group-hover:border-slate-700 dark:group-hover:border-white/15 transition-colors shadow-inner"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400/80 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-400">
                {project.id}.production.app
              </span>
            </div>

            {/* Abstract Interface Preview */}
            <div className="space-y-2 py-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 dark:text-zinc-400">
                <span>Status: <span className="text-emerald-400">Production Ready</span></span>
                <span>Stack: <span className="text-cyan-300">{project.stack.slice(0, 2).join(" + ")}</span></span>
              </div>
              <div className="w-full bg-white/10 dark:bg-white/[0.03] h-2 rounded-full overflow-hidden">
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 h-full w-2/3 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Description snippet */}
          <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Footer Metrics & Stack */}
        <div>
          <div className="space-y-1.5 mb-6">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300 font-mono"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>{metric}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
            {project.stack.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/[0.06] hover:border-cyan-400 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimateOnScroll>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-100/40 dark:bg-zinc-950/30">
      {/* Ambient animated glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 dark:bg-cyan-500/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with fade-down */}
        <AnimateOnScroll animation="fade-down" duration={0.6} className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
            Featured Web{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Applications
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
            A selection of production-tested and full-stack software applications showcasing reusable frontend architectures, API integration, and database management.
          </p>
        </AnimateOnScroll>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Detailed Project Modal with smooth spring pop-in */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0d0f14] border border-slate-200 dark:border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden text-slate-900 dark:text-zinc-100"
            >
              {/* Close Button */}
              {/* <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button> */}
              {/* Top Right Actions */}
              <div className="absolute top-6 right-6 flex items-center gap-2 z-20">

                {/* Project Link */}
                {selectedProject.link && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      window.open(
                        selectedProject.link,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    title="Visit Live Project"
                    aria-label="Visit Live Project"
                    className="
        p-2.5
        rounded-full
        bg-cyan-500/10
        hover:bg-cyan-500/20
        border border-cyan-500/20
        text-cyan-600
        dark:text-cyan-400
        hover:text-cyan-500
        dark:hover:text-cyan-300
        transition-all
        duration-200
        cursor-pointer
      "
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                )}

                {/* Close Button */}
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  title="Close"
                  aria-label="Close"
                  className="
      p-2.5
      rounded-full
      bg-slate-100
      dark:bg-white/[0.05]
      hover:bg-slate-200
      dark:hover:bg-white/[0.1]
      text-slate-500
      dark:text-zinc-400
      hover:text-slate-900
      dark:hover:text-white
      transition-all
      duration-200
      cursor-pointer
    "
                >
                  <X className="w-5 h-5" />
                </motion.button>

              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 w-fit mb-4">
                <span>{selectedProject.category}</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-cyan-700 dark:text-cyan-300 mb-6">
                {selectedProject.subtitle}
              </p>

              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2">
                  Technical Architecture & Description
                </h4>
                <p className="text-sm text-slate-700 dark:text-zinc-200 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-3">
                  Key Accomplishments
                </h4>
                <div className="space-y-2">
                  {selectedProject.metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-3">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.08 }}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-white border border-slate-200 dark:border-white/10"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-zinc-300 text-xs font-medium cursor-pointer"
                >
                  Close Preview
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
