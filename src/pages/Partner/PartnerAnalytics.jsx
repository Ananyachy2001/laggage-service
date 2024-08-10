import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import config from '../../config';
import PartnerNavbarComp from './PartnerNavbarComp';

Chart.register(...registerables);

const PartnerAnalytics = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/logout');
      return;
    }

    const fetchPartnerAnalytics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/v1/analytics/partner-analytics/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setPartnerData(response.data);
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

    fetchPartnerAnalytics();
  }, [navigate]);

  const getChartData = () => {
    if (!partnerData || partnerData.earningsLast7Days.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Earnings',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Bookings',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          },
        ],
      };
    }

    const earningsLast7Days = partnerData.earningsLast7Days.map(day => day.earnings);
    const bookingLast7Days = partnerData.earningsLast7Days.map(day => day.bookings);
    const labels = partnerData.earningsLast7Days.map(day => new Date(day.date).toLocaleDateString());

    return {
      labels,
      datasets: [
        {
          label: 'Earnings',
          data: earningsLast7Days,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Bookings',
          data: bookingLast7Days,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    };
  };

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <PartnerNavbarComp />
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <Bar data={getChartData()} options={{ responsive: true, maintainAspectRatio: false }} height={400} />
      </div>
    </div>
  );
};

export default PartnerAnalytics;
