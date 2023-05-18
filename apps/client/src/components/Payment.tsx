import { useLocation } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51N6tZvHVEjqhooSitwv9BHJ15NDfY5ybyoFkZwLpSUBSPeFM8odaG4zwiclwQVSEEWfqDRsvoxOShl3FsZagvoOj00IzP22n6G"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  let { state } = useLocation();
  console.log("STATE", state);

  async function handlePayFormSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

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
      console.log(paymentMethod);
      const { id } = paymentMethod;
      await axios.post("http://localhost:8080/payment", {
        id,
        amount: state.price * 100,
      });
    }
  }
  return (
    <form onSubmit={handlePayFormSubmit} className="m-44">
      <CardElement></CardElement>
      <button>buy</button>
    </form>
  );
};
const Payment = () => {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret:
  //     "sk_test_51N6tZvHVEjqhooSiH74ntRqYE1JbJC9vpFJvFHibEHFi7ood6g3HMwlLaP6SAnwzFE0YrZJ4OoXZA89BCbJJ5LGI00EU3MRHbx",
  // };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
export default Payment;
