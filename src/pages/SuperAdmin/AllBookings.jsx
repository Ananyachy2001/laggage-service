import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import CreateBooking from './CreateBooking';
import EditBooking from './EditBooking';
import config from '../../config';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(3);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/bookings/all-bookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (Array.isArray(response.data)) {
                    setBookings(response.data);
                } else {
                    setBookings([]);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error.response && error.response.status === 401) {
                    window.location.href = '/logout';
                } else {
                    setError('Failed to fetch bookings');
                }
            }
        };
        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter(booking => 
        booking.location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const addBooking = (newBooking) => {
        setBookings([...bookings, newBooking]);
        setIsCreating(false);
    };

    const updateBooking = (updatedBooking) => {
        setBookings(bookings.map(booking => booking._id === updatedBooking._id ? updatedBooking : booking));
        setIsEditing(false);
    };

    const deleteBooking = (id) => {
        setBookings(bookings.filter(booking => booking._id !== id));
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



                        {/* Search bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by Location"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* Booking List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            {loading ? (
                                <div className="flex justify-center items-center p-8">Loading...</div>
                            ) : error ? (
                                <div className="flex justify-center items-center p-8 text-red-500">{error}</div>
                            ) : (
                                <table className="min-w-full">
                                    <thead className="bg-[#4A686A] text-white">
                                        <tr>
                                            <th className="w-1/6 py-3 px-6 text-left">Client ID</th>
                                            <th className="w-1/4 py-3 px-6 text-left">Location</th>
                                            <th className="w-1/4 py-3 px-6 text-left">Booking Date</th>
                                            <th className="w-1/6 py-3 px-6 text-left">Status</th>
                                            <th className="w-1/6 py-3 px-6 text-left">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-800">
                                        {currentBookings.map(booking => (
                                            <tr key={booking._id} className="bg-white hover:bg-gray-200 transition duration-150">
                                                <td className="w-1/6 py-3 px-6 border">{booking.client ? booking.client._id : 'N/A'}</td>
                                                <td className="w-1/4 py-3 px-6 border">{booking.location.name}</td>
                                                <td className="w-1/4 py-3 px-6 border">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                                <td className="w-1/6 py-3 px-6 border">{booking.status}</td>
                                                <td className="w-1/6 py-3 px-6 border text-center">
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(true);
                                                            setCurrentBooking(booking);
                                                        }}
                                                        className="px-4 py-2 rounded-lg bg-yellow-500 text-white transition duration-150 mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteBooking(booking._id)}
                                                        className="px-4 py-2 rounded-lg bg-red-500 text-white transition duration-150"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredBookings.length / bookingsPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-blue-500 hover:text-black transition duration-300 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
            
            {isEditing && <EditBooking currentBooking={currentBooking} updateBooking={updateBooking} setIsEditing={setIsEditing} />}
        </div>
    );
};

export default AllBookings;
