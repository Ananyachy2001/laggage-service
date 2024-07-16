import React from 'react';
import LuggageNavbar from './LuggageNavbar';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';

const dummyLocations = [
    { lat: -33.8688, lng: 151.2093, title: '24/7 Circular Quay Storage Spot', details: 'Restaurant | 13 min', price: 'A$6.90 / 24h / bag', link: '/luggage_store_details' },
    { lat: -33.8700, lng: 151.2150, title: 'Martin Place Storage Spot', details: 'Convenience Store | 2 min', price: 'A$9.00 / 24h / bag', link: '/luggage_store_details' },
    { lat: -33.8650, lng: 151.2100, title: 'Near Cliveden Storage Spot', details: 'Convenience Store | 9 min', price: 'A$8.00 / 24h / bag', link: '/luggage_store_details' }
];

const LuggageLocation = () => (
    <div className="min-h-screen flex flex-col">
        <LuggageNavbar />
        <div className="flex flex-col lg:flex-row mt-24 pt-4 flex-grow">
            <Sidebar className="w-full lg:w-1/3" storageSpots={dummyLocations} />
            <div className="w-full lg:w-2/3">
                <MapContainer locations={dummyLocations} />
            </div>
        </div>
    </div>
);

export default LuggageLocation;
