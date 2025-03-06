import React, { useState, useEffect } from 'react'
import user from "./assets/i55.png"
import { useGetUserByIdQuery } from "../../redux/services/userSlice"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Account() {

  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  
  const { data: userData, isSuccess, isLoading } = useGetUserByIdQuery(userId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    passport: '',
    address: '',
    email: '',
    phone: '',
    secondaryPhone: '',
  });

  useEffect(() => {
    if (isSuccess && userData) {
      const {
        firstName,
        lastName,
        nic,
        passport,
        address,
        email,
        phone,
        secondaryPhone,
      } = userData;

      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        nic: nic || '',
        passport: passport || '',
        address: address || '',
        email: email || '',
        phone: phone || '',
        secondaryPhone: secondaryPhone || '',
      });
    }
  }, [isSuccess, userData]);

  if (isLoading) {
    return <div className="text-white text-center">Loading user data...</div>;
  }

  return (
    <div className='text-white px-2 sm:px-4 md:px-6 py-4 sm:py-6 mx-2 sm:mx-5 rounded-lg bg-black'>
      <h1 className='text-gasolindark font-semibold text-xl sm:text-2xl'>Personal Details</h1>

      {/* Main container */}
      <div className='flex flex-col lg:flex-row lg:space-x-10 mt-4 sm:mt-7 px-2 sm:px-6 md:px-10'>
        {/* Left section - personal details edit/delete */}
        <div className='w-full lg:w-1/2 mb-6 lg:mb-0'>
          <p className='mb-3'>Upload Profile Photo</p>

          {/* profile image */}
          <div className='flex items-center space-x-4 sm:space-x-6 mb-6'>
            <img src={user} alt='user' className='w-12 h-12 sm:w-16 sm:h-16 rounded-full' />
            <div className='text-sm sm:text-base'>
              <p>Max : 5MB</p>
              <p>PNG / JPG</p>
            </div>
          </div>

          {/* name */}
          <div className='flex flex-col sm:flex-row sm:space-x-6 mb-6'>
            <div className='flex flex-col space-y-2 mb-4 sm:mb-0 w-full sm:w-1/2'>
              <p className='text-sm sm:text-base'>First Name</p>
              <input
                type='text'
                value={formData.firstName}
                className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
                placeholder='First Name'
              />
            </div>
            <div className='flex flex-col space-y-2 w-full sm:w-1/2'>
              <p className='text-sm sm:text-base'>Last Name</p>
              <input
                type='text'
                value={formData.lastName}
                className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
                placeholder='Last Name'
              />
            </div>
          </div>

          {/* NIC */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>NIC</p>
            <input
              type='text'
              value={formData.nic}
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='NIC'
            />
          </div>

          {/* Address */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Address</p>
            <textarea
              value={formData.address}
              className='border border-graydark text-graydark h-20 rounded-lg px-3 py-2 w-full'
              placeholder='Address'
            />
          </div>

          {/* buttons */}
          <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6'>
            <button className='bg-gasolindark text-white px-5 py-2 rounded-md hover:bg-gasolinlight cursor-pointer w-full sm:w-auto'>
              Edit Details
            </button>
            <button className='bg-darkred text-white px-5 py-2 rounded-lg cursor-pointer w-full sm:w-auto'>
              Delete Profile
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
              value={formData.email}
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='jakedaniel@gmail.com'
            />
          </div>

          {/* mobile */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Mobile</p>
            <input
              type='tel'
              value={formData.phone}
              className='border border-graydark text-graydark h-10 rounded-lg px-3 w-full'
              placeholder='011-234 3452'
            />
          </div>

          {/* emergency contact */}
          <div className='flex flex-col space-y-2 mb-6'>
            <p className='text-sm sm:text-base'>Emergency Contact</p>
            <input
              type='tel'
              value={formData.secondaryPhone}
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
