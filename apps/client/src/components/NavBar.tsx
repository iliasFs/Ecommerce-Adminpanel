import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cartDivStyles } from "../constants/cartStyles";
import ShoppingCart from "./ShoppingCart";
import { useShoppingCart } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation, fadeAnimation } from "../config/motion";
function NavBar() {
  const [burger, setBurger] = useState<boolean>(true);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [burgerHidden, setBurgerHidden] = useState<string>("");

  const { setBlurApplied } = useShoppingCart();
  const handleBurger = () => {
    setIsCartOpen(false);
    setBurger((prev) => !prev);
  };

  const handleCartClick = () => {
    setIsCartOpen((prev) => !prev);
    setBurgerHidden("hidden");
    setBlurApplied(true);
  };
  return (
    <AnimatePresence>
      <div className={`z-50 top-0 ${isCartOpen ? "" : "sticky"} bg-white`}>
        <div className="section__padding flex items-center justify-between">
          {isCartOpen && (
            <motion.div
              {...slideAnimation("right", -1, 1.2)}
              className={`${cartDivStyles}`}
            >
              <ShoppingCart
                setCartOpen={setIsCartOpen}
                setBurgerHidden={setBurgerHidden}
              />
            </motion.div>
          )}
          <motion.header {...slideAnimation("down", 0, 2)}>
            <Link to="/">
              <img src="../../public/figma/Mark.svg" alt="logo" />
            </Link>
          </motion.header>
          <motion.header
            {...slideAnimation("down", 0, 2)}
            className="hidden lg:flex pl-14 gap-10 text-base text-[#6B7280]"
          >
            <Link className="cursor-pointer" to={"/category/women"}>
              Women
            </Link>
            <Link className="cursor-pointer" to={"/category/men"}>
              Men
            </Link>
            <Link className="cursor-pointer" to={"/category/kids"}>
              Kids
            </Link>
          </motion.header>
          <motion.header
            {...slideAnimation("down", 0, 2)}
            className="hidden lg:flex items-center  justify-center gap-4 "
          >
            <button className="text-[#2f558b]  border-[5px] border-[#2f558b] px-2 py-[3px] rounded-lg flex items-center justify-center hover:scale-110 hover:translate-y--1 transition-all  ease-in-out">
              <a
                href="http://127.0.0.1:5173/"
                className="font-bold cursor-pointer"
              >
                3D
              </a>
            </button>
            <button className="text-[#6B7280]">Sign In</button>
            <button className="text-white bg-indigo-600 px-3 py-2 rounded-lg">
              Sign Up
            </button>
          </motion.header>
          <button className="absolute right-5" onClick={handleCartClick}>
            <img
              className="h-[28px] w-[28px]"
              src="/public/figma/Icon.svg"
              alt=""
            />
          </button>
          <button className="lg:hidden">
            {burger ? <RiMenu3Line size={27} onClick={handleBurger} /> : null}
          </button>
          {!burger && (
            <>
              <motion.div
                {...fadeAnimation}
                className={`absolute ${burgerHidden} top-20 right-0 bg-black bg-opacity-95 w-[100vw] h-[100vh] z-30 text-white flex items-center justify-center lg:hidden`}
              >
                <ul className="text-[35px] flex flex-col gap-5">
                  <li>
                    <Link className="cursor-pointer" to={"/category/women"}>
                      Women
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="cursor-pointer" to={"/category/men"}>
                      Men
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="cursor-pointer" to={"/category/kid"}>
                      Kids
                    </Link>
                  </li>
                  <li>
                    <Link className="cursor-pointer" to={"/category/kid"}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <button className="text-[#6B7280]">Sign In</button>
                  </li>
                  <li>
                    <button className="text-white bg-indigo-600 px-3 py-2 rounded-lg">
                      Sign Up
                    </button>
                  </li>
                </ul>
              </motion.div>
              <button
                className={`absolute ${burgerHidden} z-40 top-[100px] right-[37px] text-white text-[30px]`}
              >
                <RiCloseLine size={47} onClick={handleBurger} />
              </button>
            </>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}

// {
//   /* <span className="rounded-full text-[12px] font-bold absolute bg-red-500 w-[20px] h-[20px] top-[-1px] left-[18px] flex items-center justify-center">
//             {cartQuantity}
//           </span> */
// }

export default NavBar;
