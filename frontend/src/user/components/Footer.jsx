import React, {useState, useEffect } from "react";
import GradientText from "./GradientText";
import TextHoverEffect from "./TextHoverEffect";

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

          {/* Middle and Right Sections */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            {/* Menu Section */}
            <div>
              <h3 className="text-graylight font-semibold">Menu</h3>
              <ul className="mt-2 text-graydark space-y-2">
                <li><a href="" className="hover:text-graylight">Home</a></li>
                <li><a href="/fleet" className="hover:text-graylight">Fleet</a></li>
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

  
      {isLargeScreen ? (
        <div className="h-[200px] md:h-[400px] flex justify-center items-center">
          <TextHoverEffect text="RENTACAR" />
        </div>
      ) : (
        
        <div className="h-[200px] md:h-[400px] flex justify-center items-center">
      <GradientText text="RENTACAR" />
    </div>
      )}
    </div>
  );
}
