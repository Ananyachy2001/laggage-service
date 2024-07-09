import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTag, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEdit, faTag, faTimes);

const LuggageStoreDetails = () => {
  const [luggageQuantity, setLuggageQuantity] = useState(1);
  const [serviceOption, setServiceOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const servicePrices = {
    standard: 5.00,
    home: 7.00,
    window: 6.50,
    office: 8.00,
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCupdXut4FuMzxoOk6bw8B4gDAYfpOYcvo&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = function () {
      const location = { lat: -33.864, lng: 151.209 };
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
  }, []);

  useEffect(() => {
    const price = servicePrices[serviceOption] * luggageQuantity - discount;
    setTotalPrice(price > 0 ? price : 0);
  }, [luggageQuantity, serviceOption, discount]);

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="container mx-auto mt-12 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-2xl font-bold mb-2">24/7 Circular Quay Storage Spot</h3>
            <h6 className="text-gray-600 mb-4">Restaurant | Open now 24 hours</h6>
            <div id="map" className="h-64 mb-4 rounded-lg"></div>
            <p>
              <strong>Address:</strong> Address will be shown after booking
            </p>
            <p>
              <strong>Price:</strong> Prices vary per service and time
            </p>
            <p>
              <strong>Rating:</strong>
              <span className="text-yellow-400 text-xl">★★★★☆</span> 4.7 (4237 reviews)
            </p>
            <p>
              <strong>Services:</strong> Free Wi-Fi, Bar, Bathrooms
            </p>
            <p>
              <strong>Protection:</strong> Up to $10,000
            </p>
            <div>
              <h6 className="font-bold">Opening Hours:</h6>
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
            <form id="payment-form">
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
                  <FontAwesomeIcon icon="edit" className="ml-2 text-gray-500" />
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
                    <option value="standard">Standard - $5.00</option>
                    <option value="home">Home Luggage - $7.00</option>
                    <option value="window">Window Luggage - $6.50</option>
                    <option value="office">Office Luggage - $8.00</option>
                  </select>
                  <FontAwesomeIcon icon="edit" className="ml-2 text-gray-500" />
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
                  <FontAwesomeIcon icon="tag" className="ml-2 text-gray-500" />
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
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-300 mb-2"
              >
                Book Now with Stripe
              </button>
            </form>
            <button 
              id="google-pay-button" 
              className="w-full bg-black text-white py-2 mt-2 rounded hover:bg-gray-800 transition duration-300"
            >
              Book Now with Google Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuggageStoreDetails;
