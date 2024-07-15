import React, { useState } from 'react';
import Header from '../../partials/Header';
import './PartnerProfile.css'; // If you still have some custom styles

const PartnerProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Partner Name',
        email: 'partner@mail.com',
        username: 'partnerUsername',
        street: '123 Main St',
        district: 'Central District',
        city: 'Metropolis',
        state: 'State Name',
        zipCode: '12345',
        country: 'Country Name',
        tradeLicense: 'TL12345678',
        earnings: '100000',
        notes: 'Some notes about the partner',
        locations: 'Location1, Location2',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        // Add save functionality here, e.g., API call to save the profile details
    };

    const handleDownloadClick = (period) => {
        // Add download functionality here, e.g., API call to download the earnings report
        console.log(`Downloading ${period} earnings...`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            
            <div className="flex-1 p-6">
                <Header />
                <div className="container mx-auto bg-white rounded-lg shadow-md p-8 mt-5">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/3 border-r">
                            <div className="flex flex-col items-center p-5">
                                <img
                                    className="rounded-full mt-5 w-32 h-32"
                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                    alt="Profile"
                                />
                                <h2 className="mt-4 text-xl font-semibold">{profile.name}</h2>
                                <p className="text-gray-600">{profile.email}</p>
                                <button className="text-blue-500 mt-3">Reset Password</button>
                                <button className="text-blue-500 mt-1">Change Password</button>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3">
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-lg font-semibold">Partner Profile Settings</h3>
                                    <button className="btn btn-secondary" onClick={handleEditClick}>
                                        {editMode ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>
                                {editMode ? (
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.keys(profile).map((key) => (
                                                <div key={key} className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                                    <input
                                                        type="text"
                                                        name={key}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        value={profile[key]}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center mt-6">
                                            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSaveClick}>
                                                Save Profile
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.entries(profile).map(([key, value]) => (
                                                <div key={key} className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                                    <p className="text-gray-900">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-green-500 text-white font-bold py-2 px-4 rounded mx-2"
                                                onClick={() => handleDownloadClick('monthly')}
                                            >
                                                Download Monthly Earnings
                                            </button>
                                            <button
                                                className="bg-green-500 text-white font-bold py-2 px-4 rounded mx-2"
                                                onClick={() => handleDownloadClick('weekly')}
                                            >
                                                Download Weekly Earnings
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerProfile;
