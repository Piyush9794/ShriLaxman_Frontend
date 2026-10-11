import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { StoreProvider } from "../context/StoreContext";

// Layouts
import StoreLayout from "../layouts/StoreLayout";
import SellerLayout from "../layouts/SellerLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import StoreHomePage from "../pages/public/StoreHomePage";
import ProductListingPage from "../pages/public/ProductListingPage";
import ProductDetailPage from "../pages/public/ProductDetailPage";
import CartPage from "../pages/public/CartPage";
import WishlistPage from "../pages/public/WishlistPage";
import CheckoutPage from "../pages/public/CheckoutPage";
import BecomeSellerPage from "../pages/public/BecomeSellerPage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

// Customer Pages
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerOrdersPage from "../pages/customer/CustomerOrdersPage";
import CustomerOrderDetailPage from "../pages/customer/CustomerOrderDetailPage";
import CustomerProfilePage from "../pages/customer/CustomerProfilePage";
import CustomerAddressesPage from "../pages/customer/CustomerAddressesPage";

// Seller Pages
import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerProductsPage from "../pages/seller/SellerProductsPage";
import SellerProductNewPage from "../pages/seller/SellerProductNewPage";
import SellerOrdersPage from "../pages/seller/SellerOrdersPage";
import SellerAnalyticsPage from "../pages/seller/SellerAnalyticsPage";
import SellerEarningsPage from "../pages/seller/SellerEarningsPage";
import SellerSettingsPage from "../pages/seller/SellerSettingsPage";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminSellersPage from "../pages/admin/AdminSellersPage";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminCouponsPage from "../pages/admin/AdminCouponsPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";

export default function StoreRoutes() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Routes>
          {/* ── Public & Customer Store Layout Routes ── */}
          <Route path="/" element={<StoreLayout />}>
            <Route index element={<StoreHomePage />} />
            <Route path="products" element={<ProductListingPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="categories/:category" element={<ProductListingPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="become-seller" element={<BecomeSellerPage />} />

            {/* Auth */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />

            {/* Customer Portal */}
            <Route path="customer/dashboard" element={<CustomerDashboard />} />
            <Route path="customer/orders" element={<CustomerOrdersPage />} />
            <Route path="customer/orders/:id" element={<CustomerOrderDetailPage />} />
            <Route path="customer/profile" element={<CustomerProfilePage />} />
            <Route path="customer/addresses" element={<CustomerAddressesPage />} />
            <Route path="customer/settings" element={<CustomerProfilePage />} />
          </Route>

          {/* ── Dedicated Seller Portal Layout Routes ── */}
          <Route path="seller" element={<SellerLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="products" element={<SellerProductsPage />} />
            <Route path="products/new" element={<SellerProductNewPage />} />
            <Route path="inventory" element={<SellerProductsPage />} />
            <Route path="orders" element={<SellerOrdersPage />} />
            <Route path="analytics" element={<SellerAnalyticsPage />} />
            <Route path="earnings" element={<SellerEarningsPage />} />
            <Route path="settings" element={<SellerSettingsPage />} />
          </Route>

          {/* ── Dedicated Admin Portal Layout Routes ── */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="sellers" element={<AdminSellersPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="coupons" element={<AdminCouponsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/store" replace />} />
        </Routes>
      </StoreProvider>
    </AuthProvider>
  );
}
