import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { TbCarSuvFilled } from "react-icons/tb";
import { IoCarSport } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetVehiclesQuery } from "../../redux/services/vehicleSlice";

export default function Specials() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(3);
  
  // Fetch vehicles data using Redux
  const { data: vehiclesData, isLoading, error } = useGetVehiclesQuery();

  // Transform vehicles data to match component's format
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (vehiclesData) {
      // Map API data to the format needed by the component
      const formattedCars = vehiclesData.map(vehicle => ({
        id: vehicle.id || vehicle._id,
        name: `${vehicle.brand} ${vehicle.model}`,
        type: vehicle.type || "R Design",
        price: `Rs.${vehicle.price}`, 
        img: vehicle.primaryImage || "/car1.webp" // Fallback to default image if no primaryImage
      }));
      
      setCars(formattedCars);
    }
  }, [vehiclesData]);

  useEffect(() => {
    const updateCarsPerPage = () => {
      setCarsPerPage(window.innerWidth < 768 ? 1 : 3);
    };

    updateCarsPerPage();
    window.addEventListener("resize", updateCarsPerPage);
    return () => window.removeEventListener("resize", updateCarsPerPage);
  }, []);

  const totalPages = Math.ceil((cars?.length || 0) / carsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-white">Loading special offers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-darkred">Error loading vehicles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative text-white py-8 px-10 lg:px-16 h-auto md:h-[85vh]">
      {/* Background Text */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <h1 className="text-[5rem] sm:text-[11rem] lg:text-[15rem] xl:text-[22rem] text-black  font-extrabold uppercase opacity-10 ">
          RENTALS
        </h1>
      </div>

      {/* Header Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center mt-6 md:mt-10 mb-12 md:mb-20">
        <h2 className=" text-lg lg:text-2xl mb-6 md:mb-0  font-bold">TODAY SPECIALS</h2>

        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
          {/* Car Categories */}
          <div className="flex flex-wrap md:flex-nowrap cursor-pointer gap-4 lg:gap-6 text-sm lg:text-md mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <TbCarSuvFilled className="text-lg lg:text-xl" />
              <span className="text-xs lg:text-sm">SUV</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCarSide className="text-lg lg:text-xl" />
              <span className="text-xs lg:text-sm">LUXURY</span>
            </div>
            <div className="flex items-center gap-2">
              <IoCarSport className="text-lg lg:text-xl" />
              <span className="text-xs lg:text-sm">SPORT CARS</span>
            </div>
          </div>

          {/* View All Cars Button */}
          <button onClick={() => navigate(`/fleet/`)} className="border-2 lg:border-3 border-gasolindark px-6 lg:px-8 py-2 rounded cursor-pointer hover:bg-gasolinlight hover:border-gasolinlight transition text-sm lg:text-base">
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
            <motion.div key={car.id} className="text-center font-bold">
              <img src={car.img} alt={car.name} className="mx-auto w-48 lg:w-56 h-28 lg:h-36 object-contain" />
              <h3 className="text-lg lg:text-xl font-semibold mt-4">{car.name}</h3>
              <p className="text-graydark text-sm lg:text-base">{car.type}</p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-2 lg:gap-4 mt-2">
                <p className="text-gasolindark tracking-widest text-sm lg:text-base">
                  {car.price} <span className="text-graydark tracking-wide">/ Per Day</span>
                </p>
                <button 
                  onClick={() => navigate(`/vehicle/${car.id}`)}
                  className="text-gasolindark flex items-center gap-1 lg:gap-2 cursor-pointer hover:text-gasolinlight transition text-xs lg:text-base">
                  DRIVE NOW <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
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
