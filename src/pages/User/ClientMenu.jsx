import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faWallet, faUser, faHeart, faGift, faBox, faFileContract, faCookie, faLifeRing, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import Header from '../../partials/Header';



const ClientMenu = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  if (!token) {
    return null; // Do not display the menu if there's no token
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
          <div className="p-4 flex justify-around items-center">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faCalendar} size="2x" className="text-blue-500" />
              <span className="text-sm mt-2">Bookings</span>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faWallet} size="2x" className="text-green-500" />
              <span className="text-sm mt-2">Wallet</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">A</div>
              <span className="text-sm mt-2">Profile</span>
            </div>
          </div>
          <div className="border-t">
            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
              <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-4" />
              <span>Favorites</span>
            </div>
            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
              <FontAwesomeIcon icon={faGift} className="text-yellow-500 mr-4" />
              <span>Refer a friend</span>
            </div>
            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
              <FontAwesomeIcon icon={faBox} className="text-purple-500 mr-4" />
              <span>Receive packages</span>
            </div>
            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
              <FontAwesomeIcon icon={faFileContract} className="text-blue-500 mr-4" />
              <span>Terms of Service</span>
            </div>
            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
              <FontAwesomeIcon icon={faCookie} className="text-brown-500 mr-4" />
              <span>Manage cookie preferences</span>
            </div>
            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
              <FontAwesomeIcon icon={faLifeRing} className="text-blue-500 mr-4" />
              <span>Support</span>
            </div>
            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
              <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 mr-4" />
              <span>Sign out</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientMenu;
