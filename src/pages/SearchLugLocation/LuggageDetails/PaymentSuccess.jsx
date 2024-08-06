import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientSecret, bookingId, clientDetails } = location.state || {};

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="text-success">Payment Successful!</h1>
      <p>Thank you for your payment. Your booking has been confirmed.</p>
      <div className="mt-4">
        <h4>Booking Details</h4>
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Client Secret:</strong> {clientSecret}</p>



      </div>
      <Button onClick={handleBackToHome} variant="primary" className="mt-3">
        Back to Home
      </Button>
    </div>
  );
};

export default PaymentSuccess;
