import React, { useState } from "react";
import { Tag, Plus, Trash2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function AdminCouponsPage() {
  const { coupons, createCoupon, deleteCoupon } = useStore();

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    value: "10",
    minOrder: "3000",
    description: "",
  });

  const [showAdd, setShowAdd] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.code) return;

    createCoupon({
      code: form.code.toUpperCase().trim(),
      discountType: form.discountType,
      value: Number(form.value),
      minOrder: Number(form.minOrder),
      description: form.description || `${form.value}% promotional discount`,
    });

    setForm({ code: "", discountType: "percentage", value: "10", minOrder: "3000", description: "" });
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Promotional Coupons & Campaigns
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Configure discount codes redeemable by buyers during checkout.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Coupon</span>
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleCreate}
          className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col gap-4 max-w-xl"
        >
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Create Discount Campaign
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. FLASH25"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs font-mono uppercase font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Discount Type
              </label>
              <select
                value={form.discountType}
                onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs cursor-pointer"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Value
              </label>
              <input
                type="number"
                required
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Min Order (₹)
              </label>
              <input
                type="number"
                value={form.minOrder}
                onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Campaign Description
              </label>
              <input
                type="text"
                placeholder="e.g. 25% flash discount on audio & electronics"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-fit px-5 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs"
          >
            Create Coupon
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div
            key={c.code}
            className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-extrabold text-sm px-3 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {c.code}
                </span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {c.discountType === "percentage" ? `${c.value}% OFF` : `₹${c.value} FLAT`}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2">
                {c.description}
              </p>
              <div className="text-[11px] text-slate-400 mt-1">
                Min Order: ₹{c.minOrder.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => deleteCoupon(c.code)}
                className="text-xs text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
