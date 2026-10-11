import React, { useState } from "react";
import { Package, Search, Trash2, ExternalLink } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function AdminProductsPage() {
  const { products, deleteProduct } = useStore();
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sellerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Master Product Moderation
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Audit catalog listings across all verified merchants in the marketplace.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-white/[0.05] border border-slate-300 dark:border-white/10"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-300 font-bold uppercase">
            <tr>
              <th className="p-3 rounded-l-xl">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Merchant Store</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock Units</th>
              <th className="p-3">Rating</th>
              <th className="p-3 rounded-r-xl text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {filtered.map((prod) => (
              <tr key={prod.id}>
                <td className="p-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={prod.thumbnail}
                      alt=""
                      className="w-10 h-10 rounded-lg object-contain bg-slate-100 p-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1 max-w-xs">
                        {prod.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{prod.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-slate-600 dark:text-zinc-400">{prod.category}</td>
                <td className="p-3 text-cyan-600 font-semibold">{prod.sellerName || "Dhanus Merchant"}</td>
                <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                  ₹{prod.price.toLocaleString("en-IN")}
                </td>
                <td className="p-3 font-bold">{prod.stock}</td>
                <td className="p-3 text-amber-500 font-bold">{prod.rating} ★</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    title="Remove from Catalog"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
