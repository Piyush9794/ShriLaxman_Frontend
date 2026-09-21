import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2600; // 2.6 seconds premium experience

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#08080a] text-slate-900 dark:text-white overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(10px)",
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
    >
      {/* Background Ambient Glow & Radial Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_65%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.06),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-30 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center z-10 px-6">
        {/* Subtle decorative pulsing halo behind SVG */}
        <motion.div
          className="absolute -inset-8 rounded-full bg-cyan-500/15 dark:bg-cyan-500/10 blur-2xl -z-10"
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hello (apple).svg loader */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <img
            src="/Hello (apple).svg"
            alt="Hello"
            className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] max-w-[85vw] h-auto object-contain brightness-0 dark:brightness-0 dark:invert drop-shadow-[0_0_15px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          />
        </motion.div>

        {/* Subtitle & Loading Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-500 dark:text-zinc-400 uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>Piyush Vishwakarma • Portfolio</span>
            <span className="text-slate-400 dark:text-zinc-600">/</span>
            <span className="text-slate-800 dark:text-zinc-300 font-semibold">{progress}%</span>
          </div>

          {/* Sleek Minimal Progress Bar */}
          <div className="w-48 sm:w-60 h-[2px] bg-slate-200 dark:bg-zinc-800/80 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
