import { motion } from "framer-motion";
import {
  Users,
  Cpu,
  Gauge,
  Code,
  DollarSign,
  Globe2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const reasons = [
  {
    icon: Users,
    title: "Direct Engineer Access",
    description:
      "No agency middlemen, project managers, or communication games. You collaborate directly with me, the full-stack engineer architecting and writing your code.",
  },
  {
    icon: Cpu,
    title: "Production MERN & Next.js Expertise",
    description:
      "Proven track record building live SaaS platforms, corporate management portals, and AI integrations with React.js, Next.js, Node.js, and MongoDB.",
  },
  {
    icon: Gauge,
    title: "Core Web Vitals & Technical SEO First",
    description:
      "I don't just build websites that look good—I engineer them to load in milliseconds, ace Google PageSpeed scores, and rank organically on search engines.",
  },
  {
    icon: Code,
    title: "Clean, Scalable & Maintainable Code",
    description:
      "Strict MVC backend patterns, reusable component design systems, and typed clean architecture that any future developer or team can easily expand.",
  },
  {
    icon: DollarSign,
    title: "Milestone Transparency & Fair Pricing",
    description:
      "Clear deliverables, milestone-based payment schedules, and zero hidden fees. You only pay for tangible, reviewed progress.",
  },
  {
    icon: Globe2,
    title: "Lucknow Presence with Global Delivery",
    description:
      "Available for in-person collaboration across Lucknow and India, and fully equipped for seamless remote collaboration with international clients worldwide.",
  },
];

export default function WhyHireMeSection() {
  return (
    <section id="why-hire-me" className="py-24 relative overflow-hidden bg-slate-100/50 dark:bg-zinc-950/40 border-t border-slate-200/80 dark:border-white/[0.04]">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/05 rounded-full blur-3xl pointer-events-none -z-10"
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
            <span>The Value Proposition</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight max-w-3xl">
            Why Hire Me as Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Freelance Developer
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            I bridge the gap between creative visual design and robust software engineering, delivering digital assets that drive tangible business revenue.
          </p>
        </AnimateOnScroll>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r, index) => {
            const Icon = r.icon;
            return (
              <AnimateOnScroll
                key={r.title}
                animation="fade-up"
                delay={index * 0.1}
                duration={0.6}
                className="h-full"
              >
                <div className="glow-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 leading-snug">
                      {r.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] mt-6 flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Guaranteed Quality Standard</span>
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

