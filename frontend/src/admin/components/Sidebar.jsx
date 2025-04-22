import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import {
    TbDashboard,
    TbCar,
    TbCalendarEvent,
    TbUsers,
    TbCreditCard,
    TbTool,
    TbChartBar,
    TbX
} from 'react-icons/tb';

export default function Sidebar({ closeSidebar }) {
    const location = useLocation();

    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: <TbDashboard size={20} /> },
        { path: '/admin/vehicle', name: 'Vehicle', icon: <TbCar size={20} /> },
        { path: '/admin/bookings', name: 'Bookings', icon: <TbCalendarEvent size={20} /> },
        { path: '/admin/customers', name: 'Customers', icon: <TbUsers size={20} /> },
        { path: '/admin/payment', name: 'Payment', icon: <TbCreditCard size={20} /> },
        { path: '/admin/maintenance', name: 'Maintenance', icon: <TbTool size={20} /> },
        { path: '/admin/reports', name: 'Reports', icon: <TbChartBar size={20} /> },
    ];

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Mobile close button */}
            {closeSidebar && (
                <div className="flex items-center justify-between p-4 md:hidden border-b border-graylight">
                    <h1 className="text-2xl font-bold text-black">RENTACAR</h1>
                    <button 
                        onClick={closeSidebar} 
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <TbX size={24} />
                    </button>
                </div>
            )}

            {/* Logo - Only show on desktop */}
            <div className="hidden md:block p-4 border-b border-graylight">
                <h1 className="text-2xl font-bold text-black">RENTACAR</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-3">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'} // Add this line
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors ${
                                    isActive || 
                                    (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                    ? 'bg-gradient-to-b from-gasolindark to-gasolinlight text-white' 
                                    : 'text-graydark hover:bg-gasolinlight hover:text-white'
                                }`
                            }
                            onClick={closeSidebar ? closeSidebar : undefined}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    )
}
