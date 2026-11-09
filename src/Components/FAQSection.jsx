import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from "lucide-react";
import { homepageFaqs } from "../data/faqData";
import AnimateOnScroll from "./AnimateOnScroll";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/05 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll
          animation="fade-down"
          duration={0.6}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              Questions
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mt-3">
            Clear answers about my freelance web development services, technologies, project timelines, and collaboration model.
          </p>
        </AnimateOnScroll>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {homepageFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimateOnScroll
                key={index}
                animation="fade-up"
                delay={index * 0.05}
                duration={0.5}
                className="w-full"
              >
                <div
                  className={`glow-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-cyan-500/50 bg-slate-50/90 dark:bg-zinc-900/80 shadow-md"
                      : "border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 text-slate-500 dark:text-zinc-400"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-200/60 dark:border-white/[0.04]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Quick Question CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 dark:text-zinc-400 mb-3">
            Have a question not listed here?
          </p>
          <a
            href="https://wa.me/919794125123?text=Hi%20Piyush,%20I%20have%20a%20question%20regarding%20your%20freelance%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs font-mono transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

