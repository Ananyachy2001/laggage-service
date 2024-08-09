import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faClock, faStar, faWifi, faShieldAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import ClientNavbarComp from '../../User/ClientNavbarComp';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config';
import LuggageStoreInfo from './LuggageStoreInfo';
import BookingForm from './BookingForm';
import NavbarComp from '../../Home/NavbarComp';
import { Button, Modal } from 'react-bootstrap';

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [bookingId, setBookingId] = useState('');
  const navigate = useNavigate();

  const servicePrices = {
    standard: 5.00,
    home: 7.00,
    window: 6.50,
    office: 8.00,
  };

  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;
  const [bookingError, setBookingError] = useState('');

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
      console.log(result);
    
      if (result.status === 'success') {
        setClientSecret(result.clientSecret);
        setBookingId(result.booking._id);
        console.log('Client Secret:', result.clientSecret);
        console.log('Booking ID:', result.booking._id);
        setShowPaymentModal(true);
      } else {
        console.error('Booking error:', result);
        setBookingError(result.message); // Set the error message here
      }
    } catch (error) {
      console.error('Error:', error);
      setBookingError('An unexpected error occurred. Please try again later.'); // Fallback error message
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
            setClientId(result._id);
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
              {bookingError && <div className="alert alert-danger">{bookingError}</div>}
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
                clientId={clientId}
                setClientId={setClientId}
                clientDetails={clientDetails}
                setClientDetails={setClientDetails}
              />
            </div>
          </div>
        </div>
        {showPaymentModal && <PaymentFormModal clientSecret={clientSecret} clientDetails={clientDetails} bookingId={bookingId} />}
      </div>
    </Elements>
  );
  

};

const PaymentFormModal = ({ clientSecret, clientDetails, bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    console.log('Card Element:', cardElement); // Log cardElement

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: clientDetails.name,
        },
      },
    });

    console.log('Payment Intent:', paymentIntent); // Log paymentIntent

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentIntent);
    
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/bookings/${bookingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'paid' }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update booking status');
        }
    
        console.log('Booking status updated successfully');
        navigate('/payment-success', {
          state: { paymentIntent, clientDetails },
        });
      } catch (error) {
        console.error('Error updating booking status:', error);
      }
    }
  };

  return (
    <Modal show onHide={() => {}} className="modal-dialog-centered">
      <Modal.Header closeButton className="bg-[#1A73A7] text-white">
        <Modal.Title>Complete Your Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-gray-100 p-6 rounded-lg">
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <CardElement className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <Button variant="primary" type="submit" className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300">
            Pay Now
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default LuggageStoreDetails;
