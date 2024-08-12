import React, { useState } from 'react';
import { Button, Card, Row, Col, Form, Alert, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ClientNavbarComp from '../../User/ClientNavbarComp';
import { useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import config from '../../../config';

const PaymentSuccess = () => {
  const location = useLocation();
  const { paymentIntent, guestDetails, bookingDetails, storeDetails } = location.state || {};
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false); // State to manage the modal visibility

  // Log location id
  // console.log('Location ID:', bookingDetails?.locationid);

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

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      location: bookingDetails?.locationid,
      rating,
      comment,
      name: guestDetails?.name,
      email: guestDetails?.email,
    };

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setSuccess('Thank you for your review! Your feedback has been submitted successfully.');
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/';
        }, 3000);
      } else {
        const errorData = await response.json();
        if (errorData.message.includes('Comment must be at least 10 characters long')) {
          setShowModal(true); // Show modal if the error is related to comment length
        } else {
          setError(errorData.message || 'Failed to submit review. Please try again later.');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {token && <ClientNavbarComp />}
      <div className="container text-center mt-12 pt-32">
        <Card className="my-5 shadow-lg p-4 rounded-lg">
          <Card.Body>
            <h1 className="text-success font-bold mb-4">Booking and Payment Successful!</h1>
            <p className="text-muted mb-4">We’ve sent a confirmation email with all the booking details. Please keep it handy for your records.</p>

            <Row className="mb-3">
              <Col md={12}>
                <Card className="p-3 bg-light border-0 rounded-lg">
                  <h5 className="text-center mb-3">Booking ID</h5>
                  <div className="text-center font-weight-bold text-primary text-lg">{bookingDetails?.bookingId}</div>
                </Card>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <h4 className="font-weight-bold text-dark">{storeDetails?.title}</h4>
                    <p className="text-muted m-0">{storeDetails?.details}</p>
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

            <hr className="my-4" />

            <h5 className=" text-2xl font-bold mb-4 text-gray-800">We Value Your Feedback</h5>
            <p className="text-xl  mb-4">Please take a moment to share your experience with us.</p>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmitReview}>
              <Form.Group as={Row} controlId="rating">
                <Form.Label column sm={2}>
                  Rating:
                </Form.Label>
                <Col sm={10}>
                  <div className="d-flex justify-left">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={`cursor-pointer mx-1 text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="comment">
                <Form.Label column sm={2}>
                  Comment:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </Col>
              </Form.Group>

              <Row className="mt-4">
                <Col md={6} className="text-center">
                  <Button type="submit" variant="success" className="mt-3 rounded-lg px-5 py-2">
                    Submit Review
                  </Button>
                </Col>
                <Col md={6} className="text-center">
                  <Button onClick={handleBackToHome} variant="secondary" className="mt-3 rounded-lg px-5 py-2">
                    Later
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* Modal for review validation errors */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review Submission Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your review could not be submitted because:</p>
          <ul>
            <li>The comment must be at least 10 characters long.</li>
            <li>You need to provide a rating.</li>
          </ul>
          <p>Please correct these issues and try again.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentSuccess;
