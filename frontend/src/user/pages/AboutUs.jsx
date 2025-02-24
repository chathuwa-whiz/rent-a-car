import React from "react";
import { ArrowRight } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AboutUs() {
  return (
    <div className="relative min-h-screen mb-16">
      {/* Top Section - Luxury Car Image */}
      <div className="relative w-full z-10">
        <img
          src="/aboutus1.png"
          alt="Luxury Car"
          className="w-full md:w-[60%] h-auto md:h-[420px] -mb-20"
        />

        {/* "RENT A CAR" Banner */}
        <div className="absolute top-[80%] md:top-[20%] right-[38%] md:right-[37.5%] w-[40%] md:w-[6%] h-[30%] md:h-[50%] 
        bg-gradient-to-r from-gasolindark to-gasolinlight md:px-2 py-4 md:py-16 font-bold z-50">
          <h3 className="text-xl md:text-3xl w-full md:w-[12rem] text-[#fff] pl-4 md:pl-14 font-extrabold leading-tight">
            RENT A CAR
          </h3>
        </div>

        <div className="absolute top-[102%] md:top-[55%] right-[14%] md:right-[28%] text-gasolindark font-bold z-50">
          <p className="text-sm md:text-lg flex items-center gap-1">
            Follow us <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </p>
        </div>
      </div>

      {/* Bottom Section - Content & Features */}
      <div className="relative py-14 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Side - Text Section */}
          <div className="mt-16 md:mt-20 md:-ml-10">
            <h2 className="text-2xl md:text-3xl text-[#fff] font-extrabold">
              LUXURY CAR RENTAL SRI LANKA
            </h2>
            <p className="text-graydark my-6 md:my-8 w-full md:w-md leading-relaxed text-sm md:text-base">
              Are you looking for exotic or luxury car rental in Sri Lanka? 
              You want to rent a luxury car or maybe an exotic car? Get in touch with 
              Rent a Car Sri Lanka - Exotic and Luxury Car Rental agency.
            </p>

            {/* Features Section */}
            <div className="grid grid-cols-2 md:flex md:flex-row text-graylight items-start gap-6 md:gap-20 mt-6 md:mt-12">
              <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
                <i className="fas fa-road text-xl md:text-2xl"></i>
                <p className="font-semibold">MILEAGE <br /> UNLIMITED</p>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
                <i className="fas fa-map-marker-alt text-xl md:text-2xl"></i>
                <p className="font-semibold">PICK UP <br /> SERVICE</p>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
                <i className="fas fa-shipping-fast text-xl md:text-2xl"></i>
                <p className="font-semibold">DELIVERY <br /> TO DOOR</p>
              </div>
            </div>
          </div>

          {/* Right Side - Car Interior Image */}
          <div className="w-full md:w-[50%] md:h-[420px] flex justify-center md:absolute md:top-5 md:right-0">
            <img
              src="/aboutus2.jpg"
              alt="Car Interior"
              className="w-full md:h-[420px]"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
