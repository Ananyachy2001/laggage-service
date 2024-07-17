import React from 'react';
import StorageSpot from './StorageSpot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ storageSpots }) => {
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
                {storageSpots.length > 0 ? (
                    storageSpots.map((spot, index) => (
                        <StorageSpot
                            key={index}
                            title={spot.title}
                            details={spot.details}
                            price={spot.price}
                            link={spot.link}
                            lat={spot.lat}
                            lng={spot.lng}
                            image={spot.image}
                        />
                    ))
                ) : (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-gray-400 text-6xl mb-4" />
                        <p className="text-gray-500 mb-4">No stores available at the moment</p>
                        <p className="text-gray-700 mb-6">Urlocker is available in 2+ cities with more added every week. We hope we can serve you wherever you go next!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;