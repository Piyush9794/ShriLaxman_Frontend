import api from "./api";

export const orderService = {
  // 1. Create Order via live API
  async createOrder({ items, shippingAddress, paymentMethod, couponCode, totalAmount, subtotal, discount, tax, shippingFee }) {
    const formattedItems = (items || []).map((item) => ({
      productId: item.productId || item.id || item._id,
      title: item.title,
      price: Number(item.price),
      quantity: Number(item.quantity) || 1,
      thumbnail: item.thumbnail || item.image,
      sellerId: item.sellerId,
      sellerName: item.sellerName,
    }));

    const payload = {
      items: formattedItems,
      shippingAddress: {
        street: shippingAddress?.street || "Standard Delivery Address",
        city: shippingAddress?.city || "",
        state: shippingAddress?.state || "",
        pincode: shippingAddress?.pincode || "",
        phone: shippingAddress?.phone || shippingAddress?.mobile || "",
      },
      paymentMethod: paymentMethod || "Razorpay / UPI",
      couponCode: couponCode || null,
      totalAmount,
      subtotal,
      discount,
      tax,
      shippingFee,
    };

    const res = await api.post("/api/orders", payload);
    const data = res.data;
    return data.order || data.data || data;
  },

  // 2. Customer My Orders
  async getMyOrders() {
    const res = await api.get("/api/orders/my-orders");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.orders)) return data.orders;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  // 3. Seller Orders
  async getSellerOrders() {
    const res = await api.get("/api/orders/seller-orders");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.orders)) return data.orders;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  // 4. Admin All Orders
  async getAllOrders(status = "All") {
    const url = status && status !== "All"
      ? `/api/orders/all?status=${encodeURIComponent(status)}`
      : "/api/orders/all";
    const res = await api.get(url);
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.orders)) return data.orders;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  // 5. Update Order Status
  async updateOrderStatus(id, { status, note }) {
    const res = await api.put(`/api/orders/${id}/status`, { status, note });
    return res.data.order || res.data.data || res.data;
  },

  // 6. Cancel Order
  async cancelOrder(id, { reason }) {
    const res = await api.post(`/api/orders/${id}/cancel`, { reason });
    return res.data;
  },
};

export default orderService;
