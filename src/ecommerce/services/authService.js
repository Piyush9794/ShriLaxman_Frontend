import api from "./api";

const AUTH_STORAGE_KEY = "dhanus_auth_user";
const TOKEN_KEY = "token";
const DHANUS_TOKEN_KEY = "dhanus_token";

export const authService = {
  // Retrieve currently cached user from active session
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Auth storage read error", e);
    }
    return null;
  },

  // Save or clear user session with token synchronization
  setCurrentUser(user, token = null) {
    if (user) {
      const activeToken =
        token ||
        user.token ||
        localStorage.getItem(TOKEN_KEY) ||
        localStorage.getItem(DHANUS_TOKEN_KEY);

      const userWithToken = {
        ...user,
        token: activeToken || user.token,
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithToken));
      if (activeToken) {
        localStorage.setItem(TOKEN_KEY, activeToken);
        localStorage.setItem(DHANUS_TOKEN_KEY, activeToken);
      }
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(DHANUS_TOKEN_KEY);
    }
  },

  // 1. Customer Registration
  async registerCustomer(customerData) {
    const payload = {
      name: customerData.name?.trim(),
      email: customerData.email?.trim(),
      password: customerData.password || "Password@123",
      mobile: customerData.mobile?.trim(),
      age: Number(customerData.age) || 25,
      city: customerData.city?.trim() || "Mumbai",
      state: customerData.state?.trim() || "Maharashtra",
      address:
        customerData.address ||
        customerData.street ||
        "Delivery Address",
    };

    const res = await api.post("/api/auth/customer/register", payload);
    const data = res.data;
    const user = data.user || data.customer || data.data?.user || data.data;
    const token = data.token || data.data?.token;
    if (user) {
      user.role = "customer";
      this.setCurrentUser(user, token);
    }
    return { success: true, user, token, message: data.message };
  },

  // 2. Customer Login
  async loginCustomer({ email, password }) {
    const res = await api.post("/api/auth/customer/login", { email, password });
    const data = res.data;
    const user = data.user || data.customer || data.data?.user || data.data;
    const token = data.token || data.data?.token;
    if (user) {
      user.role = "customer";
      this.setCurrentUser(user, token);
    }
    return { success: true, user, token, message: data.message };
  },

  // 3. Customer Profile
  async getCustomerProfile() {
    const res = await api.get("/api/auth/customer/me");
    const user = res.data.user || res.data.customer || res.data.data || res.data;
    if (user) {
      user.role = "customer";
      this.setCurrentUser(user);
    }
    return user;
  },

  // 4. Update Customer Profile
  async updateCustomerProfile(updates) {
    const res = await api.put("/api/auth/customer/profile", updates);
    const user = res.data.user || res.data.customer || res.data.data || res.data;
    if (user) {
      user.role = "customer";
      this.setCurrentUser(user);
    }
    return { success: true, user };
  },

  // 5. Seller Registration (Enterprise KYC)
  async registerSeller(sellerData) {
    const payload = {
      name: sellerData.name?.trim(),
      email: sellerData.email?.trim(),
      password: sellerData.password || "Seller@123",
      mobile: sellerData.mobile?.trim(),
      storeName: sellerData.storeName?.trim() || `${sellerData.name}'s Flagship Store`,
      storeDescription: sellerData.storeDescription || sellerData.category || "Enterprise Premium Retailer",
      sellerCategory: sellerData.sellerCategory || sellerData.category || "Electronics & Wearables",
      businessType: sellerData.businessType || "Private Limited",
      gstin: sellerData.gstin?.trim() || "27AAACN9988D1Z2",
      panNumber: sellerData.panNumber?.trim() || "AAACN9988D",
      bankAccount: sellerData.bankAccount?.trim() || "HDFC0001234 •••• 5541",
      ifscCode: sellerData.ifscCode?.trim() || "HDFC0001234",
      upiId: sellerData.upiId?.trim() || "seller@hdfcbank",
      city: sellerData.city?.trim() || "Bangalore",
      state: sellerData.state?.trim() || "Karnataka",
      businessAddress: sellerData.businessAddress || sellerData.address || "Tech Park, Koramangala",
    };

    const res = await api.post("/api/auth/seller/register", payload);
    const data = res.data;
    const user = data.user || data.seller || data.data?.seller || data.data;
    const token = data.token || data.data?.token;
    if (user) {
      user.role = "seller";
      this.setCurrentUser(user, token);
    }
    return { success: true, user, token, message: data.message };
  },

  // 6. Seller Login
  async loginSeller({ email, password }) {
    const res = await api.post("/api/auth/seller/login", { email, password });
    const data = res.data;
    const user = data.user || data.seller || data.data?.seller || data.data;
    const token = data.token || data.data?.token;
    if (user) {
      user.role = "seller";
      this.setCurrentUser(user, token);
    }
    return { success: true, user, token, message: data.message };
  },

  // 7. Seller Profile
  async getSellerProfile() {
    const res = await api.get("/api/auth/seller/me");
    const user = res.data.user || res.data.seller || res.data.data || res.data;
    if (user) {
      user.role = "seller";
      this.setCurrentUser(user);
    }
    return user;
  },

  // 8. Update Seller Profile
  async updateSellerProfile(updates) {
    const res = await api.put("/api/auth/seller/profile", updates);
    const user = res.data.user || res.data.seller || res.data.data || res.data;
    if (user) {
      user.role = "seller";
      this.setCurrentUser(user);
    }
    return { success: true, user };
  },

  // 9. Instant Demo Role Login via POST /api/auth/demo-login
  async loginAsDemo(roleKey = "customer") {
    const res = await api.post("/api/auth/demo-login", { role: roleKey });
    const data = res.data;
    const user = data.user || data.data?.user || data.data;
    const token = data.token || data.data?.token;
    if (user) {
      user.role = roleKey;
      this.setCurrentUser(user, token);
    }
    return user;
  },

  // Unified generic login wrapper
  async login({ email, password, role }) {
    const emailLower = (email || "").toLowerCase().trim();
    if (role === "admin" || emailLower.includes("admin")) {
      return this.loginAsDemo("admin");
    }
    if (role === "seller" || emailLower.includes("seller") || emailLower.includes("techcraft")) {
      return this.loginSeller({ email, password });
    }
    return this.loginCustomer({ email, password });
  },

  // Unified generic signup wrapper
  async signup(data) {
    if (data.role === "seller") {
      return this.registerSeller(data);
    }
    return this.registerCustomer(data);
  },

  // Profile update dispatch
  async updateProfile(updates) {
    const current = this.getCurrentUser();
    if (current?.role === "seller") {
      return this.updateSellerProfile(updates);
    }
    return this.updateCustomerProfile(updates);
  },

  // General getMe
  async getMe() {
    try {
      const res = await api.get("/api/auth/me");
      const user = res.data.user || res.data.data || res.data;
      if (user) {
        this.setCurrentUser(user);
        return user;
      }
    } catch {
      const curr = this.getCurrentUser();
      if (curr?.role === "seller") {
        return this.getSellerProfile();
      }
      if (curr?.role === "customer") {
        return this.getCustomerProfile();
      }
    }
    return this.getCurrentUser();
  },

  logout() {
    this.setCurrentUser(null);
  },
};

export default authService;
