import { Link, useLocation } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import "./Checkout.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51N6tZvHVEjqhooSitwv9BHJ15NDfY5ybyoFkZwLpSUBSPeFM8odaG4zwiclwQVSEEWfqDRsvoxOShl3FsZagvoOj00IzP22n6G"
);

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const itemsList = location.state;

  async function handlePayFormSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      setSpinner(true);
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
        const payment = await axios.post("http://localhost:8080/payment", {
          id,
          amount: parseInt(itemsList.price) * 100,
        });

        if (payment) {
          setSuccess(true);
          setSpinner(false);
        }
      }
    } catch (error: any) {
      setError(error.response.data.raw.message);
      console.log(error.response.data.raw.message);
    }
  }
  return (
    <div className="flex flex-wrap h-[350px] flex-col justify-center items-center">
      <div className="flex-wrap h-[350px] w-[800px] checkout-container ">
        <div className="grid grid-cols-3 border-b-[5px] p-3 border-[#1D3557] rounded-sm">
          <div>
            <div className="flex mb-2 items-center justify-start ">
              <p className=" text-gray-400">Contact</p>
            </div>
            <div className="flex items-center justify-start ">
              <p className="text-gray-400">Ship to</p>
            </div>
          </div>
          <div>
            <div className="flex mb-2 items-center justify-start ">
              <p className="text-black">
                {itemsList.email}, {itemsList.phone}
              </p>
            </div>
            <div className="flex items-center justify-start ">
              <p className="text-black">
                {itemsList.street}, {itemsList.postal}, {itemsList.city},{" "}
                {itemsList.country}
              </p>
            </div>
          </div>
          <div>
            <div className="flex mb-2 items-center justify-end ">
              <Link
                className="font-bold text-black transition-colors duration-300 hover:text-[#1D3557]"
                to={"/checkout"}
              >
                change
              </Link>
            </div>
            <div className="flex items-center justify-end ">
              <Link
                className="font-bold text-black transition-colors duration-300 hover:text-[#1D3557]"
                to={"/checkout"}
              >
                change
              </Link>
            </div>
          </div>
        </div>
        <form onSubmit={handlePayFormSubmit} className="m-5">
          <div className="flex p-3 gap-2">
            <img
              src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg"
              alt=""
            />
            <img
              src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg"
              alt=""
            />
            <img
              src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg"
              alt=""
            />
          </div>
          <CardElement className="border p-4" />
          {spinner && !error && !success ? (
            <BeatLoader size={5} color="#000000" />
          ) : (
            <button
              disabled={success}
              className="mt-3 px-2 py-1 text-white text-sm font-bold rounded-md bg-[#1D3557]"
            >
              Buy
            </button>
          )}
        </form>
      </div>
      {error && !success && (
        <div className="bg-red-800 m-2 border border-red-800 bg-opacity-10 p-3 rounded-md animate-fadeIn">
          <h1 className="text-red-900">{error}</h1>
          <button
            className="mt-3 px-2 py-1 text-white text-sm font-bold rounded-md bg-[#1D3557]"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try Again
          </button>
        </div>
      )}
      {success && !error && (
        <div className="flex animate-fadeIn m-2">
          <div className="border m-2 border-green-500 bg-opacity-10 bg-green-500 p-3 rounded-md">
            <h1>
              Your payment has been successfully processed, and the amount has
              been charged to your account.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
