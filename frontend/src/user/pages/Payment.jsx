import React from 'react'

const vehicle = {
  id: 1,
  brand: "Honda",
  model: "HR-V Hybrid",
  price: 120000,
  rentalType: "Per Day",
  period: "02/23 - 02/25"
}

export default function Payment() {
  return (
    <div className='min-h-screen px-4 md:px-8 lg:px-16 xl:px-32 pt-24'>
      <div className='flex justify-center items-center'>
        {/* Order Preview Section */}
        <div className='w-full lg:w-1/2 flex flex-col border border-graydark rounded-2xl'>
          {/* Car Image - Reduced Height */}
          <div className='relative h-32 sm:h-40 md:h-48 lg:h-56'>
            <img
              src='/car-model.png'
              alt={`${vehicle.brand} ${vehicle.model}`}
              className='w-full h-full object-contain p-4'
            />
          </div>

          {/* Order Details */}
          <div className='px-4 sm:px-8 md:px-12'>
            <div className='flex justify-between p-4 border-b border-graydark'>
              <div className='flex flex-col space-y-2 text-sm md:text-base text-graylight'>
                <p>Name</p>
                <p>Rent</p>
                <p>Period</p>
              </div>
              <div className='flex flex-col space-y-2 text-sm md:text-base text-graydark text-right'>
                <p>{vehicle.brand} {vehicle.model}</p>
                <p>Rs.{vehicle.price}</p>
                <p>{vehicle.period}</p>
              </div>
            </div>

            {/* Total Amount */}
            <div className='p-4'>
              <p className='text-graydark text-sm md:text-base'>You have to pay</p>
              <p className='text-white font-bold text-xl md:text-2xl lg:text-3xl'>Rs.{vehicle.price}</p>
            </div>
          </div>

          {/* Pay Now Button */}
          <button className='from-gasolindark to-gasolinlight from-20% bg-gradient-to-b text-white font-semibold rounded-lg p-3 md:p-4 hover:opacity-90 transition-opacity mt-4 mx-4 mb-4'>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  )
}