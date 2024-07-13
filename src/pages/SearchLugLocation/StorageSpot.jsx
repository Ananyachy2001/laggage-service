import React from 'react';

const StorageSpot = ({ title, details, price, link, image }) => {
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL
  return (
    <div className="storage-spot mt-4 max-w-xl rounded overflow-hidden shadow-lg transition-transform transform  hover:shadow-xl animation-fadeIn">
      <img className="w-full h-48 object-cover" src={image || defaultImage} alt={title} />
      <div className="p-4">
        <div className="spot-details">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-700 text-base">{details}</p>
        </div>
        <div className="spot-price mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-green-600">{price}</p>
          <a href={link} className="btn btn-primary btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">See Details</a>
        </div>
      </div>
    </div>
  );
};

export default StorageSpot;
