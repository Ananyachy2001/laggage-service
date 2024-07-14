import React from 'react';
import backgroundImage from '../../img/home-two/luggage-1.jpg';
import './Banner.css'; 
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const locationInput = document.getElementById('location').value;
    if (locationInput) {
      navigate(`/luggage_locations?location=${locationInput}`);
    } else {
      navigate('/luggage_locations');
    }
  };

  return (
    <div
      className="banner bg-cover bg-center h-screen flex items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for shadow effect */}
      <div className="absolute inset-0 bg-gray-800 opacity-40 backdrop-blur-md"></div>

      <div className="relative z-10 text-center text-black ">
        <h1 className="text-5xl font-bold drop-shadow-lg">
          <span className='slogan-color'>Freedom</span> in Every <span className='slogan-color'>Journey</span>
        </h1>
        <p className="mt-4 text-lg drop-shadow-md">Looking For Luggage Services! We Are Here...</p>
        <form id="locationForm" className="mt-6" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center ">
            <input
              type="text"
              id="location"
              list="location-suggestions"
              className="form-input p-3 rounded-l-md shadow-md focus:outline-none focus:ring-1 focus:ring-blue-100"
              placeholder="Enter your location"
            />
            <datalist id="location-suggestions">
              <option value="Sydney"></option>
              <option value="Canberra"></option>
              <option value="Melbourne"></option>
              <option value="Brisbane"></option>
              <option value="Darwin"></option>
            </datalist>
            <button
              type="submit"
              className="search-button bg-green-600 hover:bg-green-800 text-white rounded-r-md shadow-md transition duration-800 ease-in-out"
            >
              Search
            </button>
          </div>
          <button
            type="submit"
            className="find-button bg-green-600 hover:bg-green-800 text-white rounded-md shadow-md transition duration-600 ease-in-out"
          >
            Find Closest Locations To Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default Banner;
