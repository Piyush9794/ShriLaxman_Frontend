import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Star,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Search,
  Store,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";

export default function Storefront() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    setActiveTab,
    setIsUserAuthModalOpen,
    currentUser,
  } = useEcommerce();

  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price-low' | 'price-high' | 'rating'

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          product.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
          !searchQuery.trim() ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sellerName?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0; // default featured order
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-white/10 text-white shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Official Dhanus Flagship Store</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
            Curated Luxury, Gadgets & Direct Merchant Goods.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
            Explore authentic flagship electronics, high-end audio, limited sneakers and perfumes. Directly supplied by verified merchant sellers with automated fulfillment.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!currentUser ? (
              <button
                onClick={() => setIsUserAuthModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Sign In / Register Customer
              </button>
            ) : (
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-cyan-300 font-semibold flex items-center gap-2">
                <span>Welcome back, {currentUser.name}!</span>
              </div>
            )}

            <button
              onClick={() => setActiveTab("seller")}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sell Products on Dhanus</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Category Filters & Search Controls ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory.toLowerCase() === category.toLowerCase()
                  ? "bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 border border-slate-900 dark:border-cyan-500/40 shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* ── Products Grid ── */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
          <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            No products found matching your search
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Try a different keyword or reset filters to see all catalog items.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-[#0c0d14] flex items-center justify-center p-6">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-white dark:bg-white/20 text-[10px] font-bold backdrop-blur-md">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md text-slate-600 dark:text-zinc-300 hover:text-rose-500 transition-colors cursor-pointer shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>

                  {/* Quick View Overlay on Hover */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 mb-1">
                      <span className="uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    {/* Seller attribution pill */}
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 flex items-center gap-1 truncate">
                      <Store className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                      <span className="truncate">
                        Sold by: <span className="font-semibold text-slate-700 dark:text-zinc-300">{product.sellerName || "Verified Merchant"}</span>
                      </span>
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through -mt-0.5">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Trust Pillars & Company Standard Assurance ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              100% Verified Sellers & Quality
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Every seller is verified with legal credentials, GSTIN, and manufacturer authenticity.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Instant Order Tracking & Dispatch
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Live automated status updates with direct dispatch from verified merchant fulfillment hubs.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              7-Day Return & Buyer Protection
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Hassle-free replacements and instantaneous settlement refunds on all verified transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
