import React from 'react';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';

const LuggageLocation = () => (
    <div className="container-fluid mt-5 pt-4">
        <div className="row">
            <Sidebar />
            <div className="col-md-8 map-container">
                <MapContainer />
            </div>
        </div>
    </div>
);

export default LuggageLocation;
