import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  Eye,
  Star,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  X,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  Truck,
  ShieldCheck,
  RefreshCw,
  Grid,
  List,
  Tag,
  ChevronRight,
  ShoppingCart,
  Zap,
  Filter,
  Package,
  Award,
  ExternalLink,
} from "lucide-react";

// Fallback products dataset (30 high quality products across multiple categories)
const FALLBACK_PRODUCTS = [
  {
    id: 101,
    title: "iPhone 15 Pro Max",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    price: 1199,
    discountPercentage: 12,
    rating: 4.9,
    stock: 24,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 102,
    title: "MacBook Pro 16\" M3 Max",
    description: "The 16-inch MacBook Pro with M3 Max takes performance and power efficiency to new heights with up to 128GB unified memory.",
    price: 2499,
    discountPercentage: 15,
    rating: 4.95,
    stock: 12,
    brand: "Apple",
    category: "laptops",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 103,
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise canceling headphones with two processors and 8 microphones for unprecedented sound clarity and crystal clear calls.",
    price: 399,
    discountPercentage: 18,
    rating: 4.8,
    stock: 45,
    brand: "Sony",
    category: "accessories",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 104,
    title: "Apple Watch Ultra 2",
    description: "The most capable and rugged Apple Watch ever. Designed for outdoor adventures and endurance workouts with a lightweight titanium case.",
    price: 799,
    discountPercentage: 8,
    rating: 4.88,
    stock: 19,
    brand: "Apple",
    category: "accessories",
    thumbnail: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 105,
    title: "Maison Francis Kurkdjian Baccarat Rouge 540",
    description: "A luminous and intense fragrance with amber and woody floral aura. Crisp cedarwood, jasmine, and saffron blend into pure luxury.",
    price: 325,
    discountPercentage: 5,
    rating: 4.92,
    stock: 8,
    brand: "MFK",
    category: "fragrances",
    thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 106,
    title: "Minimalist Ergonomic Velvet Chair",
    description: "Premium velvet accent chair with brass gold metal legs, high-density foam padding for supreme comfort and mid-century aesthetic.",
    price: 289,
    discountPercentage: 22,
    rating: 4.75,
    stock: 14,
    brand: "Nordic Living",
    category: "furniture",
    thumbnail: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 107,
    title: "Samsung Galaxy S24 Ultra",
    description: "Welcome to the era of mobile AI. With S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
    price: 1299,
    discountPercentage: 10,
    rating: 4.85,
    stock: 31,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 108,
    title: "Dell XPS 15 OLED Touch",
    description: "Immerse yourself in content with bright, color-rich OLED panels and high-resolution 3.5K touch display with 13th Gen Intel Core processors.",
    price: 1899,
    discountPercentage: 14,
    rating: 4.7,
    stock: 16,
    brand: "Dell",
    category: "laptops",
    thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 109,
    title: "Glow Radiance Vitamin C Serum",
    description: "Clinical grade anti-aging serum with 20% pure L-Ascorbic Acid, Hyaluronic Acid and Ferulic Acid to brighten skin tone instantly.",
    price: 68,
    discountPercentage: 25,
    rating: 4.9,
    stock: 60,
    brand: "SkinBotanics",
    category: "beauty",
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 110,
    title: "Artisan Organic Arabica Coffee Beans",
    description: "Single-origin shade grown organic arabica beans freshly roasted with rich notes of dark chocolate, toasted hazelnut and velvet honey finish.",
    price: 24,
    discountPercentage: 0,
    rating: 4.95,
    stock: 120,
    brand: "RoastMaster",
    category: "groceries",
    thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 111,
    title: "Logitech MX Master 3S Wireless Mouse",
    description: "An iconic ergonomic mouse remastered. Now with Quiet Clicks and 8000 DPI track-on-glass sensor for precision and seamless multitasking.",
    price: 99,
    discountPercentage: 10,
    rating: 4.88,
    stock: 50,
    brand: "Logitech",
    category: "accessories",
    thumbnail: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 112,
    title: "Chanel Coco Mademoiselle Eau de Parfum",
    description: "An oriental fragrance with a strong personality, yet surprisingly fresh. Sparks of fresh orange immediately awaken the senses.",
    price: 165,
    discountPercentage: 5,
    rating: 4.91,
    stock: 22,
    brand: "Chanel",
    category: "fragrances",
    thumbnail: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80"
    ]
  }
];

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "smartphones", label: "Smartphones" },
  { id: "laptops", label: "Laptops" },
  { id: "accessories", label: "Accessories" },
  { id: "beauty", label: "Beauty & Skin" },
  { id: "fragrances", label: "Fragrances" },
  { id: "furniture", label: "Furniture" },
  { id: "groceries", label: "Groceries" },
];

export default function Ecommerce() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters and controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("dhanus_ecommerce_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("dhanus_ecommerce_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Promo code & toast
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0); // e.g. 0.2 for 20%
  const [toastMessage, setToastMessage] = useState(null);

  // Save Cart & Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("dhanus_ecommerce_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dhanus_ecommerce_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch Products from API with reliable fallbacks
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://dummyjson.com/products?limit=30");
        if (!response.ok) throw new Error("API network response was not ok");
        const data = await response.json();
        if (isMounted && data.products && data.products.length > 0) {
          // Normalize data
          const normalized = data.products.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: Math.round(item.price),
            discountPercentage: Math.round(item.discountPercentage || 0),
            rating: item.rating || 4.5,
            stock: item.stock || 20,
            brand: item.brand || "Premium",
            category: item.category || "accessories",
            thumbnail: item.thumbnail || item.images?.[0] || FALLBACK_PRODUCTS[0].thumbnail,
            images: item.images && item.images.length > 0 ? item.images : [item.thumbnail]
          }));
          setProducts(normalized);
        } else {
          throw new Error("Empty products array from API");
        }
      } catch (err) {
        console.warn("E-commerce API fetch failed, loading curated fallback catalog:", err.message);
        if (isMounted) {
          setProducts(FALLBACK_PRODUCTS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  // Show Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to Cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added "${product.title}" to cart!`);
  };

  // Update Cart Quantity
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved "${product.title}" to wishlist!`);
        return [...prev, product];
      }
    });
  };

  // Filter and Sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "all" ||
          p.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = p.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return b.discountPercentage - a.discountPercentage;
        return 0; // featured
      });
  }, [products, selectedCategory, searchQuery, maxPrice, sortBy]);

  // Calculations for Cart (all clean static whole numbers in Rupees)
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cart.reduce((acc, item) => acc + Math.round(item.price) * item.quantity, 0);
  const discountAmount = Math.round(subtotalPrice * discountApplied);
  const shippingFee = subtotalPrice > 500 || subtotalPrice === 0 ? 0 : 15;
  const finalTotalPrice = Math.max(0, subtotalPrice - discountAmount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "DHANUS20" || promoCode.trim().toUpperCase() === "PIYUSH20") {
      setDiscountApplied(0.2);
      showToast("🎉 20% Discount applied successfully!");
    } else if (promoCode.trim().toUpperCase() === "WELCOME10") {
      setDiscountApplied(0.1);
      showToast("🎉 10% Discount applied!");
    } else {
      showToast("❌ Invalid promo code (Try 'DHANUS20')");
    }
  };

  // Load Razorpay Checkout SDK Script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const existingScript = document.getElementById("razorpay-sdk-script");
      if (existingScript) {
        existingScript.onload = () => resolve(true);
        existingScript.onerror = () => resolve(false);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-sdk-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ Razorpay SDK script loaded successfully");
        resolve(true);
      };
      script.onerror = () => {
        console.error("❌ Failed to load Razorpay SDK script from CDN");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Trigger Razorpay Payment Order & Verification with Dhanus Backend API
  const handleCheckout = async (productParam = null) => {
    // Check if productParam is a genuine product object or a React Synthetic Event
    const isProductObj =
      productParam &&
      typeof productParam === "object" &&
      !productParam.nativeEvent &&
      Boolean(productParam.title);

    const targetProduct = isProductObj ? productParam : null;

    if (!targetProduct && cart.length === 0) {
      showToast("⚠️ Your cart is empty. Please add items before checking out.");
      return;
    }

    console.log("🚀 [Checkout] Initiating Razorpay payment flow...", {
      targetProduct,
      cartCount: cart.length,
      API_BASE_URL,
    });

    try {
      showToast("🔄 Loading payment gateway...");
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        showToast("❌ Could not load Razorpay SDK. Check connection.");
        return;
      }

      showToast("🔄 Creating payment order on backend...");

      const idempotencyKey = `idem_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const token = localStorage.getItem("dhanus_auth_token") || "guest_dhanus_checkout_token_2026";
      const targetUrl = `${API_BASE_URL}/api/payments/orders`;

      console.log(`📡 Sending POST request to: ${targetUrl}`);

      // 1. Create order on backend POST /api/payments/orders
      const orderRes = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
          productId: targetProduct
            ? (targetProduct.id >= 101 && targetProduct.id <= 112
                ? String(targetProduct.id)
                : `price_${Math.round(targetProduct.price)}`)
            : cart.length > 0
            ? `price_${finalTotalPrice}`
            : "basic",
        }),
      });

      console.log("📥 Received order response status:", orderRes.status);

      const orderData = await orderRes.json();
      console.log("📦 Order response body:", orderData);

      if (!orderRes.ok || !orderData.success) {
        showToast(`❌ Order Error: ${orderData.message || "Failed to create payment order"}`);
        return;
      }

      const paymentRecord = orderData.data;

      // 2. Open Razorpay Modal with full payment options (UPI, QR Code, Cards, Net Banking, Wallets, EMI)
      const options = {
        key: paymentRecord.key || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_TmIDn8YbGPOkSK",
        amount: paymentRecord.amount,
        currency: paymentRecord.currency || "INR",
        name: "Dhanus E-Commerce",
        description: targetProduct ? targetProduct.title : `Order Payment (${cart.length} item/s)`,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
        order_id: paymentRecord.orderId,
        handler: async function (response) {
          console.log("✅ Razorpay modal payment success callback:", response);
          showToast("⏳ Verifying payment signature...");

          try {
            const verifyUrl = `${API_BASE_URL}/api/payments/verify`;
            console.log(`📡 Sending POST request to: ${verifyUrl}`);

            // 3. Verify signature on backend POST /api/payments/verify
            const verifyRes = await fetch(verifyUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            console.log("📥 Verification response:", verifyData);

            if (verifyRes.ok && verifyData.success) {
              showToast("🎉 Payment Successful! Order confirmed by Dhanus API.");
              setCart([]);
              setIsCartOpen(false);
            } else {
              showToast(`❌ Payment Verification Failed: ${verifyData.message || "Invalid signature"}`);
            }
          } catch (err) {
            console.error("Signature verification error:", err);
            showToast(`❌ Signature Verification Error: ${err.message}`);
          }
        },
        prefill: {
          name: "Piyush Sharma",
          email: "customer@dhanus.com",
          contact: "9876543210",
        },
        notes: {
          merchant_order_id: paymentRecord.paymentId || paymentRecord.orderId,
        },
        theme: {
          color: "#06b6d4",
          backdrop_color: "rgba(15, 23, 42, 0.85)",
        },
        modal: {
          ondismiss: function () {
            showToast("ℹ️ Payment popup closed.");
          },
          confirm_close: true,
          escape: true,
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", function (resp) {
        console.warn("Razorpay payment failed:", resp.error);
        showToast(`❌ Payment Failed: ${resp.error?.description || "Transaction cancelled"}`);
      });
      rzpInstance.open();
    } catch (err) {
      console.error("Checkout Exception:", err);
      showToast(`❌ Payment Error: ${err.message}`);
    }
  };

  return (
    <section id="ecommerce" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification Popup */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 backdrop-blur-xl border border-slate-700/50 dark:border-slate-200/50 shadow-2xl font-medium text-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 dark:text-cyan-600 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambient Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Banner Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Premier E-Commerce Store</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Explore Modern{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
            Digital Storefront
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed"
        >
          Discover cutting-edge gadgets, luxury fragrances, premium laptops & lifestyle accessories with live API synchronization.
        </motion.p>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left"
        >
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
            <Truck className="w-5 h-5 text-cyan-500 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Free Express</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400">On orders over ₹500</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Buyer Protection</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400">30-day return guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">100% Authentic</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400">Direct from brands</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
            <Tag className="w-5 h-5 text-purple-500 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Promo "DHANUS20"</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400">Get 20% off total cart</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="glow-card rounded-2xl p-4 sm:p-6 mb-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
        {/* Top Controls: Search, Sort & View Mode */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
          {/* Live Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search products by title, brand, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-300/80 dark:border-white/15 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Side: Price Range, Sorting & View Toggle */}
          <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
            {/* Price Slider */}
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 bg-slate-100/70 dark:bg-white/[0.04] px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10">
              <span className="whitespace-nowrap">Max Price: <strong className="text-slate-900 dark:text-white">₹{maxPrice.toLocaleString("en-IN")}</strong></span>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Sorting Select */}
            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-9 pr-8 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-300/80 dark:border-white/15 text-xs font-medium text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            {/* View Mode Grid/List Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-white/15 text-cyan-600 dark:text-cyan-400 shadow-sm"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white dark:bg-white/15 text-cyan-600 dark:text-cyan-400 shadow-sm"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Wishlist & Cart Quick Triggers */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/10 border border-slate-300/80 dark:border-white/15 text-slate-700 dark:text-zinc-300 transition-all cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {totalCartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-cyan-300 text-[10px] font-extrabold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 border-transparent shadow-md font-semibold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-zinc-400 dark:hover:text-white border-slate-200 dark:border-white/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Summary Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-6 px-1">
        <div>
          Showing <strong className="text-slate-800 dark:text-zinc-200">{filteredProducts.length}</strong> of {products.length} products
        </div>
        {(searchQuery || selectedCategory !== "all" || maxPrice < 3000) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setMaxPrice(3000);
            }}
            className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Loading Skeleton View */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="rounded-2xl bg-slate-200/60 dark:bg-white/[0.03] border border-slate-300/60 dark:border-white/10 h-80 animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="w-full h-40 rounded-xl bg-slate-300/60 dark:bg-white/10 mb-4" />
              <div className="h-4 w-3/4 rounded bg-slate-300/60 dark:bg-white/10 mb-2" />
              <div className="h-3 w-1/2 rounded bg-slate-300/60 dark:bg-white/10 mb-4" />
              <div className="h-8 w-full rounded-xl bg-slate-300/60 dark:bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {/* Empty Search Results */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16 glow-card rounded-2xl border border-slate-200 dark:border-white/10">
          <Package className="w-12 h-12 text-slate-400 dark:text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">No products found</h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords, price filter, or category selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setMaxPrice(3000);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs shadow-md cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Product Catalog Display (Grid or List) */}
      {!loading && filteredProducts.length > 0 && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            const inCart = cart.find((item) => item.id === product.id);

            if (viewMode === "list") {
              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glow-card rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center gap-5 hover:scale-[1.01] transition-all"
                >
                  <div className="relative w-full sm:w-44 h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-black/30 shrink-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-bold">
                        -{product.discountPercentage}%
                      </span>
                    )}
                  </div>

                  <div className="flex-grow flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                          {product.brand} • {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-white/10">
                      <div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                          ₹{product.price.toLocaleString("en-IN")}
                        </div>
                        {product.discountPercentage > 0 && (
                          <div className="text-xs text-slate-400 line-through">
                            ₹{Math.round(product.price * (1 + product.discountPercentage / 100)).toLocaleString("en-IN")}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isWishlisted
                              ? "bg-rose-500/10 border-rose-500 text-rose-500"
                              : "bg-slate-100 dark:bg-white/[0.05] border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
                        </button>

                        <button
                          onClick={() => {
                            setQuickViewProduct(product);
                            setSelectedImageIndex(0);
                          }}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-cyan-500 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // Grid View Card
            return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group glow-card rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Media Header */}
                  <div className="relative w-full h-52 bg-slate-100 dark:bg-black/30 overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {product.discountPercentage > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-extrabold shadow-sm">
                          -{product.discountPercentage}% OFF
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[10px] font-semibold tracking-wider uppercase border border-cyan-500/30">
                        {product.category}
                      </span>
                    </div>

                    {/* Hover Action Overlay Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-md ${
                          isWishlisted
                            ? "bg-rose-500 text-white border-rose-500"
                            : "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-white/15 text-slate-700 dark:text-zinc-200 hover:text-rose-500"
                        }`}
                        title="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
                      </button>

                      <button
                        onClick={() => {
                          setQuickViewProduct(product);
                          setSelectedImageIndex(0);
                        }}
                        className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-700 dark:text-zinc-200 hover:text-cyan-400 transition-all cursor-pointer shadow-md"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Rating pill */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1 border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                      {product.brand}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1.5 group-hover:text-cyan-500 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-white/[0.06] mt-2">
                  <div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>
                    {product.discountPercentage > 0 && (
                      <div className="text-[10px] text-slate-400 line-through">
                        ₹{Math.round(product.price * (1 + product.discountPercentage / 100)).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                      inCart
                        ? "bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400"
                        : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added ({inCart.quantity})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0c0d12] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Image Gallery */}
                <div className="flex flex-col gap-3">
                  <div className="relative w-full h-72 rounded-2xl bg-slate-100 dark:bg-black/40 overflow-hidden border border-slate-200 dark:border-white/10">
                    <img
                      src={quickViewProduct.images?.[selectedImageIndex] || quickViewProduct.thumbnail}
                      alt={quickViewProduct.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Thumbnail Row */}
                  {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {quickViewProduct.images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            selectedImageIndex === idx
                              ? "border-cyan-500 scale-105"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={imgUrl} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info & Buy Details */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                        {quickViewProduct.brand} • {quickViewProduct.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{quickViewProduct.rating} / 5.0</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                      {quickViewProduct.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-4">
                      {quickViewProduct.description}
                    </p>

                    {/* Stock & Delivery note */}
                    <div className="flex flex-wrap gap-2 text-xs mb-6">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">
                        In Stock ({quickViewProduct.stock} available)
                      </span>
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold">
                        Free Express Shipping
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        ₹{quickViewProduct.price.toLocaleString("en-IN")}
                      </div>
                      {quickViewProduct.discountPercentage > 0 && (
                        <div className="text-xs text-rose-500 font-semibold">
                          Save {quickViewProduct.discountPercentage}% today
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWishlist(quickViewProduct)}
                        className="p-3 rounded-xl border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-200 cursor-pointer"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlist.some((w) => w.id === quickViewProduct.id)
                              ? "fill-rose-500 text-rose-500"
                              : ""
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => {
                          addToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-extrabold text-sm transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => {
                          const p = quickViewProduct;
                          setQuickViewProduct(null);
                          handleCheckout(p);
                        }}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                      >
                        <Zap className="w-4 h-4 fill-slate-950" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-white dark:bg-[#0a0b0e] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between z-10 p-6"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-cyan-500" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Your Shopping Cart
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                      {totalCartCount}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingCart className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                      Add items from the store to see them here!
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-200 dark:bg-black/30 shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>
                        {/* Quantity Adjuster */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-md bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-zinc-300 hover:bg-slate-300 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 dark:text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-md bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-zinc-300 hover:bg-slate-300 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-rose-500 hover:text-rose-600 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Drawer Footer & Checkout */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
                  {/* Coupon Form */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. DHANUS20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-300 dark:border-white/15 text-xs text-slate-900 dark:text-white uppercase placeholder-slate-400"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white/15 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Summary Lines */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-zinc-400 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        ₹{subtotalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    {discountApplied > 0 && (
                      <div className="flex justify-between text-emerald-500 font-semibold">
                        <span>Discount ({discountApplied * 100}%)</span>
                        <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
                      <span>Total</span>
                      <span className="text-cyan-600 dark:text-cyan-400">
                        ₹{finalTotalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WISHLIST DRAWER */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-white dark:bg-[#0a0b0e] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between z-10 p-6"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Saved Wishlist
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold">
                      {wishlist.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto py-4 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                      Your wishlist is empty
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                      Click the heart icon on any product to save it for later!
                    </p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-200 dark:bg-black/30 shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 mt-0.5">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="p-1.5 text-rose-500 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white/10 text-white font-semibold text-xs cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
