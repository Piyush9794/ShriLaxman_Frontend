import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Zap,
  Check,
  Store,
  Share2,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";

export default function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCheckoutModalOpen,
  } = useEcommerce();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCheckoutModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#11131c] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image View */}
            <div className="relative p-6 sm:p-8 bg-slate-100 dark:bg-[#0c0d14] flex items-center justify-center">
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="w-full max-h-80 sm:max-h-96 object-contain rounded-2xl drop-shadow-xl"
              />

              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {selectedProduct.badge && (
                  <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md">
                    {selectedProduct.badge}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-slate-900/80 text-white dark:bg-white/20 text-xs font-semibold backdrop-blur-md">
                  {selectedProduct.discountPercentage}% OFF
                </span>
              </div>
            </div>

            {/* Right Specifications & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                  <span className="uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400">
                    {selectedProduct.category}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({selectedProduct.reviewsCount || 120} reviews)
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                  {selectedProduct.title}
                </h2>

                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400">
                  <Store className="w-3.5 h-3.5 text-cyan-500" />
                  <span>
                    Sold by: <span className="font-semibold text-slate-900 dark:text-white">{selectedProduct.sellerName || "Verified Dhanus Merchant"}</span>
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm sm:text-base text-slate-400 line-through">
                      ₹{selectedProduct.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mt-2">
                  {selectedProduct.description}
                </p>

                {/* Company Standard Badges */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>100% Genuine Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                    <Truck className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                    <span>Free Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                    <RefreshCw className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <span>7-Day Hassle-Free Returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                    <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>In Stock: {selectedProduct.stock} left</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-slate-300 dark:border-white/20 rounded-xl px-3 py-2 text-xs font-bold gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? "border-rose-500 bg-rose-500/10 text-rose-500"
                        : "border-slate-300 dark:border-white/15 text-slate-600 dark:text-zinc-300 hover:text-rose-500"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
                  </button>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Instant Buy Now (₹{(selectedProduct.price * quantity).toLocaleString("en-IN")})
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
