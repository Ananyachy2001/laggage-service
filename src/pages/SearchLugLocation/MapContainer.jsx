import React, { useEffect } from 'react';

const MapContainer = () => {
    useEffect(() => {
        const initMap = () => {
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: { lat: -33.8688, lng: 151.2093 }
            });

            const locations = [
                { lat: -33.8688, lng: 151.2093, title: '24/7 Circular Quay Storage Spot', details: 'Restaurant | 13 min' },
                { lat: -33.8700, lng: 151.2150, title: 'Martin Place Storage Spot', details: 'Convenience Store | 2 min' },
                { lat: -33.8650, lng: 151.2100, title: 'Near Cliveden Storage Spot', details: 'Convenience Store | 9 min' }
            ];

            locations.forEach((location) => {
                const marker = new google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map,
                    title: location.title
                });

                const infowindow = new google.maps.InfoWindow({
                    content: `<div><h5>${location.title}</h5><p>${location.details}</p></div>`
                });

                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });
            });
        };

        const loadScript = (url) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = () => {
                initMap();
            };
        };

        loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCupdXut4FuMzxoOk6bw8B4gDAYfpOYcvo&callback=initMap`);
    }, []);

    return <div id="map" style={{ height: '100%', width: '100%' }}></div>;
};

export default MapContainer;
