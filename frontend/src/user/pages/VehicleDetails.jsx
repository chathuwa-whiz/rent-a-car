import React from 'react'
import { useNavigate } from 'react-router-dom'

const vehicle = {
  id: 1,
  brand: "Honda",
  model: "HR-V Hybrid",
  engine: '3L Twin Turbo V6',
  topSpeed: 200,
  acceleration: 3.5,
  includes: "GPS, Air Conditioning, 4x4",
  images: ["/car-model.png", "/aboutus2.jpg", "/aboutus2.jpg", "/aboutus2.jpg", "/aboutus2.jpg"],
  description: "Experience the perfect blend of performance and sophistication with the 2021 BMW M3 Competition Sedan in striking Isle of Man Green. Under the hood, a 3.0L twin-turbo inline-6 delivers 503 HP, paired with an 8-speed automatic transmission and M xDrive AWD for razor-sharp handling. Inside, enjoy M Carbon bucket seats, premium materials, and cutting-edge technology, ensuring both comfort and control. Whether you're looking for an exhilarating drive or a stylish ride, the M3 Competition delivers on every level. Book now and take the wheel of pure driving excellence!",
  price: 120000,
  booked: true,
  type: "SUV",
  transmission: "Automatic",
  seats: 4,
  rentalType: "Per Day",
  securityDeposit: 5000,
}

export default function VehicleDetails() {

  const navigate = useNavigate()

  return (
    <div className='relative min-h-screen px-4 pt-24'>
      {/* Main container */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left side - inputs / basic input details */}
        <div className='w-full lg:w-2/5 flex flex-col gap-6 lg:gap-10 lg:pr-8 xl:pr-32'>
          {/* title & price */}
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl text-white'>{vehicle.brand} {vehicle.model}</h1>
            <p className='flex items-center gap-2'>
              <span className='text-xl md:text-2xl font-bold text-gasolindark'>Rs.{vehicle.price}</span>
              <span className='text-base md:text-lg font-medium text-graydark'>/{vehicle.rentalType}</span>
            </p>
          </div>

          {/* details */}
          <div className='flex'>
            <div className='flex flex-col space-y-2 w-1/2 text-sm md:text-base text-graylight'>
              <p>Security Deposit</p>
              <p>Includes</p>
              <p>Top Speed</p>
              <p>0-60 mph</p>
              <p>Transmission</p>
              <p>Seats</p>
              <p>Engine</p>
            </div>
            <div className='flex flex-col space-y-2 w-1/2 text-sm md:text-base text-graydark'>
              <p>Rs.{vehicle.securityDeposit}</p>
              <p>{vehicle.includes}</p>
              <p>{vehicle.topSpeed}</p>
              <p>{vehicle.acceleration} mph</p>
              <p>{vehicle.transmission}</p>
              <p>{vehicle.seats}</p>
              <p>{vehicle.engine}</p>
            </div>
          </div>

          {/* inputs */}
          <div className='flex flex-col gap-4'>
            <input
              type="text"
              placeholder="Name"
              className='bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base'
            />
            <input
              type="telephone"
              placeholder="Phone Number"
              className='bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base'
            />
            <textarea
              type="text"
              placeholder="Address"
              className='bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base'
            />
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <input
                type="date"
                placeholder="Start Date"
                className='bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base'
              />
              <p className='text-graydark hidden sm:block'>to</p>
              <input
                type="date"
                placeholder="End Date"
                className='bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-2 text-sm md:text-base'
              />
            </div>
          </div>

          {/* button */}
          <button 
            onClick={() => navigate('/payment')}
            className='from-gasolindark to-gasolinlight from-20% bg-gradient-to-b text-white font-semibold rounded-lg p-2 md:p-3 hover:opacity-90 transition-opacity'>
            Book Now
          </button>
        </div>

        {/* Right side - vehicle images / description */}
        <div className='w-full lg:w-3/5 flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            {/* Main large image */}
            <img
              src={vehicle.images[0]}
              alt={vehicle.brand}
              className='w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg'
            />

            {/* Thumbnail images */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-0'>
              {vehicle.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${vehicle.brand} view ${index + 2}`}
                  className='w-full h-24 md:h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity'
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className='text-graydark text-sm md:text-base'>{vehicle.description}</p>
        </div>
      </div>
    </div>
  )
}
