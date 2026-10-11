import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Package,
  Truck,
  Clock,
  ShieldCheck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  ShoppingBag,
  ArrowRight,
  Printer,
  Sparkles,
  Download,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";

export default function CustomerDashboard() {
  const {
    currentUser,
    orders,
    latestOrder,
    setLatestOrder,
    setActiveTab,
    setIsUserAuthModalOpen,
  } = useEcommerce();

  // Current selected order to display (defaults to latestOrder or first order)
  const [selectedOrder, setSelectedOrder] = useState(latestOrder || orders[0]);

  // If latestOrder changes (e.g. fresh checkout), sync selectedOrder
  React.useEffect(() => {
    if (latestOrder) {
      setSelectedOrder(latestOrder);
    }
  }, [latestOrder]);

  // Filter orders matching current customer (or all if not logged in for easy review)
  const myOrders = currentUser
    ? orders.filter(
        (o) =>
          o.customerId === currentUser.id ||
          o.customerMobile === currentUser.mobile ||
          o.customerName?.toLowerCase() === currentUser.name?.toLowerCase()
      )
    : orders;

  const currentDisplayedOrder = selectedOrder || myOrders[0];

  const handlePrint = () => {
    window.print();
  };

  // Tracking steps progress
  const stages = ["Placed", "Processing", "Shipped", "Delivered"];
  const currentStageIndex = currentDisplayedOrder
    ? stages.indexOf(currentDisplayedOrder.orderStatus) >= 0
      ? stages.indexOf(currentDisplayedOrder.orderStatus)
      : 1
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 print:p-0">
      {/* ── Order Success & Celebratory Banner ── */}
      {currentDisplayedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 border border-emerald-500/30 text-white shadow-2xl print:border-none"
        >
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    ✓ Payment Verified & Order Confirmed
                  </span>
                  <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                    {new Date(currentDisplayedOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">
                  Order #{currentDisplayedOrder.orderNumber}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                  Thank you, <span className="font-bold text-white">{currentDisplayedOrder.customerName}</span>! Your items are secured and preparing for dispatch.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => setActiveTab("store")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Main Order Details Card ── */}
      {currentDisplayedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols): Tracking & Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Live Visual Delivery Tracker */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <div>
                  <h3 className="font-bold font-display text-base sm:text-lg text-slate-900 dark:text-white">
                    Live Shipment Status
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Estimated Delivery: <span className="font-bold text-cyan-600 dark:text-cyan-400">{currentDisplayedOrder.deliveryEstimatedDate || "Within 3-4 Business Days"}</span>
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {currentDisplayedOrder.orderStatus}
                </span>
              </div>

              {/* Progress Steps */}
              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-white/10 -z-0" />
                <div
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 -z-0"
                  style={{
                    width: `${(currentStageIndex / (stages.length - 1)) * 90}%`,
                  }}
                />

                {stages.map((stage, idx) => {
                  const isDone = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                          isDone
                            ? "bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 font-extrabold ring-4 ring-cyan-500/20"
                            : "bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400"
                        }`}
                      >
                        {isDone ? "✓" : idx + 1}
                      </div>
                      <span
                        className={`text-[11px] font-bold mt-2 ${
                          isCurrent
                            ? "text-cyan-600 dark:text-cyan-400"
                            : isDone
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-400"
                        }`}
                      >
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-5">
              <h3 className="font-bold font-display text-base sm:text-lg text-slate-900 dark:text-white">
                Ordered Items ({currentDisplayedOrder.items?.length || 0})
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-white/10">
                {currentDisplayedOrder.items?.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        Sold by: <span className="font-semibold text-cyan-600 dark:text-cyan-400">{item.sellerName || "Verified Dhanus Merchant"}</span>
                      </p>
                      <div className="text-xs text-slate-600 dark:text-zinc-300 mt-1">
                        Qty: <span className="font-bold">{item.quantity}</span> × ₹{item.price.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Verified Purchase
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Orders History Selector (if customer has more orders) */}
            {myOrders.length > 1 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
                <h3 className="font-bold font-display text-sm sm:text-base text-slate-900 dark:text-white">
                  Previous Orders by this Customer ({myOrders.length})
                </h3>

                <div className="flex flex-col gap-2">
                  {myOrders.map((ord) => (
                    <button
                      key={ord.id}
                      onClick={() => setSelectedOrder(ord)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedOrder?.id === ord.id
                          ? "bg-cyan-500/10 border-cyan-500/40 text-slate-900 dark:text-white"
                          : "bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-slate-300 text-slate-700 dark:text-zinc-300"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{ord.orderNumber}</div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                          {new Date(ord.createdAt).toLocaleDateString()} • {ord.items?.length} items
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-xs">
                          ₹{ord.totalAmount?.toLocaleString("en-IN")}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (1 Col): Customer, Shipping & Payment Breakdown */}
          <div className="flex flex-col gap-6">
            {/* Customer Details Card (Mobile, Name, Age, Email optional) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <h3 className="font-bold font-display text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-500" />
                  <span>Customer Credentials</span>
                </h3>
                <span className="text-[10px] font-bold bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-full">
                  Verified Buyer
                </span>
              </div>

              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-zinc-400">Full Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {currentDisplayedOrder.customerName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-cyan-500" />
                    <span>Mobile Number</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {currentDisplayedOrder.customerMobile}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-zinc-400">Customer Age</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {currentDisplayedOrder.customerAge || 24} years
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-indigo-500" />
                    <span>Email Address</span>
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {currentDisplayedOrder.customerEmail && currentDisplayedOrder.customerEmail !== "N/A"
                      ? currentDisplayedOrder.customerEmail
                      : "Optional / Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Shipping Address</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {currentDisplayedOrder.shippingAddress?.street}<br />
                {currentDisplayedOrder.shippingAddress?.city}, {currentDisplayedOrder.shippingAddress?.state} - {currentDisplayedOrder.shippingAddress?.pincode}
              </p>
            </div>

            {/* Payment & Invoice Summary */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <h3 className="font-bold font-display text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  <span>Payment Breakdown</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  {currentDisplayedOrder.paymentStatus}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ₹{currentDisplayedOrder.subtotal?.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400">
                  <span>GST (18% Standard)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ₹{currentDisplayedOrder.tax?.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400">
                  <span>Express Courier Delivery</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    FREE
                  </span>
                </div>

                <div className="border-t border-slate-100 dark:border-white/10 pt-2 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Total Paid</span>
                  <span className="font-extrabold text-base text-cyan-600 dark:text-cyan-400">
                    ₹{currentDisplayedOrder.totalAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-[11px] text-slate-600 dark:text-zinc-400 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span>Payment Gateway</span>
                  <span className="font-bold text-slate-900 dark:text-white">{currentDisplayedOrder.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transaction ID</span>
                  <span className="font-mono text-[10px]">{currentDisplayedOrder.paymentTransactionId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-white/10">
          <ShoppingBag className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            No Orders Placed Yet
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
            Browse our catalog, add high quality items to your cart, and complete payment to view your live orders here.
          </p>
          <button
            onClick={() => setActiveTab("store")}
            className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs cursor-pointer shadow-lg"
          >
            Explore Dhanus Store
          </button>
        </div>
      )}
    </div>
  );
}
