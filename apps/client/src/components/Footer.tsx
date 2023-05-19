
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="max-w-[1350px] m-auto my-[4rem] section__padding flex flex-col items-start lg:flex-row  w-full gap-5">
      <div className="flex flex-col flex-[1] gap-10 text-gray-500 items-start lg:w-[80%]">
        <img
          className="w-[25px] h-[25px]"
          src="../../public/figma/Mark.svg"
          alt="logo"
        />

        <p className="text-base text-left">
          Making the world a better place through <br /> constructing elegant
          hierarchies.
        </p>
        <div className="flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link to="/">
                <FaFacebook size={27} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <GrInstagram size={27} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <AiOutlineGithub size={27} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaYoutube size={27} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap flex-[1.5]  w-full gap-16 mt-5 lg:mt-0 ">
        <div className="flex flex-col flex-1 max-w-[160px] ">
          <h3>Solutions</h3>
          <ul className="text-gray-500 flex flex-col gap-4 mt-6">
            <li>
              <Link to="/">Marketing</Link>{" "}
            </li>
            <li>
              <Link to="/">Analytics</Link>{" "}
            </li>
            <li>
              <Link to="/">Commerce</Link>{" "}
            </li>
            <li>
              <Link to="/">Insights</Link>{" "}
            </li>
          </ul>
        </div>

        <div className="flex flex-col flex-1 max-w-[160px] ">
          <h3>Support</h3>
          <ul className="text-gray-500 flex flex-col gap-4 mt-6">
            <li>
              <Link to="/">Pricing</Link>{" "}
            </li>
            <li>
              <Link to="/">Documentation</Link>{" "}
            </li>
            <li>
              <Link to="/">Guides</Link>{" "}
            </li>
            <li>
              <Link to="/">API Status</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="flex flex-col flex-1 max-w-[160px] ">
          <h3>Company</h3>
          <ul className="text-gray-500 flex flex-col gap-4 mt-6">
            <li>
              <Link to="/">About</Link>{" "}
            </li>
            <li>
              <Link to="/">Blog</Link>{" "}
            </li>
            <li>
              <Link to="/">Jobs</Link>{" "}
            </li>
            <li>
              <Link to="/">Press</Link>{" "}
            </li>
            <li>
              <Link to="/">Partners</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="flex flex-col flex-1 max-w-[100px]">
          <h3>Legal</h3>
          <ul className="text-gray-500 flex flex-col gap-4 mt-6">
            <li>
              <Link to="/">Claim</Link>{" "}
            </li>
            <li>
              <Link to="/">Privacy</Link>{" "}
            </li>
            <li>
              <Link to="/">Terms</Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
