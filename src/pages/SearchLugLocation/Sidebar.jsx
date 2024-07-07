import React from 'react';
import StorageSpot from './StorageSpot';

const Sidebar = () => (
    <div className="col-md-4 sidebar">
        <div className="header text-center text-white py-3">
            <h4 className="mb-3">URLocker</h4>
            <div className="search-bar">
                <input type="text" className="form-control" placeholder="Sydney NSW, Australia" />
            </div>
        </div>
        <div className="filters mt-4">
            <label>
                Number of Bags:
                <input type="number" className="form-control" defaultValue="2" />
            </label>
            <label>
                Drop off:
                <input type="datetime-local" className="form-control" />
            </label>
            <label>
                Pick up:
                <input type="datetime-local" className="form-control" />
            </label>
        </div>
        <div className="storage-spots mt-4">
            <StorageSpot 
                title="24/7 Circular Quay Storage Spot"
                details="Restaurant | 13 min"
                price="A$6.90 / 24h / bag"
                link="luggage_store_details.html"
            />
            <StorageSpot 
                title="Martin Place Storage Spot"
                details="Convenience Store | 2 min"
                price="A$9.00 / 24h / bag"
                link="luggage_store_details.html"
            />
            <StorageSpot 
                title="Near Cliveden Storage Spot"
                details="Convenience Store | 9 min"
                price="A$8.00 / 24h / bag"
                link="luggage_store_details.html"
            />
        </div>
    </div>
);

export default Sidebar;
