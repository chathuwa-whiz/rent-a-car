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
    <div className="h-screen bg-primarybg text-white md:ml-64 ">

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold">Welcome, {user.name}!</h2>

        <div className="flex gap-3">
          {/* Active Rentals */}
          <section className="mt-6 bg-graydark p-6 rounded-lg w-3/4">
            <h3 className="text-gasolinlight text-2xl">Active Rentals</h3>
            <div className="flex items-center mt-4">
              <img
                src={activeRental.image}
                alt={activeRental.car}
                className="w-40 h-24 rounded"
              />
              <div className="ml-4">
                <h4 className="text-xl font-bold">{activeRental.car}</h4>
                <p className="text-darkred font-bold">{activeRental.design}</p>
                <p>From: {activeRental.from}</p>
                <p>To: {activeRental.to}</p>
              </div>
            </div>
          </section>

          {/* User Profile */}
          <section className="bg-graydark p-5 w-1/4">
            <div className="text-center">
              <img
                src={userImage}
                alt="User"
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-graylight">Phone: {user.phone}</p>
              <p className="text-sm text-graylight">Email: {user.email}</p>
              <p className="text-sm text-graylight">DOB: {user.dob}</p>
              <p className="text-sm text-graylight">License: {user.license}</p>
            </div>
          </section>
        </div>

        {/* Rental History */}
        <section className="mt-6 w-full">
          <h3 className="text-darkred text-2xl">Rental History</h3>
          <div className="mt-4 space-y-4">
            {rentalHistory.map((rental, index) => (
              <div
                key={index}
                className="flex items-center bg-graydark p-4 rounded-lg"
              >
                <img
                  src={rental.image}
                  alt={rental.car}
                  className="w-32 h-20 rounded"
                />
                <div className="ml-4">
                  <h4 className="text-xl font-bold">{rental.car}</h4>
                  <p className="text-darkred font-bold">{rental.design}</p>
                  <p>From: {rental.from}</p>
                  <p>To: {rental.to}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
