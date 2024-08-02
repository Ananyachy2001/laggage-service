import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faClock, faStar, faWifi, faShieldAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import ClientNavbarComp from '../../User/ClientNavbarComp';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config';
import LuggageStoreInfo from './LuggageStoreInfo';
import BookingForm from './BookingForm';
import NavbarComp from '../../Home/NavbarComp';

library.add(faMapMarkerAlt, faClock, faStar, faWifi, faShieldAlt, faTag);

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

  const handleSubmit = (clientDetails) => {
    const payload = {
      location: id,
      startDate: new Date(checkinTime).toISOString(),
      endDate: new Date(checkoutTime).toISOString(),
      startTime: new Date(checkinTime).toTimeString().slice(0, 8),
      endTime: new Date(checkoutTime).toTimeString().slice(0, 8),
      payment: {
        amount: totalPrice,
        method: 'stripe'
      },
      specialRequests: clientDetails.specialRequests || 'No requirement',
      discount,
      notes: clientDetails.notes || 'No notes'
    };

    if (isLoggedIn) {
      payload.client = clientId;
      fetch(`${config.API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        navigate('/client/bookingconfirmation', {
          state: { ...data, clientDetails }
        });
      })
      .catch(error => console.error('Error:', error));
    } else {
      payload.guest = {
        name: clientDetails.name,
        email: clientDetails.email,
        phone: clientDetails.phone
      };
      fetch(`${config.API_BASE_URL}/bookings/guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        navigate('/client/bookingconfirmation', {
          state: { ...data, clientDetails }
        });
      })
      .catch(error => console.error('Error:', error));
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
            setClientId(result.user._id);  // Assuming the client ID is stored in _id
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
  );
};

export default LuggageStoreDetails;
