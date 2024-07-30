import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDetailsModal = ({ showModal, setShowModal, clientDetails, setClientDetails, handleSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails({
      ...clientDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setClientDetails({
      ...clientDetails,
      luggagePhotos: files,
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
    if (!clientDetails.phone) newErrors.phone = 'Phone number is required';
    if (!clientDetails.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(); // Call the passed handleSubmit function
      setShowModal(false); // Close the modal on successful submit
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton className="bg-primary text-white d-flex justify-content-center align-items-center">
        <Modal.Title className="text-center w-100">User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light p-4 rounded-lg">
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div>
            <label htmlFor="clientName" className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              className="form-control"
              id="clientName"
              name="name"
              value={clientDetails.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="clientEmail" className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              className="form-control"
              id="clientEmail"
              name="email"
              value={clientDetails.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="clientPhone" className="block font-semibold mb-1">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              id="clientPhone"
              name="phone"
              value={clientDetails.phone}
              onChange={handleInputChange}
              required
            />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="clientAddress" className="block font-semibold mb-1">Address:</label>
            <input
              type="text"
              className="form-control"
              id="clientAddress"
              name="address"
              value={clientDetails.address}
              onChange={handleInputChange}
              required
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="luggagePhotos" className="block font-semibold mb-1">Luggage Photos (optional):</label>
            <input
              type="file"
              className="form-control"
              id="luggagePhotos"
              name="luggagePhotos"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserDetailsModal;
