import React, { useState } from 'react';

const UserReg = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    hostId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Registration successful, handle accordingly (e.g., redirect)
        console.log('Registration successful');
      } else {
        // Registration failed, handle error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div >
      <h1 className="text-2xl font-bold mb-4 p-2">User Registration</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="hostId" className="block text-gray-700">Host ID:</label>
        <input
          type="text"
          id="hostId"
          name="hostId"
          value={formData.hostId}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between space-x-4">
  <button
    onClick={onClose}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="button"
    style={{ marginRight: '8px' }}
  >
    Cancel
  </button>
  <button
    type="submit"
    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Register
  </button>
</div>

    </form>
    </div>
  );
};

export default UserReg;
