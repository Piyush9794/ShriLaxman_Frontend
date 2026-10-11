import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";
import ThemeToggle from "../../Components/ThemeToggle";

export default function StoreNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout, loginAsDemo } = useAuth();
  const { cart, wishlist, searchQuery, setSearchQuery, categories } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#090a0f]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      {/* ── Top Announcement & Demo Switcher Bar ── */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Dhanus Enterprise Store</span>
            </span>
            <span className="text-zinc-400 hidden md:inline">|</span>
            <span className="text-zinc-300 hidden md:inline">
              Multi-Vendor Marketplace • Free Shipping on ₹1,000+
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 1-Click Demo Persona Switcher */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-[11px] font-bold cursor-pointer transition-colors"
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span>Switch Demo Role:</span>
                <span className="capitalize font-black underline text-white">
                  {role} ({user?.name ? user.name.split(" ")[0] : "Guest"})
                </span>
                <ChevronDown className="w-3 h-3 text-cyan-300" />
              </button>

              <AnimatePresence>
                {demoDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-1.5 w-60 p-2 bg-white dark:bg-[#12141f] rounded-2xl border border-slate-200 dark:border-white/15 shadow-2xl z-50 text-slate-800 dark:text-zinc-200"
                  >
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-400 border-b border-slate-100 dark:border-white/10">
                      Select Evaluator Persona
                    </div>
                    <button
                      onClick={() => {
                        loginAsDemo("customer");
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/[0.06] flex items-center justify-between cursor-pointer"
                    >
                      <span>Customer: Rahul Sharma</span>
                      <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">Buyer</span>
                    </button>
                    <button
                      onClick={() => {
                        loginAsDemo("seller");
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/[0.06] flex items-center justify-between cursor-pointer"
                    >
                      <span>Seller: Amit Verma</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Merchant</span>
                    </button>
                    <button
                      onClick={() => {
                        loginAsDemo("admin");
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/[0.06] flex items-center justify-between cursor-pointer"
                    >
                      <span>Admin: Priya Singh</span>
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">SuperAdmin</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear Return to Portfolio Link */}
            <Link
              to="/"
              className="flex items-center gap-1 font-bold text-white hover:text-cyan-200 underline underline-offset-2 transition-colors ml-2"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Portfolio</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 lg:gap-6">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <Link to="/store" className="flex items-center gap-2.5 group focus:outline-none">
            <img
              src="/Lax.png"
              alt="Dhanus Store"
              className="h-9 sm:h-11 w-auto object-contain brightness-0 dark:invert transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 dark:from-white dark:via-cyan-200 dark:to-white bg-clip-text text-transparent">
                DHANUS<span className="text-cyan-500 ml-0.5">STORE</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-zinc-400 -mt-1 hidden sm:block">
                Flagship Marketplace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Live Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search smartphones, headphones, shoes, fragrances..."
              className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Desktop Navigation Links: Products, Categories, Become Seller */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-300">
          <Link
            to="/store"
            className={`px-3 py-1.5 rounded-xl transition-colors hover:text-cyan-600 dark:hover:text-white ${
              location.pathname === "/store" ? "text-cyan-600 dark:text-white font-bold bg-cyan-500/10" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/store/products"
            className={`px-3 py-1.5 rounded-xl transition-colors hover:text-cyan-600 dark:hover:text-white ${
              location.pathname === "/store/products" ? "text-cyan-600 dark:text-white font-bold bg-cyan-500/10" : ""
            }`}
          >
            Explore Catalog
          </Link>
          <Link
            to="/store/become-seller"
            className="px-3 py-1.5 rounded-xl transition-colors hover:text-cyan-600 dark:hover:text-white flex items-center gap-1"
          >
            <Store className="w-3.5 h-3.5 text-emerald-500" />
            <span>Become a Seller</span>
          </Link>
        </nav>

        {/* Right Section: Account, Wishlist, Cart, Theme, Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Button */}
          <Link
            to="/store/wishlist"
            className="relative p-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 text-slate-600 dark:text-zinc-300 hover:text-rose-500" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <Link
            to="/store/cart"
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">₹{cartSubtotal.toLocaleString("en-IN")}</span>
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {cartTotalCount}
              </span>
            )}
          </Link>

          {/* User Account Dropdown (MANDATORY DYNAMIC NAME DISPLAY) */}
          <div className="relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-300/80 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-zinc-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80"}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-cyan-400/40"
                  />
                  {/* Dynamic Name Display */}
                  <span className="font-bold truncate max-w-[100px] hidden sm:inline">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 p-3 bg-white dark:bg-[#10121a] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl z-50 flex flex-col gap-1.5"
                    >
                      {/* Dynamic Greeting */}
                      <div className="border-b border-slate-100 dark:border-white/10 pb-2 px-1">
                        <div className="text-[11px] text-slate-400 font-medium">Logged in as</div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-cyan-600 dark:text-cyan-400 capitalize font-semibold">
                          Role: {user.role} {user.storeName && `• ${user.storeName}`}
                        </div>
                      </div>

                      {/* Customer Links */}
                      <Link
                        to="/store/customer/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-zinc-300 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Customer Dashboard</span>
                      </Link>

                      <Link
                        to="/store/customer/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-zinc-300 flex items-center gap-2"
                      >
                        <Package className="w-3.5 h-3.5 text-indigo-500" />
                        <span>My Orders & Tracking</span>
                      </Link>

                      {/* Seller Hub Link */}
                      <Link
                        to="/store/seller/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-zinc-300 flex items-center gap-2"
                      >
                        <Store className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Seller Portal</span>
                      </Link>

                      {/* Admin Portal Link */}
                      <Link
                        to="/store/admin/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center gap-2"
                      >
                        <Shield className="w-3.5 h-3.5 text-rose-500" />
                        <span>Admin Console</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-white/10 pt-2 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/store/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-500" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-zinc-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#090a0f]/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-2"
          >
            <form onSubmit={handleSearchSubmit} className="mb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/10"
              />
            </form>

            <Link
              to="/store"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-xs font-bold text-slate-800 dark:text-white"
            >
              Store Homepage
            </Link>
            <Link
              to="/store/products"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-xs font-bold text-slate-800 dark:text-white"
            >
              Browse All Products
            </Link>
            <Link
              to="/store/customer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-xs font-bold text-cyan-600 dark:text-cyan-400"
            >
              Customer Dashboard (Orders & Profile)
            </Link>
            <Link
              to="/store/seller/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
            >
              Seller Portal (Listings & Fulfillment)
            </Link>
            <Link
              to="/store/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-xs font-bold text-rose-600 dark:text-rose-400"
            >
              Admin Master Console
            </Link>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-600 dark:text-zinc-400 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portfolio</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
