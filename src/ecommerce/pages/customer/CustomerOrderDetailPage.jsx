import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Clock,
  Truck,
  CreditCard,
  MapPin,
  ShieldCheck,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function CustomerOrderDetailPage() {
  const { id } = useParams();
  const { orders } = useStore();

  const order = orders.find((o) => o.id === id || o.orderNumber === id) || orders[0];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Order not found</h2>
        <Link to="/store/customer/orders" className="text-cyan-500 mt-2 inline-block">
          Back to orders
        </Link>
      </div>
    );
  }

  const stages = ["Placed", "Processing", "Shipped", "Delivered"];
  const currentStageIndex = stages.indexOf(order.orderStatus) >= 0 ? stages.indexOf(order.orderStatus) : 1;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8 print:p-0">
      <div className="flex items-center justify-between">
        <Link
          to="/store/customer/orders"
          className="text-xs font-semibold text-slate-500 hover:text-cyan-500 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-cyan-500" />
          <span>Print / Save Tax Invoice</span>
        </button>
      </div>

      {/* Invoice Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl flex flex-col gap-8 print:border-none print:shadow-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <img src="/Lax.png" alt="Dhanus" className="h-10 w-auto brightness-0 dark:invert" />
            <div>
              <h1 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Official Tax Invoice
              </h1>
              <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold mt-0.5">
                Order #{order.orderNumber}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 sm:text-right">
            <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
            <div className="text-emerald-600 font-bold mt-0.5">
              Payment Status: {order.paymentStatus}
            </div>
          </div>
        </div>

        {/* Live Tracking */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              Shipment Telemetry
            </span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">
              Est. Delivery: {order.deliveryEstimatedDate || "3-4 Days"}
            </span>
          </div>

          <div className="relative flex items-center justify-between px-4">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-white/10 -z-0" />
            {stages.map((st, idx) => {
              const isPassed = idx <= currentStageIndex;
              return (
                <div key={st} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isPassed
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-extrabold"
                        : "bg-slate-200 dark:bg-zinc-800 text-slate-400"
                    }`}
                  >
                    {isPassed ? "✓" : idx + 1}
                  </div>
                  <span
                    className={`text-[10px] font-bold mt-1.5 ${
                      isPassed ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"
                    }`}
                  >
                    {st}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-slate-100 dark:border-white/10 pb-6">
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Customer Details
            </span>
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              {order.customerName}
            </div>
            <div className="text-slate-500">Phone: {order.customerMobile}</div>
            <div className="text-slate-500">
              Email: {order.customerEmail || "Not provided"} • Age: {order.customerAge || 26} yrs
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Delivery Destination
            </span>
            <div className="text-slate-800 dark:text-zinc-200 leading-relaxed">
              {order.shippingAddress?.street}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
            </div>
          </div>
        </div>

        {/* Ordered items table */}
        <div>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block mb-3">
            Itemized Articles
          </span>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-300 font-bold uppercase">
              <tr>
                <th className="p-3 rounded-l-xl">Product Description</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3 rounded-r-xl text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {order.items?.map((it, idx) => (
                <tr key={idx}>
                  <td className="p-3">
                    <div className="font-bold text-slate-900 dark:text-white">{it.title}</div>
                    <div className="text-[10px] text-slate-400">Sold by: {it.sellerName || "Verified Dhanus Merchant"}</div>
                  </td>
                  <td className="p-3 font-semibold">{it.quantity}</td>
                  <td className="p-3">₹{it.price.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right font-extrabold text-slate-900 dark:text-white">
                    ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 border-t border-slate-100 dark:border-white/10 pt-6 text-xs">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-slate-800 dark:text-white">Payment Method:</span>
            <div className="text-slate-600 dark:text-zinc-400">{order.paymentMethod}</div>
            <div className="font-mono text-[10px] text-slate-400">TXID: {order.paymentTransactionId}</div>
          </div>

          <div className="sm:w-64 flex flex-col gap-2">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>GST (18%):</span>
              <span>₹{order.tax?.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount:</span>
                <span>-₹{order.discount?.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 flex justify-between font-extrabold text-base text-slate-900 dark:text-white">
              <span>Total Paid:</span>
              <span className="text-cyan-600 dark:text-cyan-400">₹{order.totalAmount?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
