import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faClock, 
  faTag, 
  faStar, 
  faWifi, 
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const LuggageStoreInfo = ({
  id,
  title,
  details,
  price,
  lat,
  lng,
  availableFrom,
  availableTo,
  discountPercentage,
  openTime,
  closeTime,
  notes,
  GOOGLE_MAPS_API_KEY
}) => {
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
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#7c93a3' }, { lightness: '-10' }],
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry',
              stylers: [{ visibility: 'simplified' }],
            },
          ],
        });
        new google.maps.Marker({
          position: location,
          map: map,
          title: title,
        });
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [lat, lng, GOOGLE_MAPS_API_KEY, title]);

  const formatDate = (dateStr) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeStr) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(`1970-01-01T${timeStr}Z`).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-3xl font-bold mb-4 flex items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#1A73A7] mr-3" />
        {title}
      </h3>
      <h6 className="text-gray-700 mb-6 flex items-center">
        <FontAwesomeIcon icon={faClock} className="text-[#1A73A7] mr-3" />
        {details}
      </h6>
      <div id="map" className="h-80 mb-6 rounded-lg shadow-md"></div>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faTag} className="text-[#1A73A7] mr-3" />
        <strong>Price:</strong> <span className="ml-2">{price}</span>
      </p>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faWifi} className="text-[#1A73A7] mr-3" />
        <strong>Services:</strong> <span className="ml-2">Free Wi-Fi, Bar</span>
      </p>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faClock} className="text-[#1A73A7] mr-3" />
        <strong>Available From:</strong> <span className="ml-2">{formatDate(availableFrom)}</span>
      </p>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faClock} className="text-[#1A73A7] mr-3" />
        <strong>Available To:</strong> <span className="ml-2">{formatDate(availableTo)}</span>
      </p>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faTag} className="text-[#1A73A7] mr-3" />
        <strong>Discount:</strong> <span className="ml-2">{discountPercentage}%</span>
      </p>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faClock} className="text-[#1A73A7] mr-3" />
        <strong>Open Time:</strong> <span className="ml-2">{formatTime(openTime)}</span>
        <FontAwesomeIcon icon={faClock} className=" ps-4 text-[#1A73A7] " />
        <strong className='ps-2'>Close Time:</strong> <span className="ml-2">{formatTime(closeTime)}</span>
      </p>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faInfoCircle} className="text-[#1A73A7] mr-3" />
        <strong>Notes:</strong> <span className="ml-2">{notes}</span>
      </p>
    </div>
  );
};

export default LuggageStoreInfo;
