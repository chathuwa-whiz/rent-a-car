import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-row h-screen w-full sm:bg-primarybg">
      {/* Left Section (Login) */}
      <div className="w-full lg:w-1/2 text-white flex flex-col justify-center items-center p-6 sm:p-10 bg-gradient-to-b from-gasolinlight to-primarybg lg:bg-none">
        <h2 className="text-3xl font-semibold">Login</h2>
        <p className="lg:text-graylight mt-2 text-center sm:text-left">
          Enter your personal data to Login
        </p>

        <button className="flex items-center gap-2 border lg:border-graydark  px-6 py-2 mt-5 rounded-md w-full max-w-xs justify-center">
          <FcGoogle className="w-5 h-5" />
          Login with Google
        </button>

        <div className="flex items-center w-full max-w-xs my-5">
          <hr className="flex-grow lg:border-graydark" />
          <span className="lg:text-graylight px-2">Or</span>
          <hr className="flex-grow lg:border-graydark" />
        </div>

        <div className="w-full max-w-xs">
          <label className="block text-lg lg:text-graylight">Email</label>
          <input
            type="email"
            placeholder="eg : Example@gmail.com"
            className="w-full pl-3 py-2 mt-1 rounded-md border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
          />

          <label className="block mt-4 text-lg lg:text-graylight">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              className="w-full pl-3 py-2 mt-1 rounded-md border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
            />
            <span
              className="absolute text-xl top-4 right-3 text-graydark cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <button className="w-full max-w-xs mt-6 p-2 bg-white text-black rounded-md font-bold">
          Login
        </button>

        <p className="mt-4 text-xs sm:text-sm text-graylight">
          Don't have an account?{" "}
          <span 
            className="text-white cursor-pointer"
            onClick={() => navigate("/register")}>
            Sign-Up
          </span>
        </p>
      </div>

      {/* Right Section (Hidden in Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-[#2dd6b5] via-gasolindark to-primarybgrounded-t-[50px] flex-col justify-center items-center rounded-t-4xl text-white mt-2 mr-2">
        <h3 className="text-2xl font-bold">RENTACAR</h3>
        <h2 className="text-2xl lg:text-4xl font-semibold text-center mt-10">
          Welcome Back! <br /> Ready to Hit the Road?
        </h2>
        <p className="text-graylight text-center md:text-sm mt-6 max-w-xs">
          Log in to continue where you left off—quick, easy, and reliable car rentals at your fingertips.
        </p>
      </div>
    </div>
  );
};

