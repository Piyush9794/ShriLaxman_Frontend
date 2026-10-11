import React, { useState } from "react";
import { Store, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function SellerSettingsPage() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "Amit Verma",
    storeName: user?.storeName || "TechCraft Electronics & Audio",
    email: user?.email || "amit@techcraft.in",
    mobile: user?.mobile || "+91 98123 45678",
    gstin: user?.gstin || "27AAACN1234D1Z8",
    bankAccount: user?.bankAccount || "HDFC0001234 •••• 9821",
    upiId: user?.upiId || "techcraft@okhdfcbank",
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: form.name.trim(),
      storeName: form.storeName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      gstin: form.gstin.trim(),
      bankAccount: form.bankAccount.trim(),
      upiId: form.upiId.trim(),
    });
    setSaved(true);
    toast.success("Merchant store settings updated");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Merchant Compliance & Store Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Configure business details, tax identification numbers, and direct settlement channels.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {saved && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              Store / Brand Commercial Name
            </label>
            <input
              type="text"
              required
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Authorized Merchant Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Registered Contact Mobile
              </label>
              <input
                type="tel"
                required
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Official Business Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                GSTIN / Tax ID
              </label>
              <input
                type="text"
                required
                value={form.gstin}
                onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Direct Payout Bank Account
              </label>
              <input
                type="text"
                required
                value={form.bankAccount}
                onChange={(e) => setForm({ ...form, bankAccount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Settlement UPI ID
              </label>
              <input
                type="text"
                required
                value={form.upiId}
                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-2"
          >
            Save Merchant Profile & Credentials
          </button>
        </form>
      </div>
    </div>
  );
}
