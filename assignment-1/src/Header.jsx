import mendlesonLogo from "./assets/logo.svg";
import Asset1 from "./assets/graphic/Asset1.svg";
import Asset2 from "./assets/graphic/Asset2.svg";

import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { title: "About Us", link: "#About Us" },
  { title: "Services", link: "#Services" },
  { title: "Team", link: "#Team" },
  { title: "Clients", link: "#Clients" },
  { title: "Contact Us", link: "#Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full ">
      <img
          src={Asset1}
          alt="Asset 1"
          className="absolute -top-7 -left-8 scale-60 md:-top-3 md:-left-3 md:scale-80 lg:scale-none lg:left-0 lg:top-0"
        />
      <nav className=" z-50 ">
      <div className="max-w-screen ml-8 px-4 sm:px-6 lg:max-xl:pr-20 xl:pr-32">
        <div className="flex justify-between items-center ">
          {/* Logo  */}
          <div className="flex-shrink-0 ml-5 mt-2 md:ml-18">
            <img
                src={mendlesonLogo}
                alt="Logo"
                className="w-45 md:w-auto md:scale-none"
                loading="lazy"
              />
          </div>

          {/* Desktop Navigation Links - Always visible on tablet/desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map(({title,link},index) => (
              <a
                key={index}
                href={link}
                className="text-gray-600 hover:text-blue-600 xl:px-3 xl:py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {title}
              </a>
            ))}
          </div>

          {/* Mobile/Tablet menu button - Only visible on mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6 md:h-10 md:-10" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6 md:h-10 md:w-10" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Menu - Only visible on mobile when toggled */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-6 pt-2 pb-3 space-y-1 sm:px-3 bg-white text-right">
          {navLinks.map(({title,link},index) => (
            <a
              key={index}
              href={link}
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-1 rounded-md text-lg font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {title}
            </a>
          ))}
        </div>
      </div>
    </nav>
    <img
          src={Asset2}
          alt="Asset 2"
          className="absolute -top-30 -right-23 scale-35 md:scale-60 md:-top-18 md:-right-14 lg:scale-none lg:top-0 lg:-right-0 -z-1"
        />
    </div>
  );
};

export default Header;
