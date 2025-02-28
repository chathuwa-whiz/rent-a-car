import React from 'react'
import visa from '/visa.png'
import master from '/master.png'

export default function Payment() {
  return (
    <div className='text-white px-2 sm:px-4 md:px-6 py-4 sm:py-6 mx-2 sm:mx-5 rounded-lg bg-black'>
      <h1 className='text-gasolindark font-semibold text-xl sm:text-2xl'>Add Payment Method</h1>

      {/* Main container */}
      <div className='flex flex-col lg:flex-row lg:space-x-10 mt-4 sm:mt-7 px-2 sm:px-6 md:px-10'>
        {/* Left section - personal details edit/delete */}
        <div className='w-full lg:w-1/2 mb-6 lg:mb-0'>

          {/* Pay with */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Pay With</p>
            <div className='flex gap-6'>
              <div className='flex gap-2'>
                <input type='radio' />
                <img src={visa} className='h-12 w-auto object-contain' />
              </div>
              <div className='flex gap-2'>
                <input type='radio' />
                <img src={master} className='h-12 w-auto object-contain' />
              </div>
            </div>
          </div>

          {/* card number */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Card Number</p>
            <input
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='1111-2222-3333-4444'
            />
          </div>

          {/* Name */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Name on Card</p>
            <input
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='Jake Daniel'
            />
          </div>

          {/* CVV & EXP Date */}
          <div className='flex flex-col sm:flex-row sm:space-x-6 mb-6'>
            <div className='flex flex-col space-y-2 mb-4 sm:mb-0 w-full sm:w-1/2'>
              <p className='text-sm sm:text-base'>CVV</p>
              <input
                type='text'
                className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
                placeholder='123'
              />
            </div>
            <div className='flex flex-col space-y-2 w-full sm:w-1/2'>
              <p className='text-sm sm:text-base'>Exp Date</p>
              <input
                type='text'
                className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
                placeholder='MM/YY'
              />
            </div>
          </div>

          {/* OTP */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Enter OTP</p>
            <input
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='123456'
            />
          </div>

          {/* buttons */}
          <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6'>
            <button className='bg-gasolindark text-white px-5 py-2 rounded-md hover:bg-gasolinlight cursor-pointer w-full sm:w-auto'>
              Add Payment Details
            </button>
          </div>
        </div>

        {/* Right section - personal details view */}
        <div className='w-full lg:w-1/2 mt-6 lg:mt-0'>
          {/* email */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Email</p>
            <input
              type='email'
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='jakedaniel@gmail.com'
            />
          </div>

          {/* mobile */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Mobile</p>
            <input
              type='tel'
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='011-234 3452'
            />
          </div>

          {/* emergency contact */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Emergency Contact</p>
            <input
              type='tel'
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='011-231 1234'
            />
          </div>

          {/* driver licence */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Driver License Number</p>
            <input
              type='text'
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='B12322323'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
