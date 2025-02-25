import React from 'react'
import user from "./assets/i55.png"

export default function Account() {
  return (
    <div className='text-white px-3 sm:px-6 py-6 mx-5 rounded-lg bg-black'>
      <h1 className='text-gasolindark font-semibold text-2xl'>Personal Details</h1>

      <div className='flex space-x-10 mt-7 px-10'>
        {/* personal details edit / delete */}
        <div className='w-full'>
          <p className='mb-3'>Upload Profile Photo</p>

          {/* profile image */}
          <div className='flex items-center justify-start space-x-6 mb-6'>
            <img src={user} alt='user' className='w-16 h-16 rounded-full' />
            <div>
              <p>Max : 5MB</p>
              <p>PNG / JPG</p>
            </div>
          </div>

          {/* name */}
          <div className='flex items-center justify-start space-x-6 mb-6'>
            <div className='flex flex-col space-y-2'>
              <p>First Name</p>
              <input
                type='text'
                className='border border-graydark text-graydark h-10 rounded-lg px-3'
                placeholder='First Name'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <p>Last Name</p>
              <input
                type='text'
                className='border border-graydark text-graydark h-10 rounded-lg px-3'
                placeholder='Last Name'
              />
            </div>
          </div>

          {/* NIC */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p>NIC</p>
            <input
              type='text'
              className='border border-graydark text-graydark h-10 rounded-lg px-3'
              placeholder='NIC'
            />
          </div>

          {/* Address */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p>Address</p>
            <textarea
              type='text'
              className='border border-graydark text-graydark h-20 rounded-lg px-3'
              placeholder='Address'
            />
          </div>

          {/* buttons */}
          <div className='flex items-center justify-start space-x-6'>
            <button className='bg-gasolindark text-white px-5 py-2 rounded-md hover:bg-gasolinlight cursor-pointer'>Edit Details</button>
            <button className='bg-darkred text-white px-5 py-2 rounded-lg cursor-pointer'>Delete Profile</button>
          </div>
        </div>

        {/* personal details view */}
        <div className='w-full'>

          {/* email */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p>Email</p>
            <input
              type='text'
              className='border border-graydark text-graydark h-10 rounded-lg px-3'
              placeholder='jakedaniel@gmail.com'
            />
          </div>

          {/* mobile */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p>Mobile</p>
            <input
              type='telephone'
              className='border border-graydark text-graydark h-10 rounded-lg px-3'
              placeholder='011-234 3452'
            />
          </div>

          {/* emergency contact */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p>Emergancy Contact</p>
            <input
              type='telephone'
              className='border border-graydark text-graydark h-10 rounded-lg px-3'
              placeholder='011-231 1234'
            />
          </div>

          {/* driver licence */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p>Driver Licence Number</p>
            <input
              type='text'
              className='border border-graydark text-graydark h-10 rounded-lg px-3'
              placeholder='B12322323'
            />
          </div>
        </div>
      </div>

    </div>
  )
}
