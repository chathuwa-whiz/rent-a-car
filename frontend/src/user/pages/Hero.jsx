import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

const carData = [
  {
    name: "BMW M3 SEDAN",
    price: "$600",
    image: "/hero.png",
  },
  {
    name: "Toyota Corolla",
    price: "$400",
    image: "/hero2.png",
  },
];

export default function Hero() {
  const [currentCar, setCurrentCar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCar((prev) => (prev + 1) % carData.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

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

        {/* Main Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCar}
            initial={{ x: 100, opacity: 0 }} // Slide in from right
            animate={{ x: 0, opacity: 1 }} // Smoothly appear
            exit={{ x: -100, opacity: 0 }} // Slide out to left
            transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
            className="text-white text-left md:text-left"
          >
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

            {/* Pricing Section (Auto-Switching Car Details) */}
            <div className="mt-2 transition-opacity duration-500 ease-in-out">
              <p className="text-sm lg:text-2xl font-bold pb-2">{carData[currentCar].name}</p>
              <p className="text-darkred text-sm lg:text-xl font-bold inline tracking-wider">
                {carData[currentCar].price}
              </p>
              <span className="text-sm lg:text-lg font-bold text-graylight "> / Per Day</span>
            </div>

            {/* Booking Button */}
            <button className="mt-6 lg:mt-12 px-8 lg:px-12 py-2 lg:py-3 border-2 cursor-pointer border-gasolindark text-sm lg:text-lg font-semibold rounded-[2px] hover:bg-gasolinlight hover:border-gasolinlight transition">
              Book Now
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Car Image Wrapper with Framer Motion (Slide-in Effect) */}
      <div className="absolute bottom-0 -md:bottom-10 md:-right-20 w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[40rem] xl:w-[50rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentCar}
            src={carData[currentCar].image}
            alt={carData[currentCar].name}
            className="w-full object-contain"
            initial={{ x: "100%", opacity: 0 }} // Start position (off-screen to the right)
            animate={{ x: 0, opacity: 1 }} // Slide in smoothly
            exit={{ x: "-100%", opacity: 0 }} // Slide out to the left
            transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition effect
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
