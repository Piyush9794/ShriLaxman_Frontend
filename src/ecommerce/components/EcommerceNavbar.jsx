import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  Search,
  User,
  Shield,
  Store,
  Package,
  ArrowLeft,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Phone,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";
import ThemeToggle from "../../Components/ThemeToggle";

export default function EcommerceNavbar() {
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    currentUser,
    logoutCustomer,
    setIsUserAuthModalOpen,
    cart,
    setIsCartOpen,
    wishlist,
    searchQuery,
    setSearchQuery,
    orders,
  } = useEcommerce();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Customer order count
  const customerOrdersCount = currentUser
    ? orders.filter(
        (o) =>
          o.customerId === currentUser.id ||
          o.customerMobile === currentUser.mobile
      ).length
    : orders.length;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#090a0f]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      {/* ── Top Announcement Bar ── */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            <span className="hidden xs:inline">
              Dhanus Official Store — Genuine Products, Direct Verified Sellers, Instant Express Delivery!
            </span>
            <span className="xs:hidden">Dhanus Store — Free Express Delivery</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-cyan-100">
              ⚡ 24/7 Support: +91 97941 25123
            </span>
            <Link
              to="/"
              className="flex items-center gap-1 font-semibold text-white hover:text-cyan-200 underline underline-offset-2 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 lg:gap-6">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <Link
            to="/ecommerce"
            onClick={() => setActiveTab("store")}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <img
              src="/Lax.png"
              alt="Dhanus Brand"
              className="h-9 sm:h-11 w-auto object-contain brightness-0 dark:invert transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 dark:from-white dark:via-cyan-200 dark:to-white bg-clip-text text-transparent">
                DHANUS<span className="text-cyan-500 ml-0.5">STORE</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-zinc-400 -mt-1 hidden sm:block">
                Enterprise Marketplace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Live Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search smartphones, audio, laptops, shoes, fragrances..."
              className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links / Role Switchers */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-white/[0.04] p-1 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner">
          <button
            onClick={() => handleTabClick("store")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "store"
                ? "bg-white dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 shadow-sm border border-slate-200/80 dark:border-cyan-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Store</span>
          </button>

          <button
            onClick={() => handleTabClick("dashboard")}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-white dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 shadow-sm border border-slate-200/80 dark:border-cyan-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Customer Orders</span>
            {customerOrdersCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full">
                {customerOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabClick("seller")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "seller"
                ? "bg-white dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 shadow-sm border border-slate-200/80 dark:border-cyan-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Seller Hub</span>
          </button>

          <button
            onClick={() => handleTabClick("admin")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "admin"
                ? "bg-gradient-to-r from-rose-500/10 to-amber-500/10 dark:from-rose-500/20 dark:to-amber-500/20 text-rose-600 dark:text-rose-300 shadow-sm border border-rose-300/60 dark:border-rose-500/30 font-bold"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-rose-500" />
            <span>Admin Panel</span>
          </button>
        </nav>

        {/* Right Actions: User Profile + Wishlist + Cart + Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Profile Button / Modal Trigger */}
          <div className="relative">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-300/80 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-zinc-200 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="font-semibold truncate max-w-[90px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate max-w-[90px]">
                      {currentUser.mobile || "Verified"}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Details */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 p-3 bg-white dark:bg-[#10121a] rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl z-50 flex flex-col gap-2"
                    >
                      <div className="border-b border-slate-100 dark:border-white/10 pb-2">
                        <div className="font-bold text-sm text-slate-900 dark:text-white">
                          {currentUser.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-cyan-500" />
                          <span>{currentUser.mobile}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                          Age: <span className="font-semibold">{currentUser.age} yrs</span>
                          {currentUser.email && ` • ${currentUser.email}`}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab("dashboard");
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-zinc-300 flex items-center gap-2 cursor-pointer"
                      >
                        <Package className="w-3.5 h-3.5 text-cyan-500" />
                        <span>My Orders Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserAuthModalOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-zinc-300 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Edit Customer Details</span>
                      </button>

                      <button
                        onClick={() => {
                          logoutCustomer();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-white/10 pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setIsUserAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Customer Login</span>
              </button>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">₹{cartSubtotal.toLocaleString("en-IN")}</span>
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-zinc-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Search Bar & Category Quick Bar ── */}
      <div className="md:hidden px-4 pb-2.5">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all products & categories..."
            className="w-full pl-9 pr-9 py-2 text-xs rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#090a0f]/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-2"
          >
            <button
              onClick={() => handleTabClick("store")}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold ${
                activeTab === "store"
                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-500" />
                <span>Store Catalog</span>
              </span>
              <span className="text-xs text-slate-400">Shop</span>
            </button>

            <button
              onClick={() => handleTabClick("dashboard")}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold ${
                activeTab === "dashboard"
                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-indigo-500" />
                <span>Customer Orders Dashboard</span>
              </span>
              <span className="text-xs font-mono bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
                {customerOrdersCount} orders
              </span>
            </button>

            <button
              onClick={() => handleTabClick("seller")}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold ${
                activeTab === "seller"
                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-500" />
                <span>Seller Center</span>
              </span>
              <span className="text-xs text-slate-400">Manage Listings</span>
            </button>

            <button
              onClick={() => handleTabClick("admin")}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                activeTab === "admin"
                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-500" />
                <span>Platform Admin Panel</span>
              </span>
              <span className="text-xs font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full">
                Master View
              </span>
            </button>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-cyan-500 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portfolio</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsUserAuthModalOpen(true);
                }}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>{currentUser ? "Edit Profile" : "Customer Login"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
