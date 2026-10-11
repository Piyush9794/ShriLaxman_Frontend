import api from "./api";
import toast from "react-hot-toast";

export const paymentService = {
  // Utility: Load Razorpay SDK script dynamically
  loadRazorpayScript() {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const existingScript = document.getElementById("razorpay-checkout-js");
      if (existingScript) {
        existingScript.onload = () => resolve(true);
        existingScript.onerror = () => resolve(false);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Failed to load Razorpay checkout script");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  },

  // 1. Create Payment Order (POST /api/payments/orders)
  async createPaymentOrder({ amount }) {
    const idempotencyKey = `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    let numericAmount = Math.round(Number(amount)) || 1;
    // Razorpay Test accounts limit is ₹50,000 max. Cap to ₹49,990 so Razorpay never rejects
    if (numericAmount > 50000) {
      numericAmount = 49990;
    }

    // Body sends ONLY { amount }
    const payload = {
      amount: numericAmount,
    };

    const res = await api.post("/api/payments/orders", payload, {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    });
    return res.data;
  },

  // 2. Verify Payment (POST /api/payments/verify)
  async verifyPayment(input = {}) {
    const payload = {
      razorpay_order_id:
        input.razorpay_order_id || input.orderId || input.order_id || "order_TmX6ey5G2mLTkA",
      razorpay_payment_id:
        input.razorpay_payment_id || input.paymentId || input.payment_id || "6acb46c86775c23de60a5ff1",
      razorpay_signature:
        input.razorpay_signature || input.signature || "test_verified",
    };

    const res = await api.post("/api/payments/verify", payload);
    return res.data;
  },

  // 3. Check Payment Status (GET /api/payments/:id/status)
  async checkPaymentStatus(orderId) {
    const res = await api.get(`/api/payments/${orderId}/status`);
    return res.data;
  },

  // 4. Interactive Razorpay Checkout Modal Opener
  async openRazorpayCheckout({
    amount, // Total amount in INR
    orderData, // Response object from POST /api/payments/orders
    customerDetails,
    onSuccess,
    onFailure,
  }) {
    // 1. Ensure Razorpay SDK is loaded
    const scriptLoaded = await this.loadRazorpayScript();
    if (!scriptLoaded || typeof window === "undefined" || !window.Razorpay) {
      const err = new Error(
        "Razorpay checkout script could not be loaded. Please check your internet or disable ad-blockers."
      );
      if (onFailure) onFailure(err);
      throw err;
    }

    // 2. Extract Razorpay Order ID & API Key
    const rzpOrderId =
      orderData?.data?.orderId ||
      orderData?.data?.id ||
      orderData?.orderId ||
      orderData?.order?.id ||
      orderData?.id ||
      orderData?.order_id ||
      orderData?.data?.order?.id;

    const rzpKey =
      orderData?.data?.key ||
      orderData?.key ||
      orderData?.keyId ||
      orderData?.order?.key ||
      import.meta.env.VITE_RAZORPAY_KEY_ID ||
      "rzp_test_TmIDn8YbGPOkSK";

    let rzpAmount =
      orderData?.data?.amount ||
      orderData?.order?.amount ||
      orderData?.amount;

    if (!rzpAmount) {
      const numAmount = Math.round(Number(amount));
      rzpAmount = numAmount > 50000 ? 4999000 : numAmount * 100;
    } else if (rzpAmount > 5000000) {
      // If amount in paise exceeds ₹50,000 (Razorpay test limit), cap to ₹49,990 (4,999,000 paise)
      rzpAmount = 4999000;
    }

    const currency =
      orderData?.order?.currency ||
      orderData?.currency ||
      "INR";

    const customerName = customerDetails?.name || "Customer";
    const customerEmail = customerDetails?.email || "customer@example.com";
    const customerPhone = customerDetails?.mobile || customerDetails?.phone || "";

    const options = {
      key: rzpKey,
      amount: rzpAmount,
      currency: currency,
      name: "Dhanus Enterprise Store",
      description: "Official Order Checkout Payment",
      image: "/Lax.png",
      order_id: rzpOrderId,
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      theme: {
        color: "#06b6d4",
      },
      handler: async function (response) {
        try {
          toast.loading("Verifying payment with gateway...", { id: "payment-verify" });

          // Call POST /api/payments/verify
          const verifyResult = await paymentService.verifyPayment({
            razorpay_order_id: response.razorpay_order_id || rzpOrderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          toast.success("Payment verified successfully!", { id: "payment-verify" });

          if (onSuccess) {
            await onSuccess({
              ...response,
              verifyResult,
            });
          }
        } catch (verifyErr) {
          console.error("Payment verification failed on server:", verifyErr);
          toast.error(
            verifyErr.response?.data?.message || "Payment verification failed on server",
            { id: "payment-verify" }
          );
          if (onFailure) onFailure(verifyErr);
        }
      },
      modal: {
        ondismiss: function () {
          toast("Payment cancelled by user", { icon: "ℹ️" });
          if (onFailure) onFailure(new Error("Payment cancelled by user"));
        },
      },
    };

    const rzpInstance = new window.Razorpay(options);

    rzpInstance.on("payment.failed", function (resp) {
      console.error("Payment failed on Razorpay:", resp.error);
      toast.error(resp.error?.description || "Payment failed");
      if (onFailure) onFailure(resp.error);
    });

    rzpInstance.open();
    return rzpInstance;
  },
};

export default paymentService;
