import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import backgroundImage from '../../img/home-two/luggage-1.jpg';
import './Banner.css';
import config from '../../config';

const libraries = ['places'];

function Banner() {
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState(null);
  const [backendLocations, setBackendLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const locationInputRef = useRef(null);

  // Define your API key here
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDyWau177aZz12QPehbOqhi8MCDfNIjN3I';

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/api/v1/locations/public/all-locations`)
      .then(response => {
        const locations = response.data.map(location => ({
          ...location,
          fullAddress: `${location.name}, ${location.address.street}, ${location.address.district}, ${location.address.city}, ${location.address.state}, ${location.address.zipCode}, ${location.address.country}`
        }));
        setBackendLocations(locations);
      })
      .catch(error => console.error('Error fetching backend locations:', error));
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    if (inputValue.length >= 3) {
      const filtered = backendLocations.filter(location =>
        location.fullAddress.toLowerCase().includes(inputValue)
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const locationInput = locationInputRef.current.value.trim();
    if (locationInput) {
      navigate(`/luggage_locations?location=${locationInput}`);
    } else {
      navigate('/luggage_locations');
    }
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div
      className="banner mt-28 bg-cover bg-center h-screen flex items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-40 backdrop-blur-md"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          <span className='slogan-color'>Freedom</span> in Every <span className='slogan-color'>Journey</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl drop-shadow-md">Looking For Luggage Services! We Are Here...</p>
        <form id="locationForm" className="mt-6" onSubmit={handleSubmit} aria-label="Location search form">
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                type="text"
                id="location"
                className="form-input p-3 rounded-none sm:rounded-l-md shadow-md focus:outline-none focus:ring-1 focus:ring-blue-100 w-full sm:w-96 lg:w-[500px] mb-4 sm:mb-0"
                placeholder="Enter your location"
                ref={locationInputRef}
                list="backend-location-suggestions"
                onChange={handleInputChange}
              />
            </Autocomplete>
            <datalist id="backend-location-suggestions">
              {filteredLocations.map((location) => (
                <option key={location._id} value={location.fullAddress}></option>
              ))}
            </datalist>
            <button
              type="submit"
              className="search-button bg-green-600 hover:bg-green-800 text-white rounded-none sm:rounded-r-md shadow-md transition duration-300 ease-in-out p-3 sm:px-6 w-full sm:w-auto"
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
