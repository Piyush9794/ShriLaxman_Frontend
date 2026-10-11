import React, { useState } from "react";
import { User, Phone, Mail, Calendar, MapPin, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function CustomerProfilePage() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "Rahul Sharma",
    mobile: user?.mobile || "+91 98765 43210",
    age: user?.age ? String(user.age) : "26",
    email: user?.email || "rahul@example.com",
    city: user?.city || "Mumbai",
    state: user?.state || "Maharashtra",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      age: Number(form.age) || 25,
      email: form.email.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
          Customer Profile & Identity
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
          Updating your name here instantly updates the navbar, account greeting, dashboards, and orders across the entire application in real-time.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {isSaved && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Profile updated! Active name is now dynamically set to "{form.name}".</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white font-bold"
              />
              <User className="w-4 h-4 text-cyan-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-1">
              Test dynamic name: Change this name and watch it update throughout all Store headers immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Age <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="14"
                  max="110"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                Email Address
              </label>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                Optional
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com (Optional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                City
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                State
              </label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Save Profile & Update Dynamic Identity</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
