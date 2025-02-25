import React from "react";
import { FaSignOutAlt, FaWallet, FaCar, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  
  return (
    <aside className="top-0 left-0 w-1/6 p-5 flex flex-col justify-between bg-black">
      <div>
        <h1 className="text-xl font-bold text-white">RENTACAR</h1>
        <nav className="space-y-4 mt-6 text-[20px]">
          <Link to="" className={`flex items-center hover:text-gasolinlight mb-6 ${currentPath === "/user/profile" ? "text-gasolinlight" : "text-white"}`}>
            <FaCar className="mr-4" /> Dashboard
          </Link>
          <Link to="payment" className={`flex items-center hover:text-gasolinlight mb-6 ${currentPath === "/user/profile/payment" ? "text-gasolinlight" : "text-white"}`}>
            <FaWallet className="mr-4" /> Payment
          </Link>
          <Link to="rentals" className={`flex items-center hover:text-gasolinlight mb-6 ${currentPath === "/user/profile/rentals" ? "text-gasolinlight" : "text-white"}`}>
            <FaCar className="mr-4" /> Rentals
          </Link>
          <Link to="account" className={`flex items-center hover:text-gasolinlight mb-6 ${currentPath === "/user/profile/account" ? "text-gasolinlight" : "text-white"}`}>
            <FaUser className="mr-4" /> Account
          </Link>
        </nav>
      </div>
      <Link 
        to="/" 
        className="flex items-center text-white hover:text-darkred focus:text-darkred text-[20px]"
      >
        <FaSignOutAlt className="mr-2" /> Log out
      </Link>
    </aside>
  );
};