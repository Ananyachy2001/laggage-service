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
      className="banner  mt-28 bg-cover bg-center h-screen flex items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for shadow effect */}
      <div className="absolute inset-0 bg-gray-800 opacity-40 backdrop-blur-md"></div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          <span className='slogan-color'>Freedom</span> in Every <span className='slogan-color'>Journey</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl drop-shadow-md">Looking For Luggage Services! We Are Here...</p>
        <form id="locationForm" className="mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <input
              type="text"
              id="location"
              list="location-suggestions"
              className="form-input p-3 rounded-none sm:rounded-l-md shadow-md focus:outline-none focus:ring-1 focus:ring-blue-100 w-full sm:w-96 lg:w-[500px] mb-4 sm:mb-0"
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
              className="search-button  bg-green-600 hover:bg-green-800 text-white rounded-none sm:rounded-r-md shadow-md transition duration-300 ease-in-out p-3 sm:px-6 w-full sm:w-auto"
            >
              Search
            </button>
          </div>
          <button
            type="submit"
            className="find-button bg-green-600 hover:bg-green-800 text-white rounded-md shadow-md transition duration-300 ease-in-out mt-4 px-8 py-3 w-full sm:w-auto"
          >
            Find Closest Locations To Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default Banner;
