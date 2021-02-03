import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql, useStaticQuery } from "gatsby";
const stripePromise = loadStripe(
  "pk_test_51IGSqHEWVu33UhEDyaZRVVo88TaH20VvKNF4A4Hx61M9vbnIg4Vu4jBaFigw6d8j1trQrH11LLvUlF8o5tBQgdmQ003qbum4io"
);
const ProductList = ({ location }) => {
  const [quant, setQuant] = useState(1);
  const data = useStaticQuery(
    graphql`
      query ProductPrices {
        prices: allStripePrice {
          edges {
            node {
              id
              currency
              unit_amount
              product {
                id
                name
                images
              }
            }
          }
        }
      }
    `
  );
  const redirectToCheckout = async (id) => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: id, quantity: quant }],
      successUrl: `${location.origin}/payment-success`,
      cancelUrl: `${location.origin}/payment-error`,
    });
  };
  console.log(data);
  return (
    <div>
      <h1>productlist</h1>
      {data.prices.edges.map((node) => {
        return (
          <div key={node.node.id}>
            <div>
              <img width="300px" src={node.node.product.images} alt="" />
              <p>{node.node.product.name}</p>
              <p>{node.node.unit_amount}</p>

              <p>{node.node.id}</p>
            </div>
            <button onClick={() => redirectToCheckout(node.node.id)}>
              Checkout
            </button>
            <button onClick={() => setQuant(quant + 1)}>+</button>
            <p>{quant}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
