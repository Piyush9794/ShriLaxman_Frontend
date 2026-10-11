import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Zap,
  Store,
  ChevronRight,
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { productService } from "../../services/productService";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct] = useState(() => products.find((p) => p.id === id || p._id === id) || null);
  const [isLoading, setIsLoading] = useState(!product);

  useEffect(() => {
    const found = products.find((p) => p.id === id || p._id === id);
    if (found) {
      setProduct(found);
      setIsLoading(false);
    } else if (id) {
      setIsLoading(true);
      productService
        .getProductById(id)
        .then((data) => setProduct(data))
        .catch(() => setProduct(null))
        .finally(() => setIsLoading(false));
    }
  }, [id, products]);

  const isWishlisted = wishlist.includes(product?.id || product?._id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-sm font-semibold text-slate-500">Loading product details from API...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/store/products" className="text-cyan-500 mt-2 inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleInstantBuy = () => {
    addToCart(product, quantity);
    navigate("/store/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
        <Link to="/store" className="hover:text-cyan-500">
          Store
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/store/products" className="hover:text-cyan-500">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="truncate max-w-[200px] text-slate-900 dark:text-white font-medium">
          {product.title}
        </span>
      </div>

      {/* ── Main Product View ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 p-8 flex items-center justify-center overflow-hidden">
            <img
              src={images[activeImageIndex] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain drop-shadow-xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl bg-white dark:bg-[#11131c] border p-2 cursor-pointer transition-all ${
                    activeImageIndex === idx
                      ? "border-cyan-500 ring-2 ring-cyan-500/30"
                      : "border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Buying */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
              <span className="uppercase font-bold text-cyan-600 dark:text-cyan-400">
                {product.category}
              </span>
              <div className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({product.reviewsCount || 100} reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 mt-1">
              <Store className="w-3.5 h-3.5 text-cyan-500" />
              <span>
                Sold by: <span className="font-semibold text-slate-900 dark:text-white">{product.sellerName || "Verified Dhanus Merchant"}</span>
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-base text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Save {product.discountPercentage}%
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Genuine Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-500" />
              <span>Free Express Courier Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-500" />
              <span>7-Day Replacement Policy</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>In Stock: {product.stock} units</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 dark:border-white/20 rounded-xl px-3 py-2 text-xs font-bold gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? "border-rose-500 bg-rose-500/10 text-rose-500"
                    : "border-slate-300 dark:border-white/15 text-slate-600 dark:text-zinc-300 hover:text-rose-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
              </button>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            <button
              onClick={handleInstantBuy}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Instant Buy Now (₹{(product.price * quantity).toLocaleString("en-IN")})
            </button>
          </div>
        </div>
      </div>

      {/* ── Specifications Table ── */}
      {product.specs && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-4">
          <h3 className="font-bold font-display text-lg text-slate-900 dark:text-white">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, val]) => (
              <div
                key={key}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 text-xs flex justify-between"
              >
                <span className="text-slate-500 dark:text-zinc-400 font-medium">{key}</span>
                <span className="font-bold text-slate-900 dark:text-white text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Related Recommendations ── */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
          <h3 className="font-bold font-display text-lg text-slate-900 dark:text-white">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/store/products/${rel.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 flex items-center gap-3.5 hover:border-cyan-500/50 transition-colors"
              >
                <img
                  src={rel.thumbnail}
                  alt=""
                  className="w-16 h-16 rounded-xl object-contain bg-slate-50 dark:bg-zinc-800"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {rel.title}
                  </h4>
                  <div className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 mt-1">
                    ₹{rel.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
