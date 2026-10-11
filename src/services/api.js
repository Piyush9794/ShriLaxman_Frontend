import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getStoredToken = () => {
  try {
    const directToken =
      localStorage.getItem("token") || localStorage.getItem("dhanus_token");
    if (directToken) return directToken;

    const userRaw = localStorage.getItem("dhanus_auth_user");
    if (userRaw) {
      const parsed = JSON.parse(userRaw);
      return parsed.token || null;
    }
  } catch (err) {
    console.error("Error retrieving stored token:", err);
  }
  return null;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Token automatically
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let hasShownAuthToast = false;

// Response Interceptor: Catch 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("dhanus_token");

      if (!hasShownAuthToast) {
        hasShownAuthToast = true;
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          hasShownAuthToast = false;
        }, 4000);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
