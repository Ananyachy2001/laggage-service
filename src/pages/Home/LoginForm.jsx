import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import RegistrationForm from './RegistrationForm';

const LoginForm = ({ loginType, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
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
        navigate('/userprofile'); // Redirect to dashboard
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
    <div className="fixed-top vw-100 vh-100 bg-overlay d-flex justify-content-center align-items-center">
      <div className="login-form-container p-4 rounded-lg shadow-lg position-relative">
        <button
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0 m-1"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        {isLogin ? (
          <>
            <h2 className="text-center mb-4">{`Login as ${loginType}`}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <button
                className="btn btn-link"
                onClick={() => setIsLogin(false)}
              >
                Need an account? Register
              </button>
            </div>
          </>
        ) : (
          <RegistrationForm loginType={loginType} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
