import React, { useState } from "react";
import { Settings, Shield, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    platformName: "Dhanus Enterprise Marketplace",
    commissionRate: "5",
    freeShippingMin: "1000",
    supportEmail: "support@dhanus.store",
    supportPhone: "+91 97941 25123",
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Platform settings updated successfully");
  };

  const handleResetData = () => {
    if (confirm("Reset all mock demo data to original defaults?")) {
      localStorage.removeItem("dhanus_store_products");
      localStorage.removeItem("dhanus_store_orders");
      localStorage.removeItem("dhanus_store_sellers");
      localStorage.removeItem("dhanus_store_cart");
      localStorage.removeItem("dhanus_store_wishlist");
      localStorage.removeItem("dhanus_auth_user");
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Platform Governance & Global Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Configure marketplace commission, fulfillment threshold rules, and mock state reset.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl">
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              Marketplace Commercial Brand
            </label>
            <input
              type="text"
              value={form.platformName}
              onChange={(e) => setForm({ ...form, platformName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Merchant Commission Rate (%)
              </label>
              <input
                type="number"
                value={form.commissionRate}
                onChange={(e) => setForm({ ...form, commissionRate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={form.freeShippingMin}
                onChange={(e) => setForm({ ...form, freeShippingMin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Platform Support Helpline
              </label>
              <input
                type="text"
                value={form.supportPhone}
                onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Escalations Email
              </label>
              <input
                type="email"
                value={form.supportEmail}
                onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-rose-500 text-white font-extrabold text-xs shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-2"
          >
            Save Platform Settings
          </button>
        </form>

        <div className="pt-6 border-t border-slate-100 dark:border-white/10 mt-6 flex items-center justify-between">
          <div>
            <div className="font-bold text-xs text-slate-900 dark:text-white">
              Reset Mock Demo Database
            </div>
            <div className="text-[11px] text-slate-400">
              Clear cached local storage and reload seed data
            </div>
          </div>

          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-rose-500/10 hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
