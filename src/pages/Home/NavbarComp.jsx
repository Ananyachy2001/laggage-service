import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm'; // Assuming LoginForm is in the same directory
import logo from '../../img/home-two/logo3.svg';

const NavbarComp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

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
      }, 300); // Adjust the delay time as needed
      return () => clearTimeout(timer);
    }
  }, [isHovering, activeDropdown]);

  return (
    <div className="fixed top-0 w-full bg-[#4A686A] shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <a href="index2.html" className="flex items-center">
          <img src={logo} alt="logo1" className="h-16 w-40" />
        </a>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
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
        <nav className={`flex-col md:flex md:flex-row md:space-x-4 text-white ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <a href="/" className="hover:text-[#FDB139]">Home</a>
          <div 
            className="relative group" 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button onClick={() => handleDropdownToggle('pages')} className="hover:text-[#FDB139] flex items-center focus:outline-none">
              Pages <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`absolute bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'pages' ? 'block' : 'hidden'} md:group-hover:block`}>
              {["Sign In",  "FAQ", "404 Error Page",  "Terms & Conditions"].map(page => (
                <a href={`${page.toLowerCase().replace(/ /g, '-')}.html`} key={page} className="block px-4 py-2 text-gray-600 hover:text-[#FDB139]">{page}</a>
              ))}
            </div>
          </div>
          <a href="about.html" className="hover:text-[#FDB139]">About</a>

          
          <a href="contact.html" className="hover:text-[#FDB139]">Contact</a>
          <div 
            className="relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button onClick={() => handleDropdownToggle('luggagestorage')} className="hover:text-[#FDB139] flex items-center focus:outline-none">
            Luggage Storage <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`absolute bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'luggagestorage' ? 'block' : 'hidden'} md:group-hover:block`}>
              {["Drop & Pickup Your Keys", "Furniture Storage"].map(luggagestorage => (
                <a href={`${luggagestorage.toLowerCase().replace(/ /g, '-')}.html`} key={luggagestorage} className="block px-4 py-2 text-gray-600 hover:text-[#FDB139]">{luggagestorage}</a>
              ))}
            </div>
          </div>
        </nav>
        <div className="flex items-center space-x-4 text-white">
          <div 
            className="relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button onClick={() => handleDropdownToggle('login')} className="hover:text-[#FDB139] flex items-center focus:outline-none">
              Login <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`absolute bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'login' ? 'block' : 'hidden'} md:group-hover:block`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle('partner-login');
                }}
                className="block px-4 py-2 text-gray-600 hover:text-[#FDB139]"
              >
                Partner Login
              </a>
              {activeDropdown === 'partner-login' && (
                <LoginForm
                  loginType="Partner "
                  onClose={() => setActiveDropdown(null)}
                />
              )}

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle('user-login');
                }}
                className="block px-4 py-2 text-gray-600 hover:text-[#FDB139]"
              >
                User Login
              </a>
              {activeDropdown === 'user-login' && (
                <LoginForm
                  loginType="User "
                  onClose={() => setActiveDropdown(null)}
                />
              )}
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
            <div className={`absolute bg-white shadow-md mt-1 rounded-md overflow-hidden ${activeDropdown === 'language' ? 'block' : 'hidden'} md:group-hover:block`}>
              {["English", "Spanish", "Chinese", "Arabic"].map(language => (
                <a href="#" key={language} className="block px-4 py-2 text-gray-600 hover:text-[#FDB139]">{language}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarComp;
