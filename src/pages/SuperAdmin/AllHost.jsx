import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllHost = () => {
    // Commented out API related states and useEffect for dummy data
    const [partners, setPartners] = useState([
        { id: 1, name: 'Partner Name 1', locationBooked: 'Location 1', startDate: '2021-01-01', endDate: '2021-01-10', bookingStatus: 'Confirmed', amountPaid: '$1000' },
        { id: 2, name: 'Partner Name 2', locationBooked: 'Location 2', startDate: '2021-02-01', endDate: '2021-02-10', bookingStatus: 'Pending', amountPaid: '$2000' },
        { id: 3, name: 'Partner Name 3', locationBooked: 'Location 3', startDate: '2021-03-01', endDate: '2021-03-10', bookingStatus: 'Cancelled', amountPaid: '$1500' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredPartners = partners.filter(partner => partner.id.toString().includes(searchQuery));

    // useEffect(() => {
    //     const fetchPartners = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('http://localhost:3001/api/admin/partners');
    //             setPartners(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchPartners();
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                                className="px-4 py-2 border rounded-lg w-full"
                            />
                        </div>

                        {/* Partner List Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/6 py-3 px-6 text-left">ID</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Name</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Location Booked</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Start Date</th>
                                        <th className="w-1/6 py-3 px-6 text-left">End Date</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Booking Status</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Amount Paid</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-700">
                                    {filteredPartners.map(partner => (
                                        <tr key={partner.id}>
                                            <td className="w-1/6 py-3 px-6 border">{partner.id}</td>
                                            <td className="w-1/6 py-3 px-6 border">{partner.name}</td>
                                            <td className="w-1/6 py-3 px-6 border">{partner.locationBooked}</td>
                                            <td className="w-1/6 py-3 px-6 border">{partner.startDate}</td>
                                            <td className="w-1/6 py-3 px-6 border">{partner.endDate}</td>
                                            <td className="w-1/6 py-3 px-6 border">{partner.bookingStatus}</td>
                                            <td className="w-1/6 py-3 px-6 border">{partner.amountPaid}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AllHost;
