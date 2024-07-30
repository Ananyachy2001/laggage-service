import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';

const StripePaymentForm = ({ handlePaymentSuccess, handlePaymentCancel, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: payerName,
        email: payerEmail,
      },
    });

    if (error) {
      console.error('[error]', error);
      handlePaymentCancel();
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      handlePaymentSuccess(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded-lg">
      <Form.Group controlId="payerName">
        <Form.Label className="font-semibold mb-1">Card Holder's Name:</Form.Label>
        <Form.Control 
          type="text" 
          value={payerName} 
          onChange={(e) => setPayerName(e.target.value)} 
          placeholder="Enter your name" 
          required 
          className="mb-3 p-3 border border-gray-300 rounded-lg"
        />
      </Form.Group>
      <Form.Group controlId="payerEmail">
        <Form.Label className="font-semibold mb-1">Card Holder's Email:</Form.Label>
        <Form.Control 
          type="email" 
          value={payerEmail} 
          onChange={(e) => setPayerEmail(e.target.value)} 
          placeholder="Enter your email" 
          required 
          className="mb-3 p-3 border border-gray-300 rounded-lg"
        />
      </Form.Group>
      <Form.Group controlId="cardElement">
        <Form.Label className="block font-semibold mb-3">Credit or Debit Card:</Form.Label>
        <CardElement className="mb-4 p-3 border border-gray-300 rounded-lg" />
      </Form.Group>
      <Button 
        type="submit" 
        variant="primary" 
        disabled={!stripe} 
        className="w-100 py-2 mt-2"
      >
        Pay ${totalPrice.toFixed(2)}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
