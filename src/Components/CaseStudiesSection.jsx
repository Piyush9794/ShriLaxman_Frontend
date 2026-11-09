import { motion } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
  TrendingUp,
} from "lucide-react";
import { caseStudiesData } from "../data/caseStudiesData";
import AnimateOnScroll from "./AnimateOnScroll";

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-slate-100/40 dark:bg-zinc-950/30 border-t border-slate-200/80 dark:border-white/[0.04]">
      {/* Background glow */}
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
        className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll
          animation="fade-down"
          duration={0.6}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering Impact</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight max-w-3xl">
            Featured Full-Stack{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Project Case Studies
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Real production systems architected from ground zero: solving real business challenges, scaling APIs, and creating delightful user experiences.
          </p>
        </AnimateOnScroll>

        {/* Case Studies List */}
        <div className="space-y-12">
          {caseStudiesData.map((study, index) => (
            <AnimateOnScroll
              key={study.id}
              animation={index % 2 === 0 ? "fade-right" : "fade-left"}
              duration={0.8}
              className="w-full"
            >
              <div className="glow-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300">
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.06] mb-8">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 block mb-1">
                      {study.client} • {study.role}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                      {study.title}
                    </h3>
                  </div>

                  {study.liveUrl && (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs font-mono font-semibold text-cyan-800 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors"
                    >
                      <span>Live Production URL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* The Challenge */}
                  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/15">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-mono text-xs uppercase tracking-wider mb-3 font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      <span>The Business Challenge</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>The Engineering Solution</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Architecture Highlights & Measurable Outcomes */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                  {/* Architecture */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-4 font-semibold">
                      <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Architecture & Technical Implementation</span>
                    </div>
                    <ul className="space-y-2.5">
                      {study.architecture.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Measurable Results */}
                  <div className="lg:col-span-5 p-6 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/[0.03] border border-cyan-500/20 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 mb-4 font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        <span>Key Deliverables & Impact</span>
                      </div>
                      <ul className="space-y-2.5">
                        {study.results.map((res, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-zinc-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Stack Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mr-2">Technologies:</span>
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
