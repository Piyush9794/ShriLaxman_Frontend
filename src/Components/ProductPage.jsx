import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Package,
  Globe,
} from "lucide-react";
import Ecommerce from "./Ecommerce";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";

export default function ProductPage({ onOpenResume }) {
  const [apiStatus, setApiStatus] = useState("checking");
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    // Check backend API connection
    fetch(`${API_BASE_URL}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApiStatus("online");
        } else {
          setApiStatus("offline");
        }
      })
      .catch(() => setApiStatus("offline"));
  }, [API_BASE_URL]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#08080a] dark:text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-300 antialiased overflow-x-hidden transition-colors duration-300">
      {/* Background Static Grid & Radial Light Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none -z-10" />

      {/* Product Page Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-[#08080a]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Brand & Back Link */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-300/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-300 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-500" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-300 dark:text-zinc-700">|</span>
              <img
                src="/Lax.png"
                alt="Dhanus Store"
                className="h-8 w-auto object-contain brightness-0 dark:invert"
              />
            </div>
          </div>

          {/* Center Title */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Dhanus Flagship E-Commerce Store</span>
          </div>

          {/* Right Controls & Backend Status Indicator */}
          <div className="flex items-center gap-3">
            {/* Backend API Status Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                apiStatus === "online"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : apiStatus === "checking"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    apiStatus === "online"
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    apiStatus === "online"
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  }`}
                />
              </span>
              <span>
                Backend API: {apiStatus === "online" ? "Live" : "Connecting..."}
              </span>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main E-Commerce Content */}
      <main className="min-h-screen">
        <Ecommerce />
      </main>

      {/* Footer */}
      <Footer onOpenResume={onOpenResume} />
    </div>
  );
}
