import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import NavbarComp from '../Home/NavbarComp';
import Footer from '../Home/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEdit, faArrowLeft, faBuilding, faIdCard } from '@fortawesome/free-solid-svg-icons';
import user from '../../img/home-two/user.png';

const PartnerProfile = () => {
  const [profile, setProfile] = useState({
    username: 'partner1',
    email: 'partner1@example.com',
    password: 'Password123!',
    businessAddress: {
      street: '123 Main St',
      district: 'Downtown',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    tradeLicenseNumber: '123456789',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch partner profile data
    axios.get('/api/v1/users/profile/partner')
      .then(response => {
        setProfile(prevProfile => ({
          ...prevProfile,
          ...response.data,
          businessAddress: response.data.businessAddress || prevProfile.businessAddress
        }));
      })
      .catch(error => {
        console.error('Error fetching profile', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('businessAddress.')) {
      const addressField = name.split('.')[1];
      setProfile(prevProfile => ({
        ...prevProfile,
        businessAddress: {
          ...prevProfile.businessAddress,
          [addressField]: value,
        },
      }));
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/v1/users/profile/partner', profile)
      .then(response => {
        console.log('Profile updated', response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating profile', error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavbarComp />
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-2xl mx-auto p-8 mt-24 bg-white shadow-lg rounded-lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Partner Profile</h1>
            <div className="flex flex-col items-center mb-8">
              <img
                src={user}
                alt="Default Profile"
                className="w-25 h-25 rounded-full mb-4"
              />
            </div>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faUser} className="absolute left-2 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-1 top-3 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="password"
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <FontAwesomeIcon icon={faLock} className="absolute left-2 top-3 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Street</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="businessAddress.street"
                        value={profile.businessAddress.street}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faBuilding} className="absolute left-2 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">District</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="businessAddress.district"
                        value={profile.businessAddress.district}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faBuilding} className="absolute left-2 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="businessAddress.city"
                        value={profile.businessAddress.city}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faBuilding} className="absolute left-2 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="businessAddress.state"
                        value={profile.businessAddress.state}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faBuilding} className="absolute left-2 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="businessAddress.zipCode"
                        value={profile.businessAddress.zipCode}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faBuilding} className="absolute left-2 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="businessAddress.country"
                        value={profile.businessAddress.country}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faBuilding} className="absolute left-2 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Trade License Number</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="tradeLicenseNumber"
                        value={profile.tradeLicenseNumber}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <FontAwesomeIcon icon={faIdCard} className="absolute left-1 top-3 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    Update Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white py-3 px-6 rounded-md shadow-sm hover:bg-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-lg text-gray-800">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Street:</strong> {profile.businessAddress.street}</p>
                <p><strong>District:</strong> {profile.businessAddress.district}</p>
                <p><strong>City:</strong> {profile.businessAddress.city}</p>
                <p><strong>State:</strong> {profile.businessAddress.state}</p>
                <p><strong>Zip Code:</strong> {profile.businessAddress.zipCode}</p>
                <p><strong>Country:</strong> {profile.businessAddress.country}</p>
                <p><strong>Trade License Number:</strong> {profile.tradeLicenseNumber}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Profile
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnerProfile;
