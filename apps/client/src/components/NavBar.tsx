import { RiMenu3Line } from "react-icons/ri";
function NavBar() {
  const handleBurger = () => {};
  return (
    <div>
      <div className="section__padding flex items-center justify-between">
        <div>
          <img src="../../public/figma/Mark.svg" alt="logo" />
        </div>
        <div className="hidden md:flex pl-14 gap-10 text-base text-[#6B7280]">
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
          <RiMenu3Line size={27} onClick={handleBurger} />
        </button>
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
