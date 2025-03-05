import React from "react";
import { useGetPaymentHashMutation } from "../../redux/services/payhereSlice";

const PayButton = ({ booking }) => {
  const [getPaymentHash, { isLoading }] = useGetPaymentHashMutation();

  const handlePayment = async () => {
    try {
      // Fetch payment hash from the backend using Redux
      const { data, error } = await getPaymentHash(booking);

      if (error || !data.success) {
        console.error("Payment Initialization Failed:", error || data.message);
        alert("Payment failed: " + (error?.message || data.message));
        return;
      }

      const userEmail = localStorage.getItem("userEmail") || "no-email@example.com";

      const payment = {
        sandbox: true,
        merchant_id: data.merchant_id,
        return_url: "http://localhost:5173/user/profile/rentals",
        cancel_url: undefined,
        notify_url: "http://localhost:5010/api/payhere/notify",
        order_id: booking.booking_id,
        items: booking.items,
        amount: Number(booking.amount).toFixed(2),
        currency: "LKR",
        first_name: booking.first_name,
        last_name: booking.last_name,
        email: userEmail,
        phone: booking.phone,
        address: booking.address || "No Address Provided",
        city: booking.city || "No City Provided",
        country: booking.country || "Sri Lanka",
        hash: data.hash,
      };

      console.log("🔹 Sending Payment Request:", payment);

      payhere.onCompleted = function onCompleted(bookingId) {
        console.log("Payment Completed. Booking ID:", bookingId);
        alert("Payment Successful!");
        window.location.href = "/user/profile/rentals";
      };

      payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed by user");
        alert("Payment cancelled.");
      };

      payhere.onError = function onError(error) {
        console.error("PayHere Payment Error:", error);
        alert("Payment error: " + error);
      };

      payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment request failed. Check console for details.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full from-gasolindark to-gasolinlight from-20% bg-gradient-to-b text-white font-semibold rounded-lg p-3 md:p-4 hover:opacity-90 transition-opacity mt-4 mx-4 mb-4"
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default PayButton;
