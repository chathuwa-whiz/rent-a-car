import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function Layout() {
  return (
    <div className='bg-[#1C1C1C] overflow-hidden'>
        <Header />
        <WhatsAppButton />
        <Outlet />
        <Footer />
    </div>
  )
}
