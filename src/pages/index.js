import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IGSqHEWVu33UhEDyaZRVVo88TaH20VvKNF4A4Hx61M9vbnIg4Vu4jBaFigw6d8j1trQrH11LLvUlF8o5tBQgdmQ003qbum4io"
);
// markup
const IndexPage = ({ location }) => {
  const redirectToCheckout = async () => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        { price: "price_1IGUQAEWVu33UhEDN7uGEzBe", quantity: 3 },
        { price: "price_1IGjX4EWVu33UhED6bic9l4O", quantity: 2 },
      ],
      successUrl: `${location.origin}/payment-success`,
      cancelUrl: `${location.origin}/payment-error`,
    });
  };
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={redirectToCheckout}>Checkout</button>
    </div>
  );
};

export default IndexPage;
