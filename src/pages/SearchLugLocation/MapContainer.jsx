import React, { useEffect } from 'react';
import config from '../../config';

const MapContainer = ({ locations, setVisibleLocations, center }) => {
    const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

    useEffect(() => {
        if (!window.google || !window.google.maps) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            window.initMap = initMap;

            return () => {
                document.head.removeChild(script);
                delete window.initMap;
            };
        } else {
            initMap();
        }
    }, [GOOGLE_MAPS_API_KEY, locations]);

    const initMap = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: center || { lat: -33.8688, lng: 151.2093 },
            zoom: 7,
        });

        const bounds = new google.maps.LatLngBounds();

        locations.forEach(location => {
            const marker = new google.maps.Marker({
                position: { lat: location.coordinates.coordinates[1], lng: location.coordinates.coordinates[0] },
                map: map,
                title: location.name,
            });

            bounds.extend(marker.position);
        });

        if (!center) {
            map.fitBounds(bounds);
        } else {
            map.setZoom(14);  // Adjust zoom level as needed
        }

        google.maps.event.addListener(map, 'idle', () => {
            updateVisibleLocations(map, locations);
        });
    };

    const updateVisibleLocations = (map, locations) => {
        const bounds = map.getBounds();

        if (!bounds) return;

        const visibleLocations = locations.filter(location => {
            const latLng = new google.maps.LatLng(location.coordinates.coordinates[1], location.coordinates.coordinates[0]);
            return bounds.contains(latLng);
        });

        setVisibleLocations(visibleLocations);
    };

    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapContainer;
