import React, { useState } from 'react';
import StorageSpot from './StorageSpot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [storageSpots, setStorageSpots] = useState([
        {
            title: "24/7 Circular Quay Storage Spot",
            details: "Restaurant | 13 min",
            price: "A$6.90 / 24h / bag",
            link: "/luggage_store_details"
        },
        {
            title: "Martin Place Storage Spot",
            details: "Convenience Store | 2 min",
            price: "A$9.00 / 24h / bag",
            link: "/luggage_store_details"
        },
        {
            title: "Near Cliveden Storage Spot",
            details: "Convenience Store | 9 min",
            price: "A$8.00 / 24h / bag",
            link: "/luggage_store_details"
        },
        // Add more storage spots here if needed
    ]);

    const [isAvailable, setIsAvailable] = useState(true);

    return (
        <div className="w-full md:w-1/3 bg-white p-4 shadow-lg">
            <div className="filters mb-6">
                <div className="flex justify-between mb-4">
                    <label className="w-1/2 pr-2">
                        Drop off:
                        <input type="datetime-local" className="w-full p-2 mt-2 border border-gray-300 rounded-lg" />
                    </label>
                    <label className="w-1/2 pl-2">
                        Pick up:
                        <input type="datetime-local" className="w-full p-2 mt-2 border border-gray-300 rounded-lg" />
                    </label>
                </div>
                <button className="w-full py-2 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Search
                </button>
            </div>
            <div className="storage-spots overflow-y-auto h-96 mb-36 mt-28">
                {isAvailable ? (
                    storageSpots.map((spot, index) => (
                        <StorageSpot
                            key={index}
                            title={spot.title}
                            details={spot.details}
                            price={spot.price}
                            link={spot.link}
                        />
                    ))
                ) : (
                    <div className="text-center">
                        <p className="text-gray-500 mb-4">No stores available at the moment</p>
                        <p className="text-gray-700 mb-2">Bounce is available in 200+ cities with more added every week. We hope we can serve you wherever you go next!</p>
                        <div className="flex justify-center space-x-4">
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg">New York</button>
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg">London</button>
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg">Chicago</button>
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg">Rome</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
