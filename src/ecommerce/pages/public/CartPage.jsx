import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  Sparkles,
  X,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const shippingFee = subtotal > 1000 ? 0 : 99;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const grandTotal = Math.max(0, subtotal + tax + shippingFee - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput("");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-slate-400 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-sm">
          You haven't added any flagship items to your cart yet. Explore our curated catalog to find what you love.
        </p>
        <Link
          to="/store/products"
          className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          Explore Catalog Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
          Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Review your items, apply coupons, and proceed to secure checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Cart Line Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col divide-y divide-slate-100 dark:divide-white/10">
            {cart.map((item) => (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 rounded-2xl object-contain bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 flex-shrink-0 p-2"
                />

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/store/products/${item.id}`}
                    className="font-bold text-sm text-slate-900 dark:text-white hover:text-cyan-500 transition-colors line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Sold by: <span className="font-semibold text-cyan-600 dark:text-cyan-400">{item.sellerName || "Verified Dhanus Merchant"}</span>
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    {/* Qty Selector */}
                    <div className="flex items-center border border-slate-300 dark:border-white/20 rounded-xl px-2.5 py-1 text-xs font-bold gap-3">
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity - 1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity + 1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-500 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-base text-slate-900 dark:text-white">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    ₹{item.price.toLocaleString("en-IN")} each
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/store/products"
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              ← Continue Shopping
            </Link>

            <button
              onClick={clearCart}
              className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
            >
              Clear Entire Bag
            </button>
          </div>
        </div>

        {/* Right 1 Col: Summary & Promo Code */}
        <div className="flex flex-col gap-6">
          {/* Coupon Code Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <Tag className="w-4 h-4 text-cyan-500" />
              <span>Apply Discount Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">
                    ✓ {appliedCoupon.code} Applied!
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                    {appliedCoupon.description}
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1 rounded-full text-slate-400 hover:text-rose-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. DHANUS10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs font-mono uppercase text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs"
                >
                  Apply
                </button>
              </form>
            )}

            <div className="text-[10px] text-slate-400">
              Try: <span className="font-bold font-mono">DHANUS10</span> (10% off) or <span className="font-bold font-mono">WELCOME500</span> (Flat ₹500 off)
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-3 text-xs">
            <h3 className="font-bold font-display text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-3">
              Order Summary
            </h3>

            <div className="flex justify-between text-slate-600 dark:text-zinc-400">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-zinc-400">
              <span>Standard GST (18%)</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ₹{tax.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-zinc-400">
              <span>Express Courier Delivery</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="border-t border-slate-100 dark:border-white/10 pt-3 flex justify-between items-baseline font-bold text-base text-slate-900 dark:text-white">
              <span>Grand Total</span>
              <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => navigate("/store/checkout")}
              className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
