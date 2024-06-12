import React, { useState } from 'react';
import UserReg from './UserReg'; 
import HostReg from './HostReg'; 
import PartnerReg from './PartnerReg'; 

const Register = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUserReg, setShowUserReg] = useState(false); // State to toggle UserReg component
  const [showHostReg, setShowHostReg] = useState(false);
  const [showPartnerReg, setShowPartnerReg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // We can use axios to make a POST request to your registration endpoint
    // Remember to handle errors and success cases appropriately
    // After successful registration, we can close the modal
    onClose();
  };

  const handleUserRegClick = () => {
    setShowUserReg(true); // Show UserReg component when user register button is clicked
    setShowHostReg(false); // Hide HostReg component
    setShowPartnerReg(false); // Hide PartnerReg component
  };

  const handleHostRegClick = () => {
    setShowUserReg(false); // Hide UserReg component
    setShowHostReg(true); // Show HostReg component when host register button is clicked
    setShowPartnerReg(false); // Hide PartnerReg component
  };

  const handlePartnerRegClick = () => {
    setShowUserReg(false); // Hide UserReg component
    setShowHostReg(false); // Hide HostReg component
    setShowPartnerReg(true); // Show PartnerReg component when partner register button is clicked
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {showUserReg ? (
              <UserReg onClose={onClose} />
            ) : showHostReg ? (
              <HostReg onClose={onClose} />
            ) : showPartnerReg ? (
              <PartnerReg onClose={onClose} />
            ) : (
              <>
                <div className="mb-4">
                  <p className="block text-gray-700 text-sm font-bold mb-2">Register As</p>
                  <div className="flex justify-between">
                    <button
                      onClick={handleHostRegClick} // Handle click to show HostReg component
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mr-2"
                      type="button"
                    >
                      Host
                    </button>
                    <button
                      onClick={handleUserRegClick} // Handle click to show UserReg component
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mr-2"
                      type="button"
                    >
                      User
                    </button>
                    <button
                      onClick={handlePartnerRegClick} // Handle click to show PartnerReg component
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                      type="button"
                    >
                      Partner
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
