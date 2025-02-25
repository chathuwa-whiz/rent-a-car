import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='flex bg-primarybg min-h-screen'>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className='w-full'>
        <Header onMenuClick={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
}
