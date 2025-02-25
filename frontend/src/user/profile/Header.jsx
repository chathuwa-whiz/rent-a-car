import React from "react";
import user from "./assets/i55.png"

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 text-white">
      <h1 className="text-lg font-semibold">Welcome Jake !</h1>
      <div className="flex gap-3 items-center">
        <span className="text-sm font-bold mr-2">Jake Danial</span>
        <img
          src={user}
          alt="User Avatar"
          className="w-8 h-8 rounded-full border-2 border-darkred"
        />
      </div>
    </header>
  );
};

export default Header;
