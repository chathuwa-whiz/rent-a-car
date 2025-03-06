import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../redux/services/authSlice";

export default function Register() {
  const [register] = useRegisterMutation();

  const [identificationType, setIdentificationType] = useState("nic");
  const [nicNumber, setNicNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [sphone, setSphone] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        firstName: fname,
        lastName: lname,
        phone: phone,
        secondaryPhone: sphone,
        address: address,
        email: email,
        password: password,
        confirmPassword: cpassword,
        role: "user",
        identificationType: identificationType,
        nic: identificationType === "nic" ? nicNumber : "",
        passport: identificationType === "passport" ? passportNumber : "",
      };

      const result = await register(user).unwrap();
      console.log("registration result: ", result);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log("registration error: ", error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex flex-row w-full min-h-screen pt-24">
      {/* Left Section (Welcome) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-[#2dd6b5] via-gasolindark to-primarybg rounded-t-[50px] flex-col justify-center items-center text-white mt-2 ml-2 flex-grow">
        <h3 className="text-2xl font-bold">RENTACAR</h3>
        <h2 className="text-2xl lg:text-4xl font-semibold text-center mt-6">
          Join Us & <br /> Start Your Journey!
        </h2>
        <p className="text-graylight text-center text-xs sm:text-sm mt-6 max-w-xs">
          Sign up to access reliable car rentals, tailored to your needs. Your
          adventure starts here!
        </p>
      </div>

      {/* Right Section (Sign Up Form) */}
      <div className="w-full sm:w-1/2 text-white flex flex-col justify-center items-center p-6 bg-gradient-to-b from-gasolinlight to-primarybg lg:bg-none flex-grow">
        <h2 className="text-2xl sm:text-3xl font-semibold">Sign Up Account</h2>
        <p className="lg:text-graylight text-sm sm:text-base mt-2 text-center">
          Enter your personal data to create an account
        </p>

        <button className="flex items-center gap-2 border lg:border-graydark text-xs sm:text-sm py-2 px-4 mt-4 rounded-[5px] w-full max-w-xs justify-center">
          <FcGoogle className="w-5 h-5" />
          Sign Up with Google
        </button>

        <div className="flex items-center w-full max-w-md my-3">
          <hr className="flex-grow lg:border-graydark" />
          <span className="lg:text-graylight text-sm px-2">Or</span>
          <hr className="flex-grow lg:border-graydark" />
        </div>

        <div className="w-full max-w-md space-y-2 p">
          <div className="flex gap-2 mb-2">
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm lg:text-graylight">
                First Name
              </label>
              <input
                type="text"
                onChange={(e) => setFname(e.target.value)}
                placeholder="John"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm lg:text-graylight">
                Last Name
              </label>
              <input
                type="text"
                onChange={(e) => setLname(e.target.value)}
                placeholder="Doe"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-1">
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm lg:text-graylight">
                Phone Number
              </label>
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123456789"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm lg:text-graylight">
                Secondary Phone
              </label>
              <input
                type="tel"
                onChange={(e) => setSphone(e.target.value)}
                placeholder="987654321"
                className="w-full text-xs sm:text-sm py-1 pl-2 mt-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs sm:text-sm lg:text-graylight">
              Identification Type
            </label>
            <div className="flex mt-1">
              <label className="mr-4">
                <input
                  type="radio"
                  value="nic"
                  checked={identificationType === "nic"}
                  onChange={() => setIdentificationType("nic")}
                  className="mr-1"
                />
                <span className="text-xs sm:text-sm lg:text-graylight">
                  NIC
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  value="passport"
                  checked={identificationType === "passport"}
                  onChange={() => setIdentificationType("passport")}
                  className="mr-1"
                />
                <span className="text-xs sm:text-sm lg:text-graylight">
                  Passport
                </span>
              </label>
            </div>
          </div>

          {identificationType === "nic" ? (
            <div>
              <label className="block text-xs sm:text-sm lg:text-graylight">
                NIC Number
              </label>
              <input
                type="text"
                onChange={(e) => setNicNumber(e.target.value)}
                placeholder="123456789v"
                className="w-full text-xs sm:text-sm py-1 pl-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs sm:text-sm lg:text-graylight">
                Passport Number
              </label>
              <input
                type="text"
                onChange={(e) => setPassportNumber(e.target.value)}
                placeholder="AB1234567"
                className="w-full text-xs sm:text-sm py-1 pl-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
              />
            </div>
          )}

          <div>
            <label className="block text-xs mt-1 sm:text-sm lg:text-graylight">
              Address
            </label>
            <textarea
              placeholder="No 6, Colombo, Sri Lanka"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-xs sm:text-sm py-1 pl-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm lg:text-graylight">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full text-xs sm:text-sm py-1 pl-2 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
            />
          </div>

          <div className="flex gap-2 mt-1">
            <div className="w-1/2">
              <label className="block text-xs sm:text-sm lg:text-graylight">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs sm:text-sm py-1 pl-2 mt-1 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
                />
                <span
                  className="absolute top-2 sm:top-3 right-3 text-graydark cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <p className="text-xs text-graylight mt-1">
                Must be at least 8 characters.
              </p>
            </div>

            <div className="w-1/2">
              <label className="block text-xs sm:text-sm lg:text-graylight">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  onChange={(e) => setCpassword(e.target.value)}
                  className="w-full text-xs sm:text-sm py-1 pl-2 mt-1 rounded-[5px] border lg:border-graydark focus:outline-none focus:ring-1 focus:ring-gasolindark"
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

        <button
          onClick={handleSubmit}
          className="w-full max-w-md mt-4 p-2 bg-white text-black rounded-[5px] font-bold text-sm"
        >
          Sign Up
        </button>

        <p className="mt-2 text-xs sm:text-sm text-graylight">
          Already have an account?{" "}
          <span
            className="text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
