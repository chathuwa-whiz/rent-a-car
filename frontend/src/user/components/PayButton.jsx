import React from "react";

const PayButton = ({ booking }) => {
  const handlePayment = async () => {
    try {
      // Fetch hash from backend
      const response = await fetch("http://localhost:5010/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const data = await response.json();
      if (!data.success) {
        console.error("Payment Initialization Failed:", data.message);
        alert("Payment failed: " + data.message);
        return;
      }

      const payment = {
        sandbox: true,
        merchant_id: data.merchant_id,
        return_url: "http://localhost:5173/user/profile/rentals",
        cancel_url: undefined,
        notify_url: "http://localhost:5010/api/payhere/notify",
        order_id: booking.booking_id,  // Updated from order_id to booking_id
        items: booking.items,
        amount: Number(booking.amount).toFixed(2),
        currency: "LKR",
        first_name: booking.first_name,
        last_name: booking.last_name,
        email: booking.email,
        phone: booking.phone,
        address: booking.address || "No Address Provided",
        city: booking.city || "No City Provided",
        country: booking.country || "Sri Lanka",
        // delivery_address: "Colombo",
        // delivery_city: "Colombo",
        // delivery_country: "Sri Lanka",
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
      className= "w-full from-gasolindark to-gasolinlight from-20% bg-gradient-to-b text-white font-semibold rounded-lg p-3 md:p-4 hover:opacity-90 transition-opacity mt-4 mx-4 mb-4"
    >
      Pay Now
    </button>
  );
};

export default PayButton;
