import React from "react";
import civic from "./assets/civic.webp";
import crv from "./assets/crv.webp";
import crve from "./assets/crve.webp";
import userImage from "./assets/i55.png";

const Dashboard = () => {
  const user = {
    name: "Jake Danial",
    phone: "077 3548 895",
    email: "carrentuser@gmail.com",
    dob: "2025.02.21",
    license: "B456879",
  };

  const activeRental = {
    car: "Civic Type R",
    design: "R Design",
    image: civic,
    from: "2025 JAN 21",
    to: "2025 FEB 25",
  };

  const rentalHistory = [
    {
      car: "Civic Type R",
      design: "R Design",
      image: civic,
      from: "2025 JAN 21",
      to: "2025 FEB 25",
    },
    {
      car: "Honda CR-V",
      design: "R Design",
      image: crv,
      from: "2025 JAN 21",
      to: "2025 FEB 25",
    },
    {
      car: "HR-V Hybrid",
      design: "R Design",
      image: crve,
      from: "2025 JAN 21",
      to: "2025 FEB 25",
    },
  ];

  return (
    <div className="text-white px-6 pb-6">

      <div className="flex justify-between gap-3 w-full">
        {/* Active Rentals */}
        <section className="bg-black px-6 py-3 rounded-lg w-3/4">
          <h3 className="text-gasolinlight text-2xl">Active Rentals</h3>
          <div className="flex items-center justify-between mt-4">
            <img
              src={activeRental.image}
              alt={activeRental.car}
              className="w-70"
            />
            <div>
              <h4 className="text-2xl font-bold">{activeRental.car}</h4>
              <p className="text-darkred font-bold">{activeRental.design}</p>
            </div>
            <div className="border border-gasolindark bg-primarybg rounded-lg px-5 py-2">
              <p className="flex justify-between gap-20">
                <span>From</span>
                <span>:{activeRental.from}</span>
              </p>
              <p className="flex justify-between">
                <span>To</span>
                <span>:{activeRental.to}</span>
              </p>
            </div>
          </div>
        </section>

        {/* User Profile */}
        <section className="bg-black p-5 w-1/4 rounded-lg overflow-hidden">
          <div className="flex text-center">
            <h3 className="mt-4 text-xl font-semibold mx-auto">{user.name}</h3>
            <img
              src={userImage}
              alt="User"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-graylight">Phone</p>
              <p className="text-sm text-graylight">Email</p>
              <p className="text-sm text-graylight">DOB</p>
              <p className="text-sm text-graylight">License</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-graylight">: {user.phone}</p>
              <p className="text-sm text-graylight">: {user.email}</p>
              <p className="text-sm text-graylight">: {user.dob}</p>
              <p className="text-sm text-graylight">: {user.license}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Rental History */}
      <div className="mt-6">
        <h3 className="text-darkred font-semibold text-2xl">Rental History</h3>
        <div className="mt-4 space-y-4 px-10">
          {rentalHistory.map((rental, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black py-4 px-10 rounded-lg border border-gasolindark"
            >
              <img
                src={rental.image}
                alt={rental.car}
                className="w-40"
              />
              <div>
                <h4 className="text-2xl font-bold">{rental.car}</h4>
                <p className="text-darkred font-bold">{rental.design}</p>
              </div>
              <div className="border border-darkred bg-primarybg rounded-lg px-5 py-2">
                <p className="flex justify-between gap-20">
                  <span>From</span>
                  <span>:{rental.from}</span>
                </p>
                <p className="flex justify-between">
                  <span>To</span>
                  <span>:{rental.to}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
