import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

const BookingForm = ({
  locationid,
  handleSubmit,
  luggageQuantity,
  setLuggageQuantity,
  serviceOption,
  setServiceOption,
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
  servicePrices,
  regularprice,
  clientDetails,
  setClientDetails,
  clientLoggedIn
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPrice(0); // Initialize total price to 0

    if (clientLoggedIn) {
      // Fetch client profile data
      axios.get(`${config.API_BASE_URL}/api/v1/client/profile`, { withCredentials: true })
        .then(response => {
          setClientDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching client profile:', error);
        });
    }
  }, [clientLoggedIn, setClientDetails]);

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
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
      const servicePrice = servicePrices[serviceOption];
      const price = ((regularprice + servicePrice) * luggageQuantity - discount) * calculateDuration(checkinTime, checkoutTime);
      setTotalPrice(price > 0 ? price : 0);
    }
  }, [luggageQuantity, serviceOption, discount, checkinTime, checkoutTime, regularprice, servicePrices, setTotalPrice]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const bookingData = {
        location: locationid,
        startDate: checkinTime,
        endDate: checkoutTime,
        startTime: new Date(checkinTime).toLocaleTimeString('en-GB'),
        endTime: new Date(checkoutTime).toLocaleTimeString('en-GB'),
        payment: {
          amount: totalPrice,
          method: 'stripe',
          currency: 'aud'
        },
        specialRequests: clientDetails.specialRequests,
        discount: discount,
        notes: clientDetails.notes
      };

      try {
        if (clientLoggedIn) {
          bookingData.client = clientDetails._id;
          await axios.post(`${config.API_BASE_URL}/api/v1/bookings`, bookingData);
        } else {
          bookingData.guest = {
            name: clientDetails.name,
            email: clientDetails.email,
            phone: clientDetails.phone
          };
          await axios.post(`${config.API_BASE_URL}/api/v1/bookings/guest`, bookingData);
        }
        navigate('/client/bookingconfirmation', { state: { bookingDetails: bookingData } });
      } catch (error) {
        setErrorMessage('An error occurred while processing your booking. Please try again.');
      }
    }
  };

  const openUserDetailsModal = () => {
    if (validateDateTime(checkinTime, checkoutTime) && luggageQuantity > 0 && serviceOption) {
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
          <label htmlFor="serviceOption" className="block font-bold mb-1">Luggage Service:</label>
          <div className="flex items-center">
            <select 
              className="w-full p-2 border border-gray-300 rounded" 
              id="serviceOption" 
              name="serviceOption" 
              value={serviceOption} 
              onChange={(e) => setServiceOption(e.target.value)}
              required
            >
              <option value="">Select a service</option>
              <option value="standard">Standard - $5.00 per/day</option>
              <option value="home">Home Luggage - $7.00 per/day</option>
              <option value="window">Window Luggage - $6.50 per/day</option>
              <option value="office">Office Luggage - $8.00 per/day</option>
            </select>
          </div>
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
        <Button 
          variant="primary" 
          onClick={openUserDetailsModal} 
          className="w-full bg-[#1A73A7] text-white py-2 rounded hover:bg-blue-700 transition duration-300 mb-2"
          disabled={!checkinTime || !checkoutTime || luggageQuantity <= 0 || !serviceOption}
        >
          Book Now
        </Button>
      </form>

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
              <label htmlFor="specialRequests" className="block font-semibold mb-1">Special Requests:</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                id="specialRequests"
                name="specialRequests"
                value={clientDetails.specialRequests}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="notes" className="block font-semibold mb-1">Notes:</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                id="notes"
                name="notes"
                value={clientDetails.notes}
                onChange={handleInputChange}
              />
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
    </div>
  );
};

export default BookingForm;
