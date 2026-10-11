import api from "./api";

export const couponService = {
  // 1. Validate Coupon via live API
  async validateCoupon(code, orderAmount = 0) {
    const res = await api.post("/api/coupons/validate", {
      code: code.trim().toUpperCase(),
      orderAmount: Number(orderAmount),
    });
    return res.data.coupon || res.data.data || res.data;
  },

  // 2. Create Coupon (Admin)
  async createCoupon({ code, discountType, value, minOrder, maxDiscount }) {
    const payload = {
      code: code.trim().toUpperCase(),
      discountType: discountType || "percentage",
      value: Number(value),
      minOrder: Number(minOrder) || 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
    };

    const res = await api.post("/api/coupons", payload);
    return res.data.coupon || res.data.data || res.data;
  },

  // 3. Get All Coupons
  async getAllCoupons() {
    const res = await api.get("/api/coupons");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.coupons)) return data.coupons;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },
};

export default couponService;
