import React, { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Package, Users, BarChart3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { sellerService } from "../../services/sellerService";

export default function SellerAnalyticsPage() {
  const { user } = useAuth();
  const { products, orders } = useStore();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await sellerService.getAnalytics();
        if (data) {
          setAnalytics(data);
        }
      } catch (e) {
        console.warn("Analytics fetch error:", e.message);
      }
    };
    fetchStats();
  }, []);

  const sellerOrders = orders.filter((o) =>
    o.items?.some((it) => it.sellerId === user?.id || it.sellerName === user?.storeName)
  );

  const totalRevenue = analytics?.revenue || sellerOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const platformFee = Math.round(totalRevenue * 0.05); // 5% fee
  const netEarnings = totalRevenue - platformFee;

  const categoryCounts = {};
  let totalProductCount = 0;
  products.forEach((p) => {
    const cat = p.category || "General";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    totalProductCount += 1;
  });
  const categoryBreakdown = Object.entries(categoryCounts).map(([label, count]) => ({
    label,
    percent: totalProductCount > 0 ? Math.round((count / totalProductCount) * 100) : 0,
  }));

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Sales Analytics & Insights
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Real-time performance metrics, commission deductions, and revenue distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Gross Sales</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            ₹{(user?.totalSales || totalRevenue).toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-emerald-500 font-bold mt-1">100% verified checkouts</div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Platform Commission (5%)</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            ₹{platformFee.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Automatic settlement deduction</div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">Net Payout Accrued</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{netEarnings.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-emerald-500 font-bold mt-1">Cleared for bank transfer</div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-6">
        <h3 className="font-bold font-display text-base text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-500" />
          <span>Category Share Breakdown</span>
        </h3>

        <div className="flex flex-col gap-4">
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
                <span>{cat.label}</span>
                <span>{cat.percent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/[0.05] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
