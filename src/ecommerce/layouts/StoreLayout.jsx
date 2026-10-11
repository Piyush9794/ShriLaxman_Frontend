import React from "react";
import { Outlet } from "react-router-dom";
import StoreNavbar from "./StoreNavbar";
import StoreFooter from "./StoreFooter";

export default function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#08080a] dark:text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-300 antialiased overflow-x-hidden transition-colors duration-300">
      {/* Background patterns */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none -z-10" />

      {/* Dedicated Store Navbar */}
      <StoreNavbar />

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Dedicated Store Footer */}
      <StoreFooter />
    </div>
  );
}
