import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import { useShoppingCart } from "../contexts/CartContext";
const Layout = () => {
  const { blurApplied } = useShoppingCart();
  return (
    <div>
      <NavBar />
      <div className="">
        <Outlet />
        {blurApplied && (
          <div className="fixed inset-0 bg-slate-900 backdrop-blur-xl bg-opacity-75" />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
