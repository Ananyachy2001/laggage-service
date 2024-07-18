import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LuggageNavbar from './LuggageNavbar';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';

const dummyLocations = [
    {
        coordinates: {
            type: "Point",
            coordinates: [151.2093, -33.8688]
        },
        address: {
            street: "24/7 Circular Quay Storage Spot",
            district: "Sydney",
            city: "Sydney",
            state: "NSW",
            zipCode: "2000",
            country: "Australia"
        },
        closedDays: [],
        specialClosedDays: [],
        _id: "1",
        partner: "partner1",
        name: "24/7 Circular Quay Storage Spot",
        description: "Restaurant | 13 min",
        availableFrom: "2024-07-01T00:00:00.000Z",
        availableTo: "2025-07-01T00:00:00.000Z",
        regularPrice: 6.90,
        discountPercentage: 0,
        url: "/luggage_store_details",
        pictures: [],
        isDeleted: false,
        isActive: true,
        createdBy: "partner1",
        notes: "A convenient storage spot near Circular Quay.",
        createdAt: "2024-07-13T23:30:40.806Z",
        updatedAt: "2024-07-13T23:30:40.806Z",
        __v: 0
    },
    {
        coordinates: {
            type: "Point",
            coordinates: [151.2150, -33.8700]
        },
        address: {
            street: "Martin Place Storage Spot",
            district: "Sydney",
            city: "Sydney",
            state: "NSW",
            zipCode: "2000",
            country: "Australia"
        },
        closedDays: [],
        specialClosedDays: [],
        _id: "2",
        partner: "partner2",
        name: "Martin Place Storage Spot",
        description: "Convenience Store | 2 min",
        availableFrom: "2024-07-01T00:00:00.000Z",
        availableTo: "2025-07-01T00:00:00.000Z",
        regularPrice: 9.00,
        discountPercentage: 0,
        url: "/luggage_store_details",
        pictures: [],
        isDeleted: false,
        isActive: true,
        createdBy: "partner2",
        notes: "A convenient storage spot near Martin Place.",
        createdAt: "2024-07-13T23:30:40.806Z",
        updatedAt: "2024-07-13T23:30:40.806Z",
        __v: 0
    },
    {
        coordinates: {
            type: "Point",
            coordinates: [151.2100, -33.8650]
        },
        address: {
            street: "Near Cliveden Storage Spot",
            district: "Sydney",
            city: "Sydney",
            state: "NSW",
            zipCode: "2000",
            country: "Australia"
        },
        closedDays: [],
        specialClosedDays: [],
        _id: "3",
        partner: "partner3",
        name: "Near Cliveden Storage Spot",
        description: "Convenience Store | 9 min",
        availableFrom: "2024-07-01T00:00:00.000Z",
        availableTo: "2025-07-01T00:00:00.000Z",
        regularPrice: 8.00,
        discountPercentage: 0,
        url: "/luggage_store_details",
        pictures: [],
        isDeleted: false,
        isActive: true,
        createdBy: "partner3",
        notes: "A convenient storage spot near Cliveden.",
        createdAt: "2024-07-13T23:30:40.806Z",
        updatedAt: "2024-07-13T23:30:40.806Z",
        __v: 0
    }
];

const LuggageLocation = () => {
    const { state } = useLocation();
    const [visibleLocations, setVisibleLocations] = useState(dummyLocations);

    return (
        <div className="min-h-screen flex flex-col">
            <LuggageNavbar />
            <div className="flex flex-col lg:flex-row mt-24 pt-4 flex-grow">
                <Sidebar className="w-full lg:w-1/3" storageSpots={visibleLocations} isAvailable={visibleLocations.length > 0} />
                <div className="w-full lg:w-2/3">
                    <MapContainer locations={dummyLocations} setVisibleLocations={setVisibleLocations} center={state?.location} />
                </div>
            </div>
        </div>
    );
};

export default LuggageLocation;
