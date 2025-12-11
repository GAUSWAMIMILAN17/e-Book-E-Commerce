import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cartcard from "./Cartcard";

const Cart = () => {
    
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-5">
      <div className="min-h-screen mx-auto">
        <div className="max-w-7xl mx-auto my-5">
          <h1 className="text-3xl font-bold">Shoping Cart</h1>
          <p className="text-[#818388]">items currently in your cart</p>
        </div>
        <div className="">
            <Cartcard />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
