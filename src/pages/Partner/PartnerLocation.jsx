import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import CreatePartnerLocation from './CreatePartnerLocation';
import EditPartnerLocation from './EditPartnerLocation';

const PartnerLocations = () => {
    const [locations, setLocations] = useState([
        {
            id: 1,
            name: 'Location1',
            description: 'A beautiful place with amazing views.',
            coordinates: { type: 'Point', coordinates: [40.7128, -74.0060] },
            address: {
                street: '123 Main St',
                district: 'District 1',
                city: 'City1',
                state: 'State1',
                zipCode: '12345',
                country: 'Country1'
            },
            availableFrom: new Date('2024-07-01'),
            availableTo: new Date('2024-07-31'),
            regularPrice: 100,
            discountPercentage: 10,
            url: 'http://location1.com',
            pictures: ['http://example.com/pic1.jpg']
        },
        {
            id: 2,
            name: 'Location2',
            description: 'A serene place with beautiful landscapes.',
            coordinates: { type: 'Point', coordinates: [34.0522, -118.2437] },
            address: {
                street: '456 Market St',
                district: 'District 2',
                city: 'City2',
                state: 'State2',
                zipCode: '67890',
                country: 'Country2'
            },
            availableFrom: new Date('2024-08-01'),
            availableTo: new Date('2024-08-31'),
            regularPrice: 150,
            discountPercentage: 15,
            url: 'http://location2.com',
            pictures: ['http://example.com/pic2.jpg']
        },
        // More dummy data...
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(3);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    const filteredLocations = locations.filter(location => location.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const softDeleteLocation = (id) => {
        setLocations(locations.filter(location => location.id !== id));
    };

    const addLocation = (newLocation) => {
        setLocations([...locations, { ...newLocation, id: locations.length + 1 }]);
        setIsCreating(false);
    };

    const updateLocation = (updatedLocation) => {
        setLocations(locations.map(location => location.id === updatedLocation.id ? updatedLocation : location));
        setIsEditing(false);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
                {/* Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Welcome banner */}
                        <WelcomeBanner />

                        {/* Create Location Button */}
                        <div className="mb-4">
                            <button
                                onClick={() => setIsCreating(true)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Create Location
                            </button>
                        </div>

                        {/* Search bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by Location Name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* Location List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead className="bg-[#4A686A] text-white">
                                    <tr>
                                        <th className="w-1/12 py-3 px-6 text-left">ID</th>
                                        <th className="w-3/12 py-3 px-6 text-left">Name</th>
                                        <th className="w-4/12 py-3 px-6 text-left">Description</th>
                                        <th className="w-2/12 py-3 px-6 text-left">Price</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Discount</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {currentLocations.map(location => (
                                        <tr key={location.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/12 py-3 px-6 border">{location.id}</td>
                                            <td className="w-3/12 py-3 px-6 border">{location.name}</td>
                                            <td className="w-4/12 py-3 px-6 border">{location.description}</td>
                                            <td className="w-2/12 py-3 px-6 border">${location.regularPrice}</td>
                                            <td className="w-1/12 py-3 px-6 border">{location.discountPercentage}%</td>
                                            <td className="w-1/12 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setCurrentLocation(location);
                                                    }}
                                                    className="px-4 py-2 rounded-lg bg-yellow-500 text-white transition duration-150 mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => softDeleteLocation(location.id)}
                                                    className="px-4 py-2 rounded-lg bg-red-500 text-white transition duration-150"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredLocations.length / locationsPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-blue-500 hover:text-black transition duration-300 ${currentPage === number + 1 ? 'bg-[blue-500] text-[#4A686A]' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
            {isCreating && <CreatePartnerLocation addLocation={addLocation} setIsCreating={setIsCreating} />}
            {isEditing && <EditPartnerLocation currentLocation={currentLocation} updateLocation={updateLocation} setIsEditing={setIsEditing} />}
        </div>
    );
};

export default PartnerLocations;
