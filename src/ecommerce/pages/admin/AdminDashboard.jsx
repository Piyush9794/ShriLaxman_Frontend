import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  Package,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { adminService } from "../../services/adminService";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { orders, products, sellers } = useStore();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getAnalytics();
        if (data) {
          setAnalytics(data);
        }
      } catch (err) {
        console.warn("Admin analytics fetch error:", err.message);
      }
    };
    fetchStats();
  }, []);

  const platformGMV = analytics?.totalRevenue || orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const platformFee = Math.round(platformGMV * 0.05);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* ── Banner (DYNAMIC NAME DISPLAY) ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-rose-500/20 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider">
              Root SuperAdmin
            </span>
            <span className="text-xs text-rose-200/70 font-mono">
              Central Command
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">
            Admin Master Console — {user?.name || "Priya Singh"}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Real-time observability of all Customers, Merchants, Transactions, and Moderation Pipelines.
          </p>
        </div>

        <Link
          to="/store"
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5 w-fit"
        >
          <span>Preview Live Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Platform GMV</div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-1">
            ₹{platformGMV.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">Gross volume</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Total Orders</div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {analytics?.totalOrders || orders.length}
          </div>
          <div className="text-[10px] text-cyan-500 font-bold mt-0.5">Checkouts completed</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Active Merchants</div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {analytics?.totalSellers || sellers.length}
          </div>
          <div className="text-[10px] text-purple-500 font-bold mt-0.5">Audited stores</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Catalog Articles</div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {products.length}
          </div>
          <div className="text-[10px] text-amber-500 font-bold mt-0.5">SKUs live</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Platform Fee (5%)</div>
          <div className="text-xl font-bold font-display text-rose-600 dark:text-rose-400 mt-1">
            ₹{platformFee.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-rose-500 font-bold mt-0.5">Revenue margin</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Audit Health</div>
          <div className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400 mt-1">
            100%
          </div>
          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">Encrypted & active</div>
        </div>
      </div>

      {/* ── Recent Orders & Sellers Tables ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold font-display text-base text-slate-900 dark:text-white">
              Recent Platform Orders
            </h2>
            <Link
              to="/store/admin/orders"
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Full Ledger ({orders.length}) →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {orders.slice(0, 5).map((o) => (
              <div
                key={o.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white">
                    {o.orderNumber}
                  </div>
                  <div className="text-slate-500 dark:text-zinc-400 text-[11px]">
                    Buyer: {o.customerName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900 dark:text-white">
                    ₹{o.totalAmount?.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                    {o.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold font-display text-base text-slate-900 dark:text-white">
              Registered Merchants
            </h2>
            <Link
              to="/store/admin/sellers"
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              All Merchants ({sellers.length}) →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {sellers.slice(0, 5).map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {s.storeName}
                  </div>
                  <div className="text-slate-500 dark:text-zinc-400 text-[11px]">
                    Owner: {s.name} ({s.city})
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-slate-500 text-[11px]">{s.gstin}</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600">
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
