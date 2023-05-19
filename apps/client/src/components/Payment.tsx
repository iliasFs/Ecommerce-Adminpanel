import { useLocation } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51N6tZvHVEjqhooSitwv9BHJ15NDfY5ybyoFkZwLpSUBSPeFM8odaG4zwiclwQVSEEWfqDRsvoxOShl3FsZagvoOj00IzP22n6G"
);

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>("");
  const stripe = useStripe();
  const elements = useElements();
  let { state } = useLocation();
  console.log("STATE", state);

  async function handlePayFormSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        console.log("[error] CardElement is not yet retrieved");
        return;
        //stripe card element
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.log("[error] CardElement is not yet retrieved");
        return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (!error) {
        const { id } = paymentMethod;
        await axios.post("http://localhost:8080/payment", {
          id,
          amount: state.amount * 100,
        });
      }
    } catch (error: any) {
      setError(error.response.data.raw.message);
      console.log(error.response.data.raw.message);
    }
  }
  return (
    <form onSubmit={handlePayFormSubmit} className="m-44">
      <CardElement></CardElement>
      <button>buy</button>
      {error && <h1 className="text-pink-900">{error}</h1>}
    </form>
  );
};
const Payment = () => {
  return (
    <div className="h-screen bg-red-100">
      <div className="flex flex-col">
        <div className="flex gap-52">
          <p>Contact</p>
          <p>gmail</p>
          <button className="font-bold">change</button>
        </div>
        <div className="flex gap-52">
          <p>Ship to</p>
          <p>adress</p>
          <button className="font-bold">change</button>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};
export default Payment;