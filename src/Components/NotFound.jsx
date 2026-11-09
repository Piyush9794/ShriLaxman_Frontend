import { Link } from "react-router-dom";
import { Home, MessageSquare } from "lucide-react";
import SEO from "./SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#08080a] dark:text-zinc-100 flex flex-col items-center justify-center px-4 relative overflow-hidden text-center selection:bg-cyan-500/20">
      <SEO
        title="404 - Page Not Found | Piyush Vishwakarma"
        description="The page you are looking for does not exist. Browse freelance web development services, portfolio projects, or contact Piyush Vishwakarma."
        noindex={true}
      />

      <div className="fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none -z-10" />

      <div className="max-w-lg mx-auto p-8 rounded-3xl glow-card border border-slate-200/80 dark:border-white/[0.08] shadow-2xl">
        <span className="font-display font-black text-7xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 block mb-4">
          404
        </span>

        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-600 dark:text-zinc-400 mb-8 leading-relaxed">
          The requested page could not be located. It may have moved or no longer exists. Explore my portfolio services or navigate back to the home page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href="https://wa.me/919794125123"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-900 dark:text-white font-medium text-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
