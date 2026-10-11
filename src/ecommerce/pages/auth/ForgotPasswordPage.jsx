import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
      toast.success("Password reset instructions sent to " + email);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Reset Your Password
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          Enter your registered email address and we'll send you a password recovery link.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-slate-200/80 dark:border-white/10 shadow-xl">
        {isSent ? (
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recovery Link Dispatched
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Check your inbox at <span className="font-bold text-slate-800 dark:text-white">{email}</span>. Click the link to set a new password.
            </p>
            <Link
              to="/store/login"
              className="mt-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Registered Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs cursor-pointer shadow-md"
            >
              Send Password Recovery Link
            </button>

            <Link
              to="/store/login"
              className="text-center text-xs text-slate-500 hover:text-cyan-500 flex items-center justify-center gap-1.5 mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
