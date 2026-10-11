import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function SellerProductNewPage() {
  const navigate = useNavigate();
  const { addProduct } = useStore();

  const [form, setForm] = useState({
    title: "",
    category: "Smartphones",
    price: "",
    originalPrice: "",
    stock: "20",
    brand: "",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;
    addProduct(form);
    navigate("/store/seller/products");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-slate-500 hover:text-emerald-500 flex items-center gap-1 cursor-pointer mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Add New Product to Store
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Provide accurate pricing, high-resolution imagery, and specifications for buyers.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sony WH-1000XM5 Noise Canceling Wireless Headphones"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
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
                placeholder="29990"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Original MRP (₹)
              </label>
              <input
                type="number"
                placeholder="34990"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white cursor-pointer"
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
                placeholder="Sony"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                min="1"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
            />
            {/* Presets */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-slate-400">Sample presets:</span>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    thumbnail:
                      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
                  })
                }
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] hover:bg-emerald-500/20 text-slate-600 dark:text-zinc-300"
              >
                Smartwatch
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    thumbnail:
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
                  })
                }
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] hover:bg-emerald-500/20 text-slate-600 dark:text-zinc-300"
              >
                Headphones
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              Detailed Description
            </label>
            <textarea
              rows="3"
              placeholder="Highlight product materials, certifications, and technical warranty..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border text-xs text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            Publish Product to Live Catalog
          </button>
        </form>
      </div>
    </div>
  );
}
