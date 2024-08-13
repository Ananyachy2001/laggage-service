import React, { useState } from 'react';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllPartnerPayment = () => {
    // Dummy data for partners
    const [partners, setPartners] = useState([
        { id: 1, name: 'Partner1', monthlySales: 5000, totalBookings: 50, earnings: 4500, statusPaid: true },
        { id: 2, name: 'Partner2', monthlySales: 3000, totalBookings: 30, earnings: 2700, statusPaid: false },
        { id: 3, name: 'Partner3', monthlySales: 8000, totalBookings: 80, earnings: 7200, statusPaid: true },
        // More dummy data...
    ]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const togglePaymentStatus = (id) => {
        setPartners(partners.map(partner => partner.id === id ? { ...partner, statusPaid: !partner.statusPaid } : partner));
    };

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

                        {/* Partner List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead className="bg-[#4A686A] text-white">
                                    <tr>
                                        <th className="w-1/8 py-3 px-6 text-left">ID</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Name</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Monthly Sales</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Total Bookings</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Earnings After Service Charge</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Payment Status</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {partners.map(partner => (
                                        <tr key={partner.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/8 py-3 px-6 border">{partner.id}</td>
                                            <td className="w-1/8 py-3 px-6 border">{partner.name}</td>
                                            <td className="w-1/8 py-3 px-6 border">${partner.monthlySales}</td>
                                            <td className="w-1/8 py-3 px-6 border">{partner.totalBookings}</td>
                                            <td className="w-1/8 py-3 px-6 border">${partner.earnings}</td>
                                            <td className="w-1/8 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => togglePaymentStatus(partner.id)}
                                                    className={`px-4 py-2 rounded-lg ${partner.statusPaid ? 'bg-green-500' : 'bg-red-500'} text-white transition duration-150`}
                                                >
                                                    {partner.statusPaid ? 'Paid' : 'Unpaid'}
                                                </button>
                                            </td>
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

export default AllPartnerPayment;
