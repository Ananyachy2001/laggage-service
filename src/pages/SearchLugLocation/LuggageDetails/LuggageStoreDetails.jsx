import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { Elements } from '@stripe/react-stripe-js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faClock, faStar, faWifi, faShieldAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import ClientNavbarComp from '../../User/ClientNavbarComp';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config';
import LuggageStoreInfo from './LuggageStoreInfo';
import BookingForm from './BookingForm';
import NavbarComp from '../../Home/NavbarComp';

library.add(faMapMarkerAlt, faClock, faStar, faWifi, faShieldAlt, faTag);

const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

const LuggageStoreDetails = () => {
  const location = useLocation();
  const { id, title, details, price, image, lat, lng, regularprice, availableFrom, availableTo, discountPercentage, openTime, closeTime, notes } = location.state || {};
  const [luggageQuantity, setLuggageQuantity] = useState(1);
  const [serviceOption, setServiceOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkinTime, setCheckinTime] = useState('');
  const [checkoutTime, setCheckoutTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    luggagePhotos: [],
    specialRequests: '',
    notes: ''
  });
  const navigate = useNavigate();

  const servicePrices = {
    standard: 5.00,
    home: 7.00,
    window: 6.50,
    office: 8.00,
  };

  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

  const handleSubmit = async (bookingData) => {
    const token = localStorage.getItem('token');
    const url = `${config.API_BASE_URL}/api/v1/bookings/instant-booking`;

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(isLoggedIn && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(bookingData)
    };

    try {
      const response = await fetch(url, fetchOptions);
      const result = await response.json();

      if (result.status === 'success') {
        const { clientSecret, bookingId } = result;

        navigate('/payment-success', {
          state: { clientSecret, bookingId, clientDetails }
        });
      } else {
        console.error('Booking error:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${config.API_BASE_URL}/api/v1/users/profile/client`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (response.ok) {
            setClientId(result.user._id);
            setClientDetails({
              name: result.user.username,
              email: result.user.email,
              phone: result.user.phoneNumber || '',
              luggagePhotos: result.user.luggagePhotos || [],
              specialRequests: '',
              notes: ''
            });
            setIsLoggedIn(true);
          } else {
            console.error('Error:', result);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div>
        {isLoggedIn ? <ClientNavbarComp /> : <NavbarComp />}

        <div className="container mx-auto mt-12 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <LuggageStoreInfo 
                id={id}
                title={title}
                details={details}
                price={price}
                lat={lat}
                lng={lng}
                availableFrom={availableFrom}
                availableTo={availableTo}
                discountPercentage={discountPercentage}
                openTime={openTime}
                closeTime={closeTime}
                notes={notes}
                GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
              />
            </div>
            <div>
              <BookingForm 
                locationid={id}
                handleSubmit={handleSubmit}
                luggageQuantity={luggageQuantity}
                setLuggageQuantity={setLuggageQuantity}
                serviceOption={serviceOption}
                setServiceOption={setServiceOption}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                discount={discount}
                setDiscount={setDiscount}
                checkinTime={checkinTime}
                setCheckinTime={setCheckinTime}
                checkoutTime={checkoutTime}
                setCheckoutTime={setCheckoutTime}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                servicePrices={servicePrices}
                regularprice={regularprice}
                clientDetails={clientDetails}
                setClientDetails={setClientDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default LuggageStoreDetails;
