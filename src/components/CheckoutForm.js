import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import '../App'
import CardSection from "./CardSection";

 function CheckoutForm(props)  {


  const handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      alert('success')
      console.log(result.token);
    }
  };

   
    return (
      <div>
        <div class="product-info">
          <h3 className="product-title">Apple MacBook Pro</h3>
          <h4 className="product-price">$999</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <CardSection />
          <button   className="btn-pay">
            Buy Now
          </button>
        </form>
      </div>
    );
  
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer >
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
        )}
       
    </ElementsConsumer>
  );
}