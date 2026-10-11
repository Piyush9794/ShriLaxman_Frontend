import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Shield, Heart, Store, Package } from "lucide-react";
import { EcommerceProvider, useEcommerce } from "./context/EcommerceContext";
import EcommerceNavbar from "./components/EcommerceNavbar";
import UserAuthModal from "./components/UserAuthModal";
import Storefront from "./components/Storefront";
import CustomerDashboard from "./components/CustomerDashboard";
import SellerPortal from "./components/SellerPortal";
import AdminPanel from "./components/AdminPanel";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ProductDetailModal from "./components/ProductDetailModal";

function EcommerceContent() {
  const { activeTab, setActiveTab } = useEcommerce();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#08080a] dark:text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-300 antialiased overflow-x-hidden transition-colors duration-300">
      {/* Background Grids & Radial Lights */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none -z-10" />

      {/* ── Brand New Dedicated E-Commerce Navbar ── */}
      <EcommerceNavbar />

      {/* ── Main Dynamic Role View: Store, Dashboard, Seller, Admin ── */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "store" && (
            <motion.div
              key="store"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Storefront />
            </motion.div>
          )}

          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CustomerDashboard />
            </motion.div>
          )}

          {activeTab === "seller" && (
            <motion.div
              key="seller"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SellerPortal />
            </motion.div>
          )}

          {activeTab === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdminPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Global E-Commerce Modals ── */}
      <UserAuthModal />
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />

      {/* ── Dedicated E-Commerce Footer ── */}
      <footer className="mt-16 border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#06070a]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/Lax.png"
              alt="Dhanus Store"
              className="h-8 w-auto brightness-0 dark:invert"
            />
            <div>
              <div className="font-display font-extrabold text-sm text-slate-900 dark:text-white">
                DHANUS ENTERPRISE STORE
              </div>
              <div className="text-[11px] text-slate-400">
                Multi-Seller Marketplace Platform • Powered by Dhanus Architecture
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("store")}
              className="hover:text-cyan-500 cursor-pointer"
            >
              Storefront
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="hover:text-cyan-500 cursor-pointer"
            >
              Customer Orders
            </button>
            <button
              onClick={() => setActiveTab("seller")}
              className="hover:text-cyan-500 cursor-pointer"
            >
              Seller Hub
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className="hover:text-rose-500 cursor-pointer"
            >
              Admin Portal
            </button>
            <Link
              to="/"
              className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <div className="text-[11px] font-mono text-center md:text-right">
            © 2026 Dhanus Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function EcommerceApp() {
  return (
    <EcommerceProvider>
      <EcommerceContent />
    </EcommerceProvider>
  );
}
