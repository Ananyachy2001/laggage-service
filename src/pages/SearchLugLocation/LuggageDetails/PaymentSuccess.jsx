import React from 'react';
import { Button } from 'react-bootstrap';
import ClientNavbarComp from '../../User/ClientNavbarComp'; // Adjust the import based on the actual path

const PaymentSuccess = () => {
  const handleBackToHome = () => {
    localStorage.clear();  // This will remove all items from local storage
    window.location.href = '/';
  };

  // Check if token exists in local storage
  const token = localStorage.getItem('token');

  return (
    <div>
      {token && <ClientNavbarComp />}  {/* Render ClientNavbarComp if token exists */}
      <div className="container text-center mt-5">
        <h1 className="text-success">Payment Successful!</h1>
        <p>Thank you for your payment. Your booking has been confirmed.</p>
        <Button onClick={handleBackToHome} variant="primary" className="mt-3">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
