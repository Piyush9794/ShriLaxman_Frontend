import React, { useState } from "react";
import { Truck, CheckCircle2, Clock, Filter } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

export default function SellerOrdersPage() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useStore();
  const [filterStatus, setFilterStatus] = useState("All");

  const sellerOrders = orders.filter((o) =>
    o.items?.some((it) => it.sellerId === user?.id || it.sellerName === user?.storeName)
  );

  const filteredOrders = sellerOrders.filter(
    (o) => filterStatus === "All" || o.orderStatus === filterStatus
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Customer Fulfillment Orders
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Process, dispatch, and mark customer shipments as completed.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "Placed", "Processing", "Shipped", "Delivered"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                filterStatus === st
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                  : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-400"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-white/10">
          <Truck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 dark:text-white text-base">
            No fulfillment orders found
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Orders placed by buyers will appear here for courier dispatch.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                    {ord.orderNumber}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  Customer: {ord.customerName} ({ord.customerMobile})
                </div>

                <div className="text-slate-500">
                  Deliver to: {ord.shippingAddress?.street}, {ord.shippingAddress?.city}, {ord.shippingAddress?.state} ({ord.shippingAddress?.pincode})
                </div>

                <div className="flex flex-wrap gap-2 mt-1">
                  {ord.items?.map((it, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300"
                    >
                      {it.title} × {it.quantity} (₹{it.price.toLocaleString("en-IN")})
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-white/10 gap-2">
                <div className="md:text-right">
                  <div className="text-[11px] text-slate-500">Fulfillment Value</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">
                    ₹{ord.totalAmount?.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-semibold text-slate-600 dark:text-zinc-400">
                    Status:
                  </span>
                  <select
                    value={ord.orderStatus}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.06] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
