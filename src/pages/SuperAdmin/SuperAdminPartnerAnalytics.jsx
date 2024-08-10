import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import config from '../../config';

Chart.register(...registerables);

const SuperAdminPartnerAnalytics = () => {
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [partnersPerPage] = useState(10); // Change the number for items per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/logout');
      return;
    }

    const fetchPartnersAnalytics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/v1/analytics/partners`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setPartners(response.data);
        } else {
          setError('Failed to fetch partner analytics data');
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/logout');
        } else {
          setError('Failed to fetch partner analytics data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPartnersAnalytics();
  }, [navigate]);

  const getChartData = () => {
    return {
      labels: partners.map((partner) => partner.partnerName),
      datasets: [
        {
          label: 'Average Monthly Earnings',
          data: partners.map((partner) => partner.averageMonthlyEarnings),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Average Monthly Bookings',
          data: partners.map((partner) => partner.averageMonthlyBookings),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    };
  };

  // Pagination Logic
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = partners.slice(indexOfFirstPartner, indexOfLastPartner);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-400 h-32 w-32"></div>
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

            {/* Partner Analytics Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg mb-6">
              <table className="min-w-full">
                <thead className="bg-[#4A686A] text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Partner Name</th>
                    <th className="py-3 px-6 text-left">Total Earnings</th>
                    <th className="py-3 px-6 text-left">Booking Count</th>
                    <th className="py-3 px-6 text-left">Location Count</th>
                    <th className="py-3 px-6 text-left">Avg Monthly Earnings</th>
                    <th className="py-3 px-6 text-left">Avg Monthly Bookings</th>
                    <th className="py-3 px-6 text-left">Income Indicator</th>
                  </tr>
                </thead>

                <tbody className="text-gray-800">
                  {currentPartners.map((partner) => (
                    <tr key={partner.partnerId} className="bg-white hover:bg-gray-200 transition duration-150">
                      <td className="py-3 px-6 border">{partner.partnerName}</td>
                      <td className="py-3 px-6 border">${partner.totalEarnings}</td>
                      <td className="py-3 px-6 border">{partner.bookingCount}</td>
                      <td className="py-3 px-6 border">{partner.locationCount}</td>
                      <td className="py-3 px-6 border">${partner.averageMonthlyEarnings}</td>
                      <td className="py-3 px-6 border">{partner.averageMonthlyBookings}</td>
                      <td className="py-3 px-6 border">
                        {partner.averageMonthlyEarnings >= 10000 ? (
                          <span className="text-green-600 font-semibold">Good</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Bad</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-end p-4">
                <Pagination
                  partnersPerPage={partnersPerPage}
                  totalPartners={partners.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>

            {/* Partner Analytics Graph */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Bar data={getChartData()} options={{ responsive: true, maintainAspectRatio: false }} height={400} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ partnersPerPage, totalPartners, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPartners / partnersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                } hover:bg-blue-500 hover:text-white transition`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SuperAdminPartnerAnalytics;
