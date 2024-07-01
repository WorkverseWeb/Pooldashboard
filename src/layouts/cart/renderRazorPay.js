import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
// import cryptojs from "crypto-js";
import CryptoJS from "crypto-js";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = ({
  displayRazorpay,
  orderDetails,
  onSuccess,
  onError,
  setDisplayRazorpay,
}) => {
  const paymentId = useRef(null);

  const initializeRazorpay = async (options) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.success", (response) => {
      console.log("Payment successful inside Razorpay instance:", response);
      onSuccess(response);
    });
    rzp1.on("payment.error", (error) => {
      console.log("Payment error inside Razorpay instance:", error);
      onError(error);
    });
    rzp1.on("payment.cancel", () => {
      console.log("Payment cancelled.");
    });

    rzp1.open();
  };

  useEffect(() => {
    if (displayRazorpay) {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderDetails.amount * 100,
        currency: orderDetails.currency,
        name: "WORKVERSE",
        description: "Payment for your order",
        order_id: orderDetails.orderId,
        handler: (response) => {
          console.log("Payment successful inside handler:", response);
          paymentId.current = response.razorpay_payment_id;
          onSuccess(response);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#000",
        },
      };

      initializeRazorpay(options);
      setDisplayRazorpay(false);
    }
  }, [displayRazorpay, orderDetails, onSuccess, onError, setDisplayRazorpay]);

  return <></>;
};

RenderRazorpay.propTypes = {
  orderDetails: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  displayRazorpay: PropTypes.func.isRequired,
  setDisplayRazorpay: PropTypes.func.isRequired,
};

export default RenderRazorpay;
