import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import config from '../../config';

const AllClient = () => {
    const [clients, setClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(3);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/logout');
            return;
        }

        const fetchClients = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/all-clients`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status === 'success') {
                    const fetchedClients = response.data.data.map(client => ({
                        id: client._id,
                        username: client.user.username,
                        email: client.user.email,
                        isActive: client.isActive,
                    }));
                    setClients(fetchedClients);
                } else {
                    setError('Failed to fetch client data');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate('/logout');
                } else {
                    setError('Failed to fetch client data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, [navigate]);

    const filteredClients = clients.filter(client =>
        client.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const softDeleteClient = (id) => {
        setClients(clients.filter(client => client.id !== id));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                                placeholder="Search by Username"
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
                                        <th className="w-1/4 py-3 px-6 text-left">Username</th>
                                        <th className="w-1/4 py-3 px-6 text-left">Email</th>
                                        <th className="w-1/4 py-3 px-6 text-left">Status</th>
                                        <th className="w-1/4 py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {currentClients.map(client => (
                                        <tr key={client.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/4 py-3 px-6 border">
                                                <button
                                                    onClick={() => navigate(`/superadmin/clients/${client.id}`)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {client.username}
                                                </button>
                                            </td>
                                            <td className="w-1/4 py-3 px-6 border">{client.email}</td>
                                            <td className="w-1/4 py-3 px-6 border">{client.isActive ? 'Active' : 'Inactive'}</td>
                                            <td className="w-1/4 py-3 px-6 border text-center">
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
