import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import EditLocationModal from './EditLocationModal';

const AllLocations = () => {
    const [locations, setLocations] = useState([]);
    const [partners, setPartners] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(3);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [showDeleted, setShowDeleted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
        fetchPartners();
    }, []);

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/locations/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (Array.isArray(response.data)) {
                setLocations(response.data.filter(location => !location.isDeleted));
            } else {
                setLocations([]);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                window.location.href = '/logout';
            } else {
                setError('Failed to fetch locations');
            }
        }
    };

    const fetchPartners = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/all-partners`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === 'success') {
                setPartners(response.data.data);
            } else {
                setError('Failed to fetch partner data');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                navigate('/logout');
            } else {
                setError('Failed to fetch partner data');
            }
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

    const toggleShowDeleted = () => {
        setShowDeleted(!showDeleted);
    };

    const getPartnerDetails = (partnerId) => {
        const partner = partners.find(p => p._id === partnerId);
        return partner ? { username: partner.user.username, tradeLicenseNumber: partner.tradeLicenseNumber } : { username: '', tradeLicenseNumber: '' };
    };

    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) && (showDeleted || !location.isDeleted)
    );

    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const updateLocation = (updatedLocation) => {
        setLocations(locations.map(location => location._id === updatedLocation._id ? updatedLocation : location));
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
                {/* Site header */}
                <SuperAdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Welcome banner */}
                        <WelcomeBanner />

                        {/* Buttons */}
                        <div className="mb-4 flex justify-between">
                            <button
                                onClick={() => navigate('/superadmin/create-location')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Create Location
                            </button>
                            <button
                                onClick={toggleShowDeleted}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                            >
                                {showDeleted ? 'Hide Deleted' : 'Show Deleted'}
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
                            {loading ? (
                                <div className="flex justify-center items-center p-8">Loading...</div>
                            ) : error ? (
                                <div className="flex justify-center items-center p-8 text-red-500">{error}</div>
                            ) : (
                                <table className="min-w-full">
                                    <thead className="bg-[#4A686A] text-white">
                                        <tr>
                                            <th className="w-2/12 py-3 px-6 text-left">Name</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Available From</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Available To</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Open Time</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Close Time</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Price</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Discount</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-800">
                                        {currentLocations.map(location => {
                                            const { username, tradeLicenseNumber } = getPartnerDetails(location.partner);
                                            return (
                                                <tr key={location._id} className="bg-white hover:bg-gray-200 transition duration-150">
                                                    <td className="w-2/12 py-3 px-6 border">
                                                        {location.name}
                                                        <br />
                                                        <span className="text-sm text-gray-500">
                                                            {username} - {tradeLicenseNumber}
                                                        </span>
                                                    </td>
                                                    <td className="w-2/12 py-3 px-6 border">{formatDate(location.availableFrom)}</td>
                                                    <td className="w-2/12 py-3 px-6 border">{formatDate(location.availableTo)}</td>
                                                    <td className="w-2/12 py-3 px-6 border">{location.openTime}</td>
                                                    <td className="w-2/12 py-3 px-6 border">{location.closeTime}</td>
                                                    <td className="w-2/12 py-3 px-6 border">{location.priceCurrency} ${location.regularPrice}</td>
                                                    <td className="w-2/12 py-3 px-6 border">{location.discountPercentage}%</td>
                                                    <td className="w-2/12 py-3 px-6 border text-center">
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
                                                            onClick={() => deleteLocation(location._id)}
                                                            className="px-4 py-2 rounded-lg bg-red-500 text-white transition duration-150"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredLocations.length / locationsPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue text-sm font-medium hover:bg-blue-500 hover:text-black transition duration-300 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </main>
                {isEditing && (
                    <EditLocationModal
                        location={currentLocation}
                        onClose={() => setIsEditing(false)}
                        onUpdate={updateLocation}
                    />
                )}
            </div>
        </div>
    );
};

export default AllLocations;
