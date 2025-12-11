import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cartcard from "./Cartcard";
import { Button } from "./ui/button";

const Cart = () => {
    
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-5 flex justify-between">
      <div className="min-h-screen">
        <div className=" my-5">
          <h1 className="text-3xl font-bold">Shoping Cart</h1>
          <p className="text-[#818388]">items currently in your cart</p>
        </div>
        <div className="">
            <Cartcard />
        </div>
      </div>
      <div className="border-l ps-10  border-gray-400">
        <h1 className="text-xl font-semibold">Total Amount</h1>
        <hr />
        <p className="my-10">Amount Calculation</p>
        <Button className="bg-[#008ECC] text-white" variant="primery">
            Place Order
          </Button>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
