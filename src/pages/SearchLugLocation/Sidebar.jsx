import React, { useState } from 'react';
import StorageSpot from './StorageSpot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ storageSpots }) => {
    const [isAvailable, setIsAvailable] = useState(true);

    return (
        <div className="w-full md:w-1/3 bg-white p-4 shadow-lg rounded-lg">
            <div className="filters mb-6">
                <div className="flex justify-between mb-4">
                    <label className="w-1/2 pr-2">
                        Drop off:
                        <input type="datetime-local" className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300" />
                    </label>
                    <label className="w-1/2 pl-2">
                        Pick up:
                        <input type="datetime-local" className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300" />
                    </label>
                </div>
                <button className="w-full py-2 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition duration-300">
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Search
                </button>
            </div>
            <div className="storage-spots overflow-y-auto h-[32rem] mt-16">
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
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300">New York</button>
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300">London</button>
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300">Chicago</button>
                            <button className="py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300">Rome</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
