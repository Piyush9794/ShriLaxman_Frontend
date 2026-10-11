import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import { getStoredToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync token whenever user changes
  useEffect(() => {
    if (user) {
      const activeToken = user.token || getStoredToken();
      setToken(activeToken);
      authService.setCurrentUser(user, activeToken);
    }
  }, [user]);

  // Restore user identity on page refresh via backend API
  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = getStoredToken();
      if (!savedToken) return;

      try {
        setLoading(true);
        const restored = await authService.getMe();
        if (restored) {
          setUser((prev) => ({ ...(prev || {}), ...restored, token: savedToken }));
        }
      } catch (err) {
        console.warn("Session restore warning:", err.message);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // 1. Customer Login
  const loginCustomer = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await authService.loginCustomer({ email, password });
      if (res.user) {
        setUser(res.user);
        if (res.token) setToken(res.token);
        toast.success(`Welcome back, ${res.user.name || "Customer"}!`, { icon: "👋" });
        return res.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Customer login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 2. Customer Registration
  const registerCustomer = async (customerData) => {
    setLoading(true);
    try {
      const res = await authService.registerCustomer(customerData);
      if (res.user) {
        setUser(res.user);
        if (res.token) setToken(res.token);
        toast.success(`Welcome to Dhanus, ${res.user.name}!`, { icon: "🎉" });
        return res.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 3. Seller Login
  const loginSeller = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await authService.loginSeller({ email, password });
      if (res.user) {
        setUser(res.user);
        if (res.token) setToken(res.token);
        toast.success(`Welcome to Seller Hub, ${res.user.storeName || res.user.name}!`, {
          icon: "🏬",
        });
        return res.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Seller login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 4. Seller Registration (Enterprise KYC)
  const registerSeller = async (sellerData) => {
    setLoading(true);
    try {
      const res = await authService.registerSeller(sellerData);
      if (res.user) {
        setUser(res.user);
        if (res.token) setToken(res.token);
        toast.success(
          `Store "${res.user.storeName}" registered! KYC status: ${res.user.status || "Approved"}`,
          { icon: "✨" }
        );
        return res.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Seller onboarding failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 5. Instant 1-Click Demo Login
  const loginAsDemo = async (roleKey) => {
    setLoading(true);
    try {
      const demoUser = await authService.loginAsDemo(roleKey);
      if (demoUser) {
        setUser(demoUser);
        setToken(demoUser.token || getStoredToken());
        toast.success(`Switched role to ${(demoUser.role || roleKey).toUpperCase()}: ${demoUser.name || "User"}`, {
          icon: "🎭",
        });
        return demoUser;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Demo login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Unified generic login handler
  const login = async ({ email, password, role }) => {
    if (role === "seller" || email?.toLowerCase().includes("seller")) {
      return loginSeller({ email, password });
    }
    if (role === "admin" || email?.toLowerCase().includes("admin")) {
      return loginAsDemo("admin");
    }
    return loginCustomer({ email, password });
  };

  // Unified generic signup handler
  const signup = async (data) => {
    if (data.role === "seller") {
      return registerSeller(data);
    }
    return registerCustomer(data);
  };

  // Dynamic Profile Updates
  const updateProfile = async (updates) => {
    setLoading(true);
    try {
      const res = await authService.updateProfile(updates);
      if (res.user) {
        setUser(res.user);
        toast.success(`Profile updated! Active identity: ${res.user.name}`, {
          icon: "✨",
        });
        return res.user;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    toast.success("Signed out successfully");
  };

  const isAuthenticated = Boolean(user && (token || user.token));
  const role = user?.role || "customer";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated,
        loading,
        login,
        signup,
        loginCustomer,
        registerCustomer,
        loginSeller,
        registerSeller,
        loginAsDemo,
        updateProfile,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
