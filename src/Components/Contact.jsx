import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  MessageSquare,
} from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMobile, setCopiedMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyMobile = () => {
    navigator.clipboard.writeText(personalInfo.mobile);
    setCopiedMobile(true);
    setTimeout(() => setCopiedMobile(false), 2000);
  };

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


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Submit click par validation
  //   const isValid = validate();

  //   if (!isValid) {
  //     return;
  //   }

  //   // Prevent multiple submissions
  //   if (isSubmitting) return;

  //   setIsSubmitting(true);

  //   try {
  //     const API_URL =
  //       import.meta.env.VITE_API_URL || "http://localhost:5000";

  //     const response = await fetch(`${API_URL}/api/contact`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: formData.name.trim(),
  //         email: formData.email.trim(),
  //         mobile: formData.mobile.trim(),
  //         subject: formData.subject.trim(),
  //         message: formData.message.trim(),
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok || !data.success) {
  //       throw new Error(data.message || "Failed to submit message");
  //     }

  //     // Success
  //     setSubmitted(true);
  //     setErrors({});

  //     setFormData({
  //       name: "",
  //       email: "",
  //       mobile: "",
  //       subject: "",
  //       message: "",
  //     });
  //   } catch (error) {
  //     console.error("Submission error:", error);

  //     alert(
  //       error.message ||
  //       "Unable to reach the server. Please try again later."
  //     );
  //   } finally {
  //     // Response/error dono cases mein button enable hoga
  //     setIsSubmitting(false);
  //   }
  // };


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };


  const showCooldownToast = (initialSeconds = 120) => {
    let remaining = initialSeconds;

    const toastId = toast.loading(
      `Message received! Please wait ${formatTime(remaining)} before sending another message.`,
      {
        duration: Infinity,
      }
    );

    const interval = setInterval(() => {
      remaining--;

      if (remaining <= 0) {
        clearInterval(interval);

        toast.success(
          "You can send another message now.",
          {
            id: toastId,
            duration: 5000,
          }
        );

        return;
      }

      toast.loading(
        `Message received! Please wait ${formatTime(remaining)} before sending another message.`,
        {
          id: toastId,
          duration: Infinity,
        }
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
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

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

      // ==========================================
      // 2 MINUTE COOLDOWN FROM BACKEND
      // ==========================================
      if (response.status === 429) {
        const remainingSeconds = data.remainingSeconds || 120;

        showCooldownToast(remainingSeconds);

        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit message");
      }

      // ==========================================
      // SUCCESS
      // ==========================================
      setSubmitted(true);
      setErrors({});

      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
      // 1️⃣ Pehle success toast
      toast.success("Your message has been sent successfully!", {
        duration: 3000,
      });
      // 2️⃣ THEN: Start 2-minute countdown after success toast
      setTimeout(() => {
        showCooldownToast(120);
      }, 3000);

    } catch (error) {
      console.error("Submission error:", error);

      toast.error(
        error.message ||
        "Unable to reach the server. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-100/40 dark:bg-zinc-950/50 border-t border-slate-200 dark:border-white/[0.04]">
      {/* Ambient background animated glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/05 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with fade-down */}
        <AnimateOnScroll animation="fade-down" duration={0.6} className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
            Let's build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              great together.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mt-4">
            Whether you have an upcoming project, freelance opportunity, or engineering opening, feel free to reach out directly.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards with fade-right */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Card */}
            <AnimateOnScroll animation="fade-right" duration={0.5}>
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="glow-card p-6 rounded-3xl relative overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 transition-transform"
                    >
                      <Mail className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Email Address</span>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white break-all mt-0.5">
                        {personalInfo.email}
                      </h4>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>
            </AnimateOnScroll>

            {/* Phone Card */}
            <AnimateOnScroll animation="fade-right" delay={0.1} duration={0.5}>
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="glow-card p-6 rounded-3xl relative overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 transition-transform"
                    >
                      <Phone className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Mobile Number</span>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mt-0.5">
                        {personalInfo.formattedMobile}
                      </h4>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyMobile}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy mobile to clipboard"
                  >
                    {copiedMobile ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>
            </AnimateOnScroll>

            {/* Location Card */}
            <AnimateOnScroll animation="fade-right" delay={0.2} duration={0.5}>
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="glow-card p-6 rounded-3xl relative overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-transform"
                  >
                    <MapPin className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Location Base</span>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mt-0.5">
                      {personalInfo.location}
                    </h4>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Contact Form with fade-left */}
          <AnimateOnScroll animation="fade-left" duration={0.7} className="lg:col-span-7">
            <div className="glow-card p-6 sm:p-8 md:p-10 rounded-3xl transition-shadow hover:shadow-xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4"
                    >
                      <Check className="w-7 h-7" />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">
                      Message Sent Successfully
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-md mb-6">
                      Thank you for reaching out! I have received your note and will get back to you shortly.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-xs font-mono text-slate-800 dark:text-zinc-300 transition-colors cursor-pointer border border-slate-300 dark:border-transparent"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-2 font-medium">
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 transition-colors shadow-sm"
                        />
                        {errors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-2 font-medium">
                          Your Email
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 transition-colors shadow-sm"
                        />
                        {errors.email && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-2 font-medium">
                          Mobile Number
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

                            // Remove error while typing valid input
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
                                mobile: "Enter a valid 10-digit Indian mobile number",
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border ${errors.mobile
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-300 dark:border-white/10 focus:border-cyan-500"
                            } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-sm focus:outline-none transition-colors shadow-sm`}
                        />

                        {errors.mobile && (
                          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                            {errors.mobile}
                          </p>
                        )}
                      </div>


                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-2 font-medium">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Project Inquiry / Frontend Collaboration"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 transition-colors shadow-sm"
                      />
                      {errors.subject && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-400 mb-2 font-medium">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell me about your project scope, timeline, or requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 transition-colors resize-none shadow-sm"
                      />
                      {errors.message && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.message}</p>}
                    </div>
                    <motion.button
                      whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl 
    bg-gradient-to-r from-cyan-400 to-sky-300 
    hover:from-cyan-300 hover:to-sky-200 
    text-slate-950 font-semibold text-sm transition-all
    shadow-[0_0_20px_rgba(56,189,248,0.3)]
    ${isSubmitting
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer"
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

                          <span>Sending...</span>
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
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
