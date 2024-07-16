import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MapContainer = ({ locations }) => {
  const location = useLocation();
  const { state } = location;
  const { lat, lng } = state?.location || {};
  const inputLocation = state?.inputLocation || '';

  useEffect(() => {
    const initMap = () => {
      const mapCenter = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : { lat: -33.8688, lng: 151.2093 };
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: mapCenter
      });

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

    if (window.google && window.google.maps) {
      initMap();
    } else {
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
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`);
    }
  }, [lat, lng, locations]);

  return <div id="map" style={{ height: '100%', width: '100%' }}></div>;
};

export default MapContainer;
