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
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> {/* Background overlay */}
        
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"> {/* Modal container */}
          <form onSubmit={handleSubmit} className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                      onClick={handleHostRegClick}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mr-2"
                      type="button"
                    >
                      Host
                    </button>
                    <button
                      onClick={handleUserRegClick}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mr-2"
                      type="button"
                    >
                      SuperAdmin
                    </button>
                    <button
                      onClick={handlePartnerRegClick}
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
