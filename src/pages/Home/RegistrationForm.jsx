import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './RegistrationForm.css';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const RegistrationForm = ({ loginType, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    businessAddress: {
      street: '',
      district: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    tradeLicenseNumber: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('businessAddress')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        businessAddress: {
          ...prevData.businessAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const endpoint = loginType === 'Partner'
      ? `${config.API_BASE_URL}/api/v1/users/register/partner`
      : `${config.API_BASE_URL}/api/v1/users/register/client`;

    const body = loginType === 'Partner'
      ? {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          businessAddress: formData.businessAddress,
          tradeLicenseNumber: formData.tradeLicenseNumber,
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
    <div className="fixed-top vw-100 vh-100 bg-overlay d-flex justify-content-center align-items-center">
      <div className="registration-form-container p-4 rounded-lg shadow-lg position-relative">
        <button
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0 m-1"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-center mb-4">{`Register as ${loginType}`}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {loginType === 'Partner' && (
            <>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="businessAddress.street">Street</label>
                  <input
                    type="text"
                    id="businessAddress.street"
                    name="businessAddress.street"
                    className="form-control"
                    value={formData.businessAddress.street}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="businessAddress.district">District</label>
                  <input
                    type="text"
                    id="businessAddress.district"
                    name="businessAddress.district"
                    className="form-control"
                    value={formData.businessAddress.district}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="businessAddress.city">City</label>
                  <input
                    type="text"
                    id="businessAddress.city"
                    name="businessAddress.city"
                    className="form-control"
                    value={formData.businessAddress.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="businessAddress.state">State</label>
                  <input
                    type="text"
                    id="businessAddress.state"
                    name="businessAddress.state"
                    className="form-control"
                    value={formData.businessAddress.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="businessAddress.zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="businessAddress.zipCode"
                    name="businessAddress.zipCode"
                    className="form-control"
                    value={formData.businessAddress.zipCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="businessAddress.country">Country</label>
                  <input
                    type="text"
                    id="businessAddress.country"
                    name="businessAddress.country"
                    className="form-control"
                    value={formData.businessAddress.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="tradeLicenseNumber">Trade License Number</label>
                <input
                  type="text"
                  id="tradeLicenseNumber"
                  name="tradeLicenseNumber"
                  className="form-control"
                  value={formData.tradeLicenseNumber}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
