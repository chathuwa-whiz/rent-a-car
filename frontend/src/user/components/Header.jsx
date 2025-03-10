import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  // Check if the user is logged in (using token stored in localStorage)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`bg-black/60 backdrop-blur-md p-3 px-6 max-w-6xl mx-auto my-4 ${
          isOpen ? "md:rounded-lg" : "md:rounded-full"
        } ${isOpen ? "" : "rounded-none"}`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-lg">RENTACAR</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-white">
            <a href="/" className="hover:text-graylight">
              Home
            </a>
            <a href="/fleet" className="hover:text-graylight">
              Fleet
            </a>
            <a href="#aboutus" className="hover:text-graylight">
              About Us
            </a>
            <a href="#contact" className="hover:text-graylight">
              Contacts
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="text-white w-7 h-7" />
              ) : (
                <Menu className="text-white w-7 h-7" />
              )}
            </button>
          </div>

          {/* Language & Profile/Sign Up (Desktop View) */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="bg-white text-black p-2 rounded-full hover:bg-graylight cursor-pointer"
                >
                  <User className="w-4 h-4" />
                </button>
                {isProfileOpen && (
                  <div className="absolute top-10 -right-15 text-white mt-2 w-48 bg-black/60 backdrop-blur-md rounded-md shadow-lg py-2">
                    <button
                      onClick={() => {
                        navigate("/user/profile");
                        setIsProfileOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-800 hover:bg-graydark w-full text-left cursor-pointer"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-graydark w-full text-left cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-black font-semibold px-6 py-1 rounded-full hover:bg-graylight cursor-pointer"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 mt-4 py-4">
            <a href="/" className="text-white hover:text-graylight">
              Home
            </a>
            <a href="/fleet" className="text-white hover:text-graylight">
              Garage
            </a>
            <a href="#aboutus" className="text-white hover:text-graylight">
              About Us
            </a>
            <a href="#contact" className="text-white hover:text-graylight">
              Contacts
            </a>

            <div className="flex items-center space-x-4 mt-4">
              <button className="bg-black text-white text-sm font-medium rounded-full w-[34px] h-8 pb-[2px] flex items-center justify-center">
                EN
              </button>
              {token ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="bg-white text-black p-2 rounded-full hover:bg-graylight"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute -right-15 top-16 text-white mt-2 w-48 bg-black/60 backdrop-blur-md rounded-md shadow-lg py-2">
                      <button
                        onClick={() => {
                          navigate("/user/profile");
                          setIsProfileOpen(false);
                        }}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-black font-semibold px-6 py-1 rounded-full hover:bg-graylight"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
