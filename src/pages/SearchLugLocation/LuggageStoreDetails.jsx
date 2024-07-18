import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faClock, faStar, faWifi, faGlassMartini, faRestroom, faShieldAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LuggageNavbar from './LuggageNavbar';
import UserDetailsModal from './UserDetailsModal';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../config';

library.add(faMapMarkerAlt, faClock, faStar, faWifi, faGlassMartini, faRestroom, faShieldAlt, faTag);

const LuggageStoreDetails = () => {
  const location = useLocation();
  const { title, details, price, image, lat, lng } = location.state || {};
  const [luggageQuantity, setLuggageQuantity] = useState(1);
  const [serviceOption, setServiceOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    luggagePhotos: []
  });
  const [checkinTime, setCheckinTime] = useState('');
  const [checkoutTime, setCheckoutTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming the user is logged in for simplicity
  const navigate = useNavigate();

  const servicePrices = {
    standard: 5.00,
    home: 7.00,
    window: 6.50,
    office: 8.00,
  };

  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;
  useEffect(() => {
    if (lat && lng) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.initMap = function () {
        const location = { lat, lng };
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: location,
        });
        new google.maps.Marker({
          position: location,
          map: map,
        });
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [lat, lng]);

  useEffect(() => {
    const price = (servicePrices[serviceOption] * luggageQuantity - discount) * calculateDuration(checkinTime, checkoutTime);
    setTotalPrice(price > 0 ? price : 0);
  }, [luggageQuantity, serviceOption, discount, checkinTime, checkoutTime]);

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const calculateDuration = (checkin, checkout) => {
    if (!checkin || !checkout) return 1; // Default to 1 if times are not set
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const duration = (checkoutDate - checkinDate) / (1000 * 24 * 60 * 60); // duration in hours
    return duration > 0 ? duration : 1; // Return 1 if the duration is negative or zero
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    console.log({
      clientDetails,
      totalPrice,
      serviceOption,
      luggageQuantity,
      checkinTime,
      checkoutTime,
    }); // Log the data being passed
    navigate('/client/bookingconfirmation', {
      state: {
        clientDetails,
        totalPrice,
        serviceOption,
        luggageQuantity,
        checkinTime,
        checkoutTime,
      }
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setShowModal(false);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <LuggageNavbar />

      <div className="container mx-auto mt-12 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <FontAwesomeIcon icon="map-marker-alt" className="text-blue-500 mr-2" />
                {title}
              </h3>
              <h6 className="text-gray-600 mb-4 flex items-center">
                <FontAwesomeIcon icon="clock" className="text-blue-500 mr-2" />
                {details}
              </h6>
              <div id="map" className="h-80 mb-4 rounded-lg shadow-sm"></div>
              <p className="flex items-center mb-2">
                <FontAwesomeIcon icon="map-marker-alt" className="text-blue-500 mr-2" />
                <strong>Address:</strong> Address will be shown after booking
              </p>
              <p className="flex items-center mb-2">
                <FontAwesomeIcon icon="tag" className="text-blue-500 mr-2" />
                <strong>Price:</strong> {price}
              </p>
              <p className="flex items-center mb-2">
                <FontAwesomeIcon icon="star" className="text-yellow-400 mr-2" />
                <strong>Rating:</strong> 4.7 (4237 reviews)
              </p>
              <p className="flex items-center mb-2">
                <FontAwesomeIcon icon="wifi" className="text-blue-500 mr-2" />
                <strong>Services:</strong> Free Wi-Fi, Bar, Bathrooms
              </p>
              <p className="flex items-center mb-2">
                <FontAwesomeIcon icon="shield-alt" className="text-blue-500 mr-2" />
                <strong>Protection:</strong> Up to $10,000
              </p>
              <div>
                <h6 className="font-bold flex items-center">
                  <FontAwesomeIcon icon="clock" className="text-blue-500 mr-2" />
                  Opening Hours:
                </h6>
                <ul className="list-disc ml-4">
                  <li>Monday: 24 hours</li>
                  <li>Tuesday: 24 hours</li>
                  <li>Wednesday: 24 hours</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 shadow-md rounded-lg p-6">
              <h5 className="text-xl font-bold mb-4">Your Booking</h5>
              <form id="payment-form" onSubmit={handleSubmit}>
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
                    >
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
                    />
                    <button 
                      type="button" 
                      className="ml-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-300"
                      onClick={handleApplyPromo}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="font-bold">Total Price: $</label>
                  <span id="totalPrice">{totalPrice.toFixed(2)}</span>
                </div>
                <Button 
                  variant="primary" 
                  onClick={() => setShowModal(true)} 
                  className="w-full bg-[#1A73A7] text-white py-2 rounded hover:bg-blue-700 transition duration-300 mb-2"
                >
                  Enter User Details
                </Button>
                <button 
                  type="submit" 
                  className="w-full bg-[#1A73A7] text-white py-2 rounded hover:bg-blue-700 transition duration-300 mb-2"
                >
                  Book Now with Stripe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <UserDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default LuggageStoreDetails;
