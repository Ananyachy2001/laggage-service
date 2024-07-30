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
  const { title, details, price, image, lat, lng, regularprice } = location.state || {};
  const [luggageQuantity, setLuggageQuantity] = useState(1);
  const [serviceOption, setServiceOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkinTime, setCheckinTime] = useState('');
  const [checkoutTime, setCheckoutTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    luggagePhotos: []
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
    console.log({
      clientDetails,
      totalPrice,
      serviceOption,
      luggageQuantity,
      checkinTime,
      checkoutTime,
    });
    navigate('/client/bookingconfirmation', {
      state: {
        clientDetails,
        totalPrice,
        serviceOption,
        luggageQuantity,
        checkinTime,
        checkoutTime,
      },
    });
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
            setClientDetails({
              name: result.user.username,
              email: result.user.email,
              phone: result.user.phoneNumber || '',
              address: result.user.address || '',
              luggagePhotos: result.user.luggagePhotos || []
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
              title={title}
              details={details}
              price={price}
              lat={lat}
              lng={lng}
              GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            />
          </div>
          <div>
            <BookingForm 
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
