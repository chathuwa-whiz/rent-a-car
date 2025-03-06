import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetVehicleQuery } from "../../redux/services/vehicleSlice";
import PayButton from "../components/PayButton";

export default function Payment() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const user = JSON.parse(localStorage.getItem("user"));

  // Extract booking details from URL params
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const address = searchParams.get("address");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // Fetch vehicle details from backend
  const { data: vehicle, isLoading, isError } = useGetVehicleQuery(id);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (isError || !vehicle) {
    return <div className="text-red-500 text-center mt-10">Vehicle not found!</div>;
  }

  // Calculate rental period (number of days)
  const start = new Date(startDate);
  const end = new Date(endDate);
  const rentalDays = Math.max(1, (end - start) / (1000 * 60 * 60 * 24) + 1);
  const totalPrice = (rentalDays * vehicle.price).toFixed(2);

  // Use authenticated user's email
  const userEmail = user?.email || "customer@example.com";

  // Booking details for PayHere
  const bookingDetails = {
    booking_id: `BOOKING-${id}-${Date.now()}`, // Unique booking ID
    amount: totalPrice,
    first_name: name?.split(" ")[0] || "Customer",
    last_name: name?.split(" ")[1] || "",
    email: userEmail,
    phone: phone,
    items: `${vehicle.brand} ${vehicle.model} - ${rentalDays} Days`,

    // Add the fields your PayButton references:
    vehicleId: id,       // The vehicle's ID
    startDate,           // For your booking dates
    endDate,             // ...
    address              // So booking.address is not undefined
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 xl:px-32 pt-24">
      <div className="flex justify-center items-center">
        {/* Booking Preview Section */}
        <div className="w-full lg:w-1/2 flex flex-col border border-graydark rounded-2xl">
          {/* Car Image */}
          <div className="relative h-32 sm:h-40 md:h-48 lg:h-56">
            <img
              src={vehicle.primaryImage}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Booking Details */}
          <div className="px-4 sm:px-8 md:px-12">
            <div className="flex justify-between p-4 border-b border-graydark">
              <div className="flex flex-col space-y-2 text-sm md:text-base text-graylight">
                <p>Name</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Address</p>
                <p>Rent</p>
                <p>Period</p>
                <p>Days</p>
              </div>
              <div className="flex flex-col space-y-2 text-sm md:text-base text-graydark text-right">
                <p>{name}</p>
                <p>{userEmail}</p>
                <p>{phone}</p>
                <p>{address}</p>
                <p>Rs.{vehicle.price} / {vehicle.rentalType}</p>
                <p>{startDate} to {endDate}</p>
                <p>{rentalDays} {rentalDays > 1 ? "days" : "day"}</p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="p-4">
              <p className="text-graydark text-sm md:text-base">You have to pay</p>
              <p className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
                Rs.{totalPrice}
              </p>
            </div>
          </div>

          {/* Pay Now Button - Using PayHere */}
          <div className="flex justify-center p-4">
            <PayButton booking={bookingDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
