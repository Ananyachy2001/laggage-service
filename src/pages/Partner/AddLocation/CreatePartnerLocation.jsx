import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MapSelector from './MapSelector';
import LocationForm from './LocationForm';
import config from '../../../config';
import PartnerNavbarComp from '../PartnerNavbarComp';

const CreatePartnerLocation = () => {
    const [location, setLocation] = useState({});
    const navigate = useNavigate(); 

    const handleSelect = async ({ position, addressDetails, additionalDetails }) => {
        try {
            const timezoneResponse = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${position.lat},${position.lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${config.GOOGLE_API_KEY}`);
            const timezone = timezoneResponse.data.timeZoneId || "Asia/Dhaka";
            setLocation({ coordinates: position, addressDetails, additionalDetails, timezone });
        } catch (error) {
            console.error('Error fetching timezone:', error);
            setLocation({ coordinates: position, addressDetails, additionalDetails, timezone: "Asia/Dhaka" });
        }
    };

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('street', values.street);
        formData.append('district', values.district);
        formData.append('city', values.city);
        formData.append('state', values.state);
        formData.append('zipCode', values.zipCode);
        formData.append('country', values.country);
        formData.append('capacity', values.capacity);
        formData.append('availableSpace', values.availableSpace);
        formData.append('regularPrice', values.regularPrice);
        formData.append('discountPercentage', values.discountPercentage);
        formData.append('availableFrom', values.availableFrom);
        formData.append('availableTo', values.availableTo);
        formData.append('amenities', values.amenities);
        formData.append('notes', values.notes);
        formData.append('openTime', values.openTime);
        formData.append('closeTime', values.closeTime);
        formData.append('locationType', values.locationType);
        formData.append('timezone', location.timezone);
        
        Array.from(values.pictures).forEach((file) => {
            formData.append('pictures', file);
        });

        formData.append('coordinates', JSON.stringify({
            type: "Point",
            coordinates: [location.coordinates.lng, location.coordinates.lat]
        }));

        const token = localStorage.getItem('token');
        const url = `${config.API_BASE_URL}/api/v1/locations/create`;

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status >= 200 && response.status < 300) {
                alert('Location created successfully!');
                navigate('/partner/locations'); 
            } else {
                alert('Failed to create location.');
            }
        } catch (error) {
            console.error('Error creating location:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <PartnerNavbarComp />
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto mt-24 px-4 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300" 
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white shadow-lg rounded p-6">
                            <MapSelector onSelect={handleSelect} />
                        </div>
                        <div className="bg-white shadow-lg rounded p-6">
                            <LocationForm onSubmit={handleSubmit} location={location} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePartnerLocation;
