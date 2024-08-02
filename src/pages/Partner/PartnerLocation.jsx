import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PartnerNavbarComp from './PartnerNavbarComp';

import config from '../../config';

const PartnerLocations = () => {
    const [locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/locations/my-locations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLocations(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                setError('Unable to fetch locations. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteLocation = async (id) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${config.API_BASE_URL}/api/v1/locations/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    fetchLocations();
                } else {
                    alert('Failed to delete location.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        }
    };

    const filteredLocations = locations.filter(location => location.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <PartnerNavbarComp />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
                <main>
                    <div className="px-4 mt-32 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


                        {/* Create Location Button */}
                        <div className="mb-4">
                            <button
                                onClick={() => navigate('/partner/create-location')}
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

                        {/* Error Message */}
                        {error && <div className="mb-4 text-red-500">{error}</div>}

                        {/* Loading Indicator */}
                        {loading && <div className="mb-4 text-blue-500">Loading...</div>}

                        {/* Location List Table */}
                        {!loading && !error && (
                            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                                <table className="min-w-full">
                                    <thead className="bg-[#4A686A] text-white">
                                        <tr>
                                            <th className="w-3/12 py-3 px-6 text-left">Name</th>
                                            <th className="w-4/12 py-3 px-6 text-left">Address</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Price</th>
                                            <th className="w-1/12 py-3 px-6 text-left">Discount</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Available From</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Available To</th>
                                            <th className="w-1/12 py-3 px-6 text-left">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-800">
                                        {currentLocations.map(location => (
                                            <tr key={location._id} className="bg-white hover:bg-gray-200 transition duration-150">
                                                <td className="w-3/12 py-3 px-6 border">{location.name}</td>
                                                <td className="w-4/12 py-3 px-6 border">{`${location.address.street}, ${location.address.city}, ${location.address.state}, ${location.address.zipCode}, ${location.address.country}`}</td>
                                                <td className="w-2/12 py-3 px-6 border">{`${location.priceCurrency} ${location.regularPrice}`}</td>
                                                <td className="w-1/12 py-3 px-6 border">{location.discountPercentage}%</td>
                                                <td className="w-2/12 py-3 px-6 border">{new Date(location.availableFrom).toLocaleDateString()}</td>
                                                <td className="w-2/12 py-3 px-6 border">{new Date(location.availableTo).toLocaleDateString()}</td>
                                                <td className="w-1/12 py-3 px-6 border text-center">
                                                    <button
                                                        onClick={() => deleteLocation(location._id)}
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
                        )}

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
        </div>
    );
};

export default PartnerLocations;
