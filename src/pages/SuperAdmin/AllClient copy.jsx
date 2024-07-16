import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllClient = () => {
    // Commented out API related states and useEffect for dummy data
    const [clients, setClients] = useState([
        { id: 1, partnerId: 'P001', name: 'Client Name 1', locationBooked: 'Location 1', startDate: '2021-01-01', endDate: '2021-01-10', bookingStatus: 'Confirmed', amountPaid: '$1,000', joinedDate: '2020-01-01', recurringTimes: 3 },
        { id: 2, partnerId: 'P002', name: 'Client Name 2', locationBooked: 'Location 2', startDate: '2021-02-01', endDate: '2021-02-10', bookingStatus: 'Pending', amountPaid: '$2,000', joinedDate: '2020-02-01', recurringTimes: 2 },
        { id: 3, partnerId: 'P003', name: 'Client Name 3', locationBooked: 'Location 3', startDate: '2021-03-01', endDate: '2021-03-10', bookingStatus: 'Cancelled', amountPaid: '$1,500', joinedDate: '2020-03-01', recurringTimes: 4 },
        { id: 4, partnerId: 'P003', name: 'Client Name 3', locationBooked: 'Location 3', startDate: '2021-03-01', endDate: '2021-03-10', bookingStatus: 'Cancelled', amountPaid: '$1,500', joinedDate: '2020-03-01', recurringTimes: 4 },
        { id: 5, partnerId: 'P003', name: 'Client Name 3', locationBooked: 'Location 3', startDate: '2021-03-01', endDate: '2021-03-10', bookingStatus: 'Cancelled', amountPaid: '$1,500', joinedDate: '2020-03-01', recurringTimes: 4 },
        { id: 6, partnerId: 'P003', name: 'Client Name 3', locationBooked: 'Location 3', startDate: '2021-03-01', endDate: '2021-03-10', bookingStatus: 'Cancelled', amountPaid: '$1,500', joinedDate: '2020-03-01', recurringTimes: 4 },
        // More dummy data...
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(3);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredClients = clients.filter(client => client.id.toString().includes(searchQuery));

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const softDeleteClient = (id) => {
        setClients(clients.filter(client => client.id !== id));
    };

    // useEffect(() => {
    //     const fetchClients = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('http://localhost:3001/api/admin/clients');
    //             setClients(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchClients();
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error loading data: {error.message}</p>;

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
                                placeholder="Search by ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* Client List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead className="bg-[#4A686A] text-white">
                                    <tr>
                                        <th className="w-1/12 py-3 px-6 text-left">ID</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Partner ID</th>
                                        <th className="w-2/12 py-3 px-6 text-left">Name</th>
                                        <th className="w-2/12 py-3 px-6 text-left">Location Booked</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Start Date</th>
                                        <th className="w-1/12 py-3 px-6 text-left">End Date</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Booking Status</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Amount Paid</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Joined Date</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Recurring Times</th>
                                        <th className="w-1/12 py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {currentClients.map(client => (
                                        <tr key={client.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/12 py-3 px-6 border">{client.id}</td>
                                            <td className="w-1/12 py-3 px-6 border">{client.partnerId}</td>
                                            <td className="w-2/12 py-3 px-6 border">{client.name}</td>
                                            <td className="w-2/12 py-3 px-6 border">{client.locationBooked}</td>
                                            <td className="w-1/12 py-3 px-6 border">{formatDate(client.startDate)}</td>
                                            <td className="w-1/12 py-3 px-6 border">{formatDate(client.endDate)}</td>
                                            <td className="w-1/12 py-3 px-6 border">{client.bookingStatus}</td>
                                            <td className="w-1/12 py-3 px-6 border">{client.amountPaid}</td>
                                            <td className="w-1/12 py-3 px-6 border">{formatDate(client.joinedDate)}</td>
                                            <td className="w-1/12 py-3 px-6 border">{client.recurringTimes}</td>
                                            <td className="w-1/12 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => softDeleteClient(client.id)}
                                                    className="text-red-600 hover:text-red-800 transition duration-150"
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
                                {[...Array(Math.ceil(filteredClients.length / clientsPerPage)).keys()].map(number => (
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

export default AllClient;
