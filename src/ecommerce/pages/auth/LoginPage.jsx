import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Zap, Shield, Store, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const loggedUser = await login({ email, password });
      if (loggedUser.role === "admin") {
        navigate("/store/admin/dashboard");
      } else if (loggedUser.role === "seller") {
        navigate("/store/seller/dashboard");
      } else {
        navigate("/store/customer/dashboard");
      }
    } catch {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (roleKey) => {
    try {
      const demoUser = await loginAsDemo(roleKey);
      if (demoUser.role === "admin") {
        navigate("/store/admin/dashboard");
      } else if (demoUser.role === "seller") {
        navigate("/store/seller/dashboard");
      } else {
        navigate("/store/customer/dashboard");
      }
    } catch (e) {
      console.warn("Demo login error:", e);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
          Sign In to Dhanus Store
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          Enter your credentials or choose a quick 1-click demo account below.
        </p>
      </div>

      {/* 1-Click Demo Persona Pills */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-300">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick 1-Click Demo Roles (Instant Evaluation)</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin("customer")}
            className="p-2 rounded-xl bg-white dark:bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1"
          >
            <User className="w-4 h-4 text-cyan-500" />
            <span className="text-[11px]">Customer</span>
            <span className="text-[9px] text-slate-400 truncate max-w-[80px]">Rahul Sharma</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("seller")}
            className="p-2 rounded-xl bg-white dark:bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1"
          >
            <Store className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px]">Seller</span>
            <span className="text-[9px] text-slate-400 truncate max-w-[80px]">Amit Verma</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("admin")}
            className="p-2 rounded-xl bg-white dark:bg-white/10 hover:bg-rose-500 hover:text-white text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1"
          >
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="text-[11px]">Admin</span>
            <span className="text-[9px] text-slate-400 truncate max-w-[80px]">Priya Singh</span>
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                Password
              </label>
              <Link
                to="/store/forgot-password"
                className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-extrabold text-xs shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isLoading ? "Signing In..." : "Sign In with Credentials"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/store/signup"
            className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}
