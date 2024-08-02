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
        const locationData = {
            name: values.name,
            description: values.description,
            coordinates: {
                type: "Point",
                coordinates: [location.coordinates.lng, location.coordinates.lat]
            },
            address: {
                street: values.street,
                district: values.district,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
                country: values.country
            },
            capacity: values.capacity,
            availableSpace: values.availableSpace,
            amenities: values.amenities.split(',').map(item => item.trim()),
            availableFrom: values.availableFrom,
            availableTo: values.availableTo,
            regularPrice: values.regularPrice,
            discountPercentage: values.discountPercentage,
            pictures: values.pictures.split(',').map(item => item.trim()),
            notes: values.notes,
            openTime: values.openTime,
            closeTime: values.closeTime,
            locationType: values.locationType,
            timezone: location.timezone 
        };
        console.log(locationData);

        const token = localStorage.getItem('token');
        const url = `${config.API_BASE_URL}/api/v1/locations/create`;

        console.log("API URL:", url);

        try {
            const response = await axios.post(url, locationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
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
