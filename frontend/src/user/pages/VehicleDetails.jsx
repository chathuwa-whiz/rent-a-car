import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVehicleQuery } from "../../redux/services/vehicleSlice";

export default function VehicleDetails() {
  const { id } = useParams(); // Get vehicle ID from URL
  const navigate = useNavigate();

  // Fetch vehicle details from backend
  const { data: vehicle, isLoading, isError } = useGetVehicleQuery(id);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (isError || !vehicle) {
    return <div className="text-red-500 text-center mt-10">Vehicle not found!</div>;
  }

  return (
    <div className="relative min-h-screen px-4 pt-24">
      {/* Main container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - inputs / basic input details */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:gap-10 lg:pr-8 xl:pr-32">
          {/* title & price */}
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

          {/* details */}
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

          {/* button */}
          <button 
            onClick={() => navigate(`/payment/${vehicle._id}`)}
            className="from-gasolindark to-gasolinlight from-20% bg-gradient-to-b text-white font-semibold rounded-lg p-2 md:p-3 hover:opacity-90 transition-opacity"
          >
            Book Now
          </button>
        </div>

        {/* Right side - vehicle images / description */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {/* Main large image */}
            <img
              src={vehicle.images[0]}
              alt={vehicle.brand}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
            />

            {/* Thumbnail images */}
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
          </div>

          {/* Description */}
          <p className="text-graydark text-sm md:text-base">{vehicle.description}</p>
        </div>
      </div>
    </div>
  );
}
