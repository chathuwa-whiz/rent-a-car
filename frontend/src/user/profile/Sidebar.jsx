import React from "react";
import { FaSignOutAlt, FaWallet, FaCar, FaCarSide, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed lg:relative top-0 left-0 w-64 lg:w-1/6 bg-black transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-xl font-bold text-white">RENTACAR</h1>
            <nav className="space-y-4 mt-6 text-[20px]">
              <Link 
                to="" 
                className={`flex items-center hover:text-gasolinlight mb-6 ${
                  currentPath === "/user/profile" ? "text-gasolinlight" : "text-white"
                }`}
                onClick={onClose}
              >
                <FaCar className="mr-4" /> Dashboard
              </Link>
              {/* <Link 
                to="payment" 
                className={`flex items-center hover:text-gasolinlight mb-6 ${
                  currentPath === "/user/profile/payment" ? "text-gasolinlight" : "text-white"
                }`}
                onClick={onClose}
              >
                <FaWallet className="mr-4" /> Payment
              </Link> */}
              <Link 
                to="rentals" 
                className={`flex items-center hover:text-gasolinlight mb-6 ${
                  currentPath === "/user/profile/rentals" ? "text-gasolinlight" : "text-white"
                }`}
                onClick={onClose}
              >
                <FaCarSide className="mr-4" /> Rentals
              </Link>
              <Link 
                to="account" 
                className={`flex items-center hover:text-gasolinlight mb-6 ${
                  currentPath === "/user/profile/account" ? "text-gasolinlight" : "text-white"
                }`}
                onClick={onClose}
              >
                <FaUser className="mr-4" /> Account
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}