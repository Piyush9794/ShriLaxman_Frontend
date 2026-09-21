import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Terminal,
  Wrench,
  Users,
  Sparkles,
} from "lucide-react";
import { skillCategories } from "../data/portfolioData";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const tabIcons = {
    all: <Sparkles className="w-3.5 h-3.5" />,
    frontend: <Code2 className="w-3.5 h-3.5" />,
    backend: <Server className="w-3.5 h-3.5" />,
    databases: <Database className="w-3.5 h-3.5" />,
    languages: <Terminal className="w-3.5 h-3.5" />,
    tools: <Wrench className="w-3.5 h-3.5" />,
    soft: <Users className="w-3.5 h-3.5" />,
  };

  const tabs = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "databases", label: "Databases" },
    { id: "languages", label: "Languages" },
    { id: "tools", label: "Tools" },
    { id: "soft", label: "Soft Skills" },
  ];

  const displayedCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-100/60 dark:bg-zinc-950/40 border-y border-slate-200/80 dark:border-white/[0.04]">
      {/* Background animated glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with fade-down */}
        <AnimateOnScroll animation="fade-down" duration={0.6} className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
            Core Competencies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Toolbox
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
            A comprehensive overview of the modern technologies, frameworks, databases, and development workflows I utilize to craft production-grade web solutions.
          </p>
        </AnimateOnScroll>

        {/* Filter Tabs with fade-up */}
        <AnimateOnScroll animation="fade-up" delay={0.15} duration={0.5} className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "text-cyan-900 dark:text-white shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-950 bg-white hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-300/80 dark:border-white/[0.06] dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-cyan-100 border border-cyan-400 dark:bg-gradient-to-r dark:from-cyan-500/30 dark:to-blue-500/30 dark:border-cyan-500/50 rounded-xl -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                {tabIcons[tab.id]}
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </AnimateOnScroll>

        {/* Categories Grid with zoom-in-up on scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, catIdx) => (
              <AnimateOnScroll
                key={category.id}
                animation={catIdx % 3 === 0 ? "fade-right" : catIdx % 3 === 1 ? "zoom-in-up" : "fade-left"}
                delay={catIdx * 0.1}
                duration={0.6}
              >
                <motion.div
                  layout
                  whileHover={{ y: -6 }}
                  className="glow-card p-6 rounded-3xl flex flex-col justify-between h-full transition-shadow hover:shadow-xl cursor-default"
                >
                  <div>
                    {/* Category Title */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.15 }}
                          className="p-2 rounded-xl bg-cyan-50 dark:bg-white/[0.05] border border-cyan-200 dark:border-white/10 text-cyan-600 dark:text-cyan-400 transition-transform"
                        >
                          {tabIcons[category.id] || <Code2 className="w-4 h-4" />}
                        </motion.div>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                          {category.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                        {category.skills.length} skills
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-zinc-400 mb-6">
                      {category.description}
                    </p>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.08, y: -3 }}
                          className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border border-slate-200 dark:border-white/[0.08] hover:border-cyan-400 transition-all cursor-default shadow-xs hover:shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400/70 group-hover:bg-cyan-500 animate-pulse" />
                          <span className="text-xs font-mono font-medium text-slate-800 dark:text-zinc-200 group-hover:text-slate-950 dark:group-hover:text-white">
                            {skill.name}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider ml-1">
                            {skill.level}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimateOnScroll>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
