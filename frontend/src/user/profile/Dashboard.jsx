import React from "react";
import { format } from 'date-fns';
import userImage from "./assets/i55.png";
import { useGetUserBookingsQuery } from "../../redux/services/bookingSlice";


export default function Dashboard() {

  const { data: bookings, isSuccess, isLoading, refetch } = useGetUserBookingsQuery();
  const user = JSON.parse(localStorage.getItem("user"));

  // Add this helper function at the top of your component
  const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm');

  const activeRentals = bookings?.filter(
    (booking) => {
      const currentDate = new Date();
      const from = new Date(booking.dates.from);
      const to = new Date(booking.dates.to);
      if (from <= currentDate && to >= currentDate) {
        return booking;
      }
    }
  )

  // Sort bookings by date before displaying
  const sortedBookings = bookings?.slice().sort((a, b) => {
    return new Date(b.dates.from) - new Date(a.dates.from);
  });

  if (!isSuccess) {
    return (
      <div className="text-white px-3 sm:px-6 pb-6">
        <h3 className="text-2xl text-darkred font-semibold">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="text-white px-3 sm:px-6 pb-6">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-3 w-full">
        {/* Active Rentals */}
        <section className="bg-black px-3 sm:px-6 py-3 rounded-lg space-y-3 w-full lg:w-3/4">
          <h3 className="text-gasolinlight text-xl sm:text-2xl mb-4">Active Rentals</h3>

          {/* Active Rental Card */}
          {activeRentals.length > 0 ? activeRentals.map((rental, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8">
              {/* Car Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={rental.vehicle.primaryImage}
                  alt={rental.vehicle.model}
                  className="w-full h-auto object-cover rounded-lg max-w-[300px] mx-auto"
                />
              </div>

              {/* Car Details */}
              <div className="w-full md:w-1/3 text-center md:text-left space-y-2">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold">{rental.vehicle.brand} {rental.vehicle.model}</h4>
                <p className="text-darkred font-bold text-sm sm:text-base">{rental.vehicle.type}</p>
              </div>

              {/* Rental Dates */}
              <div className="w-full md:w-1/3">
                <div className="border border-gasolindark bg-primarybg rounded-lg p-3 sm:p-4 max-w-[300px] mx-auto">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base">From</span>
                      <span className="text-sm sm:text-base">: {formatDate(rental.dates.from)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base">To</span>
                      <span className="text-sm sm:text-base">: {formatDate(rental.dates.to)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : <h3 className="text-darkred text-center text-lg sm:text-xl">No active rentals</h3>}
        </section>

        {/* User Profile */}
        <section className="bg-black p-3 w-full lg:w-1/4 rounded-lg overflow-hidden mt-3 lg:mt-0 lg:block hidden">
          <div className="flex flex-col sm:flex-row lg:flex-col items-center text-center gap-4">
            <img
              src={userImage}
              alt="User"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
            />
            <h3 className="text-lg sm:text-xl font-semibold">{user.firstName} {user.lastName}</h3>
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex flex-col space-y-2">
              <p className="text-xs sm:text-sm text-graylight">Phone</p>
              <p className="text-xs sm:text-sm text-graylight">Email</p>
              <p className="text-xs sm:text-sm text-graylight">{user.identificationType === 'nic' ? 'NIC' : 'Passport'}</p>
              <p className="text-xs sm:text-sm text-graylight">Address</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xs sm:text-sm text-graylight">: {user.phone}</p>
              <p className="text-xs sm:text-sm text-graylight">: {user.email}</p>
              <p className="text-xs sm:text-sm text-graylight">: {user.identificationType === 'nic' ? user.nic : user.passport}</p>
              <p className="text-xs sm:text-sm text-graylight">: {user.address}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Rental History */}
      <div className="mt-6">
        <h3 className="text-darkred font-semibold text-xl sm:text-2xl">Rental History</h3>
        <div className="mt-4 space-y-4 px-2 sm:px-10">
          {sortedBookings?.slice(0,5).map((rental, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between bg-black py-4 px-3 sm:px-10 rounded-lg border border-gasolindark gap-4 sm:gap-0"
            >
              <img
                src={rental.vehicle.primaryImage}
                alt={rental.vehicle.model}
                className="w-full sm:w-40 max-w-[200px]"
              />
              <div className="text-center sm:text-left">
                <h4 className="text-xl sm:text-2xl font-bold">{rental.vehicle.brand} {rental.vehicle.model}</h4>
                <p className="text-darkred font-bold">{rental.vehicle.type}</p>
              </div>
              <div className="border border-darkred bg-primarybg rounded-lg px-3 sm:px-5 py-2 w-full sm:w-auto">
                <p className="flex justify-between gap-4 sm:gap-20">
                  <span>From</span>
                  <span>: {formatDate(rental.dates.from)}</span>
                </p>
                <p className="flex justify-between">
                  <span>To</span>
                  <span>: {formatDate(rental.dates.to)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};