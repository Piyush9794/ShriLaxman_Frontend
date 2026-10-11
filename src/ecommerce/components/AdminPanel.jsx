import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Store,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Building,
  CreditCard,
  RefreshCw,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";

export default function AdminPanel() {
  const {
    customers,
    sellers,
    products,
    orders,
    updateOrderStatus,
    toggleSellerVerification,
    deleteProduct,
    setActiveTab,
  } = useEcommerce();

  const [adminTab, setAdminTab] = useState("overview"); // 'overview' | 'customers' | 'sellers' | 'orders' | 'products'
  const [searchTerm, setSearchTerm] = useState("");

  // Platform Metrics
  const platformGMV = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const platformCommission = Math.round(platformGMV * 0.05); // 5% platform fee
  const totalStockUnits = products.reduce((sum, prod) => sum + (Number(prod.stock) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* ── Top Admin Banner ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-rose-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
                  ★ Root SuperAdmin
                </span>
                <span className="text-xs text-rose-200/70 font-mono">
                  Dhanus Central Command
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">
                E-Commerce Master Admin Panel
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300">
                Complete system observability — Live monitoring of all Customers, Sellers, Products & Orders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("store")}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Customer Store</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Platform GMV</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2">
            ₹{platformGMV.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            100% Verified settlements
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Total Orders</span>
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {orders.length}
          </div>
          <div className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-0.5">
            Active customer checkouts
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Total Users</span>
            <Users className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {customers.length}
          </div>
          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">
            Registered phone profiles
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Active Sellers</span>
            <Store className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {sellers.length}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 mt-0.5">
            Audited merchant stores
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Catalog Items</span>
            <Package className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2">
            {products.length}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">
            {totalStockUnits} units in stock
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Platform Fee (5%)</span>
            <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-xl font-bold font-display text-slate-900 dark:text-white mt-2">
            ₹{platformCommission.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">
            Direct company revenue
          </div>
        </div>
      </div>

      {/* ── Admin Navigation Tabs ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setAdminTab("overview")}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === "overview"
                ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Master Overview
          </button>

          <button
            onClick={() => setAdminTab("customers")}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === "customers"
                ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Customers Directory ({customers.length})
          </button>

          <button
            onClick={() => setAdminTab("sellers")}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === "sellers"
                ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Sellers Directory ({sellers.length})
          </button>

          <button
            onClick={() => setAdminTab("orders")}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === "orders"
                ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Orders & Transactions ({orders.length})
          </button>

          <button
            onClick={() => setAdminTab("products")}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === "products"
                ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Catalog Inventory ({products.length})
          </button>
        </div>

        {/* Search input for admin */}
        <div className="relative min-w-[200px]">
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* ── TAB 1: OVERVIEW ── */}
      {adminTab === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders Overview */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold font-display text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-cyan-500" />
                  <span>Recent Customer Orders</span>
                </h3>
                <button
                  onClick={() => setAdminTab("orders")}
                  className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                >
                  View All ({orders.length}) →
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {orders.slice(0, 4).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {ord.orderNumber} • {ord.customerName}
                      </div>
                      <div className="text-slate-500 dark:text-zinc-400 text-[11px] mt-0.5">
                        {ord.customerMobile} • {ord.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 dark:text-white">
                        ₹{ord.totalAmount?.toLocaleString("en-IN")}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        {ord.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registered Sellers Overview */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold font-display text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Store className="w-4 h-4 text-purple-500" />
                  <span>Verified Sellers Network</span>
                </h3>
                <button
                  onClick={() => setAdminTab("sellers")}
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                >
                  Manage Sellers ({sellers.length}) →
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {sellers.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {s.storeName}
                      </div>
                      <div className="text-slate-500 dark:text-zinc-400 text-[11px] mt-0.5">
                        {s.name} (Age {s.age}) • {s.mobile}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-slate-500 dark:text-zinc-400">
                        {s.category}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: CUSTOMERS DIRECTORY ── */}
      {adminTab === "customers" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Customer Onboarding Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Verified phone numbers, customer full names, ages, and optional emails captured per company standards.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Customer ID</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Mobile Number (Mandatory)</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Email (Optional)</th>
                  <th className="p-3">Orders</th>
                  <th className="p-3">Total Spent</th>
                  <th className="p-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {customers
                  .filter(
                    (c) =>
                      !searchTerm ||
                      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      c.mobile.includes(searchTerm)
                  )
                  .map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="p-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                        {customer.id}
                      </td>
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">
                        {customer.name}
                      </td>
                      <td className="p-3 font-mono text-slate-800 dark:text-zinc-200 font-medium">
                        {customer.mobile}
                      </td>
                      <td className="p-3 text-slate-600 dark:text-zinc-300 font-semibold">
                        {customer.age} yrs
                      </td>
                      <td className="p-3 text-slate-500 dark:text-zinc-400">
                        {customer.email ? (
                          <span className="text-cyan-600 dark:text-cyan-400 underline">{customer.email}</span>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Not provided (optional)</span>
                        )}
                      </td>
                      <td className="p-3 font-bold text-slate-800 dark:text-white">
                        {customer.totalOrders || 0}
                      </td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                        ₹{(customer.totalSpent || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {customer.status || "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 3: SELLERS DIRECTORY ── */}
      {adminTab === "sellers" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Seller Directory & Company Standard Compliance
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Seller legal details: Name, Age, Email, Mobile, Store Name, and GSTIN compliance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Seller ID</th>
                  <th className="p-3">Seller Name & Age</th>
                  <th className="p-3">Mobile & Email</th>
                  <th className="p-3">Store Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">GSTIN / Tax ID</th>
                  <th className="p-3">Listings</th>
                  <th className="p-3">Sales (₹)</th>
                  <th className="p-3 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {sellers
                  .filter(
                    (s) =>
                      !searchTerm ||
                      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      s.storeName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">
                        {s.id}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400">Age: {s.age} yrs</div>
                      </td>
                      <td className="p-3">
                        <div className="font-mono text-slate-800 dark:text-zinc-200">{s.mobile}</div>
                        <div className="text-[11px] text-cyan-600 dark:text-cyan-400">{s.email}</div>
                      </td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {s.storeName}
                      </td>
                      <td className="p-3 text-slate-600 dark:text-zinc-400">
                        {s.category}
                      </td>
                      <td className="p-3 font-mono text-slate-700 dark:text-zinc-300">
                        {s.gstin || "27AAACN1234D1Z8"}
                      </td>
                      <td className="p-3 font-bold text-slate-800 dark:text-white">
                        {s.totalListings || 0}
                      </td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                        ₹{(s.totalSales || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleSellerVerification(s.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                            s.status === "Verified"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25"
                              : "bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500/25"
                          }`}
                        >
                          {s.status === "Verified" ? "Verified ✓" : "Suspended"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 4: ORDERS & TRANSACTIONS ── */}
      {adminTab === "orders" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Master Order Ledger & Payment Transactions
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Audit log of customer orders, item details, payment methods, delivery locations and fulfillment statuses.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-md">
                      {ord.orderNumber}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-zinc-400">
                      {new Date(ord.createdAt).toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                      {ord.paymentStatus}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                    Customer: <span className="text-slate-950 dark:text-white font-bold">{ord.customerName}</span> (Age {ord.customerAge || 24}) • Mobile: <span className="font-mono text-cyan-600 dark:text-cyan-400">{ord.customerMobile}</span> • Email: {ord.customerEmail || "N/A"}
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Shipping to: {ord.shippingAddress?.street}, {ord.shippingAddress?.city}, {ord.shippingAddress?.state} ({ord.shippingAddress?.pincode})
                  </div>

                  {/* Items summary */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {ord.items?.map((it, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 font-medium"
                      >
                        {it.title} × {it.quantity} (₹{it.price.toLocaleString("en-IN")})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200 dark:border-white/10">
                  <div className="lg:text-right">
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                      Method: {ord.paymentMethod}
                    </div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      ₹{ord.totalAmount?.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                      Stage:
                    </span>
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className="px-2 py-1 rounded-lg bg-white dark:bg-white/[0.08] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
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
        </div>
      )}

      {/* ── TAB 5: CATALOG INVENTORY ── */}
      {adminTab === "products" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Master Products Inventory
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                All products listed across verified sellers on Dhanus Store.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("seller")}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold cursor-pointer"
            >
              + Add via Seller Hub
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Seller Store</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {products
                  .filter(
                    (p) =>
                      !searchTerm ||
                      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={prod.thumbnail}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                          />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white line-clamp-1 max-w-xs">
                              {prod.title}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {prod.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-zinc-300 font-medium">
                        {prod.category}
                      </td>
                      <td className="p-3 text-cyan-600 dark:text-cyan-400 font-semibold">
                        {prod.sellerName || "Verified Seller"}
                      </td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 font-bold text-slate-800 dark:text-white">
                        {prod.stock}
                      </td>
                      <td className="p-3 font-semibold text-amber-500">
                        {prod.rating} ★
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                          title="Delete from Catalog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
