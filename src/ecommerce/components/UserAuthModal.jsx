import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Calendar,
  Mail,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useEcommerce } from "../context/EcommerceContext";

export default function UserAuthModal() {
  const {
    isUserAuthModalOpen,
    setIsUserAuthModalOpen,
    currentUser,
    saveCustomerProfile,
  } = useEcommerce();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    age: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        mobile: currentUser.mobile || "",
        age: currentUser.age ? String(currentUser.age) : "",
        email: currentUser.email || "",
      });
    } else {
      setFormData({
        name: "",
        mobile: "",
        age: "",
        email: "",
      });
    }
    setErrors({});
  }, [currentUser, isUserAuthModalOpen]);

  if (!isUserAuthModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full Name is required";
    }

    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile Number is required";
    } else if (formData.mobile.replace(/\D/g, "").length < 10) {
      errs.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.age) {
      errs.age = "Age is required";
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum < 12 || ageNum > 110) {
        errs.age = "Please enter a valid age (12 - 110)";
      }
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address or leave blank";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let formattedMobile = formData.mobile.trim();
    if (!formattedMobile.startsWith("+") && formattedMobile.length === 10) {
      formattedMobile = `+91 ${formattedMobile}`;
    }

    saveCustomerProfile({
      name: formData.name,
      mobile: formattedMobile,
      age: formData.age,
      email: formData.email,
    });
  };

  const handleQuickDemoFill = () => {
    setFormData({
      name: "Piyush Vishwakarma",
      mobile: "+91 97941 25123",
      age: "24",
      email: "vishwakarmapiyush327@gmail.com",
    });
    setErrors({});
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsUserAuthModalOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#11131c] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10"
        >
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-br from-cyan-500/10 via-sky-500/10 to-transparent border-b border-slate-200/80 dark:border-white/10">
            <button
              onClick={() => setIsUserAuthModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold w-fit mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Onboarding</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              {currentUser ? "Update Customer Profile" : "Welcome to Dhanus Store"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
              Please enter your contact details to enable order updates, express checkout, and verified buyer warranty.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-5">
            {/* 1. Name (Required) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Piyush Vishwakarma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                    errors.name
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300/80 dark:border-white/10 focus:ring-cyan-500"
                  } text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2`}
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.name && (
                <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</p>
              )}
            </div>

            {/* 2. Mobile Number (Required) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                  Used for SMS Order Updates
                </span>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="e.g. 9794125123 or +91 97941 25123"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                    errors.mobile
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300/80 dark:border-white/10 focus:ring-cyan-500"
                  } text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2`}
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.mobile && (
                <p className="text-rose-500 text-xs mt-1 font-medium">{errors.mobile}</p>
              )}
            </div>

            {/* 3. Age (Required) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                Age <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="12"
                  max="110"
                  placeholder="e.g. 24"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                    errors.age
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300/80 dark:border-white/10 focus:ring-cyan-500"
                  } text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2`}
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.age && (
                <p className="text-rose-500 text-xs mt-1 font-medium">{errors.age}</p>
              )}
            </div>

            {/* 4. Email (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  Email Address
                </label>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Optional
                </span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="e.g. vishwakarmapiyush327@gmail.com (Optional)"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                    errors.email
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300/80 dark:border-white/10 focus:ring-cyan-500"
                  } text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Security Guarantee Notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 text-xs text-slate-600 dark:text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Your privacy is guaranteed. Verified customer credentials are authenticated strictly according to ISO/IEC e-commerce standards.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Fill Sample Data</span>
              </button>

              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Save & Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
