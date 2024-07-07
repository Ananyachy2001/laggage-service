import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LuggageStoreDetails = () => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCupdXut4FuMzxoOk6bw8B4gDAYfpOYcvo&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
  
      window.initMap = function () {
        const location = { lat: -33.864, lng: 151.209 };
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: location,
        });
        new google.maps.Marker({
          position: location,
          map: map,
        });
      };
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    return (
      <div className="container mt-12 pt-32">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-2xl">24/7 Circular Quay Storage Spot</h3>
                <h6 className="card-subtitle mb-2 text-muted">Restaurant | Open now 24 hours</h6>
                <div id="map" className="map-container mb-3 h-80"></div>
                <p>
                  <strong>Address:</strong> Address will be shown after booking
                </p>
                <p>
                  <strong>Price:</strong> Prices vary per service and time
                </p>
                <p>
                  <strong>Rating:</strong>
                  <span className="star-rating text-yellow-400 text-xl">★★★★☆</span> 4.7 (4237 reviews)
                </p>
                <p>
                  <strong>Services:</strong> Free Wi-Fi, Bar, Bathrooms
                </p>
                <p>
                  <strong>Protection:</strong> Up to $10,000
                </p>
                <div className="opening-hours">
                  <h6 className="font-bold">Opening Hours:</h6>
                  <ul className="list-unstyled">
                    <li>Monday: 24 hours</li>
                    <li>Tuesday: 24 hours</li>
                    <li>Wednesday: 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="booking-summary bg-gray-100 p-4 rounded-lg mt-5">
              <h5 className="font-bold">Your Booking</h5>
              <form id="payment-form">
                <div className="form-group">
                  <label htmlFor="luggageQuantity" className="font-bold">Number of Bags:</label>
                  <input type="number" className="form-control" id="luggageQuantity" name="luggageQuantity" required />
                </div>
                <div className="form-group">
                  <label htmlFor="serviceOption" className="mt-2 ps-4 font-bold">Luggage Service:</label>
                  <select className="form-control pt-0" id="serviceOption" name="serviceOption">
                    <option value="standard">Standard - $5.00</option>
                    <option value="home">Home Luggage - $7.00</option>
                    <option value="window">Window Luggage - $6.50</option>
                    <option value="office">Office Luggage - $8.00</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="storageTime" className="font-bold">Storage Time:</label>
                  <input type="datetime-local" className="form-control" id="storageTime" name="storageTime" required />
                </div>
                <div className="form-group">
                  <label className="font-bold">Total Price: $</label>
                  <span id="totalPrice">0.00</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Book Now with Stripe</button>
              </form>
              <button id="google-pay-button" className="btn btn-dark btn-block mt-3">Book Now with Google Pay</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LuggageStoreDetails;