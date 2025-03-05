import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVehicleQuery } from "../../redux/services/vehicleSlice";

export default function VehicleDetails() {
  const { id } = useParams(); // Get vehicle ID from URL
  const navigate = useNavigate();

  // Fetch vehicle details from backend
  const { data: vehicle, isLoading, isError } = useGetVehicleQuery(id);

  // State for user input
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (isError || !vehicle) {
    return <div className="text-red-500 text-center mt-10">Vehicle not found!</div>;
  }

  const handleBookNow = () => {
    if (!name || !phoneNumber || !address || !startDate || !endDate) {
      alert("Please fill in all the required fields.");
      return;
    }

    navigate(`/payment/${vehicle._id}?name=${name}&phone=${phoneNumber}&address=${address}&startDate=${startDate}&endDate=${endDate}`);
  };

  return (
    <div className="relative min-h-screen px-4 pt-24">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left side - User Input Details */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:gap-10 lg:pr-8 xl:pr-32">
          {/* Title & Price */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-white">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-gasolindark">
                Rs.{vehicle.price}
              </span>
              <span className="text-base md:text-lg font-medium text-graydark">
                /{vehicle.rentalType}
              </span>
            </p>
          </div>

          {/* Vehicle Details */}
          <div className="flex">
            <div className="flex flex-col space-y-2 w-1/2 text-sm md:text-base text-graylight">
              <p>Security Deposit</p>
              <p>Includes</p>
              <p>Top Speed</p>
              <p>0-60 mph</p>
              <p>Transmission</p>
              <p>Seats</p>
              <p>Engine</p>
            </div>
            <div className="flex flex-col space-y-2 w-1/2 text-sm md:text-base text-graydark">
              <p>Rs.{vehicle.securityDeposit}</p>
              <p>{vehicle.includes}</p>
              <p>{vehicle.topSpeed} km/h</p>
              <p>{vehicle.acceleration} sec</p>
              <p>{vehicle.transmission}</p>
              <p>{vehicle.seats}</p>
              <p>{vehicle.engine}</p>
            </div>
          </div>

          {/* User Input Fields */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base"
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base"
            />
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base"
              />
              <p className="text-graydark hidden sm:block">to</p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Book Now Button */}
          <button 
            onClick={handleBookNow}
            className="from-gasolindark to-gasolinlight from-20% bg-gradient-to-b text-white font-semibold rounded-lg p-2 md:p-3 hover:opacity-90 transition-opacity"
          >
            Book Now
          </button>
        </div>

        {/* Right side - Vehicle Images & Description */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          {/* Main Image */}
          <div className="flex flex-col gap-4">
            <img
              src={vehicle.images[0]}
              alt={vehicle.brand}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-0">
            {vehicle.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${vehicle.brand} view ${index + 2}`}
                className="w-full h-24 md:h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>

          {/* Vehicle Description */}
          <p className="text-graydark text-sm md:text-base">{vehicle.description}</p>
        </div>
      </div>
    </div>
  );
}
