import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Heart,
  X,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, addToCart, wishlist, toggleWishlist } = useStore();

  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchKeyword, setSearchKeyword] = useState(urlSearch);
  const [maxPrice, setMaxPrice] = useState(400000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlSearch) setSearchKeyword(urlSearch);
  }, [urlCategory, urlSearch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          product.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
          !searchKeyword.trim() ||
          product.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.sellerName?.toLowerCase().includes(searchKeyword.toLowerCase());

        const matchesPrice = product.price <= maxPrice;
        const matchesRating = (product.rating || 0) >= minRating;
        const matchesStock = !inStockOnly || (product.stock && product.stock > 0);

        return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, selectedCategory, searchKeyword, maxPrice, minRating, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchKeyword("");
    setMaxPrice(400000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
            Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> curated items across verified multi-merchant departments.
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/10 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Content: Filter Sidebar + Products Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop & Mobile Filter Sidebar */}
        <div
          className={`lg:block ${
            mobileFilterOpen ? "block" : "hidden"
          } p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-6 h-fit`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-500" />
              <span>Refine Catalog</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Search within page */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
              Search Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Product or brand..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
              Categories
            </label>
            <div className="flex flex-col gap-1.5">
              {["All", ...categories.map((c) => c.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
                      : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory.toLowerCase() === cat.toLowerCase() && (
                    <span className="text-[10px] font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
              <span>Max Price</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">
                ₹{maxPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="400000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹1,000</span>
              <span>₹4,00,000</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
              Minimum Rating
            </label>
            <div className="flex items-center gap-2">
              {[0, 4.0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    minRating === rating
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  {rating === 0 ? "All" : `${rating}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Availability Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
              <span>In-Stock Items Only</span>
            </label>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-white/10">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Try widening your price range, reducing minimum rating, or clearing your keyword search.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group relative rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="relative aspect-square bg-slate-50 dark:bg-[#0c0d14] p-6 flex items-center justify-center">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold">
                            {product.badge}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-white dark:bg-white/20 text-[10px] font-semibold">
                          {product.discountPercentage}% OFF
                        </span>
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-500"}`} />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col gap-3 justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 mb-1">
                          <span className="uppercase font-bold text-cyan-600 dark:text-cyan-400">
                            {product.category}
                          </span>
                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            {product.rating}
                          </span>
                        </div>

                        <Link
                          to={`/store/products/${product.id}`}
                          className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                          {product.title}
                        </Link>

                        <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                          Sold by: <span className="font-semibold">{product.sellerName}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-base font-extrabold text-slate-900 dark:text-white">
                            ₹{product.price.toLocaleString("en-IN")}
                          </div>
                          {product.originalPrice && (
                            <div className="text-[11px] text-slate-400 line-through">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
