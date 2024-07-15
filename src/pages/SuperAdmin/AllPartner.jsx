import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllPartner = () => {
    // Commented out API related states and useEffect for dummy data
    const [partners, setPartners] = useState([
        {
            id: 1,
            username: 'partner1',
            email: 'partner1@example.com',
            businessAddress: {
                street: '123 Main St',
                district: 'Downtown',
                city: 'Metropolis',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
            },
            tradeLicenseNumber: '123456789',
        },
        {
            id: 2,
            username: 'partner2',
            email: 'partner2@example.com',
            businessAddress: {
                street: '456 Main St',
                district: 'Uptown',
                city: 'Metropolis',
                state: 'NY',
                zipCode: '10002',
                country: 'USA',
            },
            tradeLicenseNumber: '987654321',
        },
        {
            id: 3,
            username: 'partner3',
            email: 'partner3@example.com',
            businessAddress: {
                street: '789 Main St',
                district: 'Midtown',
                city: 'Metropolis',
                state: 'NY',
                zipCode: '10003',
                country: 'USA',
            },
            tradeLicenseNumber: '192837465',
        },
        {
            id: 4,
            username: 'partner4',
            email: 'partner4@example.com',
            businessAddress: {
                street: '101 Main St',
                district: 'Eastside',
                city: 'Metropolis',
                state: 'NY',
                zipCode: '10004',
                country: 'USA',
            },
            tradeLicenseNumber: '1029384756',
        },
        {
            id: 5,
            username: 'partner5',
            email: 'partner5@example.com',
            businessAddress: {
                street: '202 Main St',
                district: 'Westside',
                city: 'Metropolis',
                state: 'NY',
                zipCode: '10005',
                country: 'USA',
            },
            tradeLicenseNumber: '5647382910',
        },
        // More dummy data...
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [partnersPerPage] = useState(3);

    const filteredPartners = partners.filter(partner =>
        partner.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPartner = currentPage * partnersPerPage;
    const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
    const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const softDeletePartner = (id) => {
        setPartners(partners.filter(partner => partner.id !== id));
    };

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
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
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
                                placeholder="Search by Username"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* Partner List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead className="bg-[#4A686A] text-white">
                                    <tr>
                                        <th className="w-1/5 py-3 px-6 text-left">Username</th>
                                        <th className="w-1/5 py-3 px-6 text-left">Email</th>
                                        <th className="w-2/5 py-3 px-6 text-left">Business Address</th>
                                        <th className="w-1/5 py-3 px-6 text-left">Trade License Number</th>
                                        <th className="w-1/5 py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {currentPartners.map(partner => (
                                        <tr key={partner.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/5 py-3 px-6 border">{partner.username}</td>
                                            <td className="w-1/5 py-3 px-6 border">{partner.email}</td>
                                            <td className="w-2/5 py-3 px-6 border">
                                                {partner.businessAddress.street}, {partner.businessAddress.district}, {partner.businessAddress.city}, {partner.businessAddress.state}, {partner.businessAddress.zipCode}, {partner.businessAddress.country}
                                            </td>
                                            <td className="w-1/5 py-3 px-6 border">{partner.tradeLicenseNumber}</td>
                                            <td className="w-1/5 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => softDeletePartner(partner.id)}
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
                                {[...Array(Math.ceil(filteredPartners.length / partnersPerPage)).keys()].map(number => (
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

export default AllPartner;
