import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Truck, Printer, RotateCcw, XCircle, ChevronRight, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

export default function CustomerOrdersPage() {
  const { user } = useAuth();
  const { orders, cancelOrder } = useStore();
  const [filterStatus, setFilterStatus] = useState("All");

  const userOrders = orders.filter((o) => {
    if (!user) return true;
    if (o.customerId === user?.id || o.customerId === user?._id) return true;
    if (o.customerMobile && user?.mobile && o.customerMobile.includes(user.mobile.replace(/\D/g, "").slice(-10))) return true;
    if (o.customerName && user?.name && o.customerName.toLowerCase() === user.name.toLowerCase()) return true;
    return true;
  });

  const filteredOrders = userOrders.filter(
    (o) => filterStatus === "All" || o.orderStatus === filterStatus
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
            Order History & Tracking
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            View past orders, track dispatch status, download tax invoices, or request returns.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "Placed", "Processing", "Shipped", "Delivered", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                filterStatus === st
                  ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
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
          <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            No orders found matching filter
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Browse our catalog to place your next flagship order.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2.5 py-0.5 rounded-md">
                    {ord.orderNumber}
                  </span>
                  <span className="text-xs text-slate-500">
                    Placed: {new Date(ord.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                      ord.orderStatus === "Delivered"
                        ? "bg-emerald-500/15 text-emerald-600"
                        : ord.orderStatus === "Cancelled"
                        ? "bg-rose-500/15 text-rose-600"
                        : "bg-cyan-500/15 text-cyan-600"
                    }`}
                  >
                    {ord.orderStatus}
                  </span>
                  <Link
                    to={`/store/customer/orders/${ord.id}`}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-400 hover:text-cyan-500"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  {ord.items?.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={it.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded-xl object-contain bg-slate-50 dark:bg-zinc-800 border p-1"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          {it.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Qty: {it.quantity} • ₹{it.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-white/10">
                  <div className="sm:text-right">
                    <div className="text-[11px] text-slate-500">Total Amount</div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      ₹{ord.totalAmount?.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Link
                      to={`/store/customer/orders/${ord.id}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 text-xs font-semibold text-slate-800 dark:text-zinc-200"
                    >
                      Receipt
                    </Link>

                    {ord.orderStatus !== "Cancelled" && ord.orderStatus !== "Delivered" && (
                      <button
                        onClick={() => cancelOrder(ord.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
