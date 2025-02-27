import React from "react";
import { motion } from "framer-motion";

const GradientText = ({ text }) => {
  return (
    <motion.div
      className="relative flex justify-center items-center w-full h-[80%] select-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="font-bold text-7xl md:text-9xl text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(14, 75, 62, 0.7), rgba(23, 122, 101, 0.7), rgba(60, 243, 240, 0.7), rgba(23, 122, 101, 0.7), rgba(14, 75, 62, 0.7)  )",
          backgroundSize: "200% 200%",
          animation: "gradientAnimation 6s linear infinite",
        }}
      >
        {text}
      </motion.h1>

      <style>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default GradientText;
