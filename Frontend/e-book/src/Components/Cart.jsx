import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cartcard from "./Cartcard";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setClearCart } from "./redux/cartSlice";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { ORDER_API_ENDPOINT } from "../utils/data";
import axios from "axios";
import { setLoading } from "./redux/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.cart);
  const { user, loading } = useSelector((store) => store.user);
  const [paymentMode, setPaymentMode] = useState("cod");

  const clearCart = () => {
    if (!user) {
      toast.success("Please login and try again");
      return;
    }
    dispatch(setClearCart());
    toast.success("Cart cleared successfully!");
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qauntity,
    0
  );

  const placeOrder = async () => {
    try {
      dispatch(setLoading(true));

      if (!user) {
        toast.success("Please login and try again");
        dispatch(setLoading(false));
        return;
      }

      if (items.length === 0) {
        toast.error("Cart is empty");
        dispatch(setLoading(false));
        return;
      }

      const orderData = {
        books: items.map((item) => ({
          book: item._id,
          quantity: item.qauntity,
        })),
        paymentMode,
      };

      await axios.post(`${ORDER_API_ENDPOINT}/placeOrder`, orderData, {
        withCredentials: true,
      });

      toast.success("Order placed successfully");
      dispatch(setClearCart());
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      toast.error("Server error");
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto my-6 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">

        {/* LEFT : CART ITEMS */}
        <div className="lg:col-span-2 min-h-screen">
          <div className="mb-5">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-500">
              {items.length} items currently in your cart
            </p>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {items.map((item) => (
                <Cartcard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT : ORDER SUMMARY */}
        <div className="lg:col-span-1 border rounded-xl p-6 h-fit sticky top-24 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
          <hr className="mb-4" />

          <div className="mb-4">
            <p className="text-gray-600 mb-1">
              Subtotal ({items.length} items)
            </p>
            <p className="text-2xl font-bold">₹{totalAmount}</p>
          </div>

          <div className="mb-4">
            <Label className="mb-2 block">Payment Mode</Label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </div>

          {loading ? (
            <button
              disabled
              className="w-full py-2 bg-[#008ECC] text-white rounded-md opacity-70 flex justify-center"
            >
              <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </button>
          ) : (
            <Button
              onClick={placeOrder}
              className="bg-[#008ECC] text-white w-full"
            >
              Place Order
            </Button>
          )}

          <Button
            onClick={clearCart}
            variant="ghost"
            className="w-full mt-3 border"
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
