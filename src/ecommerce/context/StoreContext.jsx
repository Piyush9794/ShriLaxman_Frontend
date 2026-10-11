import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import { orderService } from "../services/orderService";
import { paymentService } from "../services/paymentService";
import { sellerService } from "../services/sellerService";
import { couponService } from "../services/couponService";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const { user, role } = useAuth();

  // ── Products Catalog (Only from API) ──
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // ── Categories (Only from API) ──
  const [categories, setCategories] = useState([]);

  // ── Cart & Wishlist (Client Session Persisted) ──
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("dhanus_store_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("dhanus_store_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dhanus_store_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dhanus_store_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ── Orders (Only from API) ──
  const [orders, setOrders] = useState([]);

  // ── Sellers List (Only from API) ──
  const [sellers, setSellers] = useState([]);

  // ── Coupons (Only from API) ──
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // ── Filters & Search ──
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch Real Categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catData = await categoryService.getCategories();
        if (Array.isArray(catData)) {
          setCategories(catData);
        }
      } catch (err) {
        console.warn("Categories fetch err:", err.message);
      }
    };
    fetchCats();
  }, []);

  // Fetch Real Sellers on mount
  useEffect(() => {
    const fetchSellersList = async () => {
      try {
        const sellerData = await sellerService.getAllSellers();
        if (Array.isArray(sellerData)) {
          setSellers(sellerData);
        }
      } catch (err) {
        console.warn("Sellers fetch err:", err.message);
      }
    };
    fetchSellersList();
  }, []);

  // Fetch Real Coupons on mount
  useEffect(() => {
    const fetchCouponsList = async () => {
      try {
        const couponsData = await couponService.getAllCoupons();
        if (Array.isArray(couponsData)) {
          setCoupons(couponsData);
        }
      } catch (err) {
        console.warn("Coupons fetch err:", err.message);
      }
    };
    fetchCouponsList();
  }, []);

  // Fetch Real Products on mount & when filter changes (debounced)
  const debounceTimerRef = useRef(null);

  const fetchCatalog = useCallback(async (query = "", category = "All") => {
    setIsLoadingProducts(true);
    try {
      const params = {};
      if (query.trim()) params.search = query.trim();
      if (category && category !== "All") params.category = category;
      const prods = await productService.getProducts(params);
      setProducts(Array.isArray(prods) ? prods : []);
    } catch (err) {
      console.warn("Product catalog fetch error:", err.message);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      fetchCatalog(searchQuery, selectedCategory);
    }, 300);

    return () => clearTimeout(debounceTimerRef.current);
  }, [searchQuery, selectedCategory, fetchCatalog]);

  // Fetch Real Orders based on authenticated user / role
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        let fetchedOrders = [];
        if (role === "admin") {
          fetchedOrders = await orderService.getAllOrders("All");
        } else if (role === "seller") {
          fetchedOrders = await orderService.getSellerOrders();
        } else if (user) {
          fetchedOrders = await orderService.getMyOrders();
        }
        if (Array.isArray(fetchedOrders)) {
          setOrders(fetchedOrders);
        }
      } catch (err) {
        console.warn("Orders fetch err:", err.message);
      }
    };
    if (user) {
      fetchOrdersData();
    } else {
      setOrders([]);
    }
  }, [user, role]);

  // ── Cart Actions ──
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
    toast.success(`Added ${product.title?.slice(0, 24) || "Item"}... to bag`, { icon: "🛒" });
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId || item.productId === productId
          ? { ...item, quantity }
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
        toast("Removed from Wishlist", { icon: "💔" });
        return prev.filter((id) => id !== productId);
      } else {
        toast.success("Saved to Wishlist", { icon: "❤️" });
        return [...prev, productId];
      }
    });
  };

  // ── Coupon Actions ──
  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      toast.error("Please enter a valid coupon code");
      return false;
    }
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    try {
      const valid = await couponService.validateCoupon(code, subtotal);
      if (valid) {
        setAppliedCoupon(valid);
        toast.success(`Coupon "${valid.code}" applied!`, { icon: "🏷️" });
        return true;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired coupon code");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast("Coupon removed");
  };

  // ── Order Placement with Razorpay + Live Order Creation ──
  const createOrder = async ({
    shippingAddress,
    paymentMethod,
    customerDetails,
    paymentTransactionId,
    paymentStatus,
  }) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return null;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.18);
    const shippingFee = subtotal > 1000 ? 0 : 99;

    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === "percentage") {
        discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discountAmount = appliedCoupon.value;
      }
    }

    const totalAmount = Math.max(0, subtotal + tax + shippingFee - discountAmount);

    try {
      // 1. Initialize payment order
      try {
        await paymentService.createPaymentOrder({
          amount: totalAmount,
          currency: "INR",
        });
      } catch (payErr) {
        console.warn("Payment order init notice:", payErr.message);
      }

      // 2. Persist order to backend API
      const finalPhone =
        shippingAddress?.phone || customerDetails?.mobile || user?.mobile || "";

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
        couponCode: appliedCoupon?.code || null,
        totalAmount,
        subtotal,
        discount: discountAmount,
        tax,
        shippingFee,
      };

      const created = await orderService.createOrder(orderPayload);
      const finalizedOrder = {
        ...created,
        id: created.id || created._id,
        orderNumber: created.orderNumber,
        customerName: user?.name || customerDetails?.name,
        customerMobile: finalPhone,
        items: [...cart],
        totalAmount,
        paymentStatus: paymentStatus || "PAID",
        orderStatus: created.orderStatus || "Placed",
      };

      setOrders((prev) => [finalizedOrder, ...prev]);
      clearCart();
      setAppliedCoupon(null);

      toast.success(`Order placed successfully!`, {
        icon: "🎉",
        duration: 5000,
      });

      return finalizedOrder;
    } catch (err) {
      toast.error(err.response?.data?.message || "Order placement failed");
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, newStatus, note = "") => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus, note });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId || o._id === orderId ? { ...o, orderStatus: newStatus } : o
        )
      );
      toast.success(`Order status updated to: ${newStatus}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const cancelOrder = async (orderId, reason = "Customer cancellation") => {
    try {
      await orderService.cancelOrder(orderId, { reason });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId || o._id === orderId
            ? {
                ...o,
                orderStatus: "Cancelled",
                cancellationReason: reason,
                paymentStatus: "REFUNDED",
              }
            : o
        )
      );
      toast.success("Order cancelled", { icon: "↩️" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

  // ── Product Management ──
  const addProduct = async (prodData) => {
    try {
      const created = await productService.createProduct(prodData);
      setProducts((prev) => [created, ...prev]);
      toast.success(`"${created.title || 'Product'}" listed in store catalog!`, { icon: "✨" });
      return created;
    } catch (err) {
      toast.error(err.response?.data?.message || "Product upload failed");
      throw err;
    }
  };

  const updateProduct = async (productId, updates) => {
    try {
      await productService.updateProduct(productId, updates);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId || p._id === productId ? { ...p, ...updates } : p
        )
      );
      toast.success("Product updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Product update failed");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prev) =>
        prev.filter((p) => p.id !== productId && p._id !== productId)
      );
      toast.success("Product deleted from catalog");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  // ── Seller Moderation (Admin) ──
  const approveSeller = async (sellerId) => {
    try {
      await sellerService.moderateSeller(sellerId, "Approved");
      setSellers((prev) =>
        prev.map((s) => (s.id === sellerId || s._id === sellerId ? { ...s, status: "Approved" } : s))
      );
      toast.success("Seller store approved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve seller");
    }
  };

  const rejectSeller = async (sellerId) => {
    try {
      await sellerService.moderateSeller(sellerId, "Rejected");
      setSellers((prev) =>
        prev.map((s) => (s.id === sellerId || s._id === sellerId ? { ...s, status: "Rejected" } : s))
      );
      toast.error("Seller application rejected");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject seller");
    }
  };

  const registerSeller = async (sellerData) => {
    try {
      const res = await authService.registerSeller(sellerData);
      if (res.user) {
        setSellers((prev) => [res.user, ...prev]);
        toast.success(`Seller store "${res.user.storeName}" registered!`, { icon: "🏬" });
        return res.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Seller registration failed");
      throw err;
    }
  };

  // ── Coupons Management (Admin) ──
  const createCoupon = async (couponData) => {
    try {
      const created = await couponService.createCoupon(couponData);
      setCoupons((prev) => [created, ...prev]);
      toast.success(`Coupon code "${couponData.code}" created!`);
      return created;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create coupon");
    }
  };

  const deleteCoupon = (code) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    toast.success(`Coupon "${code}" deleted`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        isLoadingProducts,
        fetchCatalog,
        categories,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        sellers,
        approveSeller,
        rejectSeller,
        registerSeller,
        addProduct,
        updateProduct,
        deleteProduct,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        createCoupon,
        deleteCoupon,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

export default StoreContext;
