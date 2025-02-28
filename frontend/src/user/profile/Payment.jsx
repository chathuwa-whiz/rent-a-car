import React from 'react'
import visa from '/visa.png'
import master from '/master.png'
import { MdDelete } from 'react-icons/md'

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
        <div className='w-full lg:w-1/2 mt-6 lg:mt-0 space-y-5 xl:px-20'>
          <div className='flex flex-col sm:flex-row justify-between p-3 sm:p-4 h-auto sm:h-24 bg-primarybg rounded-lg gap-2'>
            <img src={visa} className='w-24 sm:w-auto object-contain mb-2 sm:mb-0' />
            <p className='text-gasolindark font-medium text-sm sm:text-base'>
              1111 2222 3333 4444
            </p>
            <div className='flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-between mt-2 sm:mt-0'>
              <p className='font-medium text-sm sm:text-base'>Jake Daniel</p>
              <MdDelete color='darkred' size={24} className='cursor-pointer hover:opacity-80' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
