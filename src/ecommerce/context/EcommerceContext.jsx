import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { productService } from "../services/productService";
import { orderService } from "../services/orderService";
import { sellerService } from "../services/sellerService";
import { authService } from "../services/authService";
import { paymentService } from "../services/paymentService";
import { adminService } from "../services/adminService";

const EcommerceContext = createContext(null);

export function EcommerceProvider({ children }) {
  // ── Active Navigation Tab ('store', 'dashboard', 'seller', 'admin') ──
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("dhanus_ecommerce_tab") || "store";
  });

  useEffect(() => {
    localStorage.setItem("dhanus_ecommerce_tab", activeTab);
  }, [activeTab]);

  // ── Customer State (From Auth Session & API) ──
  const [currentUser, setCurrentUser] = useState(() => {
    return authService.getCurrentUser();
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("dhanus_current_customer", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("dhanus_current_customer");
    }
  }, [currentUser]);

  // ── Seller State (From API) ──
  const [sellers, setSellers] = useState([]);
  const [currentSeller, setCurrentSeller] = useState(null);

  // ── Products Catalog State (Only from API) ──
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // ── Cart & Wishlist (Session/LocalStorage) ──
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("dhanus_user_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("dhanus_user_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("dhanus_user_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dhanus_user_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ── Orders State (Only from API) ──
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);

  // ── UI Modals & Drawers ──
  const [isUserAuthModalOpen, setIsUserAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch real catalog from API (debounced)
  const debounceTimerRef = useRef(null);

  const fetchCatalog = useCallback(async (query = "", category = "All") => {
    setIsLoadingProducts(true);
    try {
      const params = {};
      if (query.trim()) params.search = query.trim();
      if (category && category !== "All") params.category = category;
      const data = await productService.getProducts(params);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Catalog fetch error:", err.message);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      fetchCatalog(searchQuery, selectedCategory);
    }, 300);
    return () => clearTimeout(debounceTimerRef.current);
  }, [searchQuery, selectedCategory, fetchCatalog]);

  // Fetch real sellers, customers, and orders from APIs on mount
  useEffect(() => {
    const initData = async () => {
      try {
        const fetchedSellers = await sellerService.getAllSellers();
        if (Array.isArray(fetchedSellers)) {
          setSellers(fetchedSellers);
          if (fetchedSellers.length > 0 && !currentSeller) {
            setCurrentSeller(fetchedSellers[0]);
          }
        }
      } catch (e) {}

      try {
        const fetchedUsers = await adminService.getUsers();
        if (Array.isArray(fetchedUsers)) {
          setCustomers(fetchedUsers);
        }
      } catch (e) {}

      if (currentUser) {
        try {
          const myOrders = await orderService.getMyOrders();
          if (Array.isArray(myOrders)) {
            setOrders(myOrders);
            if (myOrders.length > 0) {
              setLatestOrder(myOrders[0]);
            }
          }
        } catch (e) {}
      }
    };
    initData();
  }, [currentUser]);

  // ── User / Customer Actions ──
  const saveCustomerProfile = async (formData) => {
    try {
      const res = await authService.registerCustomer(formData);
      if (res.user) {
        setCurrentUser(res.user);
        setIsUserAuthModalOpen(false);
        toast.success(`Welcome, ${res.user.name}! Profile saved successfully.`, {
          icon: "🎉",
        });
        return res.user;
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to save profile");
    }
  };

  const logoutCustomer = () => {
    authService.logout();
    setCurrentUser(null);
    setOrders([]);
    setLatestOrder(null);
    toast.success("Signed out of Customer Account");
  };

  // ── Seller Actions ──
  const registerSeller = async (sellerData) => {
    try {
      const res = await authService.registerSeller(sellerData);
      if (res.user) {
        setSellers((prev) => [res.user, ...prev]);
        setCurrentSeller(res.user);
        toast.success(`Seller Store "${res.user.storeName}" registered!`, { icon: "🏬" });
        return res.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Seller registration failed");
      throw err;
    }
  };

  const switchSeller = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId || s._id === sellerId);
    if (seller) {
      setCurrentSeller(seller);
      toast.success(`Active Seller switched to: ${seller.storeName}`);
    }
  };

  // ── Products Management ──
  const addProduct = async (prod) => {
    const seller = currentSeller || sellers[0] || {};
    const payload = {
      title: prod.title.trim(),
      description: prod.description?.trim(),
      price: Number(prod.price),
      originalPrice: Number(prod.originalPrice) || Math.round(Number(prod.price) * 1.15),
      discountPercentage: prod.discountPercentage ? Number(prod.discountPercentage) : 0,
      stock: Number(prod.stock) || 0,
      category: prod.category || "General",
      brand: prod.brand || seller.storeName,
      sellerId: seller.id || seller._id,
      sellerName: seller.storeName,
      thumbnail: prod.thumbnail,
      images: prod.images || [prod.thumbnail].filter(Boolean),
      badge: prod.badge || "New Arrival",
      featured: true,
      trending: true,
    };

    try {
      const created = await productService.createProduct(payload);
      setProducts((prev) => [created, ...prev]);
      toast.success(`"${created.title || 'Product'}" added to store catalog!`, {
        icon: "✨",
      });
      return created;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
      throw err;
    }
  };

  const updateProduct = async (productId, updatedFields) => {
    try {
      const updated = await productService.updateProduct(productId, updatedFields);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId || p._id === productId ? { ...p, ...updated } : p
        )
      );
      toast.success("Product updated successfully!");
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prev) =>
        prev.filter((p) => p.id !== productId && p._id !== productId)
      );
      toast.success("Product removed from store");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  // ── Cart & Wishlist Actions ──
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const prodId = product.id || product._id;
      const existing = prev.find(
        (item) => item.id === prodId || item.productId === prodId
      );
      if (existing) {
        return prev.map((item) =>
          item.id === prodId || item.productId === prodId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          id: prodId,
          productId: prodId,
          quantity,
        },
      ];
    });
    toast.success(`${product.title?.slice(0, 24) || "Item"}... added to cart!`, {
      icon: "🛒",
    });
  };

  const updateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId || item.productId === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId && item.productId !== productId)
    );
    toast.success("Item removed from cart");
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        toast("Removed from wishlist", { icon: "💔" });
        return prev.filter((id) => id !== productId);
      } else {
        toast.success("Added to wishlist", { icon: "❤️" });
        return [...prev, productId];
      }
    });
  };

  // ── Checkout & Order Placement ──
  const createOrder = async ({
    shippingAddress,
    paymentMethod,
    customerDetails,
    paymentTransactionId,
    paymentStatus,
  }) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return null;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.18);
    const shippingFee = subtotal > 1000 ? 0 : 99;
    const totalAmount = subtotal + tax + shippingFee;

    const finalPhone =
      shippingAddress?.phone || customerDetails?.mobile || currentUser?.mobile || "";

    try {
      const orderPayload = {
        items: cart.map((i) => ({
          productId: i.productId || i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          thumbnail: i.thumbnail,
          sellerId: i.sellerId,
          sellerName: i.sellerName,
        })),
        shippingAddress: {
          street: shippingAddress?.street || customerDetails?.address || "Delivery Address",
          city: shippingAddress?.city || customerDetails?.city || "",
          state: shippingAddress?.state || customerDetails?.state || "",
          pincode: shippingAddress?.pincode || customerDetails?.pincode || "",
          phone: finalPhone,
        },
        paymentMethod: paymentMethod || "Razorpay / UPI",
        paymentTransactionId: paymentTransactionId || `PAY_${Date.now()}`,
        paymentStatus: paymentStatus || "PAID",
        totalAmount,
        subtotal,
        tax,
        shippingFee,
      };

      const created = await orderService.createOrder(orderPayload);
      const newOrder = {
        ...created,
        id: created.id || created._id,
        items: [...cart],
        totalAmount,
      };

      setOrders((prev) => [newOrder, ...prev]);
      setLatestOrder(newOrder);

      clearCart();
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
      setActiveTab("dashboard");

      toast.success(`Order placed successfully!`, {
        duration: 6000,
        icon: "🎉",
      });

      return newOrder;
    } catch (err) {
      toast.error(err.response?.data?.message || "Order creation failed");
      throw err;
    }
  };

  // ── Order Management ──
  const updateOrderStatus = async (orderId, newStatus, note = "") => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus, note });
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === orderId || ord._id === orderId
            ? { ...ord, orderStatus: newStatus }
            : ord
        )
      );
      if (latestOrder && (latestOrder.id === orderId || latestOrder._id === orderId)) {
        setLatestOrder((prev) => ({ ...prev, orderStatus: newStatus }));
      }
      toast.success(`Order status updated to: ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // ── Admin: Seller Verification Toggle ──
  const toggleSellerVerification = async (sellerId) => {
    const target = sellers.find((s) => s.id === sellerId || s._id === sellerId);
    const newStatus = target?.status === "Approved" || target?.status === "Verified" ? "Rejected" : "Approved";

    try {
      await sellerService.moderateSeller(sellerId, newStatus);
      setSellers((prev) =>
        prev.map((s) =>
          s.id === sellerId || s._id === sellerId ? { ...s, status: newStatus } : s
        )
      );
      toast.success(`Seller status updated to: ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <EcommerceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentUser,
        customers,
        saveCustomerProfile,
        logoutCustomer,
        isUserAuthModalOpen,
        setIsUserAuthModalOpen,
        currentSeller,
        sellers,
        registerSeller,
        switchSeller,
        products,
        isLoadingProducts,
        fetchCatalog,
        addProduct,
        updateProduct,
        deleteProduct,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        orders,
        latestOrder,
        setLatestOrder,
        createOrder,
        updateOrderStatus,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        toggleSellerVerification,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error("useEcommerce must be used within an EcommerceProvider");
  }
  return context;
}

export default EcommerceContext;
