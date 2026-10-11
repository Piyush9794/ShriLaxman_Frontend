import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, PlusCircle, Trash2, Edit3, ExternalLink } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

export default function SellerProductsPage() {
  const { user } = useAuth();
  const { products, deleteProduct, updateProduct } = useStore();

  const sellerProducts = products.filter(
    (p) => p.sellerId === user?.id || p.sellerName === user?.storeName
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Manage Store Inventory
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            View, edit stock levels, or remove products from your catalog.
          </p>
        </div>

        <Link
          to="/store/seller/products/new"
          className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {sellerProducts.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-white/10">
          <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 dark:text-white text-base">
            No products listed yet
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Start selling by listing your first product in the Dhanus catalog.
          </p>
          <Link
            to="/store/seller/products/new"
            className="mt-4 inline-block px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold"
          >
            + Create Product Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sellerProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex gap-4">
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="w-20 h-20 rounded-2xl object-contain bg-slate-50 dark:bg-zinc-800 border p-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    {prod.category}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 mt-0.5">
                    {prod.title}
                  </h3>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    ₹{prod.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Stock:</span>
                  <input
                    type="number"
                    min="0"
                    value={prod.stock}
                    onChange={(e) => updateProduct(prod.id, { stock: Number(e.target.value) })}
                    className="w-16 px-2 py-0.5 rounded-lg border text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/store/products/${prod.id}`}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-500"
                    title="View Public Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
