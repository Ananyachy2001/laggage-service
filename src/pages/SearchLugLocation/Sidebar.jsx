import React from 'react';
import StorageSpot from './StorageSpot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => (
    <div className="w-full md:w-1/3 bg-white p-4 shadow-lg">
        <div className="filters mb-6 ">
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
        <div className="storage-spots overflow-y-auto h-96 mb-36 mt-28 ">
            <StorageSpot 
                title="24/7 Circular Quay Storage Spot"
                details="Restaurant | 13 min"
                price="A$6.90 / 24h / bag"
                link="/luggage_store_details"
            />
            <StorageSpot 
                title="Martin Place Storage Spot"
                details="Convenience Store | 2 min"
                price="A$9.00 / 24h / bag"
                link="/luggage_store_details"
            />
            <StorageSpot 
                title="Near Cliveden Storage Spot"
                details="Convenience Store | 9 min"
                price="A$8.00 / 24h / bag"
                link="/luggage_store_details"
            />
                        <StorageSpot 
                title="Near Cliveden Storage Spot"
                details="Convenience Store | 9 min"
                price="A$8.00 / 24h / bag"
                link="/luggage_store_details"
            />
                        <StorageSpot 
                title="Near Cliveden Storage Spot"
                details="Convenience Store | 9 min"
                price="A$8.00 / 24h / bag"
                link="/luggage_store_details"
            />
                        <StorageSpot 
                title="Near Cliveden Storage Spot"
                details="Convenience Store | 9 min"
                price="A$8.00 / 24h / bag"
                link="/luggage_store_details"
            />
                        <StorageSpot 
                title="Near Cliveden Storage Spot"
                details="Convenience Store | 9 min"
                price="A$8.00 / 24h / bag"
                link="/luggage_store_details"
            />
        </div>
    </div>
);

export default Sidebar;
