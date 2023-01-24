 import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import React from "react";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm"

const stripePromise = loadStripe("pk_test_51MTfvoSIO9jwyVmq6nGsmzP0t9T10CgcvEkbIm0OiEddVs40vRYcf2hiontrxahb3bZKgqIeDrOh0of3aVRDCnN100Ss61ziEb");

const App = () => {
  return (
    <div className="App">
      <div className="product">
        <img
          src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"
          alt="laptop"
          style={{ width: "100%", height: "auto" }}
        />
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default App;
 