import { motion } from "framer-motion";
import {
  Layers,
  Zap,
  Sparkles,
  Cpu,
  Workflow,
} from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import AnimateOnScroll from "./AnimateOnScroll";

export default function About() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      title: "Component-Driven Architecture",
      description:
        "Building reusable, modular, and scalable UI components with React.js, Next.js, and TypeScript.",
    },
    {
      icon: <Workflow className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      title: "API Integration & State Flow",
      description:
        "Seamless REST API connectivity with Axios, async handling, and predictable state with React Context API.",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      title: "Performance & Responsive UI",
      description:
        "Pixel-perfect responsive design across 320px–4K displays with Tailwind CSS, smooth transitions, and speed optimization.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: "MERN Stack Foundations",
      description:
        "End-to-end full-stack development experience utilizing MongoDB, Express.js, React.js, and Node.js with MVC patterns.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with fade-down */}
        <AnimateOnScroll animation="fade-down" duration={0.7} className="flex flex-col items-center md:items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About The Developer</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
            Crafting Scalable, Intuitive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Web Experiences
            </span>
          </h2>
        </AnimateOnScroll>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Card with fade-right */}
          <AnimateOnScroll animation="fade-right" duration={0.8} className="lg:col-span-7">
            <motion.div
              whileHover={{ y: -4 }}
              className="glow-card p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2 block">
                  Professional Overview
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-6 leading-snug">
                  Front-End & Software Developer with 1.3+ years of hands-on production experience.
                </h3>

                <p className="text-slate-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  {personalInfo.summary}
                </p>

                <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                  Based in <span className="text-slate-900 dark:text-zinc-200 font-semibold dark:font-medium">{personalInfo.location}</span>, I specialize in translating complex project specifications into clean, performant, and maintainable codebase architectures. From scalable startup applications to comprehensive management portals, I bring an eye for design detail and engineering precision.
                </p>
              </div>

              {/* Quick Badges in Card with hover animations */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200 dark:border-white/10">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/05 cursor-default transition-colors"
                >
                  <span className="block text-xs font-mono text-slate-500 dark:text-zinc-400">Experience</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">1.3+ Years</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/05 cursor-default transition-colors"
                >
                  <span className="block text-xs font-mono text-slate-500 dark:text-zinc-400">Location</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Lucknow, India</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/05 cursor-default transition-colors"
                >
                  <span className="block text-xs font-mono text-slate-500 dark:text-zinc-400">Status</span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Available</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimateOnScroll>

          {/* Right Column: Key Pillars & Code Showcase with fade-left */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {pillars.map((pillar, idx) => (
              <AnimateOnScroll
                key={pillar.title}
                animation="fade-left"
                delay={idx * 0.1}
                duration={0.6}
              >
                <motion.div
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="glow-card p-5 rounded-2xl flex items-start gap-4 group cursor-default transition-all"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 transition-transform"
                  >
                    {pillar.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-display font-semibold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              </AnimateOnScroll>
            ))}

            {/* Terminal snippet aesthetic with zoom-in */}
            <AnimateOnScroll animation="zoom-in-up" delay={0.4} duration={0.6}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-2xl bg-slate-900 dark:bg-zinc-950 border border-slate-800 dark:border-white/10 font-mono text-xs text-slate-200 dark:text-zinc-300 shadow-md"
              >
                <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-800 dark:border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 ml-2">piyush-profile.config.ts</span>
                </div>
                <div className="space-y-1 text-slate-300 dark:text-zinc-400">
                  <p><span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> = &#123;</p>
                  <p className="pl-4">name: <span className="text-emerald-300">"{personalInfo.name}"</span>,</p>
                  <p className="pl-4">coreTech: [<span className="text-emerald-300">"React.js"</span>, <span className="text-emerald-300">"Next.js"</span>, <span className="text-emerald-300">"TypeScript"</span>],</p>
                  <p className="pl-4">readyForHire: <span className="text-sky-400">true</span></p>
                  <p>&#125;;</p>
                </div>
              </motion.div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
