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
    <div className="relative overflow-y-auto max-w-[450px] h-full flex flex-col px-4 py-2 z-50">
      <div className="absolute w-[90%]">
        <RiCloseLine size={26} onClick={handleCloseCart} />
      </div>
      <div className="flex flex-col gap-4 mt-[-6px] items-center py-4 border-b-[5px] border-[#1D3557]  ">
        <div>
          <img className="h-[30px] w-[30px]" src="/figma/Icon.svg" alt="" />
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
