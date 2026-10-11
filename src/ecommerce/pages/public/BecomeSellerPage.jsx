import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, ShieldCheck, CheckCircle2, Zap, ArrowRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";

export default function BecomeSellerPage() {
  const navigate = useNavigate();
  const { registerSeller } = useStore();
  const { updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    storeName: "",
    category: "Electronics & Wearables",
    gstin: "",
    city: "Bengaluru",
    state: "Karnataka",
    bankAccount: "HDFC0001234 •••• 9922",
    upiId: "merchant@upi",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.email || !form.mobile) {
      alert("Please fill in Name, Age, Email, and Mobile Number");
      return;
    }

    try {
      await registerSeller(form);
      await updateProfile({
        name: form.name,
        role: "seller",
        storeName: form.storeName || `${form.name}'s Official Store`,
        email: form.email,
        mobile: form.mobile,
        age: form.age,
      });

      navigate("/store/seller/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  const handlePreFill = () => {
    setForm({
      name: "Amit Verma",
      age: "34",
      email: "amit@techcraft.in",
      mobile: "+91 98123 45678",
      storeName: "TechCraft Electronics & Audio",
      category: "Electronics & Wearables",
      gstin: "27AAACN1234D1Z8",
      city: "Bengaluru",
      state: "Karnataka",
      bankAccount: "HDFC0001234 •••• 9821",
      upiId: "techcraft@okhdfcbank",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">
      <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <Store className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
          Become a Verified Dhanus Seller
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
          Reach thousands of tech and luxury buyers with direct merchant fulfillment and guaranteed settlements.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
            <h2 className="font-bold font-display text-base text-slate-900 dark:text-white">
              Merchant Application Form
            </h2>
            <button
              type="button"
              onClick={handlePreFill}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Fill Sample Merchant Data</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amit Verma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Age <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min="18"
                max="100"
                placeholder="e.g. 34"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Official Business Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. amit@techcraft.in"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98123 45678"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Store / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. TechCraft Electronics"
                value={form.storeName}
                onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Business Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="Electronics & Wearables">Electronics & Wearables</option>
                <option value="Audio & Acoustics">Audio & Acoustics</option>
                <option value="Luxury & Fragrances">Luxury & Fragrances</option>
                <option value="Sneakers & Streetwear">Sneakers & Streetwear</option>
                <option value="Gaming & Computing">Gaming & Computing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                GSTIN / Tax ID
              </label>
              <input
                type="text"
                placeholder="e.g. 27AAACN1234D1Z8"
                value={form.gstin}
                onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Payout Bank Account or UPI ID
              </label>
              <input
                type="text"
                placeholder="e.g. techcraft@okhdfcbank"
                value={form.upiId}
                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Register & Open Seller Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
