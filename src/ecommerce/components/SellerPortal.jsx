import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Plus,
  Package,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit3,
  User,
  Phone,
  Mail,
  Calendar,
  Building,
  CreditCard,
  Truck,
  Sparkles,
  ExternalLink,
  X,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";

export default function SellerPortal() {
  const {
    currentSeller,
    sellers,
    registerSeller,
    switchSeller,
    products,
    addProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    setActiveTab,
  } = useEcommerce();

  const [activeSubTab, setActiveSubTab] = useState("products"); // 'products' | 'orders' | 'profile'
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Registration Form State
  const [registerForm, setRegisterForm] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    storeName: "",
    category: "Electronics & Wearables",
    gstin: "",
    city: "Bangalore",
    state: "Karnataka",
    bankAccount: "HDFC0001234 •••• 5541",
    upiId: "seller@upi",
  });

  // Product Creation State
  const [productForm, setProductForm] = useState({
    title: "",
    category: "Smartphones",
    price: "",
    originalPrice: "",
    stock: "15",
    brand: "",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80",
  });

  // Filter products belonging to current active seller
  const sellerProducts = products.filter(
    (p) => p.sellerId === currentSeller?.id || p.sellerName === currentSeller?.storeName
  );

  // Filter orders containing items from current seller
  const sellerOrders = orders.filter((o) =>
    o.items?.some(
      (item) =>
        item.sellerId === currentSeller?.id || item.sellerName === currentSeller?.storeName
    )
  );

  const totalSellerRevenue = sellerOrders.reduce(
    (sum, ord) => sum + (ord.totalAmount || 0),
    0
  );

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.age || !registerForm.email || !registerForm.mobile) {
      alert("Please fill in Name, Age, Email, and Mobile Number");
      return;
    }
    registerSeller(registerForm);
    setIsRegisterOpen(false);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) {
      alert("Please enter product title and price");
      return;
    }
    addProduct(productForm);
    setIsAddProductOpen(false);
    setProductForm({
      title: "",
      category: "Smartphones",
      price: "",
      originalPrice: "",
      stock: "15",
      brand: "",
      description: "",
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80",
    });
  };

  const handlePreFillSampleSeller = () => {
    setRegisterForm({
      name: "Rohit Singhania",
      age: "31",
      email: "rohit.singhania@vortexretail.com",
      mobile: "+91 98112 23344",
      storeName: "Vortex Luxury Retail Group",
      category: "Luxury, Footwear & Accessories",
      gstin: "29AABCV1234F1Z9",
      city: "Bengaluru",
      state: "Karnataka",
      bankAccount: "ICIC0008912 •••• 7712",
      upiId: "vortexretail@icici",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* ── Top Header & Current Seller Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Store className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                ✓ {currentSeller?.status || "Verified Seller"}
              </span>
              <span className="text-xs text-indigo-300 font-mono">
                ID: {currentSeller?.id || "SELLER-001"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">
              {currentSeller?.storeName || "Seller Hub"}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300">
              Operated by <span className="font-semibold text-white">{currentSeller?.name}</span> (Age {currentSeller?.age}) • {currentSeller?.mobile} • {currentSeller?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* Switch Active Demo Seller */}
          <select
            value={currentSeller?.id || currentSeller?._id || ""}
            onChange={(e) => switchSeller(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white focus:outline-none cursor-pointer"
          >
            {sellers.length === 0 && (
              <option value="">No registered sellers</option>
            )}
            {sellers.map((s) => (
              <option key={s.id || s._id} value={s.id || s._id} className="text-slate-900">
                {s.storeName} ({s.name})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsRegisterOpen(true)}
            className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Register New Seller</span>
          </button>

          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Active Listings</span>
            <Package className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {sellerProducts.length}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              Synced to live catalog
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Seller Orders</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {sellerOrders.length}
            </div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">
              Customer purchases
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Total Sales Volume</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              ₹{(currentSeller?.totalSales || totalSellerRevenue).toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              Payouts on schedule
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 text-xs font-semibold">
            <span>Store Rating</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{currentSeller?.rating || "4.9"}</span>
              <span className="text-amber-400 text-lg">★</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Company Standards compliant
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
        <button
          onClick={() => setActiveSubTab("products")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === "products"
              ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
              : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          My Listed Products ({sellerProducts.length})
        </button>

        <button
          onClick={() => setActiveSubTab("orders")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === "orders"
              ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
              : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Received Orders ({sellerOrders.length})
        </button>

        <button
          onClick={() => setActiveSubTab("profile")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === "profile"
              ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
              : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Company Standard Credentials
        </button>
      </div>

      {/* ── Sub Tab Content ── */}
      {activeSubTab === "products" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Inventory & Catalog
            </h2>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List New Item</span>
            </button>
          </div>

          {sellerProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
              <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                No products listed yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                Add products to start selling instantly to customers on Dhanus Store.
              </p>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                + Add Your First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between gap-3 group"
                >
                  <div className="flex gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1 line-clamp-2">
                        {product.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/10 text-xs">
                    <span className="text-slate-500 dark:text-zinc-400 font-medium">
                      Stock: <span className="font-bold text-slate-800 dark:text-white">{product.stock} units</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveTab("store")}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-300 hover:text-cyan-500 cursor-pointer"
                        title="View in Customer Store"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === "orders" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            Customer Fulfillment Orders
          </h2>

          {sellerOrders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
              <Truck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                No orders for this seller yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                When customers purchase your listed items, orders will arrive here for dispatch.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {sellerOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-zinc-400">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      Customer: {ord.customerName} ({ord.customerMobile})
                    </div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400">
                      Deliver to: {ord.shippingAddress?.city}, {ord.shippingAddress?.state} ({ord.shippingAddress?.pincode})
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {ord.items?.map((it, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-zinc-300"
                        >
                          {it.title.slice(0, 28)}... × {it.quantity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-white/10">
                    <div className="text-right">
                      <div className="text-xs text-slate-500 dark:text-zinc-400">Order Value</div>
                      <div className="text-base font-extrabold text-slate-900 dark:text-white">
                        ₹{ord.totalAmount?.toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Status updater for seller */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                        Status:
                      </span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.08] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
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
      )}

      {activeSubTab === "profile" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Company Standard Seller Profile
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Complies with Ministry of Corporate Affairs, Indian E-Commerce Rules & GSTIN Verification.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              ✓ Compliant & Audited
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold block mb-1">
                Authorized Seller
              </span>
              <div className="font-bold text-slate-900 dark:text-white text-base">
                {currentSeller?.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Age: <span className="font-semibold text-slate-700 dark:text-zinc-200">{currentSeller?.age} years</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold block mb-1">
                Contact & Verification
              </span>
              <div className="font-semibold text-slate-900 dark:text-white text-sm">
                {currentSeller?.mobile}
              </div>
              <div className="text-xs text-cyan-600 dark:text-cyan-400 truncate mt-1">
                {currentSeller?.email}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold block mb-1">
                Storefront & Category
              </span>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {currentSeller?.storeName}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                {currentSeller?.category}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold block mb-1">
                Tax Identification (GSTIN)
              </span>
              <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                {currentSeller?.gstin || "27AAACN1234D1Z8"}
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                Verified with GST Portal
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold block mb-1">
                Direct Payout Account
              </span>
              <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                {currentSeller?.bankAccount || "HDFC0001234 •••• 9821"}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                UPI: {currentSeller?.upiId}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold block mb-1">
                Registered Jurisdiction
              </span>
              <div className="font-semibold text-slate-900 dark:text-white text-sm">
                {currentSeller?.city}, {currentSeller?.state}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Active since {currentSeller?.joinedDate}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Register New Seller (Company Standard) ── */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRegisterOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#11131c] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold w-fit mb-1.5">
                    <Store className="w-3.5 h-3.5" />
                    <span>Company Standard Merchant Program</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Register as Seller
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Mandatory: Name, Age, Email, and Mobile number.
                  </p>
                </div>
                <button
                  onClick={() => setIsRegisterOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohit Singhania"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="100"
                      placeholder="e.g. 31"
                      value={registerForm.age}
                      onChange={(e) => setRegisterForm({ ...registerForm, age: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rohit@store.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98112 23344"
                      value={registerForm.mobile}
                      onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Company Standard Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-white/10">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Store / Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vortex Luxury Retail"
                      value={registerForm.storeName}
                      onChange={(e) => setRegisterForm({ ...registerForm, storeName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Business Category
                    </label>
                    <select
                      value={registerForm.category}
                      onChange={(e) => setRegisterForm({ ...registerForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Electronics & Wearables">Electronics & Wearables</option>
                      <option value="Luxury & Fragrances">Luxury & Fragrances</option>
                      <option value="Audio & Acoustics">Audio & Acoustics</option>
                      <option value="Fashion & Footwear">Fashion & Footwear</option>
                      <option value="Gaming & Consoles">Gaming & Consoles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      GSTIN / Business Tax ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 29AABCV1234F1Z9"
                      value={registerForm.gstin}
                      onChange={(e) => setRegisterForm({ ...registerForm, gstin: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Payout Bank Account / UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC0001234 or seller@upi"
                      value={registerForm.upiId}
                      onChange={(e) => setRegisterForm({ ...registerForm, upiId: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handlePreFillSampleSeller}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-xs font-semibold text-slate-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick Sample Fill</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Submit & Register Seller
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal: Add New Product ── */}
      <AnimatePresence>
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddProductOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#11131c] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-transparent border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Publish New Product to Dhanus Store
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Product will immediately be available for customers to purchase.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony WH-1000XM5 Noise Canceling Headphones"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Selling Price (₹) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 29990"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Original MRP (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 34990"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Category
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Smartphones">Smartphones</option>
                      <option value="Laptops">Laptops</option>
                      <option value="Audio">Audio</option>
                      <option value="Wearables">Wearables</option>
                      <option value="Fragrances">Fragrances</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Gaming">Gaming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sony"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={productForm.thumbnail}
                    onChange={(e) => setProductForm({ ...productForm, thumbnail: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                  {/* Preset quick images */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-slate-400">Quick Images:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          thumbnail:
                            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700&auto=format&fit=crop&q=80",
                        })
                      }
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.05] hover:bg-cyan-500/20 text-slate-600 dark:text-zinc-300 cursor-pointer"
                    >
                      Smartwatch
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          thumbnail:
                            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80",
                        })
                      }
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.05] hover:bg-cyan-500/20 text-slate-600 dark:text-zinc-300 cursor-pointer"
                    >
                      Luxury Watch
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          thumbnail:
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80",
                        })
                      }
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.05] hover:bg-cyan-500/20 text-slate-600 dark:text-zinc-300 cursor-pointer"
                    >
                      Headphones
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter detailed specifications and selling points..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-2"
                >
                  Publish Item to Store Catalog
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
