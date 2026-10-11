import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  Phone,
  User,
  Mail,
  Calendar,
  MapPin,
  Sparkles,
  QrCode,
  Zap,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";
import toast from "react-hot-toast";
import { paymentService } from "../services/paymentService";
import { getStoredToken } from "../services/api";

export default function CheckoutModal() {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    currentUser,
    saveCustomerProfile,
    cart,
    createOrder,
  } = useEcommerce();

  const [customerForm, setCustomerForm] = useState({
    name: "",
    mobile: "",
    age: "",
    email: "",
  });

  const [shippingForm, setShippingForm] = useState({
    street: "Flat 402, Royal Residency, Cyber City",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226010",
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI (Google Pay)");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  useEffect(() => {
    if (currentUser) {
      setCustomerForm({
        name: currentUser.name || "",
        mobile: currentUser.mobile || "",
        age: currentUser.age ? String(currentUser.age) : "24",
        email: currentUser.email || "",
      });
    } else {
      setCustomerForm({
        name: "",
        mobile: "",
        age: "",
        email: "",
      });
    }
  }, [currentUser, isCheckoutModalOpen]);

  if (!isCheckoutModalOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const shippingFee = subtotal > 1000 ? 0 : 99;
  const grandTotal = subtotal + tax + shippingFee;

  const handlePayNow = async (e) => {
    e.preventDefault();

    if (!customerForm.name.trim() || !customerForm.mobile.trim() || !customerForm.age) {
      toast.error("Please enter Name, Mobile Number, and Age to proceed.");
      return;
    }

    const token = getStoredToken();
    if (!token) {
      toast.error("Authentication required. Please sign in or register to complete payment.");
      return;
    }

    const finalPhone = customerForm.mobile?.trim() || currentUser?.mobile || "";
    const completeShippingAddress = {
      ...shippingForm,
      phone: finalPhone,
    };

    setIsProcessing(true);

    if (paymentMethod === "Cash on Delivery (COD)") {
      setProcessingStep("Creating Cash on Delivery Order...");
      try {
        await createOrder({
          shippingAddress: completeShippingAddress,
          paymentMethod: "Cash on Delivery (COD)",
          customerDetails: customerForm,
          paymentStatus: "PENDING",
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Order creation failed");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    setProcessingStep("Initializing Razorpay Gateway...");

    try {
      const payableAmount = grandTotal > 50000 ? 49990 : grandTotal;
      const rzpOrderRes = await paymentService.createPaymentOrder({
        amount: payableAmount,
      });

      setProcessingStep("Opening Razorpay Payment Window...");

      await paymentService.openRazorpayCheckout({
        amount: payableAmount,
        orderData: rzpOrderRes,
        customerDetails: {
          name: customerForm.name,
          email: customerForm.email,
          mobile: finalPhone,
        },
        onSuccess: async (verifyData) => {
          setProcessingStep("Payment Verified! Finalizing Order...");
          try {
            await createOrder({
              shippingAddress: completeShippingAddress,
              paymentMethod: paymentMethod || "Razorpay / UPI",
              customerDetails: customerForm,
              paymentTransactionId: verifyData.razorpay_payment_id || `PAY_${Date.now()}`,
              paymentStatus: "PAID",
            });
          } catch (orderErr) {
            toast.error(orderErr.response?.data?.message || "Order creation failed");
          } finally {
            setIsProcessing(false);
          }
        },
        onFailure: (err) => {
          setIsProcessing(false);
          setProcessingStep("");
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment initialization failed");
      setIsProcessing(false);
    }
  };

  const handleSandboxTest = async () => {
    const token = getStoredToken();
    if (!token) {
      toast.error("Please sign in or register to test payment verification.");
      return;
    }

    const finalPhone = customerForm.mobile?.trim() || currentUser?.mobile || "";
    const completeShippingAddress = {
      ...shippingForm,
      phone: finalPhone,
    };

    setIsProcessing(true);
    setProcessingStep("Creating Razorpay order on backend...");
    try {
      const payableAmount = grandTotal > 50000 ? 49990 : grandTotal;
      const rzpOrderRes = await paymentService.createPaymentOrder({
        amount: payableAmount,
      });

      const rzpOrderId =
        rzpOrderRes.order?.id || rzpOrderRes.id || `order_TmX6ey5G2mLTkA`;

      setProcessingStep(`Calling POST /api/payments/verify for ${rzpOrderId}...`);

      const verifyData = await paymentService.verifyPayment({
        razorpay_order_id: rzpOrderId,
        razorpay_payment_id: "6acb46c86775c23de60a5ff1",
        razorpay_signature: "test_verified",
      });

      toast.success("Payment verified successfully via /api/payments/verify!");

      setProcessingStep("Creating order in database...");
      await createOrder({
        shippingAddress: completeShippingAddress,
        paymentMethod: "Razorpay (Verified via API)",
        customerDetails: customerForm,
        paymentTransactionId: "6acb46c86775c23de60a5ff1",
        paymentStatus: "PAID",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Sandbox verification test failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickDemoCustomer = () => {
    setCustomerForm({
      name: "Piyush Vishwakarma",
      mobile: "+91 97941 25123",
      age: "24",
      email: "vishwakarmapiyush327@gmail.com",
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isProcessing && setIsCheckoutModalOpen(false)}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#11131c] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-transparent border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold w-fit mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit Encrypted Checkout</span>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Complete Your Order
              </h3>
            </div>
            <button
              disabled={isProcessing}
              onClick={() => setIsCheckoutModalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handlePayNow} className="p-5 sm:p-6 flex flex-col gap-5 max-h-[75vh] overflow-y-auto">
            {/* ── 1. Customer Verification Details ── */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Customer Verification Details</span>
                </span>
                {!currentUser && (
                  <button
                    type="button"
                    onClick={handleQuickDemoCustomer}
                    className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Quick Fill</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                    Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 97941 25123"
                    value={customerForm.mobile}
                    onChange={(e) => setCustomerForm({ ...customerForm, mobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                    Age <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="14"
                    max="110"
                    placeholder="Age (e.g. 24)"
                    value={customerForm.age}
                    onChange={(e) => setCustomerForm({ ...customerForm, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                      Email Address
                    </label>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      Optional
                    </span>
                  </div>
                  <input
                    type="email"
                    placeholder="name@email.com (Optional)"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* ── 2. Shipping Address ── */}
            <div className="flex flex-col gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Shipping Address</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    placeholder="House/Street/Flat No."
                    value={shippingForm.street}
                    onChange={(e) => setShippingForm({ ...shippingForm, street: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="PIN Code"
                    value={shippingForm.pincode}
                    onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* ── 3. Payment Method ── */}
            <div className="flex flex-col gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                <span>Select Payment Mode</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: "UPI (Google Pay)", label: "UPI / GPay" },
                  { id: "Credit Card (Visa/Mastercard)", label: "Cards" },
                  { id: "Net Banking (All Banks)", label: "NetBanking" },
                  { id: "Cash on Delivery (COD)", label: "Cash on Delivery" },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-700 dark:text-cyan-300 shadow-sm"
                        : "bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-400"
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── 4. Order Price Summary ── */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-xs flex flex-col gap-1.5">
              <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                <span>Items Subtotal ({cart.length} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                <span>Standard GST (18%)</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                <span>Express Courier Shipping</span>
                <span className="text-emerald-600 font-bold">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 pt-2">
                <span>Total Amount Due</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-extrabold text-base">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Processing State or Submit Button */}
            {isProcessing ? (
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center gap-3 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <span>{processingStep}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pay ₹{grandTotal.toLocaleString("en-IN")} & Complete Order</span>
                </button>

                <button
                  type="button"
                  onClick={handleSandboxTest}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-xs font-bold text-slate-700 dark:text-zinc-300 transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-slate-300 dark:border-white/10"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Verify Payment API (Sandbox Test)</span>
                </button>
              </div>
            )}

            {grandTotal > 50000 && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-400">
                ⚡ <strong>Razorpay Test Mode Notice:</strong> Orders over ₹50,000 are capped to ₹49,990 to comply with Razorpay test account limits.
              </div>
            )}

            {/* Test Payment Guide Helper */}
            <div className="p-3 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-[11px] text-slate-600 dark:text-zinc-400 flex flex-col gap-1.5">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Razorpay Test Mode Card Details:
              </span>
              <div>• <strong>Domestic Visa:</strong> <code className="text-cyan-600 dark:text-cyan-300 font-mono font-bold">4012 0000 0000 0002</code> (OTP: <code className="font-mono">123456</code>)</div>
              <div>• <strong>Domestic RuPay:</strong> <code className="text-cyan-600 dark:text-cyan-300 font-mono font-bold">5085 0000 0000 0003</code> (OTP: <code className="font-mono">123456</code>)</div>
              <div>• <strong>Instant UPI:</strong> <code className="text-cyan-600 dark:text-cyan-300 font-mono font-bold">success@razorpay</code></div>
              <div className="text-[10px] text-rose-500/90 dark:text-rose-400 pt-0.5 border-t border-slate-200/50 dark:border-white/5">
                Note: Do not use <code>4111 1111 1111 1111</code> as it is an International card and will be rejected (Merchant is Domestic Indian only).
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
