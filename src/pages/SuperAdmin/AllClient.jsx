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

    const toggleStatus = (id) => {
        setClients(clients.map(client =>
            client.id === id ? { ...client, isActive: !client.isActive } : client
        ));
    };

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
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="relative">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-400 h-32 w-32"></div>
                    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                        <svg className="animate-spin h-24 w-24 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-3 3-1-1-3 3a8 8 0 010-8z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        );
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
                                            <td className="w-1/4 py-3 px-6 border">
                                                <button
                                                    onClick={() => toggleStatus(client.id)}
                                                    className={`px-2 py-1 rounded ${client.isActive ? 'bg-green-500 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-700'} text-white`}
                                                >
                                                    {client.isActive ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className=" py-3 px-6 border text-center flex justify-center space-x-2">
                                                <button
                                                    onClick={() => navigate(`/superadmin/clients/edit/${client.id}`)}
                                                    className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => softDeleteClient(client.id)}
                                                    className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded"
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
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue text-sm font-medium hover:bg-blue-500 hover:text-white transition duration-300 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`}
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
