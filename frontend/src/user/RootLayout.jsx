import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  return (
    <div className='bg-[#1C1C1C] overflow-hidden'>
        <Header />
        <ToastContainer />
        <WhatsAppButton />
        <Outlet />
        <Footer />
    </div>
  )
}
