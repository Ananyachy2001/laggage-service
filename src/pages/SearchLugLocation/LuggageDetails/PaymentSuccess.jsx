import React from 'react';
import { Button } from 'react-bootstrap';

const PaymentSuccess = () => {
  const handleBackToHome = () => {
    localStorage.clear();  // This will remove all items from local storage
    window.location.href = '/';
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
