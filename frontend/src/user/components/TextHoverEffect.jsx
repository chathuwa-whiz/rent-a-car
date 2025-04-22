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
  }

  export default TextHoverEffect;