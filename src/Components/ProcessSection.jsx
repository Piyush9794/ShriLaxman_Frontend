import { motion } from "framer-motion";
import {
  Compass,
  Palette,
  Code2,
  CheckCircle,
  Rocket,
  Sparkles,
} from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const steps = [
  {
    step: "01",
    title: "Requirement Discovery & Strategy",
    description:
      "We discuss your product vision, target audience, business goals, and technical scope. I formulate a clear project architecture and milestone plan.",
    icon: Compass,
    details: ["Goal Definition", "Tech Stack Selection", "Milestone Roadmap"],
  },
  {
    step: "02",
    title: "Architecture & UI/UX Design",
    description:
      "Designing responsive layouts, wireframing user flows, and planning database schemas and API contracts to ensure future-proof scalability.",
    icon: Palette,
    details: ["Mobile-First UI/UX", "Database Schema Design", "REST API Contracts"],
  },
  {
    step: "03",
    title: "Clean Full-Stack Engineering",
    description:
      "Developing the frontend with React/Next.js and backend with Node.js/Express. Writing modular, type-safe, and self-documenting code.",
    icon: Code2,
    details: ["Component-Driven React", "Secure Node APIs", "State Management"],
  },
  {
    step: "04",
    title: "Testing, SEO & Core Web Vitals",
    description:
      "Conducting cross-device responsive testing, speed optimization (LCP/CLS/INP), canonical setup, Open Graph metadata, and JSON-LD schema.",
    icon: CheckCircle,
    details: ["Core Web Vitals Audit", "On-Page SEO Setup", "Cross-Browser QA"],
  },
  {
    step: "05",
    title: "Live Deployment & Ongoing Support",
    description:
      "Deploying your application to production (Vercel/Cloud), configuring SSL and custom domain, and providing post-launch maintenance.",
    icon: Rocket,
    details: ["Vercel / Cloud CDN", "SSL & Domain Setup", "Post-Launch Warranty"],
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Glow background */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/05 rounded-full blur-3xl pointer-events-none -z-10"
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
            <span>Workflow & Reliability</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight max-w-3xl">
            My Structured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Development Process
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            A transparent, agile workflow ensuring predictability, clean code, punctual delivery, and zero unexpected surprises.
          </p>
        </AnimateOnScroll>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <AnimateOnScroll
                key={s.step}
                animation="fade-up"
                delay={index * 0.1}
                duration={0.6}
                className="h-full"
              >
                <div className="glow-card rounded-3xl p-6 flex flex-col justify-between h-full border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 relative group">
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display font-black text-2xl text-cyan-600/40 dark:text-cyan-400/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {s.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                      {s.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                      {s.description}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] space-y-1.5">
                    {s.details.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                        <span className="w-1 h-1 rounded-full bg-cyan-500" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

