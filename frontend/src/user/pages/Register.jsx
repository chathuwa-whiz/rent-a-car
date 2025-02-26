import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full min-h-screen sm:bg-primarybg">
      {/* Left Section (Welcome) */}
      <div className="hidden sm:flex w-1/2 bg-gradient-to-b from-[#2dd6b5] via-gasolindark to-primarybg rounded-t-[50px] flex-col justify-center items-center text-white mt-2 ml-2 flex-grow">
        <h3 className="text-2xl font-bold">RENTACAR</h3>
        <h2 className="text-2xl lg:text-4xl font-semibold text-center mt-6">
          Join Us & <br /> Start Your Journey!
        </h2>
        <p className="text-graylight text-center text-xs sm:text-sm mt-6 max-w-xs">
          Sign up to access reliable car rentals, tailored to your needs. Your adventure starts here!
        </p>
      </div>

      {/* Right Section (Sign Up Form) */}
      <div className="w-full sm:w-1/2 text-white flex flex-col justify-center items-center p-6 bg-gradient-to-b from-gasolinlight to-primarybg sm:bg-none flex-grow">
        <h2 className="text-2xl sm:text-3xl font-semibold">Sign Up Account</h2>
        <p className="sm:text-graylight text-sm sm:text-base mt-2 text-center">
          Enter your personal data to create an account
        </p>

        <button className="flex items-center gap-2 border sm:border-graydark text-xs sm:text-sm py-2 px-4 mt-4 rounded-[5px] w-full max-w-xs justify-center">
          <FcGoogle className="w-5 h-5" />
          Sign Up with Google
        </button>

        <div className="flex items-center w-full max-w-md my-3">
          <hr className="flex-grow sm:border-graydark" />
          <span className="sm:text-graylight text-sm px-2">Or</span>
          <hr className="flex-grow sm:border-graydark" />
        </div>

        <div className="w-full max-w-md space-y-2 p">

          <div className="flex gap-2 mb-2">
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm sm:text-graylight">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm sm:text-graylight">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-1">
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm sm:text-graylight">Phone Number</label>
              <input
                type="tel"
                placeholder="123456789"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm sm:text-graylight">Secondary Phone</label>
              <input
                type="tel"
                placeholder="987654321"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
          </div>

          <label className="block text-xs sm:text-sm sm:text-graylight">NIC</label>
          <input
            type="text"
            placeholder="123456789v"
            className="w-full text-xs sm:text-sm py-1 pl-2 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
          />

          <label className="block text-xs mt-1 sm:text-sm sm:text-graylight">Address</label>
          <textarea
            placeholder="No 6, Colombo, Sri Lanka"
            className="w-full text-xs sm:text-sm py-1 pl-2 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
          />

          <label className="block text-xs sm:text-sm sm:text-graylight">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full text-xs sm:text-sm py-1 pl-2 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
          />

          <div className="flex gap-2 mt-1">
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm sm:text-graylight">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full text-xs sm:text-sm py-1 pl-2 mt-1 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
                />
                <span
                  className="absolute top-2 sm:top-3 right-3 text-graydark cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <p className="text-xs text-graylight mt-1">Must be at least 8 characters.</p>
            </div>

            <div className="w-1/2">
              <label className="block text-xs sm:text-sm sm:text-graylight">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="w-full text-xs sm:text-sm py-1 pl-2 mt-1 rounded-[5px] border sm:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
                />
                <span
                  className="absolute top-2 sm:top-3 right-3 text-graydark cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full max-w-md mt-4 p-2 bg-white text-black rounded-[5px] font-bold text-sm">
          Sign Up
        </button>

        <p className="mt-2 text-xs sm:text-sm text-graylight">
          Already have an account?{" "}
          <span className="text-white cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
