import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { TbCarSuvFilled } from "react-icons/tb";
import { IoCarSport } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa6";

export default function Specials() {
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(3);

  useEffect(() => {
    const updateCarsPerPage = () => {
      setCarsPerPage(window.innerWidth < 768 ? 1 : 3);
    };

    updateCarsPerPage();
    window.addEventListener("resize", updateCarsPerPage);
    return () => window.removeEventListener("resize", updateCarsPerPage);
  }, []);

  const cars = [
    { name: "HR-V Hybrid", type: "R Design", price: "$600", img: "/car3.webp" },
    { name: "Honda CR-V", type: "R Design", price: "$600", img: "/car2.webp" },
    { name: "Civic Type R", type: "R Design", price: "$600", img: "/car1.webp" },
    { name: "Honda CR-V", type: "R Design", price: "$600", img: "/car2.webp" },
    { name: "Civic Type R", type: "R Design", price: "$600", img: "/car1.webp" },
    { name: "HR-V Hybrid", type: "R Design", price: "$600", img: "/car3.webp" },
    { name: "HR-V Hybrid", type: "R Design", price: "$600", img: "/car3.webp" },
    { name: "Honda CR-V", type: "R Design", price: "$600", img: "/car2.webp" },
    { name: "Civic Type R", type: "R Design", price: "$600", img: "/car1.webp" },
    { name: "Honda CR-V", type: "R Design", price: "$600", img: "/car2.webp" },
    { name: "Civic Type R", type: "R Design", price: "$600", img: "/car1.webp" },
    { name: "HR-V Hybrid", type: "R Design", price: "$600", img: "/car3.webp" },
  ];

  const totalPages = Math.ceil(cars.length / carsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  return (
    <div className="relative text-white py-8 px-4 md:px-16 h-auto md:h-[85vh]">
      {/* Background Text */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <h1 className="text-[6rem] text-black md:text-[22rem] font-extrabold uppercase opacity-10 ">
          RENTALS
        </h1>
      </div>

      {/* Header Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center mt-6 md:mt-10 mb-12 md:mb-20">
        <h2 className="text-xl mb-6 md:mb-0 md:text-2xl font-bold">TODAY SPECIALS</h2>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Car Categories */}
          <div className="flex flex-wrap md:flex-nowrap cursor-pointer gap-4 md:gap-6 text-sm md:text-lg mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <TbCarSuvFilled className="text-lg md:text-xl" />
              <span className="text-xs md:text-sm">SUV</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCarSide className="text-lg md:text-xl" />
              <span className="text-xs md:text-sm">LUXURY</span>
            </div>
            <div className="flex items-center gap-2">
              <IoCarSport className="text-lg md:text-xl" />
              <span className="text-xs md:text-sm">SPORT CARS</span>
            </div>
          </div>

          {/* View All Cars Button */}
          <button className="border-2 md:border-3 border-gasolindark px-6 md:px-8 py-2 rounded cursor-pointer hover:bg-gasolinlight hover:border-gasolinlight transition text-sm md:text-base">
            VIEW ALL CARS
          </button>
        </div>
      </div>

      {/* Car Listings Grid with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {currentCars.map((car, index) => (
            <motion.div key={index} className="text-center font-bold">
              <img src={car.img} alt={car.name} className="mx-auto w-48 md:w-56 h-28 md:h-36" />
              <h3 className="text-lg md:text-xl font-semibold mt-4">{car.name}</h3>
              <p className="text-graydark text-sm md:text-base">{car.type}</p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mt-2">
                <p className="text-gasolindark tracking-widest text-sm md:text-base">
                  {car.price} <span className="text-graydark tracking-wide">/ Per Day</span>
                </p>
                <button className="text-gasolindark flex items-center gap-1 md:gap-2 cursor-pointer hover:text-gasolinlight transition text-xs md:text-base">
                  DRIVE NOW <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 md:mt-10 gap-4 md:gap-6">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="text-graydark cursor-pointer hover:text-white text-lg md:text-xl"
        >
          <FaChevronLeft />
        </motion.button>
        <span className="text-base md:text-lg">{currentPage}</span>
        <span className="text-gray-500 text-sm md:text-base">/ {totalPages}</span>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="text-graydark cursor-pointer hover:text-white text-lg md:text-xl"
        >
          <FaChevronRight />
        </motion.button>
      </div>
    </div>
  );
}
