import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Unregistered User Routes
import UserLayout from './user/Layout'
import UserLogin from './user/pages/Login'
import UserRegister from './user/pages/Register'
import Fleet from './user/pages/Fleet'
import Payment from './user/pages/Payment'
import VehicleDetails from './user/pages/VehicleDetails'

// User Profile / Registered User Routes
import UserProfileDashboard from './user/profile/Dashboard'
import UserProfileLayout from './user/profile/Layout'
import UserProfilePayment from './user/profile/Payment'
import UserProfileRentals from './user/profile/Rentals'
import UserProfileAccount from './user/profile/Account'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Routes */}

        {/* User Routes */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/fleet' element={<Fleet />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/vehicledetails' element={<VehicleDetails />} />
        <Route path="/" element={<UserLayout />} />

        {/* User Profile / Registered User Routes */}
        <Route path='/user/profile' element={<UserProfileLayout />}>
          <Route index element={<UserProfileDashboard />} />
          <Route path='payment' element={<UserProfilePayment />} />
          <Route path='rentals' element={<UserProfileRentals />} />
          <Route path='account' element={<UserProfileAccount />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
