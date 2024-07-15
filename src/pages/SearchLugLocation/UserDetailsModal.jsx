import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDetailsModal = ({ showModal, setShowModal, clientDetails, setClientDetails, handleSubmit }) => {
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

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="clientName" className="block font-bold mb-1">Name:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="clientName"
              name="name"
              value={clientDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientEmail" className="block font-bold mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              id="clientEmail"
              name="email"
              value={clientDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientPhone" className="block font-bold mb-1">Phone Number:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="clientPhone"
              name="phone"
              value={clientDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientAddress" className="block font-bold mb-1">Address:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="clientAddress"
              name="address"
              value={clientDetails.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="luggagePhotos" className="block font-bold mb-1">Luggage Photos (optional):</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded"
              id="luggagePhotos"
              name="luggagePhotos"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <Button variant="primary" type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserDetailsModal;
