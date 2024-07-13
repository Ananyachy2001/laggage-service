import React from 'react';
import LuggageNavbar from './LuggageNavbar';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';

const LuggageLocation = () => (
    <div className="min-h-screen flex flex-col">
        <LuggageNavbar />
        <div className="flex flex-col lg:flex-row mt-24 pt-4 flex-grow">
            <Sidebar className="w-full lg:w-1/3" />
            <div className="w-full lg:w-2/3">
                <MapContainer />
            </div>
        </div>
    </div>
);

export default LuggageLocation;
