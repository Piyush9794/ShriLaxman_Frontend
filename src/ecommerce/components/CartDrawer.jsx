import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    setIsCheckoutModalOpen,
  } = useEcommerce();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 1000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="w-screen max-w-md bg-white dark:bg-[#10121a] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-500" />
                <h3 className="font-bold font-display text-lg text-slate-900 dark:text-white">
                  Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-5 py-3 bg-cyan-500/10 border-b border-cyan-500/20 text-xs">
              <div className="flex items-center justify-between text-cyan-800 dark:text-cyan-300 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  {subtotal >= freeShippingThreshold
                    ? "You unlocked FREE Express Delivery!"
                    : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString("en-IN")} more for FREE Delivery`}
                </span>
                <span className="font-bold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-cyan-200/50 dark:bg-cyan-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-zinc-700 mb-3" />
                  <h4 className="font-bold text-base text-slate-800 dark:text-white">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xs">
                    Explore smartphones, headphones, luxury accessories, and exclusive drops.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-5 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex gap-3.5"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-0.5 font-medium truncate">
                          {item.sellerName || "Verified Seller"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>

                        {/* Qty Counter */}
                        <div className="flex items-center gap-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 rounded-lg px-2 py-0.5 text-xs">
                          <button
                            onClick={() => updateCartQty(item.id, item.quantity - 1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.id, item.quantity + 1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0c0e14] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400">
                  <span>Taxes (GST 18%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ₹{Math.round(subtotal * 0.18).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {subtotal >= freeShippingThreshold ? "FREE" : "₹99"}
                  </span>
                </div>

                <div className="border-t border-slate-200 dark:border-white/10 pt-2 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                  <span className="font-extrabold text-base text-cyan-600 dark:text-cyan-400">
                    ₹{Math.round(subtotal * 1.18 + (subtotal >= freeShippingThreshold ? 0 : 99)).toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
