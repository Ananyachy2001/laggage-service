import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import CreateBooking from './CreateBooking';
import EditBooking from './EditBooking';

const AllBookings = () => {
    const [bookings, setBookings] = useState([
        {
            clientId: 'client1',
            location: 'Location1',
            bookingDate: new Date('2024-07-01'),
            status: 'pending'
        },
        {
            clientId: 'client2',
            location: 'Location2',
            bookingDate: new Date('2024-07-02'),
            status: 'confirmed'
        },
        // More dummy data...
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(3);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);

    const filteredBookings = bookings.filter(booking => 
        booking.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const addBooking = (newBooking) => {
        setBookings([...bookings, { ...newBooking, bookingDate: new Date(newBooking.bookingDate) }]);
        setIsCreating(false);
    };

    const updateBooking = (updatedBooking) => {
        setBookings(bookings.map(booking => booking.clientId === updatedBooking.clientId ? updatedBooking : booking));
        setIsEditing(false);
    };

    const deleteBooking = (clientId) => {
        setBookings(bookings.filter(booking => booking.clientId !== clientId));
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

                        {/* Create Booking Button */}
                        <div className="mb-4">
                            <button
                                onClick={() => setIsCreating(true)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Create Booking
                            </button>
                        </div>

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
                                    {currentBookings.map((booking, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/6 py-3 px-6 border">{booking.clientId}</td>
                                            <td className="w-1/4 py-3 px-6 border">{booking.location}</td>
                                            <td className="w-1/4 py-3 px-6 border">{booking.bookingDate.toLocaleDateString()}</td>
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
                                                    onClick={() => deleteBooking(booking.clientId)}
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
                                {[...Array(Math.ceil(filteredBookings.length / bookingsPerPage)).keys()].map(number => (
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
            {isCreating && <CreateBooking addBooking={addBooking} setIsCreating={setIsCreating} />}
            {isEditing && <EditBooking currentBooking={currentBooking} updateBooking={updateBooking} setIsEditing={setIsEditing} />}
        </div>
    );
};

export default AllBookings;
