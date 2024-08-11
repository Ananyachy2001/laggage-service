import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMapSelector from './AdminMapSelector';
import AdminLocationForm from './AdminLocationForm';
import config from '../../../config';

const CreateAdminLocation = () => {
    const [location, setLocation] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const handleSelect = async ({ position, addressDetails, additionalDetails }) => {
        try {
            const timezoneResponse = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${position.lat},${position.lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${config.GOOGLE_API_KEY}`);
            const timezone = timezoneResponse.data.timeZoneId || "Australia/Perth";
            setLocation({ coordinates: position, addressDetails, additionalDetails, timezone });
        } catch (error) {
            console.error('Error fetching timezone:', error);
            setLocation({ coordinates: position, addressDetails, additionalDetails, timezone: "Australia/Perth" });
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        setMessage({ text: '', type: '' });
        setErrors({});

        // Validate form inputs
        const formErrors = {};
        if (!values.name) formErrors.name = 'Name is required';
        if (!values.description) formErrors.description = 'Description is required';
        if (!values.street) formErrors.street = 'Street is required';
        if (!values.city) formErrors.city = 'City is required';
        if (!values.state) formErrors.state = 'State is required';
        if (!values.zipCode) formErrors.zipCode = 'Zip code is required';
        if (!values.country) formErrors.country = 'Country is required';
        if (!values.capacity) formErrors.capacity = 'Capacity is required';
        if (!values.availableSpace) formErrors.availableSpace = 'Available space is required';
        if (!values.regularPrice) formErrors.regularPrice = 'Regular price is required';
        if (!values.discountPercentage) formErrors.discountPercentage = 'Discount percentage is required';
        if (!values.availableFrom) formErrors.availableFrom = 'Available from date is required';
        if (!values.availableTo) formErrors.availableTo = 'Available to date is required';
        if (!values.amenities) formErrors.amenities = 'Amenities are required';
        if (!values.notes) formErrors.notes = 'Notes are required';
        if (!values.openTime) formErrors.openTime = 'Open time is required';
        if (!values.closeTime) formErrors.closeTime = 'Close time is required';
        if (!values.closedDays) formErrors.closedDays = 'Closed days are required';
        if (!values.specialClosedDays) formErrors.specialClosedDays = 'Special closed days are required';
        if (!values.locationType) formErrors.locationType = 'Location type is required';
        if (!location.coordinates) formErrors.location = 'Map location must be selected';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('address[street]', values.street);
        formData.append('address[city]', values.city);
        formData.append('address[state]', values.state);
        formData.append('address[zipCode]', values.zipCode);
        formData.append('address[country]', values.country);
        formData.append('capacity', values.capacity);
        formData.append('availableSpace', values.availableSpace);
        formData.append('regularPrice', values.regularPrice);
        formData.append('discountPercentage', values.discountPercentage);
        formData.append('availableFrom', values.availableFrom);
        formData.append('availableTo', values.availableTo);
        formData.append('amenities', JSON.stringify(values.amenities.split(',')));
        formData.append('notes', values.notes);
        formData.append('openTime', values.openTime);
        formData.append('closeTime', values.closeTime);
        formData.append('closedDays', values.closedDays);
        formData.append('specialClosedDays', values.specialClosedDays);
        formData.append('locationType', values.locationType);
        formData.append('timezone', location.timezone);

        Array.from(values.files).forEach((file) => {
            formData.append('files', file);
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
                setMessage({ text: 'Location created successfully!', type: 'success' });
                navigate('/partner/locations');
            } else {
                setMessage({ text: 'Failed to create location.', type: 'error' });
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                setMessage({ text: error.response.data.message || 'An error occurred. Please try again.', type: 'error' });
            } else {
                console.error('Error message:', error.message);
                setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            
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
                    {message.text && (
                        <div className={`alert ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} p-4 mb-6 rounded`}>
                            {message.text}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white shadow-lg rounded p-6">
                            <AdminMapSelector onSelect={handleSelect} />
                            {errors.location && (
                                <div className="text-red-500 text-sm mt-2">{errors.location}</div>
                            )}
                        </div>
                        <div className="bg-white shadow-lg rounded p-6">
                            <AdminLocationForm onSubmit={handleSubmit} location={location} loading={loading} errors={errors} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAdminLocation;
