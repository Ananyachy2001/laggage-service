import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import ClientNavbarComp from '../../User/ClientNavbarComp';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const { paymentIntent, clientDetails, bookingDetails, storeDetails } = location.state || {};

  const handleBackToHome = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const formatDate = (dateStr) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeStr) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(`1970-01-01T${timeStr}Z`).toLocaleTimeString(undefined, options);
  };

  const token = localStorage.getItem('token');

  return (
    <div>
      {token && <ClientNavbarComp />}
      <div className="container text-center mt-12 pt-32">
        <h1 className="text-success">Booking and Payment Success!</h1>
        <p>We’ve emailed you a copy of this booking confirmation. Please show your booking ID when you arrive to Drop-off.</p>

        <Card className="my-5 shadow-lg p-4">
          <Card.Body>
            <Row className="mb-3">
              <Col md={12}>
                <Card className="p-3 bg-light">
                  <h5 className="text-center mb-3">Booking ID</h5>
                  <div className="text-center font-weight-bold">{bookingDetails?.bookingId}</div>
                </Card>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <div className="d-flex align-items-center justify-content-center">
                  
                  <div>
                    <strong>{storeDetails?.title}</strong>
                    
                    <p className="m-0">{storeDetails?.details}</p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <strong>Drop-off:</strong>
                <p className="m-0">
                  {formatDate(bookingDetails?.startDate)} at {formatTime(bookingDetails?.startTime)}
                </p>
              </Col>
              <Col md={6}>
                <strong>Pick-up:</strong>
                <p className="m-0">
                  {formatDate(bookingDetails?.endDate)} at {formatTime(bookingDetails?.endTime)}
                </p>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={12} className="text-center">
                <Button onClick={handleBackToHome} variant="primary" className="mt-3">
                  Back to Home
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
