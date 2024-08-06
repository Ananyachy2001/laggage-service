import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Modal, Button } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, clientSecret, handlePaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientName, setClientName] = useState(''); // State to store the client's name

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Card Element:', cardElement);
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
   

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: clientName, // Use the client name from the input field
      },
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    console.log('Payment Intent:', paymentIntent);

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      handlePaymentSuccess(paymentIntent.id);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Complete your payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="payment-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="client-name">Name</label>
            <input
              id="client-name"
              type="text"
              className="form-control"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div id="card-element" className="mb-3">
            <CardElement />
          </div>
          <Button variant="primary" type="submit" disabled={!stripe || processing}>
            {processing ? 'Processing...' : 'Pay'}
          </Button>
          {error && <div id="error-message">{error}</div>}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
