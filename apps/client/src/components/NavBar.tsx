import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
function NavBar() {
  const [burger, setBurger] = useState<boolean>(true);

  const handleBurger = () => {
    setBurger((prev) => !prev);
  };
  return (
    <div>
      <div className="relative section__padding flex items-center justify-between">
        <div>
          <img src="../../public/figma/Mark.svg" alt="logo" />
        </div>
        <div className="hidden lg:flex pl-14 gap-10 text-base text-[#6B7280]">
          <h3>Women</h3>
          <h3>Men</h3>
          <h3>Kids</h3>
        </div>
        <div className="hidden lg:flex items-center  justify-center gap-4 ">
          <button>
            <img
              className="h-[20px] w-[20px]"
              src="../../public/figma/Icon.svg"
              alt=""
            />
          </button>
          <h3 className="mr-4 ">Blog</h3>
          <button className="text-[#6B7280]">Sign In</button>
          <button className="text-white bg-indigo-600 px-3 py-2 rounded-lg">
            Sign Up
          </button>
        </div>
        <button className="lg:hidden">
          {burger === true ? (
            <RiMenu3Line size={27} onClick={handleBurger} />
          ) : null}
        </button>
        {!burger && (
          <>
            <div className="absolute top-0 right-0 bg-black bg-opacity-95 w-[100vw] h-[100vh] z-30 text-white flex items-center justify-center ">
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
            </div>
            <button className="absolute z-40 top-[26px] right-[37px] text-white text-[30px]">
              <RiCloseLine size={40} onClick={handleBurger} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// {
//   /* <span className="rounded-full text-[12px] font-bold absolute bg-red-500 w-[20px] h-[20px] top-[-1px] left-[18px] flex items-center justify-center">
//             {cartQuantity}
//           </span> */
// }

export default NavBar;