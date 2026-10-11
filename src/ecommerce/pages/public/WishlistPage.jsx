import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function WishlistPage() {
  const { wishlist, products, addToCart, toggleWishlist } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-sm">
          Keep track of items you want to purchase later by tapping the heart icon on any product.
        </p>
        <Link
          to="/store/products"
          className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
          Saved Wishlist ({wishlistedProducts.length} items)
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Curated items saved for future purchase or price drop alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wishlistedProducts.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm p-5 flex flex-col justify-between gap-4"
          >
            <div className="relative aspect-square bg-slate-50 dark:bg-[#0c0d14] rounded-2xl p-4 flex items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white dark:bg-black/60 text-rose-500 hover:text-rose-600 cursor-pointer shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">
                {product.category}
              </span>
              <Link
                to={`/store/products/${product.id}`}
                className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 mt-1 hover:text-cyan-500 transition-colors"
              >
                {product.title}
              </Link>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                ₹{product.price.toLocaleString("en-IN")}
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(product, 1);
                toggleWishlist(product.id);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
