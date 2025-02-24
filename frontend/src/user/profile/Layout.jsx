import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div>
        <Header />
        <div className='flex'>
            <Sidebar />
            <Outlet />
        </div>
    </div>
  )
}
