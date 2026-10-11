import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Store,
  LayoutDashboard,
  Package,
  PlusCircle,
  Truck,
  TrendingUp,
  CreditCard,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Sparkles,
  User,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../../Components/ThemeToggle";

export default function SellerLayout() {
  const { user, logout, loginAsDemo } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard Overview", path: "/store/seller/dashboard", icon: LayoutDashboard },
    { name: "Product Catalog", path: "/store/seller/products", icon: Package },
    { name: "Add New Product", path: "/store/seller/products/new", icon: PlusCircle },
    { name: "Customer Orders", path: "/store/seller/orders", icon: Truck },
    { name: "Sales Analytics", path: "/store/seller/analytics", icon: TrendingUp },
    { name: "Earnings & Payouts", path: "/store/seller/earnings", icon: CreditCard },
    { name: "Store Settings", path: "/store/seller/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#07080d] text-slate-900 dark:text-zinc-100 antialiased">
      {/* ── Mobile Sidebar Backdrop ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0c0e17] border-r border-slate-200 dark:border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Brand & Store Name */}
          <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <Link to="/store" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Store className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                  SELLER PORTAL
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  Merchant Hub
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Active Seller Pill (MANDATORY DYNAMIC NAME DISPLAY) */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono">
              Active Merchant
            </div>
            {/* Dynamic Name */}
            <div className="font-bold text-slate-900 dark:text-white text-sm truncate mt-0.5">
              {user?.name || "Amit Verma"}
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 truncate">
              {user?.storeName || "TechCraft Electronics & Audio"}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm border border-emerald-500/30"
                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
          <Link
            to="/store"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate("/store");
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/85 dark:bg-[#07080d]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-zinc-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 hidden sm:block">
                Merchant Operations Console
              </div>
              <h2 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                Welcome back, {user?.name || "Amit Verma"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Status: {user?.status || "Approved"}</span>
            </span>

            <ThemeToggle />

            <Link
              to="/store/products"
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline hidden md:inline"
            >
              View Public Catalog →
            </Link>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
