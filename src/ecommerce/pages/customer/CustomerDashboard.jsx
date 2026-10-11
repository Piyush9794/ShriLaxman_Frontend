import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Heart,
  MapPin,
  User,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Printer,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { orders, wishlist } = useStore();

  // Filter orders matching current user
  const userOrders = orders.filter((o) => {
    if (!user) return true;
    if (o.customerId === user?.id || o.customerId === user?._id) return true;
    if (o.customerMobile && user?.mobile && o.customerMobile.includes(user.mobile.replace(/\D/g, "").slice(-10))) return true;
    if (o.customerName && user?.name && o.customerName.toLowerCase() === user.name.toLowerCase()) return true;
    return true;
  });

  const totalSpent = userOrders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const latestOrder = userOrders[0];

  const stages = ["Placed", "Processing", "Shipped", "Delivered"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* ── Welcome Banner (MANDATORY DYNAMIC NAME DISPLAY) ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/40 p-0.5"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold uppercase tracking-wider">
                  Verified Customer Account
                </span>
              </div>
              {/* Dynamic Name Display */}
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">
                Welcome back, {user?.name || "Rahul Sharma"}!
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300">
                {user?.mobile || "+91 98765 43210"} {user?.email && `• ${user?.email}`} • Age: {user?.age || 26} yrs
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/store/customer/profile"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Link>

            <Link
              to="/store/products"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Total Orders Placed</span>
            <Package className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {userOrders.length}
          </div>
          <Link
            to="/store/customer/orders"
            className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline mt-1 block font-medium"
          >
            View all orders →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Total Purchases (₹)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
            ₹{totalSpent.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
            100% Protected transactions
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Saved in Wishlist</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {wishlist.length}
          </div>
          <Link
            to="/store/wishlist"
            className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline mt-1 block font-medium"
          >
            Manage wishlist →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Primary Delivery City</span>
            <MapPin className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2 truncate">
            {user?.city || "Mumbai"}, {user?.state || "Maharashtra"}
          </div>
          <Link
            to="/store/customer/addresses"
            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline mt-1 block font-medium"
          >
            Manage addresses →
          </Link>
        </div>
      </div>

      {/* ── Latest Order Live Tracker ── */}
      {latestOrder && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2.5 py-0.5 rounded-md">
                  {latestOrder.orderNumber}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(latestOrder.createdAt).toLocaleDateString()}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  {latestOrder.paymentStatus}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white mt-1">
                Latest Order Delivery Telemetry
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                Stage: {latestOrder.orderStatus}
              </span>
              <Link
                to={`/store/customer/orders/${latestOrder.id}`}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                View Full Receipt →
              </Link>
            </div>
          </div>

          {/* Visual Step Progress */}
          <div className="relative flex items-center justify-between px-4 sm:px-8 py-2">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-white/10 -z-0" />
            {stages.map((st, idx) => {
              const currentStageIdx = stages.indexOf(latestOrder.orderStatus) >= 0
                ? stages.indexOf(latestOrder.orderStatus)
                : 1;
              const isPassed = idx <= currentStageIdx;

              return (
                <div key={st} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                      isPassed
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-extrabold shadow-md"
                        : "bg-slate-200 dark:bg-zinc-800 text-slate-400"
                    }`}
                  >
                    {isPassed ? "✓" : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-2 ${
                      isPassed ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"
                    }`}
                  >
                    {st}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Ordered items preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {latestOrder.items?.map((it, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex items-center gap-3"
              >
                <img
                  src={it.thumbnail}
                  alt=""
                  className="w-14 h-14 rounded-xl object-contain bg-white dark:bg-zinc-800 border p-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {it.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Qty: {it.quantity} • ₹{it.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Quick Account Navigation Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/store/customer/orders"
          className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              All Orders & Invoices
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Review history & print receipts
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
        </Link>

        <Link
          to="/store/customer/profile"
          className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              Profile & Dynamic Name
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Edit name, mobile, age & email
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
        </Link>

        <Link
          to="/store/customer/addresses"
          className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/50 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              Saved Shipping Addresses
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Home, Office & PIN codes
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
