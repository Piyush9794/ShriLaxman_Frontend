import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  DollarSign,
  TrendingUp,
  Star,
  PlusCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { sellerService } from "../../services/sellerService";

export default function SellerDashboard() {
  const { user } = useAuth();
  const { products, orders, updateOrderStatus } = useStore();

  const sellerProducts = products.filter(
    (p) => p.sellerId === user?.id || p.sellerName === user?.storeName
  );

  const sellerOrders = orders.filter((o) =>
    o.items?.some((it) => it.sellerId === user?.id || it.sellerName === user?.storeName)
  );

  const totalRevenue = sellerOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await sellerService.getAnalytics();
        if (data) setAnalytics(data);
      } catch (e) {}
    };
    fetchAnalytics();
  }, []);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyMap = {};
  days.forEach((d) => (weeklyMap[d] = 0));
  sellerOrders.forEach((o) => {
    const dName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(o.createdAt || Date.now()).getDay()];
    weeklyMap[dName] = (weeklyMap[dName] || 0) + (o.totalAmount || 0);
  });
  const weeklyData = days.map((day) => ({ day, amount: weeklyMap[day] || 0 }));
  const maxSale = Math.max(...weeklyData.map((d) => d.amount), 1);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* ── Banner (MANDATORY DYNAMIC NAME DISPLAY) ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white shadow-xl border border-emerald-500/20 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider">
              {user?.status || "Approved"} Verified Merchant
            </span>
          </div>
          {/* Dynamic Name Display */}
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">
            Welcome back, {user?.name || "Amit Verma"}!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Storefront: <span className="font-bold text-white">{user?.storeName || "TechCraft Electronics & Audio"}</span> • GSTIN: {user?.gstin || "27AAACN1234D1Z8"}
          </p>
        </div>

        <Link
          to="/store/seller/products/new"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Product</span>
        </Link>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Gross Sales Volume</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
            ₹{(user?.totalSales || totalRevenue).toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
            +18.4% vs last week
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Live Catalog Listings</span>
            <Package className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {sellerProducts.length} items
          </div>
          <Link
            to="/store/seller/products"
            className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline mt-1 block font-medium"
          >
            Manage inventory →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Customer Orders</span>
            <Truck className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {sellerOrders.length}
          </div>
          <Link
            to="/store/seller/orders"
            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline mt-1 block font-medium"
          >
            Fulfill orders →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Store Performance</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {user?.rating || "4.9"} ★
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">
            Company Standard Certified
          </div>
        </div>
      </div>

      {/* ── Visual Sales Analytics Chart (SVG) ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Weekly Revenue Analytics
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Daily revenue volume generated by your merchant store.
            </p>
          </div>
          <Link
            to="/store/seller/analytics"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Detailed Analytics →
          </Link>
        </div>

        {/* Responsive Bar Chart */}
        <div className="h-48 flex items-end gap-3 sm:gap-6 pt-6 border-b border-slate-100 dark:border-white/10 pb-2">
          {weeklyData.map((item) => {
            const heightPercent = Math.round((item.amount / maxSale) * 100);
            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="text-[10px] font-bold text-slate-400">
                  ₹{(item.amount / 1000).toFixed(0)}k
                </div>
                <div
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-emerald-500 to-teal-400 hover:brightness-110 transition-all cursor-pointer shadow-sm"
                  style={{ height: `${heightPercent}%` }}
                  title={`₹${item.amount.toLocaleString("en-IN")}`}
                />
                <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Recent Incoming Orders ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            Recent Customer Orders to Fulfill
          </h2>
          <Link
            to="/store/seller/orders"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View All ({sellerOrders.length}) →
          </Link>
        </div>

        {sellerOrders.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-xs">
            No incoming customer orders at the moment.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sellerOrders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {ord.orderNumber} • {ord.customerName} ({ord.customerMobile})
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Shipping to: {ord.shippingAddress?.city}, {ord.shippingAddress?.state} • {new Date(ord.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ₹{ord.totalAmount?.toLocaleString("en-IN")}
                  </span>

                  <select
                    value={ord.orderStatus}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.08] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
