import api from "./api";

export const adminService = {
  // 1. Admin Analytics from live API
  async getAnalytics() {
    const res = await api.get("/api/admin/analytics");
    return res.data.analytics || res.data.data || res.data;
  },

  // 2. Admin Users list from live API
  async getUsers() {
    const res = await api.get("/api/admin/users");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.users)) return data.users;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  // 3. Update User Status / Role
  async updateUser(id, updates) {
    const res = await api.patch(`/api/admin/users/${id}`, updates);
    return res.data.user || res.data.data || res.data;
  },
};

export default adminService;
