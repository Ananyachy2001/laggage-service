import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

const BookingForm = ({ 
  handleSubmit, 
  luggageQuantity, 
  setLuggageQuantity, 
  promoCode, 
  setPromoCode, 
  discount, 
  setDiscount, 
  checkinTime, 
  setCheckinTime, 
  checkoutTime, 
  setCheckoutTime, 
  totalPrice, 
  setTotalPrice, 
  regularprice, 
  locationid, 
  clientId, 
  clientDetails, 
  setClientDetails
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setTotalPrice(0); 
    setDiscount(0); 
  }, [setTotalPrice, setDiscount]);

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      setErrorMessage("Invalid promo code. Please try again.");
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setDiscount(0);
    setPromoApplied(false);
  };

  const calculateDuration = (checkin, checkout) => {
    if (!checkin || !checkout) return 1;
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const duration = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    return duration > 0 ? duration : 1;
  };

  const validateDateTime = (checkin, checkout) => {
    const now = new Date();
    if (new Date(checkin) < now || new Date(checkout) < now) {
      setErrorMessage('Check-in and check-out times must be in the future.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  useEffect(() => {
    if (validateDateTime(checkinTime, checkoutTime) && checkinTime && checkoutTime) {
      const servicePrice = 5; // Fixed price for standard service
      const duration = calculateDuration(checkinTime, checkoutTime);
      const price = (regularprice + servicePrice) * duration - discount;
      setTotalPrice(price > 0 ? price : 0);
    }
  }, [discount, checkinTime, checkoutTime, regularprice, setTotalPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails({
      ...guestDetails,
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
    if (!guestDetails.name && !clientId) newErrors.name = 'Name is required';
    if (!guestDetails.email && !clientId) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(guestDetails.email) && !clientId) {
      newErrors.email = 'Email is invalid';
    }
    if (!guestDetails.phone && !clientId) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading to true

    const bookingData = {
      location: locationid,
      startDate: new Date(checkinTime).toISOString().split('T')[0],
      startTime: new Date(checkinTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      endDate: new Date(checkoutTime).toISOString().split('T')[0],
      endTime: new Date(checkoutTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      totalPricePaid: totalPrice,
      specialRequests: clientDetails.specialRequests || 'No requirement',
    };

    if (clientId) {
      bookingData.client = clientId;
    } else {
      bookingData.guest = {
        name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone
      };
    }

    try {
      await handleSubmit(bookingData);
      setShowModal(false); // Close modal on successful submission
    } catch (error) {
      setErrorMessage('Submission failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const openUserDetailsModal = () => {
    if (validateDateTime(checkinTime, checkoutTime)) {
      setShowModal(true);
    } else {
      setErrorMessage('Please fill out all required fields before proceeding.');
    }
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6">
      <h5 className="text-xl font-bold mb-4">Your Booking</h5>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form id="booking-form" onSubmit={handleFormSubmit}>
        <div className="flex justify-between mb-4">
          <label className="w-1/2 pr-2">
            Drop off:
            <input 
              type="datetime-local" 
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              value={checkinTime}
              onChange={(e) => setCheckinTime(e.target.value)}
              required
            />
          </label>
          <label className="w-1/2 pl-2">
            Pick up:
            <input 
              type="datetime-local" 
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              value={checkoutTime}
              onChange={(e) => setCheckoutTime(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="luggageQuantity" className="block font-bold mb-1">Number of Bags:</label>
          <div className="flex items-center">
            <input 
              type="number" 
              className="w-full p-2 border border-gray-300 rounded" 
              id="luggageQuantity" 
              name="luggageQuantity" 
              value={luggageQuantity} 
              onChange={(e) => setLuggageQuantity(Number(e.target.value))} 
              required 
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="font-bold">Luggage Service: Standard - $5.00 per day</label>
        </div>
        <div className="mb-4">
          <label htmlFor="promoCode" className="block font-bold mb-1">Promo Code:</label>
          <div className="flex items-center">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              id="promoCode" 
              name="promoCode" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
            />
            {promoApplied ? (
              <button 
                type="button" 
                className="ml-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
                onClick={handleRemovePromo}
              >
                Remove
              </button>
            ) : (
              <button 
                type="button" 
                className="ml-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-300"
                onClick={handleApplyPromo}
              >
                Apply
              </button>
            )}
          </div>
        </div>
        {checkinTime && checkoutTime && (
          <div className="mb-4">
            <label className="font-bold">Total Price: $</label>
            <span id="totalPrice">{totalPrice.toFixed(2)}</span>
          </div>
        )}
        {clientId && (
          <div>
            <label className="font-bold">Client ID: </label>
            <span id="clientId">{clientId}</span>
          </div>
        )}
        <div className="mb-4">
          <label className="font-bold">Location ID: </label>
          <span id="locationid">{locationid}</span>
        </div>
        <Button 
          variant="primary" 
          onClick={openUserDetailsModal} 
          className="w-full bg-[#1A73A7] text-white py-2 rounded hover:bg-blue-700 transition duration-300 mb-2"
          disabled={!checkinTime || !checkoutTime}
        >
          Book Now
        </Button>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="modal-dialog-centered">
        <Modal.Header closeButton className="bg-[#1A73A7] text-white">
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-100 p-6 rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner animation="border" variant="primary" />
              <span className="ml-3 text-gray-500">Submitting...</span>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {!clientId && (
                <>
                  <div>
                    <label htmlFor="clientName" className="block font-semibold mb-1">Name:</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="clientName"
                      name="name"
                      value={guestDetails.name}
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
                      value={guestDetails.email}
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
                      value={guestDetails.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                  </div>
                </>
              )}
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
              {clientId && (
                <div>
                  <label className="font-bold">Client ID: </label>
                  <span id="clientId">{clientId}</span>
                </div>
              )}
              <Button variant="primary" type="submit" className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300">
                Submit
              </Button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Show error message */}
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingForm;
