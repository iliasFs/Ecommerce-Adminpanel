import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { CartItem } from "../types";
import { useShoppingCart } from "../contexts/CartContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51N6tZvHVEjqhooSitwv9BHJ15NDfY5ybyoFkZwLpSUBSPeFM8odaG4zwiclwQVSEEWfqDRsvoxOShl3FsZagvoOj00IzP22n6G"
);

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);

  const { setCartItems } = useShoppingCart();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

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
          amount: parseInt(state.price) * 100,
        });

        if (payment) {
          const productsIds = getItemsIds();
          const order = {
            quantity: Number(state.price),
            email: state.email,
            fullName: `${state.name} ${state.lastName} `,
            adress: ` ${state.street}, ${state.postal}, ${state.city}, ${state.country}`,
            phone: state.phone,
            products: JSON.stringify(productsIds),
          };
          const res = await axios.post("http://localhost:8080/orders", order);
          setSuccess(true);
          setSpinner(false);
          if (res) {
            setCartItems([]);
            localStorage.removeItem("shopping-cart");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        }
      }

    } catch (error: any) {
      if (error.response.data.raw?.message) {
        setError(error.response.data.raw.message);
      } else return;
    }
  }
  function getItemsIds() {
    const itemsList = localStorage.getItem("shopping-cart");
    const idArr: number[] = [];
    if (itemsList) {
      JSON.parse(itemsList).map((item: CartItem) => {
        return idArr.push(item.id);
      });
    }
    return idArr;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-[400px] md:w-[800px] checkout-container">
        <div className="border-b-[5px] p-3 border-[#1D3557] rounded-sm">
          <div className="border-[#1D3557] gap-1 border-opacity-10 md:border-none flex flex-col md:flex-row p-2 border-b-[3px] md:justify-between">
            <p className=" text-gray-400">Contact</p>
            <p className="text-black">
              {state.email}, {state.phone}
            </p>
            <Link
              className="font-bold text-black transition-colors duration-300 hover:text-[#1D3557]"
              to={"/checkout"}
            >
              change
            </Link>
          </div>
          <div className=" flex flex-col gap-1 md:flex-row p-2  md:justify-between">
            <p className="text-gray-400">Ship to</p>
            <p className="text-black">
              {state.street}, {state.postal}, {state.city}, {state.country}
            </p>
            <Link
              className="font-bold text-black transition-colors duration-300 hover:text-[#1D3557]"
              to={"/checkout"}
            >
              change
            </Link>
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
              src="//cdn.shopify.com/tshopifycloud/shopify/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg"
              alt=""
            />
          </div>
          <CardElement className="border p-4" />
          <div className="flex flex-col">
            {spinner && !error && !success ? (
              <BeatLoader
                className="justify-center items-center mt-4"
                size={5}
                color="#000000"
              />
            ) : (
              <button
                disabled={success}
                className="justify-end items-end mt-3 px-2 py-1 text-white text-sm font-bold rounded-md bg-[#1D3557]"
              >
                Buy
              </button>
            )}
          </div>
        </form>
      </div>
      {error && !success && (
        <div className="w-[300px] bg-red-800 m-2 border border-red-800 bg-opacity-10 p-3 rounded-md animate-fadeIn">
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
