import React from 'react'
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-secondary">
            {/* Sidebar for desktop */}
            <div className="hidden md:block md:w-64 bg-sidebar border-r border-graylight">
                <Sidebar />
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
                    <div className="relative flex flex-col w-64 max-w-xs h-full bg-sidebar">
                        <Sidebar closeSidebar={toggleSidebar} />
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
