import React from 'react';

const locations = [
  {
    name: 'London',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 310,
  },
  {
    name: 'Barcelona',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 182,
  },
  {
    name: 'Paris',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 178,
  },
  {
    name: 'Mexico City',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 92,
  },
  {
    name: 'New York',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 79,
  },
  {
    name: 'Buenos Aires',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 55,
  },
  {
    name: 'Sydney',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 54,
  },
  {
    name: 'Edinburgh',
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    stashpoints: 42,
  },
];

const LuggageStorageLocations = () => {
  const handleSearchLocation = (location) => {
    // Implement the search functionality here
    console.log(`Searching for luggage storage in ${location}`);
    // Example: Redirect to a search page
    window.location.href = `/luggage_locations`;
  };

  return (
    <div className="bg-gradient-to-b from-gray-300 via-white to-gray-300 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-600">Our Top Luggage Storage Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {locations.map((location) => (
            <div key={location.name} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img className="w-full h-48 object-cover" src={location.image} alt={location.name} />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{location.name}</h3>
                <p className="text-gray-600 mb-6">{location.stashpoints} Stashpoints</p>
                <button
                  onClick={() => handleSearchLocation(location.name)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  Search Location
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuggageStorageLocations;
