import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import NavbarComp from '../Home/NavbarComp';
import Footer from '../Home/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEdit, faArrowLeft, faKey } from '@fortawesome/free-solid-svg-icons';
import user from '../../img/home-two/user.png';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isRequestingPasswordReset, setIsRequestingPasswordReset] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch user profile data
    axios.get('/api/v1/users/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile', error);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/v1/users/profile', profile)
      .then(response => {
        console.log('Profile updated', response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating profile', error);
      });
  };

  const handlePasswordResetRequest = (e) => {
    e.preventDefault();
    axios.post('/api/v1/users/reset-password', { email })
      .then(response => {
        console.log('Password reset email sent', response.data);
        setIsRequestingPasswordReset(false);
        setIsResettingPassword(true);
      })
      .catch(error => {
        console.error('Error requesting password reset', error);
      });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    axios.post('/api/v1/users/reset-password', { email, newPassword })
      .then(response => {
        console.log('Password reset successfully', response.data);
        setIsResettingPassword(false);
        setNewPassword('');
        setEmail('');
      })
      .catch(error => {
        console.error('Error resetting password', error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComp />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-32 m-36 bg-white shadow-lg rounded-lg space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {!isRequestingPasswordReset && !isResettingPassword ? (
              <>
                <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
                <img
                  src={user}
                  alt="Default Profile"
                  className="w-40 h-40 mx-auto mb-6 rounded-full"
                />
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <label className="block text-sm font-medium">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg pl-10"
                      />
                      <FontAwesomeIcon icon={faUser} className="absolute left-3 top-10 text-gray-400" />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg pl-10"
                      />
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-10 text-gray-400" />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg pl-10"
                      />
                      <FontAwesomeIcon icon={faLock} className="absolute left-3 top-10 text-gray-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Update Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <p className="text-lg"><strong>Username:</strong> {profile.username}</p>
                    <p className="text-lg"><strong>Email:</strong> {profile.email}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Profile
                    </button>
                    <button
                      onClick={() => setIsRequestingPasswordReset(true)}
                      className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faKey} className="mr-2" /> Reset Password
                    </button>
                  </div>
                )}
              </>
            ) : isRequestingPasswordReset ? (
              <>
                <h1 className="text-3xl font-bold mb-6 text-center">Request Password Reset</h1>
                <form onSubmit={handlePasswordResetRequest} className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg pl-10"
                    />
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-10 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Request Password Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRequestingPasswordReset(false)}
                      className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg pl-10"
                    />
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-10 text-gray-400" />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg pl-10"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Reset Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsResettingPassword(false)}
                      className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
