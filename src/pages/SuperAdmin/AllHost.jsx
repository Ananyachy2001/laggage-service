import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllHost = () => {
    // Commented out API related states and useEffect for dummy data
    const [hosts, setHosts] = useState([
        { id: 1, name: 'Host Name 1', email: 'host1@example.com', location: 'Location 1', dateJoined: '2021-01-01', totalEarning: '$1000', commission: '10%' },
        { id: 2, name: 'Host Name 2', email: 'host2@example.com', location: 'Location 2', dateJoined: '2021-02-01', totalEarning: '$2000', commission: '15%' },
        { id: 3, name: 'Host Name 3', email: 'host3@example.com', location: 'Location 3', dateJoined: '2021-03-01', totalEarning: '$1500', commission: '12%' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredHosts = hosts.filter(host => host.id.toString().includes(searchQuery));

    // useEffect(() => {
    //     const fetchHosts = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('http://localhost:3001/api/admin/hosts');
    //             setHosts(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchHosts();
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

                        {/* Host List Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/7 py-3 px-6 text-left">ID</th>
                                    <th className="w-1/7 py-3 px-6 text-left">Name</th>
                                    <th className="w-1/7 py-3 px-6 text-left">Email</th>
                                    <th className="w-1/7 py-3 px-6 text-left">Location</th>
                                    <th className="w-1/7 py-3 px-6 text-left">Date Joined</th>
                                    <th className="w-1/7 py-3 px-6 text-left">Total Earning</th>
                                    <th className="w-1/7 py-3 px-6 text-left">Commission (%)</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-700">
                                {filteredHosts.map(host => (
                                    <tr key={host.id}>
                                        <td className="w-1/7 py-3 px-6 border">{host.id}</td>
                                        <td className="w-1/7 py-3 px-6 border">{host.name}</td>
                                        <td className="w-1/7 py-3 px-6 border">{host.email}</td>
                                        <td className="w-1/7 py-3 px-6 border">{host.location}</td>
                                        <td className="w-1/7 py-3 px-6 border">{host.dateJoined}</td>
                                        <td className="w-1/7 py-3 px-6 border">{host.totalEarning}</td>
                                        <td className="w-1/7 py-3 px-6 border">{host.commission}</td>
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
