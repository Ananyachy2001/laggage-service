import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDetailsModal = ({ showModal, setShowModal, clientDetails, setClientDetails, handleSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails({
      ...clientDetails,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setClientDetails({
      ...clientDetails,
      luggagePhotos: files
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!clientDetails.name) newErrors.name = 'Name is required';
    if (!clientDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(clientDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!clientDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(clientDetails.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!clientDetails.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} className="modal-dialog-centered">
      <Modal.Header closeButton className="bg-[#1A73A7] text-white">
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-gray-100 p-6 rounded-lg">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="clientName" className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="clientName"
              name="name"
              value={clientDetails.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="clientEmail" className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="clientEmail"
              name="email"
              value={clientDetails.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="clientPhone" className="block font-semibold mb-1">Phone Number:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="clientPhone"
              name="phone"
              value={clientDetails.phone}
              onChange={handleInputChange}
              required
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="clientAddress" className="block font-semibold mb-1">Address:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="clientAddress"
              name="address"
              value={clientDetails.address}
              onChange={handleInputChange}
              required
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="luggagePhotos" className="block font-semibold mb-1">Luggage Photos (optional):</label>
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="luggagePhotos"
              name="luggagePhotos"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <Button variant="primary" type="submit" className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserDetailsModal;
