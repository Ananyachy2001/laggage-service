// EditLocationModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const EditLocationModal = ({ location, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        description: '',
        availableSpace: '',
        discountPercentage: '',
        notes: '',
        locationType: ''
    });

    useEffect(() => {
        if (location) {
            setFormData({
                description: location.description || '',
                availableSpace: location.availableSpace || '',
                discountPercentage: location.discountPercentage || '',
                notes: location.notes || '',
                locationType: location.locationType || ''
            });
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${config.API_BASE_URL}/api/v1/locations/${location._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                onUpdate(response.data);
                onClose();
            } else {
                alert('Failed to update location.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl mb-4">Edit Location</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Available Space</label>
                        <input
                            type="number"
                            name="availableSpace"
                            value={formData.availableSpace}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Discount Percentage</label>
                        <input
                            type="number"
                            name="discountPercentage"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Location Type</label>
                        <input
                            type="text"
                            name="locationType"
                            value={formData.locationType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLocationModal;
