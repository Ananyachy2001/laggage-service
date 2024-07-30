import React from 'react';
import { useNavigate } from 'react-router-dom';

const StorageSpot = ({ title, details, price, regularprice, link, image, lat, lng }) => {
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate('/luggage_store_details', {
      state: { title, details, price, regularprice, image, lat, lng }
    });
  };

  return (
    <div className="storage-spot mt-4 max-w-xl rounded overflow-hidden shadow-lg transition-transform transform hover:shadow-xl animation-fadeIn">
      <img className="w-full h-48 object-cover" src={image || defaultImage} alt={title} />
      <div className="p-4">
        <div className="spot-details">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-700 text-base">{details}</p>
          
        </div>
        <div className="spot-price mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-green-600">{price}</p>
          <button onClick={handleDetailsClick} className="btn btn-primary btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorageSpot;
