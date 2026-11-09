import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Layers,
  Server,
  Zap,
  Globe,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import AnimateOnScroll from "./AnimateOnScroll";

const serviceIcons = {
  "freelance-web-development": Globe,
  "mern-stack-development": Layers,
  "react-js-development": Code,
  "node-js-backend-development": Server,
  "next-js-development": Zap,
  "website-development-lucknow": MapPin,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/05 rounded-full blur-3xl pointer-events-none -z-10"
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
            <span>Freelance Development Services</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight max-w-3xl">
            Custom Web Development &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              MERN Stack Solutions
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            From modern responsive business websites to complex full-stack web applications, I deliver scalable, search-engine-ready, and high-performance digital products.
          </p>
        </AnimateOnScroll>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const Icon = serviceIcons[service.slug] || Code;
            return (
              <AnimateOnScroll
                key={service.slug}
                animation="fade-up"
                delay={index * 0.1}
                duration={0.6}
                className="h-full"
              >
                <div className="group relative glow-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-slate-200/80 dark:border-white/[0.08] hover:border-cyan-500/40 dark:hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400">
                        {service.badge}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Tagline / Overview */}
                    <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                      {service.tagline}
                    </p>

                    {/* Key Problem-Solution Point */}
                    {service.clientProblems && service.clientProblems[0] && (
                      <div className="mb-6 p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-white/[0.04] text-xs">
                        <div className="flex items-start gap-2 text-slate-700 dark:text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{service.clientProblems[0].solution}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Link to Dedicated Service Page */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] mt-4">
                    <Link
                      to={`/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 group/link"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <AnimateOnScroll
          animation="zoom-in-up"
          delay={0.2}
          duration={0.7}
          className="mt-16 p-8 sm:p-10 rounded-3xl glow-card border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">
              Have a Custom Web Project in Mind?
            </h4>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Whether you need a complete MERN stack application, a fast React or Next.js frontend, or a custom business website in Lucknow or globally, let&apos;s build it together.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/919794125123?text=Hi%20Piyush,%20I%20am%20interested%20in%20discussing%20a%20freelance%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md"
            >
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all shadow-md"
            >
              <span>Request Free Quote</span>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

