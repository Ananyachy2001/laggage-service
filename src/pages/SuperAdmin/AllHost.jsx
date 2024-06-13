import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllHost = () => {
    // Commented out API related states and useEffect for dummy data
    const [hosts, setHosts] = useState([
        { id: 1, name: 'Host Name 1', email: 'host1@example.com', location: 'Location 1' },
        { id: 2, name: 'Host Name 2', email: 'host2@example.com', location: 'Location 2' },
        { id: 3, name: 'Host Name 3', email: 'host3@example.com', location: 'Location 3' }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

                        {/* Host List Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/4 py-2">ID</th>
                                        <th className="w-1/4 py-2">Name</th>
                                        <th className="w-1/4 py-2">Email</th> {/* Added email column */}
                                        <th className="w-1/4 py-2">Location</th> {/* Changed IP Address to Location */}
                                    </tr>
                                </thead>

                                <tbody className="text-gray-700">
                                    {hosts.map(host => (
                                        <tr key={host.id}>
                                            <td className="w-1/4 py-2 border">{host.id}</td>
                                            <td className="w-1/4 py-2 border">{host.name}</td>
                                            <td className="w-1/4 py-2 border">{host.email}</td>
                                            <td className="w-1/4 py-2 border">{host.location}</td>
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
