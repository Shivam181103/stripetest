import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
 
const Card = () => {
  const stripe = useStripe();
  const elements = useElements();
 
  const handleSubmit = async (e) => {
     
    e.preventDefault();

    if (!stripe || !elements) {
       
      alert('Stripe.js has not yet loaded.');
      return;
    }
    const card = elements.getElement(CardElement)
      const {error: backendError, clientSecret} = await fetch(
      '/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'usd',
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      alert(backendError.message);
      return;
    }

    alert('Client secret returned');
    
    
    const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          description:'iphone'
        },
      }
    );

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(stripeError);
      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    alert(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  };

  return (
    <>
      <h1>Card</h1>

     

      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">Card</label>
        <CardElement  id='card'/> 
        <button type="submit">Pay</button>
      </form>
           </>
  );
};

export default Card;