import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetVehiclesQuery } from "../../redux/services/vehicleSlice";

export default function Hero() {
  const navigate = useNavigate();
  const [currentCar, setCurrentCar] = useState(0);
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  
  const { data: vehiclesData, isLoading } = useGetVehiclesQuery();
  
  // Select 3-5 vehicles to feature in the hero section
  useEffect(() => {
    if (vehiclesData && vehiclesData.length > 0) {
      // Pick 3-5 vehicles or however many you want to feature
      const featured = vehiclesData
        .filter(vehicle => vehicle.availability === "available") // Only show available vehicles
        .slice(0, 5); // Take the first 5 vehicles (you can modify this logic)
      
      setFeaturedVehicles(featured);
    }
  }, [vehiclesData]);

  // Auto-switch carousel
  useEffect(() => {
    if (featuredVehicles.length === 0) return;
    
    const intervalId = setInterval(() => {
      setCurrentCar((prev) => (prev + 1) % featuredVehicles.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [featuredVehicles]);

  if (isLoading || featuredVehicles.length === 0) {
    return <div className="min-h-screen bg-primarybg flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black via-[#1c1b1b] to-white md:bg-gradient-to-r md:from-black md:via-[#626262] md:to-white flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-hidden">
      
      {/* Left Section (Social Icons & Content) */}
      <div className="flex flex-row items-center justify-center md:justify-start gap-x-10 md:gap-x-16 w-full mt-20 md:mt-0 md:ml-4">
        
        {/* Social Icons */}
        <div className="flex flex-col mt-4 xl:mt-10 space-y-11 md:space-y-13 lg:space-y-16 xl:space-y-23 text-graydark">
          <FaFacebookF className="text-lg lg:text-xl cursor-pointer hover:text-graylight transition" />
          <FaFacebookMessenger className="text-lg lg:text-xl cursor-pointer hover:text-graylight transition" />
          <FaInstagram className="text-lg lg:text-xl cursor-pointer hover:text-graylight transition" />
          <FaWhatsapp className="text-lg lg:text-xl cursor-pointer hover:text-graylight transition" />
          <FaEnvelope className="text-lg lg:text-xl cursor-pointer hover:text-graylight transition" />
        </div>

        {/* Main Content */}
        <div className="text-white text-left md:text-left">
          <h1 className="text-4xl sm:text-4xl md:text-5xl xl:text-8xl mt-4 font-bold uppercase leading-none tracking-widest">
            Luxury <br /> Lifestyle <br /> Rentals
          </h1>

          {/* Decorative Lines */}
          <div className="flex justify-start gap-1 md:gap-2 mt-4 mb-6">
            <div className="w-8 md:w-10 lg:w-20 h-[4px] md:h-[6px] lg:h-[8px] bg-white rounded-full"></div>
            <div className="w-4 md:w-4 lg:w-6 h-[4px] md:h-[6px] lg:h-[8px] bg-white rounded-full"></div>
            <div className="w-4 md:w-4 lg:w-6 h-[4px] md:h-[6px] lg:h-[8px] bg-white rounded-full"></div>
            <div className="w-6 md:w-8 lg:w-14 h-[4px] md:h-[6px] lg:h-[8px] bg-white rounded-full"></div>
          </div>

          {/* Pricing Section (Animated Car Details) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCar}
              initial={{ x: -100, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: 100, opacity: 0 }} 
              transition={{ duration: 0.8, ease: "easeInOut" }} 
              className="mt-2 transition-opacity duration-500 ease-in-out"
            >
              <p className="text-sm lg:text-2xl font-bold pb-2">{featuredVehicles[currentCar]?.brand} {featuredVehicles[currentCar]?.model}</p>
              <p className="text-darkred text-sm lg:text-xl font-bold inline tracking-wider">
                Rs.{featuredVehicles[currentCar]?.price}
              </p>
              <span className="text-sm lg:text-lg font-bold text-graylight"> / {featuredVehicles[currentCar]?.rentalType}</span>
            </motion.div>
          </AnimatePresence>

          {/* Booking Button */}
          <button 
            onClick={() => navigate(`/vehicle/${featuredVehicles[currentCar]?.id}`)}
            className="mt-6 lg:mt-12 px-8 lg:px-12 py-2 lg:py-3 border-2 cursor-pointer border-gasolindark text-sm lg:text-lg font-semibold rounded-[2px] hover:bg-gasolinlight hover:border-gasolinlight transition">
            Book Now
          </button>
        </div>     
      </div>

      {/* Car Image Wrapper with Framer Motion (Slide-in Effect) */}
      <div className="absolute bottom-0 -md:bottom-10 md:-right-20 w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[40rem] xl:w-[50rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentCar}
            src={featuredVehicles[currentCar]?.primaryImage}
            alt={`${featuredVehicles[currentCar]?.brand} ${featuredVehicles[currentCar]?.model}`}
            className="w-full object-contain"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
