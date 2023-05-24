import { RiCloseLine } from "react-icons/ri";
import { useShoppingCart } from "../contexts/CartContext";
import CartItem from "./CartItem";
import priceFormat from "../utilities/priceFormat";
import { Link } from "react-router-dom";

interface ShoppingCartProps {
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBurgerHidden: React.Dispatch<React.SetStateAction<string>>;
}

const ShoppingCart = ({ setCartOpen, setBurgerHidden }: ShoppingCartProps) => {
  const { setBlurApplied, cartItems } = useShoppingCart();
  const handleCloseCart = () => {
    setCartOpen((prev) => !prev);
    setBurgerHidden("");
    setBlurApplied(false);
  };

  const handleProceed = () => {
    setBlurApplied(false);
    setCartOpen((prev) => !prev);
  };
  return (
    <div className="relative w-full h-full flex flex-col px-4 py-2 z-50">
      <div className="absolute w-[90%]">
        <RiCloseLine size={26} onClick={handleCloseCart} />
      </div>
      <div className="flex flex-col gap-4 mt-[-6px] items-center py-4 border-b-[5px] border-[#1D3557]  ">
        <div>
          <img
            className="h-[30px] w-[30px]"
            src="../../figma/Icon.svg"
            alt=""
          />
        </div>
        <p>All Products Are Shipping For Free</p>
      </div>
      <div className="pt-4 flex flex-col gap-5">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))}
      </div>

      <div className="w-full h-full flex flex-col justify-end mb-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Subtotal</h2>
          <h3 className="font-bold">
            {priceFormat(
              cartItems.reduce((init, cartItem) => {
                const total = init + cartItem.price * cartItem.quantity;
                console.log(total);
                return total;
              }, 0)
            )}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Shipping</h2>
          <h3 className="font-bold">Free</h3>
        </div>
      </div>
      <div className="text-center mb-4">
        <Link
          to="/checkout"
          onClick={handleProceed}
          className="mt-4 px-4 py-4 text-white font-bold rounded-md bg-[#1D3557]"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;

{
  /* <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
          <img
            src={"../../public/figma/women.png"}
            alt="item-name"
            className="w-16 h-16 rounded"
          />
          <div className="flex flex-col flex-grow">
            <span className="font-bold">Item Name</span>
            <span className="text-gray-500">Item Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              // onClick={decreaseItemQuantity}
              className="px-2 py-1 text-sm text-gray-500 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="text-sm">{0}</span>
            <button
              // onClick={increaseCartQuantity}
              className="px-2 py-1 text-sm text-gray-500 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div> */
}
