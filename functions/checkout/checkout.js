// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (event) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: "price_1IGUQAEWVu33UhEDN7uGEzBe", quantity: 1 }],
    mode: "payment",
    success_url: `http://localhost:8888/payment-success`,
    cancel_url: `http://localhost:8888/payment-error`,
  });
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
