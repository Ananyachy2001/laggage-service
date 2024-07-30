import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LuggageStoreInfo = ({ title, details, price, lat, lng, GOOGLE_MAPS_API_KEY }) => {
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
  }, [lat, lng, GOOGLE_MAPS_API_KEY]);

  return (
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
  );
};

export default LuggageStoreInfo;
