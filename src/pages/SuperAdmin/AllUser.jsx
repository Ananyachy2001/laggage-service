import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const AllUser = () => {
    // Dummy data for users
    const [users, setUsers] = useState([
        { name: 'John Doe', email: 'john.doe@example.com', hostId: 'host_id_1' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', hostId: 'host_id_2' },
        { name: 'Michael Johnson', email: 'michael.johnson@example.com', hostId: 'host_id_3' }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('http://localhost:3001/api/admin/users');
    //             setUsers(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchUsers();
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
                        {/* Users List Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/3 py-2">Name</th>
                                        <th className="w-1/3 py-2">Email</th>
                                        <th className="w-1/3 py-2">Host ID</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-700">
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td className="w-1/3 py-2 border">{user.name}</td>
                                            <td className="w-1/3 py-2 border">{user.email}</td>
                                            <td className="w-1/3 py-2 border">{user.hostId}</td>
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
