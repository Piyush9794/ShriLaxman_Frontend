import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Zap,
  Tag,
  Store,
  ChevronRight,
  TrendingUp,
  Heart,
  Eye,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";

export default function StoreHomePage() {
  const navigate = useNavigate();
  const { products, categories, addToCart, wishlist, toggleWishlist, setSelectedCategory } = useStore();
  const { user } = useAuth();

  const featuredProducts = (products.filter((p) => p.featured).length > 0
    ? products.filter((p) => p.featured)
    : products).slice(0, 4);
  const trendingProducts = (products.filter((p) => p.trending).length > 0
    ? products.filter((p) => p.trending)
    : products.slice(4).length > 0
    ? products.slice(4)
    : products).slice(0, 4);

  return (
    <div className="flex flex-col gap-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── 1. Hero Promotional Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-white/10 text-white shadow-2xl p-6 sm:p-10 lg:p-14">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Official Dhanus Flagship Store</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
            Curated Gadgets, Acoustics & Direct Merchant Luxury.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
            Explore authentic flagship electronics, titanium smartwatches, and niche fragrances. Directly fulfilled by verified merchants with instant order tracking.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to="/store/products"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore All Products</span>
            </Link>

            <Link
              to="/store/become-seller"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. Category Shortcuts ── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Explore specialized departments curated for tech enthusiasts and luxury collectors.
            </p>
          </div>
          <Link
            to="/store/products"
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/store/products?category=${encodeURIComponent(cat.name)}`}
              className="group p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.05] group-hover:bg-cyan-500/10 flex items-center justify-center transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 object-contain rounded-lg group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="font-bold text-xs text-slate-800 dark:text-zinc-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 3. Promotional Coupon Banner ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
            <Tag className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-200">
              Limited Festive Promotion
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display mt-0.5">
              Get 10% Instant Off with Coupon: <span className="font-mono bg-white/20 px-2.5 py-0.5 rounded-lg">DHANUS10</span>
            </h3>
            <p className="text-xs text-cyan-100 mt-1">
              Apply at checkout on any order over ₹5,000 for instant savings!
            </p>
          </div>
        </div>

        <Link
          to="/store/products"
          className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-extrabold text-xs shadow-lg hover:bg-slate-900 transition-all flex-shrink-0"
        >
          Redeem in Catalog →
        </Link>
      </div>

      {/* ── 4. Featured Flagship Products ── */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Featured Flagship Drops
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Hand-picked bestsellers with verified manufacturer warranties.
            </p>
          </div>
          <Link
            to="/store/products"
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>See All Products ({products.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group relative rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="relative aspect-square bg-slate-50 dark:bg-[#0c0d14] p-6 flex items-center justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold">
                      {product.badge || "Featured"}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-500"}`} />
                  </button>
                </div>

                <div className="p-5 flex flex-col gap-3 justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 mb-1">
                      <span className="uppercase font-bold text-cyan-600 dark:text-cyan-400">
                        {product.category}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {product.rating}
                      </span>
                    </div>

                    <Link
                      to={`/store/products/${product.id}`}
                      className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {product.title}
                    </Link>

                    <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                      Sold by: <span className="font-semibold">{product.sellerName}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-slate-900 dark:text-white">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. Trust Pillars ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              100% Verified Sellers & Genuine Goods
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Every seller is audited for compliance, official GSTIN, and authentic brand supply chains.
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
