import React from 'react';

const StorageSpot = ({ title, details, price, link }) => (
    <div className="storage-spot">
        <div className="spot-details">
            <h3>{title}</h3>
            <p>{details}</p>
        </div>
        <div className="spot-price">
            <p>{price}</p>
            <a href={link} className="btn btn-primary btn-sm">See Details</a>
        </div>
    </div>
);

export default StorageSpot;
