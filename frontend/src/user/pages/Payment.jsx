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
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Card Details Section */}
        <div className='w-full lg:w-1/2 flex flex-col gap-6'>
          {/* Name on Card */}
          <div className='flex flex-col gap-2'>
            <label className='text-white font-semibold text-sm md:text-base'>Name on Card</label>
            <input
              type="text"
              placeholder="John Doe"
              className='bg-transparent text-graylight w-full outline-none border border-graydark rounded-lg p-3 text-sm md:text-base'
            />
          </div>

          {/* Card Number */}
          <div className='flex flex-col gap-2'>
            <label className='text-white font-semibold text-sm md:text-base'>Card Number</label>
            <div className='flex items-center justify-between gap-2 text-graylight border border-graydark rounded-lg p-3'>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className='bg-transparent text-graylight outline-none w-full text-sm md:text-base'
              />
              <div className='flex items-center gap-2 border-l border-graydark pl-2'>
                <img src='/visa.png' alt="visa" className='h-4 md:h-6 w-auto object-contain' />
                <img src='/master.png' alt="mastercard" className='h-4 md:h-6 w-auto object-contain' />
              </div>
            </div>
          </div>

          {/* Expiration Date and CVV */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-2 w-full sm:w-1/2'>
              <label className='text-white font-semibold text-sm md:text-base'>Expiration Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className='bg-transparent text-graylight outline-none border border-graydark rounded-lg p-3 text-sm md:text-base'
              />
            </div>
            <div className='flex flex-col gap-2 w-full sm:w-1/2'>
              <label className='text-white font-semibold text-sm md:text-base'>CVV</label>
              <input
                type="text"
                placeholder="000"
                className='bg-transparent text-graylight outline-none border border-graydark rounded-lg p-3 text-sm md:text-base'
              />
            </div>
          </div>

          {/* Pay Now Button */}
          <button className='from-gasolindark to-gasolinlight from-20% bg-gradient-to-b text-white font-semibold rounded-lg p-3 md:p-4 hover:opacity-90 transition-opacity mt-4'>
            Pay Now
          </button>
        </div>

        {/* Order Preview Section */}
        <div className='w-full lg:w-1/2 flex flex-col border border-graydark rounded-2xl'>
          {/* Car Image */}
          <div className='relative h-48 sm:h-64 md:h-80 lg:h-96'>
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
        </div>
      </div>
    </div>
  )
}
