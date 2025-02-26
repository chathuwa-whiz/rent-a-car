import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Layout() {
  return (
    <div className='bg-[#1C1C1C] overflow-hidden'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}
