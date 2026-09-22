import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { X, Send, Check, MessageSquare } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open to prevent background page scroll
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow || "unset";
      };
    }
  }, [isOpen]);

  const validate = () => {
    const errs = {};

    // Name
    if (!formData.name.trim()) {
      errs.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errs.name = "Name can contain only letters";
    }

    // Email
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }

    // Mobile
    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      errs.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    // Subject
    if (!formData.subject.trim()) {
      errs.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }

    // Message
    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const showCooldownToast = (initialSeconds = 120) => {
    let remaining = initialSeconds;
    const toastId = toast.loading(
      `Message received! Please wait ${formatTime(remaining)} before sending another message.`,
      { duration: Infinity }
    );

    const interval = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(interval);
        toast.success("You can send another message now.", {
          id: toastId,
          duration: 5000,
        });
        return;
      }
      toast.loading(
        `Message received! Please wait ${formatTime(remaining)} before sending another message.`,
        { id: toastId, duration: Infinity }
      );
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        const remainingSeconds = data.remainingSeconds || 120;
        showCooldownToast(remainingSeconds);
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit message");
      }

      setSubmitted(true);
      setErrors({});
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });

      toast.success("Your message has been sent successfully!", {
        duration: 3000,
      });

      setTimeout(() => {
        showCooldownToast(120);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.message || "Unable to reach the server. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto overscroll-contain"
        >
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Dialog: Centered on Mobile, Tablet & Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0f1117] border border-slate-200 dark:border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden text-slate-900 dark:text-zinc-100 my-auto"
            style={{
              maxHeight: "min(92svh, 92dvh, 720px)",
            }}
          >
            {/* Header: Sticky at top of modal, always visible */}
            <div className="flex-shrink-0 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0f1117]/95 backdrop-blur-md">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                  <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-semibold leading-none">
                      Get In Touch
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Online
                    </span>
                  </div>
                  <h3
                    id="contact-modal-title"
                    className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight mt-0.5 truncate"
                  >
                    Let's Connect
                  </h3>
                </div>
              </div>

              {/* Prominent Close Button - Large touch target for mobile */}
              <motion.button
                type="button"
                whileHover={{ rotate: 90, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.15] text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer border border-slate-300/60 dark:border-white/10 shadow-sm flex-shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Form Body: Smooth hardware-accelerated scroll on all devices */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 pb-6 focus:outline-none"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-8 flex flex-col items-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4"
                    >
                      <Check className="w-7 h-7" />
                    </motion.div>
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-sm mb-6">
                      Thank you for reaching out. I have received your message and will respond as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSubmitted(false)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-xs font-mono text-slate-800 dark:text-zinc-300 transition-colors cursor-pointer border border-slate-300 dark:border-white/10"
                      >
                        Send Another Message
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-semibold text-xs font-mono transition-all cursor-pointer shadow-sm"
                      >
                        Close
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      Have a project in mind, an opportunity to discuss, or just want to say hello? Drop a message below and I’ll get back to you!
                    </p>

                    {/* Name & Email Row - 1 col on mobile, 2 col on tablet/desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-1.5 font-medium">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border ${
                            errors.name
                              ? "border-red-500 focus:border-red-500"
                              : "border-slate-300 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-400/80"
                          } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors shadow-sm`}
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-1.5 font-medium">
                          Your Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border ${
                            errors.email
                              ? "border-red-500 focus:border-red-500"
                              : "border-slate-300 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-400/80"
                          } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors shadow-sm`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Mobile & Subject Row - 1 col on mobile, 2 col on tablet/desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-1.5 font-medium">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setFormData({
                              ...formData,
                              mobile: value,
                            });
                            if (errors.mobile && /^[6-9]\d{9}$/.test(value)) {
                              setErrors({
                                ...errors,
                                mobile: "",
                              });
                            }
                          }}
                          onBlur={() => {
                            if (!formData.mobile.trim()) {
                              setErrors({
                                ...errors,
                                mobile: "Mobile number is required",
                              });
                            } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
                              setErrors({
                                ...errors,
                                mobile:
                                  "Enter a valid 10-digit Indian mobile number",
                              });
                            }
                          }}
                          className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border ${
                            errors.mobile
                              ? "border-red-500 focus:border-red-500"
                              : "border-slate-300 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-400/80"
                          } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors shadow-sm`}
                        />
                        {errors.mobile && (
                          <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                            {errors.mobile}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-1.5 font-medium">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Project Inquiry / Frontend"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border ${
                            errors.subject
                              ? "border-red-500 focus:border-red-500"
                              : "border-slate-300 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-400/80"
                          } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors shadow-sm`}
                        />
                        {errors.subject && (
                          <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-1.5 font-medium">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell me about your project scope, timeline, or requirements..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border ${
                          errors.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-300 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-400/80"
                        } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-base sm:text-sm focus:outline-none transition-colors resize-none shadow-sm`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={!isSubmitting ? { scale: 1.015, y: -1 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.985 } : {}}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl 
                        bg-gradient-to-r from-cyan-400 to-sky-300 
                        hover:from-cyan-300 hover:to-sky-200 
                        text-slate-950 font-semibold text-sm sm:text-base transition-all
                        shadow-[0_0_20px_rgba(56,189,248,0.25)]
                        ${
                          isSubmitting
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] cursor-pointer"
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
