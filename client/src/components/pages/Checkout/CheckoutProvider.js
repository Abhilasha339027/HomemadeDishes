import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { keys } from "./../../../keys";
import Checkout from "./Checkout";

const stripePromise = loadStripe(keys.STRIPE_KEY);

function CheckoutProvider() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}

export default CheckoutProvider;
