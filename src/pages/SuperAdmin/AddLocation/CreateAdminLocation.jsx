import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMapSelector from './AdminMapSelector';
import AdminLocationForm from './AdminLocationForm';
import config from '../../../config';

const CreateAdminLocation = () => {
    const [location, setLocation] = useState({});
    const navigate = useNavigate();

    const handleSelect = async ({ position, addressDetails }) => {
        try {
            const timezoneResponse = await axios.get(
                `https://maps.googleapis.com/maps/api/timezone/json?location=${position.lat},${position.lng}&timestamp=${Math.floor(
                    Date.now() / 1000
                )}&key=${config.GOOGLE_API_KEY}`
            );
            const timezone = timezoneResponse.data.timeZoneId || 'Asia/Dhaka';
            setLocation({ coordinates: position, addressDetails, timezone });
        } catch (error) {
            console.error('Error fetching timezone:', error);
            setLocation({ coordinates: position, addressDetails, timezone: 'Asia/Dhaka' });
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
        formData.append('regularPrice', values.regularPrice);
        formData.append('discountPercentage', values.discountPercentage);
        formData.append('priceCurrency', values.priceCurrency);
        formData.append('url', values.url);
        formData.append('openTime', values.openTime);
        formData.append('closeTime', values.closeTime);
        formData.append('closedDays', values.closedDays);
        formData.append('specialClosedDays', values.specialClosedDays);
        formData.append('locationType', values.locationType);
        formData.append('timezone', location.timezone);
        formData.append('notes', values.notes);
        formData.append('availableFrom', values.availableFrom);
        formData.append('availableTo', values.availableTo);
        
        Array.from(values.pictures).forEach((file) => {
            formData.append('pictures', file);
        });

        formData.append('coordinates', JSON.stringify({
            type: 'Point',
            coordinates: [location.coordinates.lng, location.coordinates.lat],
        }));

        const token = localStorage.getItem('token');
        const url = `${config.API_BASE_URL}/api/v1/locations/create`;

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status >= 200 && response.status < 300) {
                alert('Location created successfully!');
                navigate('/superadmin/locations');
            } else {
                alert('Failed to create location.');
            }
        } catch (error) {
            console.error('Error creating location:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded p-4">
                    <AdminMapSelector onSelect={handleSelect} />
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <AdminLocationForm onSubmit={handleSubmit} location={location} />
                </div>
            </div>
        </div>
    );
};

export default CreateAdminLocation;
