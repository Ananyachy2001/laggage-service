import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm'; // Assuming LoginForm is in the same directory
import './Navbarcomp.css'; 
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
    <div className="fixed top-0 w-full bg-white shadow-md z-50 ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <a href="/" className="flex items-center">
          <img src={logo} alt="logo1" className="h-16 w-40" />
        </a>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#1a73a7] focus:outline-none"
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
        <nav className={`flex-col md:flex md:flex-row md:space-x-4 text-[#1a73a7] ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <div className="md:flex md:flex-row md:space-x-4">
            <a href="/" className="hover:text-[#FDB139]">Home</a>
            <a href="/guideline" className="hover:text-[#FDB139]">Guideline</a>
            <a href="/service" className="hover:text-[#FDB139]">Service</a>
          </div>
          <div className="md:flex md:flex-row md:space-x-4">
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <button onClick={() => handleDropdownToggle('luggagestorage')} className="hover:text-[#FDB139] flex items-center focus:outline-none">
                Luggage Storage <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute bg-blue-900 text-white shadow-lg mt-1 rounded-md overflow-hidden ${activeDropdown === 'luggagestorage' ? 'block' : 'hidden'} md:group-hover:block w-48`}>
                {["Drop & Pickup Your Keys", "Furniture Storage"].map(luggagestorage => (
                  <a href={`${luggagestorage.toLowerCase().replace(/ /g, '-')}.html`} key={luggagestorage} className="block px-4 py-2 hover:bg-blue-800">{luggagestorage}</a>
                ))}
              </div>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <button onClick={() => handleDropdownToggle('login')} className="hover:text-[#FDB139] flex items-center focus:outline-none">
                Login <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute bg-blue-900 text-white shadow-lg mt-1 rounded-md overflow-hidden ${activeDropdown === 'login' ? 'block' : 'hidden'} md:group-hover:block w-48`}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm('Partner');
                  }}
                  className="block px-4 py-2 hover:bg-blue-800"
                >
                  Partner Login
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm('User');
                  }}
                  className="block px-4 py-2 hover:bg-blue-800"
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
              <button onClick={() => handleDropdownToggle('language')} className="hover:text-[#FDB139] flex items-center focus:outline-none">
                Language <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute bg-blue-900 text-white shadow-lg mt-1 rounded-md overflow-hidden ${activeDropdown === 'language' ? 'block' : 'hidden'} md:group-hover:block w-48`}>
                {["English", "Spanish", "Chinese", "Arabic"].map(language => (
                  <a href="#" key={language} className="block px-4 py-2 hover:bg-blue-800">{language}</a>
                ))}
              </div>
            </div>
          </div>
        </nav>
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
