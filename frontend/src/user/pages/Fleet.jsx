import React, { useState, useEffect } from 'react'
import { TbSearch, TbArrowLeft, TbHeart, TbArrowRight, TbAdjustmentsHorizontal, TbX } from 'react-icons/tb'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Header from '../components/Header';

const carData = [
  {
    id: 1,
    brand: "Honda",
    model: "HR-V Hybrid",
    image: "/car-model.png",
    price: 120000,
    booked: true,
    type: "SUV",
    transmission: "Automatic",
    seats: 4,
    rentalType: "Per Day"
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    image: "/car-model.png",
    price: 150000,
    booked: false,
    type: "Sedan",
    transmission: "Automatic",
    seats: 4,
    rentalType: "Per Day"
  },
  {
    id: 3,
    brand: "Honda",
    model: "City",
    image: "/car-model.png",
    price: 100000,
    booked: false,
    type: "Sedan",
    transmission: "Automatic",
    seats: 4,
    rentalType: "Per Day"
  },
  {
    id: 4,
    brand: "Honda",
    model: "Accord",
    image: "/car-model.png",
    price: 200000,
    booked: false,
    type: "Sedan",
    transmission: "Automatic",
    seats: 4,
    rentalType: "Per Hours"
  },
  {
    id: 5,
    brand: "Nissan",
    model: "Sunny",
    image: "/car-model.png",
    price: 80000,
    booked: false,
    type: "Sedan",
    transmission: "Automatic",
    seats: 4,
    rentalType: "Per Day"
  },
  {
    id: 6,
    brand: "Nissan",
    model: "X-Trail",
    image: "/car-model.png",
    price: 180000,
    booked: false,
    type: "SUV",
    transmission: "Automatic",
    seats: 4,
    rentalType: "Per Hours"
  },
  {
    id: 7,
    brand: "Hyundai",
    model: "i10",
    image: "/car-model.png",
    price: 60000,
    booked: false,
    type: "Coupe",
    transmission: "Automatic",
    seats: 5,
    rentalType: "Per Day"
  }
];

const getModelsByBrand = (brand) => {
  return [...new Set(carData
    .filter(car => car.brand === brand)
    .map(car => car.model))];
};

const getUniqueBrands = () => {
  return [...new Set(carData.map(car => car.brand))];
};

export default function Fleet() {

  const [range, setRange] = useState([2000, 500000]);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    model: '',
    types: [],
    transmission: [],
    seats: '',
    availableOnly: false,
    rentalType: 'Any'
  });
  const [filteredCars, setFilteredCars] = useState(carData);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTypeToggle = (type) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const handleTransmissionToggle = (transmission) => {
    setFilters(prev => ({
      ...prev,
      transmission: prev.transmission.includes(transmission)
        ? prev.transmission.filter(t => t !== transmission)
        : [...prev.transmission, transmission]
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      model: '',
      types: [],
      transmission: [],
      seats: '',
      availableOnly: false,
      rentalType: 'Any'
    });
    setRange([2000, 500000]);
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    let result = carData;

    // Apply search filter
    if (filters.search) {
      result = result.filter(car => 
        car.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter(car => car.brand === filters.brand);
    }

    // Apply model filter
    if (filters.model) {
      result = result.filter(car => car.model === filters.model);
    }

    // Apply price range filter
    result = result.filter(car => car.price >= range[0] && car.price <= range[1]);

    // Apply type filters
    if (filters.types.length > 0) {
      result = result.filter(car => filters.types.includes(car.type));
    }

    // Apply transmission filters
    if (filters.transmission.length > 0) {
      result = result.filter(car => filters.transmission.includes(car.transmission));
    }

    // Apply seats filter
    if (filters.seats) {
      result = result.filter(car => car.seats.toString() === filters.seats);
    }

    // Apply available only filter
    if (filters.availableOnly) {
      result = result.filter(car => !car.booked);
    }

    // Apply rental type filter
    if (filters.rentalType !== 'Any') {
      result = result.filter(car => car.rentalType === filters.rentalType || car.rentalType === 'Any');
    }

    setCurrentPage(1);

    setFilteredCars(result);
  }, [filters, range]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='relative bg-primarybg min-h-screen px-4 pt-24'>
      {/* Mobile Filter Toggle Button */}
      <button 
        onClick={toggleFilter}
        className='lg:hidden fixed top-4 left-4 z-50 bg-gasolindark opacity-50 text-white p-2 rounded-full shadow-lg'
      >
        {isFilterVisible ? <TbX size={24} /> : <TbAdjustmentsHorizontal size={24} />}
      </button>

      <div className='flex flex-col lg:flex-row gap-x-5'>
        {/* Filtering system */}
        <div className={`fixed rounded-2xl h-full lg:relative top-0 left-0 w-full lg:w-1/4 bg-black text-white p-4 overflow-y-auto scrollbar-hide transition-transform duration-300 ease-in-out z-40 ${isFilterVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          {/* Search bar */}
          <div className='border border-graydark py-2 px-6 mx-5 rounded-xl flex justify-between items-center mb-5'>
            <input
              type="text"
              placeholder="Search"
              className='bg-transparent text-graydark w-full outline-none'
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <TbSearch className='text-graydark' />
          </div>

          {/* Reset button */}
          <div className='flex justify-between mb-5'>
            <div className='font-semibold text-2xl text-white'>Filters</div>
            <button 
              onClick={resetFilters}
              className='font-semibold text-gasolindark hover:text-gasolinlight'
            >
              Reset
            </button>
          </div>

          {/* Vehicle and model dropdowns */}
          <div className='flex justify-between gap-3 mb-5'>
            <select 
              className='py-2 px-6 rounded-lg bg-graydark w-full'
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">Select Brand</option>
              {getUniqueBrands().map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              className='py-2 px-6 rounded-lg bg-graydark w-full'
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
            >
              <option value="">Select Model</option>
              {filters.brand && getModelsByBrand(filters.brand).map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Price range */}
          <div className='mb-7'>
            <p className='mb-2'>Price range per day</p>
            <div className="relative mb-8">
              <div className="flex justify-between mb-4">
                <div className="bg-gradient-to-b from-gasolindark to-gasolinlight rounded px-3 py-1">
                  <span className="text-white text-sm">Rs.{range[0]}</span>
                </div>
                <div className="bg-gradient-to-b from-gasolindark to-gasolinlight rounded px-3 py-1">
                  <span className="text-white text-sm">Rs.{range[1]}</span>
                </div>
              </div>
              <Slider
                range
                min={2000}
                max={500000}
                value={range}
                onChange={handleRangeChange}
                trackStyle={[{ backgroundColor: '#177A65' }]}
                handleStyle={[
                  {
                    backgroundColor: '#177A65',
                    borderColor: '#24AC90',
                    opacity: 1
                  },
                  {
                    backgroundColor: '#177A65',
                    borderColor: '#24AC90',
                    opacity: 1
                  }
                ]}
                railStyle={{ backgroundColor: '#374151' }}
              />
            </div>
          </div>

          {/* Type */}
          <div className='mb-7'>
            <p className='mb-2'>Type</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 text-graydark'>
              {['Sedan', 'Coupe', 'Van', 'Wagon', 'SUV'].map((type) => (
                <div key={type} className='gap-2 flex items-center'>
                  <input
                    type='checkbox'
                    checked={filters.types.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className='accent-gasolindark'
                  />
                  <label>{type}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Transmission Type */}
          <div className='mb-7'>
            <p className='mb-2'>Transmission Type</p>
            <div className='grid grid-cols-2 gap-3 text-graydark'>
              {['Automatic', 'Manual'].map((trans) => (
                <div key={trans} className='gap-2 flex items-center'>
                  <input
                    type='checkbox'
                    checked={filters.transmission.includes(trans)}
                    onChange={() => handleTransmissionToggle(trans)}
                    className='accent-gasolindark'
                  />
                  <label>{trans}</label>
                </div>
              ))}
            </div>
          </div>

          {/* No of seats */}
          <div className='mb-7'>
            <p className='mb-2'>Number of seats</p>
            <select 
              className='py-1 px-10 rounded-lg border border-graydark text-graydark'
              value={filters.seats}
              onChange={(e) => handleFilterChange('seats', e.target.value)}
            >
              <option value="">Any</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <hr className='border border-graydark' />

          {/* Available now only */}
          <div className='mt-5 mb-7'>
            <div className='gap-2 flex items-center'>
              <label>Available now only</label>
              <input
                type='checkbox'
                checked={filters.availableOnly}
                onChange={(e) => handleFilterChange('availableOnly', e.target.checked)}
                className='accent-gasolindark'
              />
            </div>
          </div>

          {/* Rental type */}
          <div className='mb-7'>
            <p className='mb-2'>Rental Type</p>
            <div className='grid grid-cols-3 gap-2'>
              {['Any', 'Per Day', 'Per Hours'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange('rentalType', type)}
                  className={`rounded-lg py-2 text-center transition-colors ${
                    filters.rentalType === type
                      ? 'bg-gasolindark text-white'
                      : 'bg-graydark text-white hover:bg-gasolinlight'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle list */}
        <div className='w-full lg:w-3/4'>
          {/* <div className='flex gap-2 items-center mb-5'>
            <TbArrowLeft className='text-graydark' />
            <div className='font-bold text-graydark'>Back</div>
          </div> */}

          {/* Vehicle grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {currentCars.map(car => (
              <div key={car.id} className='rounded-2xl border border-graydark'>
                <div className='relative'>
                  <img src={car.image} alt={car.name} className='w-full' />
                  <div className='absolute top-2 right-2 rounded-full p-2'>
                    <TbHeart className='text-graydark' />
                  </div>
                  {car.booked && (
                    <div className='absolute top-2 left-2 bg-darkred text-graylight text-sm font-semibold px-2 rounded-sm'>Booked</div>
                  )}
                </div>
                <div className='p-4'>
                  <div className='font-bold text-lg text-white'>{car.brand} {car.model}</div>
                  <div className='flex justify-between items-center'>
                    <p className='font-bold'>
                      <span className='text-gasolindark'>Rs.{car.price}</span>
                      <span className='text-graydark'> / Per Day</span>
                    </p>
                    <div className='flex items-center gap-2 text-gasolindark font-bold'>
                      <p>DRIVE NOW</p>
                      <TbArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 mt-8'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? 'bg-graydark text-graylight cursor-not-allowed'
                    : 'bg-gasolindark text-white hover:bg-gasolinlight'
                }`}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-gasolindark text-white'
                      : 'bg-graydark text-white hover:bg-gasolinlight'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-graydark text-graylight cursor-not-allowed'
                    : 'bg-gasolindark text-white hover:bg-gasolinlight'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isFilterVisible && (
        <div 
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={toggleFilter}
        />
      )}
    </div>
  );
}
