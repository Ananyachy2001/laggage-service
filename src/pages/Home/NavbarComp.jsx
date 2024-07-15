import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm'; // Assuming LoginForm is in the same directory
import logo from '../../img/home-two/logo3.svg';

const NavbarComp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [loginFormType, setLoginFormType] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  useEffect(() => {
    if (!isHovering && activeDropdown) {
      const timer = setTimeout(() => {
        setActiveDropdown(null);
      }, 500); // Adjust the delay time as needed
      return () => clearTimeout(timer);
    }
  }, [isHovering, activeDropdown]);

  const openLoginForm = (type) => {
    setLoginFormType(type);
    setActiveDropdown(null); // Close other dropdowns
  };

  const closeLoginForm = () => {
    setLoginFormType(null);
  };

  return (
    <div className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <a href="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-16 w-40" />
        </a>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
          <nav className="flex flex-col md:flex-row md:space-x-4 text-gray-800">
            <a href="/" className="hover:text-yellow-500 py-2 md:py-0">Home</a>
            <div 
              className="relative group" 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <button onClick={() => handleDropdownToggle('pages')} className="hover:text-yellow-500 flex items-center focus:outline-none py-2 md:py-0">
                Pages <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute left-0 bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'pages' ? 'block' : 'hidden'} group-hover:block`}>
                {[
                  "Host Availability Calender",
                  "User Remainder",
                  "Dashboard",
                ].map((page) => (
                  <a
                    href={`/${page.toLowerCase().replace(/ /g, '_')}`}
                    key={page}
                    className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white"
                  >
                    {page}
                  </a>
                ))}
              </div>
            </div>
            <a href="about.html" className="hover:text-yellow-500 py-2 md:py-0">About</a>
            <a href="contact.html" className="hover:text-yellow-500 py-2 md:py-0">Contact</a>
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <button onClick={() => handleDropdownToggle('luggagestorage')} className="hover:text-yellow-500 flex items-center focus:outline-none py-2 md:py-0">
                Luggage Storage <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute left-0 bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'luggagestorage' ? 'block' : 'hidden'} group-hover:block`}>
                {["Drop & Pickup Your Keys", "Furniture Storage"].map(luggagestorage => (
                  <a href={`${luggagestorage.toLowerCase().replace(/ /g, '-')}.html`} key={luggagestorage} className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white">{luggagestorage}</a>
                ))}
              </div>
            </div>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-2 md:mt-0 text-gray-800">
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <button onClick={() => handleDropdownToggle('login')} className="hover:text-yellow-500 flex items-center focus:outline-none py-2 md:py-0">
                Login <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute left-0 bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'login' ? 'block' : 'hidden'} group-hover:block`}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm('Partner');
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white"
                >
                  Partner Login
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm('User');
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white"
                >
                  User Login
                </a>
              </div>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <button onClick={() => handleDropdownToggle('language')} className="hover:text-yellow-500 flex items-center focus:outline-none py-2 md:py-0">
                Language <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute left-0 bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'language' ? 'block' : 'hidden'} group-hover:block`}>
                {["English", "Spanish", "Chinese", "Arabic"].map(language => (
                  <a href="#" key={language} className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white">{language}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loginFormType && (
        <LoginForm
          loginType={loginFormType}
          onClose={closeLoginForm}
        />
      )}
    </div>
  );
};

export default NavbarComp;
