import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personalInfo, navigationLinks } from "../data/portfolioData";

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-[#050507] border-t border-slate-200 dark:border-white/[0.06] pt-16 pb-12 overflow-hidden transition-colors duration-300">
      {/* Background ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 dark:bg-cyan-500/05 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-white/[0.06] items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="mb-5 -ml-1">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="/Lax.png"
                alt="Dhanus"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[240px] object-contain brightness-0 dark:brightness-0 dark:invert drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer"
              />
            </div>

            <p className="text-slate-600 dark:text-zinc-400 text-sm max-w-sm leading-relaxed mb-6">
              Front-End Developer & Software Engineer dedicated to crafting intuitive, performant, and responsive web products.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Based in {personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 block mb-4">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navigationLinks.map((link) => (
                <motion.a
                  key={link.name}
                  whileHover={{ x: 4 }}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-slate-600 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-300 transition-colors py-1 font-medium"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ x: 4 }}
                onClick={onOpenResume}
                className="text-left text-slate-600 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-300 transition-colors py-1 cursor-pointer font-medium"
              >
                Resume CV
              </motion.button>
            </div>
          </div>

          {/* Connect Links & Back To Top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 block mb-4 md:text-right">
                Social Channels
              </span>
              <div className="flex items-center gap-2.5">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-white border border-slate-300 dark:border-white/05 transition-colors shadow-sm"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={`tel:${personalInfo.phone}`}
                  whileHover={{ scale: 1.15, y: -3, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-white border border-slate-300 dark:border-white/05 transition-colors shadow-sm"
                  title="Phone"
                >
                  <Phone className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-white border border-slate-300 dark:border-white/05 transition-colors shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-white border border-slate-300 dark:border-white/05 transition-colors shadow-sm"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                </motion.a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white transition-all cursor-pointer shadow-sm group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, Next/Vite, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
