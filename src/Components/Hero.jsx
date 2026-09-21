import { motion } from "framer-motion";
import {
  ArrowDown,
  FileDown,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personalInfo } from "../data/portfolioData";

export default function Hero({ onOpenResume }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const techBadges = [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "MERN Stack",
    "Tailwind CSS",
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background animated glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent dark:from-cyan-500/10 dark:via-indigo-500/05 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 dark:bg-blue-600/05 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-400/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Vertical Availability Ticker (Desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden 2xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 text-[10px] font-mono tracking-widest text-slate-500 dark:text-zinc-400 uppercase [writing-mode:vertical-rl] select-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="tracking-[0.25em] text-slate-700 dark:text-zinc-300 font-medium">{personalInfo.availability}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-slate-400 dark:from-zinc-700 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-shadow hover:shadow-md cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-slate-700 dark:text-zinc-300">
                {personalInfo.location} • 1.3+ Yr Experience
              </span>
            </motion.div>
          </motion.div>

          {/* Subheading intro */}
          <motion.p
            variants={itemVariants}
            className="text-cyan-700 dark:text-cyan-400 font-mono text-sm sm:text-base tracking-widest uppercase mb-3 flex items-center gap-2 font-semibold"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block h-[1px] bg-cyan-600/50 dark:bg-cyan-400/50"
            />
            Hi, I'm Piyush Vishwakarma
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block h-[1px] bg-cyan-600/50 dark:bg-cyan-400/50"
            />
          </motion.p>

          {/* Massive Editorial Hero Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 dark:text-white leading-[1.05] sm:leading-[1.05] mb-6"
          >
            Software &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300">
              Front-End
            </span>{" "}
            Developer
          </motion.h1>

          {/* Concise Professional Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-300/90 max-w-3xl font-normal leading-relaxed mb-8"
          >
            Passionate about building responsive, high-performance, and visually captivating web applications. Specialized in <span className="text-slate-900 dark:text-white font-semibold dark:font-medium">React.js</span>, <span className="text-slate-900 dark:text-white font-semibold dark:font-medium">Next.js</span>, <span className="text-slate-900 dark:text-white font-semibold dark:font-medium">TypeScript</span>, and full-stack <span className="text-slate-900 dark:text-white font-semibold dark:font-medium">MERN</span> architectures.
          </motion.p>

          {/* Technology Badges Pills with floating animation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 max-w-2xl"
          >
            {techBadges.map((tech, idx) => (
              <motion.span
                key={tech}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3 + (idx % 3) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.2,
                }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300 hover:border-cyan-500 hover:text-cyan-700 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300 shadow-sm transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons with spring physics */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-12 w-full max-w-md sm:max-w-none"
          >
            {/* Hire Me CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hire Me</span>
            </motion.a>

            {/* View Projects CTA */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-medium text-sm transition-all shadow-sm cursor-pointer"
            >
              <span> Projects</span>
              <ArrowDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </motion.a>

            {/* Download Resume CTA */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenResume}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border border-slate-300 dark:border-white/10 text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white font-medium text-sm transition-all cursor-pointer shadow-sm"
            >
              <FileDown className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>

          {/* Social Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-white/[0.06] w-full max-w-xl"
          >
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mr-2">Connect:</span>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300/80 dark:border-white/05 text-xs text-slate-700 dark:text-zinc-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors shadow-sm"
              title="Send Email"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Email</span>
            </motion.a>

            <motion.a
              href={`tel:${personalInfo.phone}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300/80 dark:border-white/05 text-xs text-slate-700 dark:text-zinc-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors shadow-sm"
              title="Call"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>{personalInfo.phone}</span>
            </motion.a>

            <motion.a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300/80 dark:border-white/05 text-xs text-slate-700 dark:text-zinc-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors shadow-sm"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300/80 dark:border-white/05 text-xs text-slate-700 dark:text-zinc-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors shadow-sm"
              title="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
              <span>GitHub</span>
            </motion.a>
          </motion.div>

          {/* Quick Metrics Grid with hover elevation */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 w-full"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glow-card p-4 rounded-2xl flex flex-col items-center text-center cursor-default"
            >
              <span className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">1.3+ Yr</span>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">Professional Experience</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glow-card p-4 rounded-2xl flex flex-col items-center text-center cursor-default"
            >
              <span className="font-display font-bold text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-300">React & Next</span>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">Frontend Specialization</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glow-card p-4 rounded-2xl flex flex-col items-center text-center cursor-default"
            >
              <span className="font-display font-bold text-2xl sm:text-3xl text-sky-600 dark:text-sky-300">MERN</span>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">Full-Stack Architecture</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glow-card p-4 rounded-2xl flex flex-col items-center text-center cursor-default"
            >
              <span className="font-display font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">100%</span>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-1">Responsive & Clean Code</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
