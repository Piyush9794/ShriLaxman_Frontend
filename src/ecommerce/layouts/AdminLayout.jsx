import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  Users,
  Store,
  Package,
  ShoppingCart,
  Tag,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Sparkles,
  LogOut,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../../Components/ThemeToggle";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Platform Overview", path: "/store/admin/dashboard", icon: LayoutDashboard },
    { name: "Customer Directory", path: "/store/admin/users", icon: Users },
    { name: "Seller Moderation", path: "/store/admin/sellers", icon: Store },
    { name: "Product Catalog", path: "/store/admin/products", icon: Package },
    { name: "Orders Ledger", path: "/store/admin/orders", icon: ShoppingCart },
    { name: "Coupons & Promos", path: "/store/admin/coupons", icon: Tag },
    { name: "Platform Settings", path: "/store/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#06070a] text-slate-900 dark:text-zinc-100 antialiased">
      {/* ── Mobile Sidebar Backdrop ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* ── Admin Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Brand */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/store" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-sm tracking-tight text-white">
                  ADMIN CONSOLE
                </span>
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                  Dhanus Central Command
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Active Admin (MANDATORY DYNAMIC NAME DISPLAY) */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs">
            <div className="text-[10px] text-rose-300/80 uppercase font-mono">
              Root SuperAdmin
            </div>
            {/* Dynamic Name */}
            <div className="font-bold text-white text-sm truncate mt-0.5">
              {user?.name || "Priya Singh"}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {user?.email || "priya@dhanus.admin.in"}
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
                        ? "bg-rose-500/20 text-rose-300 font-bold shadow-sm border border-rose-500/40"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
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
        <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
          <Link
            to="/store"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate("/store");
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/15 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/85 dark:bg-[#090a0f]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-zinc-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 hidden sm:block">
                Master Governance Dashboard
              </div>
              <h2 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                Admin Console — {user?.name || "Priya Singh"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              to="/store"
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Customer Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
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
