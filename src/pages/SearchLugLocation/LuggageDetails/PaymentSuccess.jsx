import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="text-success">Payment Successful!</h1>
      <p>Thank you for your payment. Your booking has been confirmed.</p>
      <Button onClick={handleBackToHome} variant="primary" className="mt-3">
        Back to Home
      </Button>
    </div>
  );
};

export default PaymentSuccess;
