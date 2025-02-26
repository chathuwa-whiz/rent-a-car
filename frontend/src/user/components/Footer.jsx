import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const TextHoverEffect = ({ text }) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;

      if (!isNaN(cxPercentage) && !isNaN(cyPercentage)) {
        setMaskPosition({
          cx: `${cxPercentage}%`,
          cy: `${cyPercentage}%`,
        });
      }
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 390 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor={"#177A65"} />
              <stop offset="100%" stopColor={"#24AC90"} />
            </>
          )}
        </linearGradient>

        <radialGradient id="revealMask" cx={maskPosition.cx} cy={maskPosition.cy} r="30%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="font-bold stroke-[#3d3a3a] fill-transparent text-7xl"
        style={{ opacity: hovered ? 0.9 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.2"
        className="font-bold fill-transparent text-7xl stroke-[#3d3a3a]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="font-bold fill-transparent text-7xl"
      >
        {text}
      </text>
    </svg>
  );
};

export default function Footer() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      <footer className="pt-22 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-graylight font-bold text-lg">RENTACAR</h2>
            <p className="mt-2 text-graydark max-w-xs">
              Wherever you go, we make renting a car simple, fast, and affordable!
            </p>
          </div>

          {/* Middle and Right Sections - Menu & Legal (Columns on Mobile) */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            {/* Menu Section */}
            <div>
              <h3 className="text-graylight font-semibold">Menu</h3>
              <ul className="mt-2 text-graydark space-y-2">
                <li><a href="#" className="hover:text-graylight">Home</a></li>
                <li><a href="#" className="hover:text-graylight">Garage</a></li>
                <li><a href="#" className="hover:text-graylight">About</a></li>
                <li><a href="#" className="hover:text-graylight">Contact</a></li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-graylight font-semibold -mt-8 md:mt-0">Legal</h3>
              <ul className="mt-2 text-graydark space-y-2">
                <li><a href="#" className="hover:text-graylight">Terms of service</a></li>
                <li><a href="#" className="hover:text-graylight">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-graylight">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Separator */}
        <div className="mt-10 pb-6 border-t border-graydark"></div>
      </footer>

      {/* Apply text hover effect on large screens */}
      {isLargeScreen ? (
        <div className="h-[200px] md:h-[400px] flex justify-center items-center">
          <TextHoverEffect text="RENTACAR" />
        </div>
      ) : (
        /* Static Gradient Text for Smaller Screens */
        <div className="h-[200px] md:h-[400px] flex justify-center items-center">
          <svg width="100%" height="100%" viewBox="0 0 390 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="staticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#177A65" />
                <stop offset="100%" stopColor="#24AC90" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold text-7xl"
              fill="url(#staticGradient)"
            >
              RENTACAR
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}
