import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className='flex bg-primarybg min-h-screen'>
        <Sidebar />
        <div className='w-full'>
          <Header />
          <Outlet />
        </div>
    </div>
  )
}
