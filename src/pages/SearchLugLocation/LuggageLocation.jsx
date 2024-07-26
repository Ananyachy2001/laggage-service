import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LuggageNavbar from './LuggageNavbar';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';
import config from '../../config';

const LuggageLocation = () => {
    const { state } = useLocation();
    const [locations, setLocations] = useState([]);
    const [visibleLocations, setVisibleLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/locations/public/all-locations`);
                setLocations(response.data);
                setVisibleLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <LuggageNavbar />
            <div className="flex flex-col lg:flex-row mt-24 pt-4 flex-grow">
                <Sidebar className="w-full lg:w-1/3" storageSpots={visibleLocations} isAvailable={visibleLocations.length > 0} />
                <div className="w-full lg:w-2/3">
                    <MapContainer locations={locations} setVisibleLocations={setVisibleLocations} center={state?.location} />
                </div>
            </div>
        </div>
    );
};

export default LuggageLocation;
