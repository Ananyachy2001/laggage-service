import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import CanvasJSReact from '@canvasjs/react-charts';
import PartnerNavbarComp from './PartnerNavbarComp';
import config from '../../config';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const HostAnalytics = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Dummy data for income from luggages for different periods
    const incomeData = [
        { period: new Date(2024, 0), income: 10000 },
        { period: new Date(2024, 1), income: 15000 },
        { period: new Date(2024, 2), income: 20000 },
        { period: new Date(2024, 3), income: 18000 },
        { period: new Date(2024, 4), income: 22000 },
        { period: new Date(2024, 5), income: 25000 },
        { period: new Date(2024, 6), income: 28000 },
        { period: new Date(2024, 7), income: 30000 },
        { period: new Date(2024, 8), income: 27000 },
        { period: new Date(2024, 9), income: 32000 },
        { period: new Date(2024, 10), income: 35000 },
        { period: new Date(2024, 11), income: 38000 }
    ];

    // Dummy data for daily, monthly, and yearly income from locations
    const locationIncomeData = {
        daily: [
            { date: new Date(2024, 5, 1), income: 500 },
            { date: new Date(2024, 5, 2), income: 600 },
            // Add more daily data points
        ],
        monthly: [
            { period: new Date(2024, 0), income: 20000 },
            { period: new Date(2024, 1), income: 25000 },
            // Add more monthly data points
        ],
        yearly: [
            { year: new Date(2024, 0), income: 240000 },
            { year: new Date(2023, 0), income: 220000 },
            // Add more yearly data points
        ]
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color="#4A90E2" />
            </div>
        );
    }

    // Prepare dataPoints for CanvasJS chart - Monthly Income from Luggages
    const dataPoints = incomeData.map(data => ({
        x: data.period,
        y: data.income
    }));

    // Prepare dataPoints for CanvasJS charts - Daily, Monthly, Yearly Income from Locations
    const dailyDataPoints = locationIncomeData.daily.map(data => ({
        x: data.date,
        y: data.income
    }));

    const monthlyDataPoints = locationIncomeData.monthly.map(data => ({
        x: data.period,
        y: data.income
    }));

    const yearlyDataPoints = locationIncomeData.yearly.map(data => ({
        x: data.year,
        y: data.income
    }));

    // Configuration options for the CanvasJS chart - Monthly Income from Luggages
    const options = {
        animationEnabled: true,
        title: {
            text: "Monthly Income from Luggages - 2024"
        },
        axisX: {
            valueFormatString: "MMM",
            title: "Month"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: dataPoints
        }]
    };

    // Configuration options for the CanvasJS chart - Daily Income from Locations
    const dailyOptions = {
        animationEnabled: true,
        title: {
            text: "Daily Income from Locations"
        },
        axisX: {
            valueFormatString: "DD MMM, YYYY",
            title: "Date"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "DD MMM, YYYY",
            type: "spline",
            dataPoints: dailyDataPoints
        }]
    };

    // Configuration options for the CanvasJS chart - Monthly Income from Locations
    const monthlyOptions = {
        animationEnabled: true,
        title: {
            text: "Monthly Income from Locations"
        },
        axisX: {
            valueFormatString: "MMM",
            title: "Month"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: monthlyDataPoints
        }]
    };

    // Configuration options for the CanvasJS chart - Yearly Income from Locations
    const yearlyOptions = {
        animationEnabled: true,
        title: {
            text: "Yearly Income from Locations"
        },
        axisX: {
            valueFormatString: "YYYY",
            title: "Year"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "YYYY",
            type: "column",
            dataPoints: yearlyDataPoints
        }]
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <PartnerNavbarComp />
            <main className="flex-grow">
                <div className="bg-white p-8 mt-28 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Partner Analytics</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="w-full">
                            <CanvasJSChart options={options} />
                        </div>
                        <div className="w-full">
                            <CanvasJSChart options={dailyOptions} />
                        </div>
                        <div className="w-full">
                            <CanvasJSChart options={monthlyOptions} />
                        </div>
                        <div className="w-full">
                            <CanvasJSChart options={yearlyOptions} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HostAnalytics;
