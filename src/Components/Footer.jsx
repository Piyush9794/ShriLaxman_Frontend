import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personalInfo, navigationLinks } from "../data/portfolioData";

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (e, href) => {
    e.preventDefault();

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-100 pt-12 pb-8 transition-colors duration-300 sm:pt-16 sm:pb-10 dark:border-white/[0.06] dark:bg-[#050507]">
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
        className="
          pointer-events-none absolute bottom-0 left-1/2
          h-32 w-64 -translate-x-1/2 rounded-full
          bg-cyan-500/10 blur-3xl
          sm:h-48 sm:w-96
          dark:bg-cyan-500/5
        "
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div
          className="
            grid grid-cols-1 gap-8
            border-b border-slate-200 pb-10
            sm:gap-10 sm:pb-12
            md:grid-cols-12
            dark:border-white/[0.06]
          "
        >
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="mb-4 sm:mb-5">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                src="/Lax.png"
                alt="Dhanus"
                className="
                  h-9 w-auto max-w-[170px]
                  object-contain
                  brightness-0
                  drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]
                  transition-all duration-300
                  sm:h-12 sm:max-w-[240px]
                  dark:brightness-0 dark:invert
                  dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]
                "
              />
            </div>

            <p
              className="
                mb-5 max-w-lg
                text-sm leading-relaxed
                text-slate-600
                sm:mb-6
                dark:text-zinc-400
              "
            >
              Front-End Developer & Software Engineer dedicated to crafting
              intuitive, performant, and responsive web products.
            </p>

            <div
              className="
                flex max-w-full items-start gap-2
                text-xs font-mono
                text-slate-600
                dark:text-zinc-400
              "
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />

              <span className="break-words">
                Based in {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <span
              className="
                mb-4 block
                text-xs font-mono uppercase tracking-widest
                text-slate-500
                dark:text-zinc-400
              "
            >
              Navigation
            </span>

            <div
              className="
                grid grid-cols-2 gap-x-6 gap-y-2
                text-sm
                sm:gap-x-8
              "
            >
              {navigationLinks.map((link) => (
                <motion.a
                  key={link.name}
                  whileHover={{ x: 4 }}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="
                    min-w-0 py-1
                    font-medium
                    text-slate-600
                    transition-colors
                    hover:text-cyan-600
                    dark:text-zinc-400
                    dark:hover:text-cyan-300
                  "
                >
                  <span className="break-words">{link.name}</span>
                </motion.a>
              ))}

              <motion.button
                whileHover={{ x: 4 }}
                onClick={onOpenResume}
                className="
                  cursor-pointer py-1 text-left
                  font-medium
                  text-slate-600
                  transition-colors
                  hover:text-cyan-600
                  dark:text-zinc-400
                  dark:hover:text-cyan-300
                "
              >
                Resume CV
              </motion.button>
            </div>
          </div>

          {/* Social + Back To Top */}
          <div
            className="
              flex flex-col
              md:col-span-3
              md:items-end
            "
          >
            <div className="w-full">
              <span
                className="
                  mb-4 block
                  text-xs font-mono uppercase tracking-widest
                  text-slate-500
                  dark:text-zinc-400
                  md:text-right
                "
              >
                Social Channels
              </span>

              <div
                className="
                  flex flex-wrap items-center gap-2.5
                  md:justify-end
                "
              >
                {/* Email */}
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    rounded-xl border border-slate-300
                    bg-white p-2.5
                    text-slate-600 shadow-sm
                    transition-colors
                    hover:bg-slate-200 hover:text-slate-950
                    dark:border-white/5
                    dark:bg-white/[0.04]
                    dark:text-zinc-400
                    dark:hover:bg-white/[0.08]
                    dark:hover:text-white
                  "
                  title="Email"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </motion.a>

                {/* Phone */}
                <motion.a
                  href={`tel:${personalInfo.phone}`}
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    rotate: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    rounded-xl border border-slate-300
                    bg-white p-2.5
                    text-slate-600 shadow-sm
                    transition-colors
                    hover:bg-slate-200 hover:text-slate-950
                    dark:border-white/5
                    dark:bg-white/[0.04]
                    dark:text-zinc-400
                    dark:hover:bg-white/[0.08]
                    dark:hover:text-white
                  "
                  title="Phone"
                  aria-label="Phone"
                >
                  <Phone className="h-4 w-4" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    rounded-xl border border-slate-300
                    bg-white p-2.5
                    text-slate-600 shadow-sm
                    transition-colors
                    hover:bg-slate-200 hover:text-slate-950
                    dark:border-white/5
                    dark:bg-white/[0.04]
                    dark:text-zinc-400
                    dark:hover:bg-white/[0.08]
                    dark:hover:text-white
                  "
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    rotate: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    rounded-xl border border-slate-300
                    bg-white p-2.5
                    text-slate-600 shadow-sm
                    transition-colors
                    hover:bg-slate-200 hover:text-slate-950
                    dark:border-white/5
                    dark:bg-white/[0.04]
                    dark:text-zinc-400
                    dark:hover:bg-white/[0.08]
                    dark:hover:text-white
                  "
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4 text-slate-700 dark:text-zinc-300" />
                </motion.a>
              </div>
            </div>

            {/* Back To Top */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="
                group mt-6
                flex w-full items-center justify-center gap-2
                rounded-xl border border-slate-300
                bg-white px-4 py-2.5
                text-xs font-mono
                text-slate-700 shadow-sm
                transition-all
                hover:bg-slate-200 hover:text-slate-950
                sm:w-auto
                md:ml-auto
                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-zinc-300
                dark:hover:bg-white/[0.08]
                dark:hover:text-white
              "
            >
              <span>Back to Top</span>

              <ArrowUp
                className="
                  h-3.5 w-3.5
                  text-cyan-600
                  transition-transform
                  group-hover:-translate-y-1
                  dark:text-cyan-400
                "
              />
            </motion.button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          className="
            flex flex-col items-center justify-between
            gap-3 pt-6
            text-center text-[11px] font-mono
            text-slate-500
            sm:flex-row sm:gap-4
            sm:pt-8 sm:text-left
            dark:text-zinc-400
          "
        >
          <p className="max-w-full break-words">
            © {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>

          <p className="max-w-full break-words">
            Built with React, Next/Vite, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
