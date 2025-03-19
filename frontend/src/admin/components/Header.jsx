import React from 'react'
import { TbMenu2, TbSearch, TbUser } from 'react-icons/tb';

export default function Header({ toggleSidebar }) {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="bg-white border-b border-graylight">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Mobile menu button */}
                <button
                    className="md:hidden text-graydark hover:text-graylight focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <TbMenu2 size={24} />
                </button>

                {/* Search bar */}
                {/* <div className="flex-1 max-w-xl mx-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <TbSearch className="text-gray-400" size={20} />
                        </div>
                        <input
                            type="text"
                            className="w-full py-2 pl-10 pr-4 text-sm text-graydark border border-graylight rounded-full focus:outline-none "
                            placeholder="Search"
                        />
                    </div>
                </div> */}

                {/* User profile */}
                <div className="flex items-center">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full p-2">
                            <TbUser size={20} className="text-graydark" />
                        </div>
                        <span className="hidden md:block text-sm text-graydark font-medium">Admin {user.firstName}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
