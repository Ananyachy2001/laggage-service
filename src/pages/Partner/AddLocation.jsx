import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';  
import Header from '../../partials/Header';    

const AddLocation = () => {
  const [name, setName] = useState('');
  const [locations, setLocations] = useState(['Perth', 'Adelaide']); // Dummy data for locations
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddLocation = () => {
    if (name.trim() !== '') {
      // Add location to the state
      setLocations([...locations, name]);
      // Clear the input field
      setName('');
    }
  };

  const handleDeleteLocation = (index) => {
    
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main content */}
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  Add My Locations
                </label>
                <div className="flex items-center border-b border-blue-500 py-2">
                  <input
                    id="location"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-purple-500"
                    type="text"
                    placeholder="Enter location"
                    aria-label="Location"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <button
                    className="flex-shrink-0 bg-blue-800 hover:bg-blue-600 text-sm text-white py-1 px-2 rounded focus:outline-none focus:bg-purple-700"
                    type="button"
                    onClick={handleAddLocation}
                  >
                    Add Location
                  </button>
                </div>
              </div>
              {/* Display locations */}
              <div>
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 border border-gray-300 py-2 px-3 mb-2 rounded flex justify-between items-center"
                  >
                    <span className="text-gray-700">{location}</span>
                    <button
                      className="text-red-600 hover:text-red-800 text-xs"
                      type="button"
                      onClick={() => handleDeleteLocation(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
