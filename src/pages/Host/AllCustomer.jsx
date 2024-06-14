import React, { useState } from 'react';
import dummyUsers from './customers'; // Import dummy data from dummyData.js

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllCustomer = () => {
    const [users, setUsers] = useState(dummyUsers); // Use dummyUsers from dummyData.js
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.hostId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get unique host IDs
    const hostIds = [...new Set(users.map(user => user.hostId))];

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

                        {/* Host Reservation Section */}
                        {hostIds.map((hostId, index) => (
                            <div key={index} className="mt-8">
                                <h2 className="text-lg font-semibold mb-4">Users under Host ID: {hostId}</h2>
                                <ul className="divide-y divide-gray-300">
                                    {users.filter(user => user.hostId === hostId).map((user, index) => (
                                        <li key={index} className="py-2">
                                            {user.name} - {user.email}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AllCustomer;
