import React, { useState } from "react";
import { ShoppingCart, Search, CheckCircle2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerMobile?.includes(search)
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Master Orders & Transactions Ledger
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Audit history of all orders, customer details, payment methods, and delivery statuses.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search order or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-white/[0.05] border border-slate-300 dark:border-white/10"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((ord) => (
          <div
            key={ord.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
          >
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-md">
                  {ord.orderNumber}
                </span>
                <span className="text-slate-400">
                  {new Date(ord.createdAt).toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 font-bold">
                  {ord.paymentStatus}
                </span>
              </div>

              <div className="font-semibold text-slate-800 dark:text-zinc-200">
                Customer: <span className="font-bold text-slate-900 dark:text-white">{ord.customerName}</span> (Age {ord.customerAge || 25}) • Phone: <span className="font-mono text-cyan-600">{ord.customerMobile}</span> • Email: {ord.customerEmail || "N/A"}
              </div>

              <div className="text-[11px] text-slate-500">
                Destination: {ord.shippingAddress?.street}, {ord.shippingAddress?.city}, {ord.shippingAddress?.state} ({ord.shippingAddress?.pincode})
              </div>

              <div className="flex flex-wrap gap-2 mt-1">
                {ord.items?.map((it, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border text-[11px] text-slate-700 dark:text-zinc-300"
                  >
                    {it.title} × {it.quantity} (₹{it.price.toLocaleString("en-IN")})
                  </span>
                ))}
              </div>
            </div>

            <div className="flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-white/10 gap-2">
              <div className="lg:text-right">
                <div className="text-[11px] text-slate-500">{ord.paymentMethod}</div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  ₹{ord.totalAmount?.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-slate-500 font-semibold">Stage:</span>
                <select
                  value={ord.orderStatus}
                  onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                  className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-white/[0.08] border text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="Placed">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
