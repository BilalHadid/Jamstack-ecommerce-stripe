import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const stripePromise = loadStripe(
  "pk_test_51IGSqHEWVu33UhEDyaZRVVo88TaH20VvKNF4A4Hx61M9vbnIg4Vu4jBaFigw6d8j1trQrH11LLvUlF8o5tBQgdmQ003qbum4io"
);
const CheckoutSession = () => {
  const redirectToCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/.netlify/functions/checkout");
    const data = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={redirectToCheckout}>Checkout data</button>
    </div>
  );
};

export default CheckoutSession;
