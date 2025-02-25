import React from "react";
import user from "./assets/i55.png";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/user/profile";

  return (
    <header className="flex justify-between items-center p-4 text-white">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-white text-2xl"
        >
          <FaBars />
        </button>
        <h1 className="text-2xl font-md">Welcome Jake !</h1>
      </div>
      {!isProfilePage && (
        <div className="flex gap-3 items-center">
          <span className="text-sm font-bold mr-2">Jake Danial</span>
          <img
            src={user}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-darkred"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
