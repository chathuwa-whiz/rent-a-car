import React from "react";
import { FaSignOutAlt, FaWallet, FaCar, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="top-0 left-0 w-1/6 p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold text-white">RENTACAR</h1>
        <nav className="space-y-4 mt-6 text-[20px]">
          <Link to="" className="flex items-center text-white hover:text-gasolinlight mb-6">
            <FaCar className="mr-4" /> Dashboard
          </Link>
          <Link to="payment" className="flex items-center text-white hover:text-gasolinlight mb-6">
            <FaWallet className="mr-4" /> Payment
          </Link>
          <Link to="rentals" className="flex items-center text-white hover:text-gasolinlight mb-6">
            <FaCar className="mr-4" /> Rentals
          </Link>
          <Link to="account" className="flex items-center text-white hover:text-gasolinlight mb-6">
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