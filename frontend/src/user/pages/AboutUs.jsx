import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AboutUs() {
  return (
    <div id="aboutus" className="relative min-h-screen mb-16">
      {/* Top Section - Luxury Car Image */}
      <div className="relative w-full z-10">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          src="/aboutus1.png"
          alt="Luxury Car"
          className="w-full lg:w-[60%] h-auto lg:h-[300px] xl:h-[420px] -mb-20"
        />

        {/* "RENT A CAR" Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="absolute top-[80%] lg:top-[20%] right-[38%] lg:right-[37.5%] w-[35%] lg:w-[6%] h-[30%] lg:h-[50%] text-center bg-gradient-to-r from-gasolindark to-gasolinlight lg:px-2 py-4 lg:py-12 xl:py-16 font-bold z-50"
          >
            <h3 className="text:sm sm:text-xl md:text-2xl xl:text-3xl lg:w-[8rem] xl:w-[10rem] text-white lg:pl-2 xl:pl-4 md:pt-6 lg:pt-0 font-extrabold leading-tight">
              RENT A CAR
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="absolute top-[102%] lg:top-[58%] xl:top-[55%] right-[10%] md:right-[24%] xl:right-[28%] text-gasolindark font-bold z-50"
          >
            <p onClick={() => window.open("https://www.instagram.com/", "_blank")} className="cursor-pointer text-sm lg:text-lg flex items-center gap-1">
              Follow us <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </p>
          </motion.div>
              </div>

              {/* Bottom Section - Content & Features */}
      <div className="relative py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="mt-20 md:mt-24 lg:mt-16 ml-6 md:ml-10 xl:mt-20 xl:-ml-10"
          >
            <h2 className="text-2xl xl:text-3xl text-white font-extrabold">
              LUXURY CAR RENTAL SRI LANKA
            </h2>
            <p className="text-graydark my-6 md:my-8 w-full md:w-md leading-relaxed text-sm md:text-base">
              Are you looking for exotic or luxury car rental in Sri Lanka? You want to rent a luxury car or maybe an exotic car? Get in touch with Rent a Car Sri Lanka - Exotic and Luxury Car Rental agency.
            </p>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-2 md:flex md:flex-row text-graylight items-start gap-6 md:gap-10 xl:gap-20 mt-6 xl:mt-12"
            >
              <div className="flex items-center gap-4 text-sm xl:text-base">
                <i className="fas fa-road text-xl xl:text-2xl"></i>
                <p className="font-semibold">MILEAGE <br /> UNLIMITED</p>
              </div>
              <div className="flex items-center gap-4 text-sm xl:text-base">
                <i className="fas fa-map-marker-alt text-xl xl:text-2xl"></i>
                <p className="font-semibold">PICK UP <br /> SERVICE</p>
              </div>
              <div className="flex items-center gap-4 text-sm xl:text-base">
                <i className="fas fa-shipping-fast text-xl xl:text-2xl"></i>
                <p className="font-semibold">DELIVERY <br /> TO DOOR</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Car Interior Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full lg:w-[50%] lg:h-[420px] flex justify-center lg:absolute lg:top-5 lg:right-0"
          >
            <img
              src="/aboutus2.jpg"
              alt="Car Interior"
              className="w-full h-max-[300px] md:h-max-[300px] lg:h-[350px] xl:h-[420px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
