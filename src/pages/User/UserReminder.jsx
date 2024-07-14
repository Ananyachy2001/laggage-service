import React, { useState } from 'react';
import logo from '../../img/home-two/logo3.svg';
import NavbarComp from '../Home/NavbarComp';

const UserReminder = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <NavbarComp />
      {/* <nav className="bg-white shadow fixed w-full z-10 top-0 ">
        <div className="container mx-auto flex justify-between items-center p-4">
          <a className="text-xl font-bold text-gray-800" href="/">
            <img src={logo} alt="logo2" className="h-20 w-auto" />
          </a>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-gray-800 hover:text-blue-500">Home</a>
            <div className="relative group">
              <a href="/" className="text-gray-800 hover:text-blue-500 flex items-center">Pages <i className='bx bx-chevron-down ml-1'></i></a>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-2">
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign In</a>
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">User Booking Reminder</a>
              </div>
            </div>
            <a href="/" className="text-gray-800 hover:text-blue-500">About</a>
            <a href="/" className="text-gray-800 hover:text-blue-500">Contact</a>
            <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book A Schedule</a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mobile-menu`}>
          <a href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Home</a>
          <div className="relative">
            <a href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center">Pages <i className='bx bx-chevron-down ml-1'></i></a>
            <div className="pl-4">
              <a href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Sign In</a>
              <a href="userbookingreminder.html" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">User Booking Reminder</a>
            </div>
          </div>
          <a href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">About</a>
          <a href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Contact</a>
          <a href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Book A Schedule</a>
        </div>
      </nav> */}

      <div className="container mx-auto mt-36 mb-12">
  <div className="flex justify-center">
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform duration-500 hover:shadow-2xl  ">
        <h3 className="text-center text-2xl font-extrabold text-blue-700 mb-6 ransition-transform duration-500 transform hover:scale-105">User Reminder of Luggage Shop</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="emailAddress">
              Email Address
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              id="emailAddress"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="storeDate">
              Luggage Store Date
            </label>
            <input
              type="date"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              id="storeDate"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="luggageQuantity">
              Luggage Quantity
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              id="luggageQuantity"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="comments">
              Comments
            </label>
            <textarea
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              id="comments"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Request Luggage Store
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

      <footer className="bg-gray-800 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="about.html" className="hover:underline">About</a></li>
                <li><a href="services.html" className="hover:underline">Services</a></li>
                <li><a href="projects.html" className="hover:underline">Projects</a></li>
                <li><a href="team.html" className="hover:underline">Team</a></li>
                <li><a href="blog.html" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
              <h4 className="text-lg font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="faq.html" className="hover:underline">FAQ</a></li>
                <li><a href="privacy-policy.html" className="hover:underline">Privacy Policy</a></li>
                <li><a href="terms-and-conditions.html" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Community</a></li>
                <li><a href="contact.html" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li>Location: 6th Floor, Barbosa, Sidney</li>
                <li>Email: <a href="mailto:info@Urlocker.com" className="hover:underline">info@Urlocker.com</a></li>
                <li>Phone: <a href="tel:+0123456789" className="hover:underline">+0123 456 789</a></li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-700"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-700"><i className='bx bxl-twitter'></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-700"><i className='bx bxl-linkedin'></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-700"><i className='bx bxl-instagram'></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 text-gray-400 text-center py-4">
          <p>Copyright &copy; {new Date().getFullYear()} Urlocker. Designed By <a href="https://hibootstrap.com/" className="text-blue-500 hover:underline">HiBootstrap</a></p>
        </div>
      </footer>
    </div>
  );
};

export default UserReminder;
