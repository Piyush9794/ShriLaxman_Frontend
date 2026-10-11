import api from "./api";

export const sellerService = {
  // 1. Seller Analytics from API
  async getAnalytics() {
    const res = await api.get("/api/sellers/analytics");
    return res.data.analytics || res.data.data || res.data;
  },

  // 2. Admin All Sellers from API
  async getAllSellers() {
    const res = await api.get("/api/sellers/all");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.sellers)) return data.sellers;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  // 3. Moderate Seller (Approved / Rejected)
  async moderateSeller(id, status) {
    const res = await api.patch(`/api/sellers/${id}/status`, { status });
    return res.data.seller || res.data.data || res.data;
  },
};

export default sellerService;
