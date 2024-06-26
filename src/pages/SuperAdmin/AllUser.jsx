import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllUser = () => {
    // Dummy data for users with new fields
    const [users, setUsers] = useState([
        { name: 'John Doe', email: 'john.doe@example.com', hostId: 'host_id_1', dateJoined: '2023-01-01', recurring: 'Yes', location: 'Sydney' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', hostId: 'host_id_2', dateJoined: '2023-02-15', recurring: 'No', location: 'Melbourne' },
        { name: 'Michael Johnson', email: 'michael.johnson@example.com', hostId: 'host_id_3', dateJoined: '2023-03-10', recurring: 'Yes', location: 'Perth' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.hostId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                placeholder="Search by Name, Email, Host ID, Location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full"
                            />
                        </div>

                        {/* Users List Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/6 py-3 px-6 text-left">Name</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Email</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Host ID</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Date Joined</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Recurring</th>
                                        <th className="w-1/6 py-3 px-6 text-left">Location</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-700">
                                    {filteredUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td className="w-1/6 py-2 px-6 border">{user.name}</td>
                                            <td className="w-1/6 py-2 px-6 border">{user.email}</td>
                                            <td className="w-1/6 py-2 px-6 border">{user.hostId}</td>
                                            <td className="w-1/6 py-2 px-6 border">{user.dateJoined}</td>
                                            <td className="w-1/6 py-2 px-6 border">{user.recurring}</td>
                                            <td className="w-1/6 py-2 px-6 border">{user.location}</td>
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

export default AllUser;
