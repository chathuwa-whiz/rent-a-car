import React from "react";
import { FaSignOutAlt, FaWallet, FaCar, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="top-0 left-0 w-1/6 p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold text-white">RENTACAR</h1>
        <nav className="space-y-4 mt-6 text-[20px]">
          <a href="" className="flex items-center text-white hover:text-gasolinlight focus:text-gasolinlight mb-6">
            <FaCar className="mr-4" /> Dashboard
          </a>
          <a href="#" className="flex items-center text-white hover:text-gasolinlight focus:text-gasolinlight mb-6">
            <FaWallet className="mr-4" /> Payment
          </a>
          <a href="#" className="flex items-center text-white hover:text-gasolinlight focus:text-gasolinlight mb-6">
            <FaCar className="mr-4" /> Rentals
          </a>
          <a href="#" className="flex items-center text-white hover:text-gasolinlight focus:text-gasolinlight mb-6">
            <FaUser className="mr-4" /> Account
          </a>
        </nav>
      </div>
      <button className="flex items-center text-darkred mt-auto text-[20px]">
        <a href="#" className="flex items-center text-white hover:text-darkred focus:text-darkred">
        <FaSignOutAlt className="mr-2" /> Log out
        </a>
      </button>
    </aside>
  );
};

export default Sidebar;
