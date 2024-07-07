import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import config from '../../config';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const { baseURL } = config;

  const handleLogin = async () => {
    try {
      console.log("Base URL:", baseURL);
      let endpoint;
      switch (role) {
        case 'partner':
          endpoint = `${baseURL}/partners/login`;
          break;
        case 'host':
          endpoint = `${baseURL}/hosts/login`;
          break;
        case 'superadmin':
        default:
          endpoint = `${baseURL}/superadmin/login`;
          break;
      }

      const response = await axios.post(endpoint, { email, password });
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);

      console.log('Login successful. Token:', token);

      // Redirect to the dashboard
      navigate('/');

    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showRegister ? (
        <Register onClose={handleCloseRegister} />
      ) : (
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="superadmin">Superadmin</option>
                <option value="partner">Partner</option>
                <option value="host">Host</option>
              </select>
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Log In
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
