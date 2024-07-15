import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const RegistrationForm = ({ loginType, onClose }) => {
  const [formData, setFormData] = useState({
    directorFirstName: '',
    directorLastName: '',
    companyABN: '',
    companyName: '',
    tradingName: '',
    shopAddress: '',
    bankDetails: {
      bsb: '',
      accountNumber: '',
    },
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('bankDetails')) {
      const bankField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        bankDetails: {
          ...prevData.bankDetails,
          [bankField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const endpoint = loginType === 'Partner'
      ? `${config.API_BASE_URL}/api/v1/users/register/partner`
      : `${config.API_BASE_URL}/api/v1/users/register/client`;

    const body = loginType === 'Partner'
      ? {
          directorFirstName: formData.directorFirstName,
          directorLastName: formData.directorLastName,
          companyABN: formData.companyABN,
          companyName: formData.companyName,
          tradingName: formData.tradingName,
          shopAddress: formData.shopAddress,
          bankDetails: formData.bankDetails,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Success:', result);
        navigate('/'); // Redirect to dashboard
      } else {
        console.error('Error:', result);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  if (!loginType) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-center mb-6 text-4xl font-semibold text-[#4A686A]">{`Register as ${loginType}`}</h2>
        {loginType === 'Partner' && (
          <>
            {currentStep === 1 && (
              <form>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="directorFirstName">Director First Name</label>
                  <input
                    type="text"
                    id="directorFirstName"
                    name="directorFirstName"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.directorFirstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="directorLastName">Director Last Name</label>
                  <input
                    type="text"
                    id="directorLastName"
                    name="directorLastName"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.directorLastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="companyABN">Company ABN</label>
                  <input
                    type="text"
                    id="companyABN"
                    name="companyABN"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.companyABN}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center items-center mb-4">
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 px-4 rounded transition duration-200"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {currentStep === 2 && (
              <form>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="tradingName">Trading Name</label>
                  <input
                    type="text"
                    id="tradingName"
                    name="tradingName"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.tradingName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="shopAddress">Shop Address</label>
                  <input
                    type="text"
                    id="shopAddress"
                    name="shopAddress"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.shopAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#4A686A] font-medium" htmlFor="bankDetails.bsb">BSB</label>
                    <input
                      type="text"
                      id="bankDetails.bsb"
                      name="bankDetails.bsb"
                      className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                      value={formData.bankDetails.bsb}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A686A] font-medium" htmlFor="bankDetails.accountNumber">Account Number</label>
                    <input
                      type="text"
                      id="bankDetails.accountNumber"
                      name="bankDetails.accountNumber"
                      className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                      value={formData.bankDetails.accountNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center mb-4">
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 px-4 rounded transition duration-200"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {currentStep === 3 && (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4A686A] font-medium" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center items-center mb-4">
                  <button
                    className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 px-4 rounded transition duration-200"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
            )}
          </>
        )}
        {loginType !== 'Partner' && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-[#4A686A] font-medium" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#4A686A] font-medium" htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#4A686A] font-medium" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-[#4A686A] rounded-md focus:outline-none focus:border-[#518689]"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center items-center mb-4">
              <button
                className="w-full bg-[#4A686A] hover:bg-[#518689] text-white py-2 px-4 rounded transition duration-200"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
