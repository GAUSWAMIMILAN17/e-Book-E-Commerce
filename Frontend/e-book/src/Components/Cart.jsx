import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cartcard from "./Cartcard";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setClearCart } from "./redux/cartSlice";
import { toast } from "sonner";
import {Label} from "./ui/label"
import { ORDER_API_ENDPOINT } from "../utils/data";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.cart);
  const { user, loading } = useSelector((store) => store.user);
  const [paymentMode, setPaymentMode] = useState("cod")

  const clearCart = () => {
    if (!user) {
      toast.success("plz login and try again");
      return;
    }
    dispatch(setClearCart());
    toast.success("Clear Cart Successfully!");
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qauntity,
    0
  );

  const placeOrder = async () => {
    try {
      console.log("clicked");
      if (!user) {
        toast.success("Plz Login and try again");
        return;
      }
      if (items.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const Orderdata = {
        books: items.map((item) => ({
          book: item._id,
          quantity: item.qauntity,
        })),
        paymentMode: paymentMode
      };

      const res = await axios.post(`${ORDER_API_ENDPOINT}/placeOrder`, Orderdata, {
        withCredentials: true
      })
      console.log(res.data)
      toast.success("Order placed successfully")
    } catch (error) {
      console.log(error);
      toast.success("Server Error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-5 flex justify-between">
        <div className="min-h-screen w-2/3">
          <div className=" my-5">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-[#818388]">
              {items.length} items currently in your cart
            </p>
          </div>

          <div className="flex gap-3 col-span-2">
            {items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              items.map((it) => <Cartcard key={it._id} item={it} />)
            )}
          </div>
        </div>

        <div className="border-l ps-10 border-gray-400 w-1/3 p-4">
          <h1 className="text-xl font-semibold">Order Summary</h1>
          <hr className="my-3" />
          <div className="my-4">
            <p className="mb-2">Subtotal ({items.length} items)</p>
            <p className="text-2xl font-bold">₹{totalAmount}</p>
          </div>
          <div className="my-4">
            <Label htmlFor="width" className="mb-3">
              Payment Mode
            </Label>
            <select
              id="payment"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              <optgroup className="bg-white" label="Payment Options">
                <option value="cod">COD</option>
                <option value="online">Online</option>
              </optgroup>
            </select>
          </div>

          <Button
            onClick={placeOrder}
            className="bg-[#008ECC] text-white w-full"
            variant="primery"
          >
            Place Order
          </Button>

          <Button onClick={clearCart} className="mt-3 w-full" variant="primery">
            Clear Cart
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
