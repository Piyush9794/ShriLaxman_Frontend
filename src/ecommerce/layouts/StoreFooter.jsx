import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, Sparkles, Store, Lock } from "lucide-react";

export default function StoreFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#07080d]/90 backdrop-blur-xl py-14 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/Lax.png"
                alt="Dhanus Store"
                className="h-8 w-auto brightness-0 dark:invert"
              />
              <span className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                DHANUS STORE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
              Enterprise Multi-Merchant Shopping Platform integrated with Dhanus portfolio architecture. Full mock-services for customer, seller, and admin operations.
            </p>
            <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>Demo Frontend Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              Explore Store
            </span>
            <Link to="/store" className="hover:text-cyan-500 transition-colors">
              Storefront Homepage
            </Link>
            <Link to="/store/products" className="hover:text-cyan-500 transition-colors">
              All Products Catalog
            </Link>
            <Link to="/store/cart" className="hover:text-cyan-500 transition-colors">
              Shopping Cart & Checkout
            </Link>
            <Link to="/store/wishlist" className="hover:text-cyan-500 transition-colors">
              Saved Wishlist
            </Link>
          </div>

          {/* Portals */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              Platform Portals
            </span>
            <Link to="/store/customer/dashboard" className="hover:text-cyan-500 transition-colors">
              Customer Orders Dashboard
            </Link>
            <Link to="/store/seller/dashboard" className="hover:text-emerald-500 transition-colors">
              Seller Merchant Center
            </Link>
            <Link to="/store/become-seller" className="hover:text-emerald-500 transition-colors">
              Merchant Registration Form
            </Link>
            <Link to="/store/admin/dashboard" className="hover:text-rose-500 transition-colors">
              Central Admin Console
            </Link>
          </div>

          {/* Developer Portfolio Return */}
          <div className="flex flex-col gap-3 p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20">
            <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Developer Integration</span>
            </span>
            <p className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed">
              This e-commerce experience is cleanly linked from the developer portfolio without modifying portfolio sections.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span>© 2026 Dhanus Store. Designed & Engineered with modern React & Tailwind CSS.</span>
          <div className="flex items-center gap-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              ✓ Frontend Mock Mode Active
            </span>
            <span>All mock state saved to LocalStorage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
