import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import config from '../../config';
import RegistrationForm from './RegistrationForm';

const LoginForm = ({ loginType, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = loginType === 'Partner'
      ? `${config.API_BASE_URL}/api/v1/users/login/partner`
      : `${config.API_BASE_URL}/api/v1/users/login/client`;

    const body = {
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
        localStorage.setItem('token', result.token); // Store the token in local storage
        if (loginType === 'Partner') {
          navigate('/partner/profile'); // Redirect to partner profile
        } else {
          navigate('/client/home'); // Redirect to client profile
        }
      } else {
        console.error('Error:', result);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `${config.API_BASE_URL}/api/v1/users/reset-password`;

    const body = {
      email: formData.email,
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
        navigate('/'); // Redirect to home page
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
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        {showForgotPassword ? (
          <>
            <h2 className="text-center mb-4 text-3xl font-bold text-blue-700">Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <button className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105" type="submit">
                  Reset Password
                </button>
              </div>
            </form>
            <div className="text-center">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </>
        ) : (
          isLogin ? (
            <>
              <h2 className="text-center mb-4 text-3xl font-bold text-[#4A686A]">{`Login as ${loginType}`}</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#518689]"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#518689]"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <button className="w-full bg-[#518689] hover:bg-[#4A686A] text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105" type="submit">
                    Log in
                  </button>
                </div>
              </form>
              <div className="text-center">
                <button
                  className="text-[#4A686A] hover:underline me-4"
                  onClick={() => setIsLogin(false)}
                >
                  Need an account? Register
                </button>
                <button
                  className="text-[#4A686A] hover:underline"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <RegistrationForm loginType={loginType} onClose={onClose} />
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
