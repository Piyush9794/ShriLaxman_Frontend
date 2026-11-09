import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappUrl =
    "https://wa.me/919794125123?text=Hi%20Piyush,%20I%20am%20visiting%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20freelance%20project.";

  return (
    <motion.aside
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
      aria-label="Contact options"
    >
      {/* Floating Tooltip Pill */}
      <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-zinc-900/90 text-white text-xs font-mono backdrop-blur-md shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with Piyush
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Piyush on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all focus:outline-none"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </motion.aside>
  );
}

