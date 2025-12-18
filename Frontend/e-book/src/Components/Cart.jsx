// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Cartcard from "./Cartcard";
// import { Button } from "./ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { setClearCart } from "./redux/cartSlice";
// import { toast } from "sonner";
// import { Label } from "./ui/label";
// import { ORDER_API_ENDPOINT } from "../utils/data";
// import axios from "axios";
// import { setLoading } from "./redux/authSlice";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { items } = useSelector((store) => store.cart);
//   const { user, loading } = useSelector((store) => store.user);
//   const [paymentMode, setPaymentMode] = useState("cod");

//   const clearCart = () => {
//     if (!user) {
//       toast.success("Please login and try again");
//       return;
//     }
//     dispatch(setClearCart());
//     toast.success("Cart cleared successfully!");
//   };

//   const totalAmount = items.reduce(
//     (sum, item) => sum + item.price * item.qauntity,
//     0
//   );

//   const placeOrder = async () => {
//     try {
//       dispatch(setLoading(true));

//       if (!user) {
//         toast.success("Please login and try again");
//         dispatch(setLoading(false));
//         return;
//       }

//       if (items.length === 0) {
//         toast.error("Cart is empty");
//         dispatch(setLoading(false));
//         return;
//       }

//       const orderData = {
//         books: items.map((item) => ({
//           book: item._id,
//           quantity: item.qauntity,
//         })),
//         paymentMode,
//       };

//       await axios.post(`${ORDER_API_ENDPOINT}/placeOrder`, orderData, {
//         withCredentials: true,
//       });

//       toast.success("Order placed successfully");
//       dispatch(setClearCart());
//       dispatch(setLoading(false));
//     } catch (error) {
//       console.log(error);
//       toast.error("Server error");
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       {/* MAIN GRID */}
//       <div className="max-w-7xl mx-auto my-6 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">

//         {/* LEFT : CART ITEMS */}
//         <div className="lg:col-span-2 min-h-screen">
//           <div className="mb-5">
//             <h1 className="text-3xl font-bold">Shopping Cart</h1>
//             <p className="text-gray-500">
//               {items.length} items currently in your cart
//             </p>
//           </div>

//           {items.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty</p>
//           ) : (
//             <div className="flex flex-wrap gap-4">
//               {items.map((item) => (
//                 <Cartcard key={item._id} item={item} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* RIGHT : ORDER SUMMARY */}
//         <div className="lg:col-span-1 border rounded-xl p-6 h-fit sticky top-24 bg-white shadow-sm">
//           <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//           <hr className="mb-4" />

//           <div className="mb-4">
//             <p className="text-gray-600 mb-1">
//               Subtotal ({items.length} items)
//             </p>
//             <p className="text-2xl font-bold">₹{totalAmount}</p>
//           </div>

//           <div className="mb-4">
//             <Label className="mb-2 block">Payment Mode</Label>
//             <select
//               value={paymentMode}
//               onChange={(e) => setPaymentMode(e.target.value)}
//               className="w-full rounded-md border px-3 py-2"
//             >
//               <option value="cod">Cash on Delivery</option>
//               <option value="online">Online Payment</option>
//             </select>
//           </div>

//           {loading ? (
//             <button
//               disabled
//               className="w-full py-2 bg-[#008ECC] text-white rounded-md opacity-70 flex justify-center"
//             >
//               <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//             </button>
//           ) : (
//             <Button
//               onClick={placeOrder}
//               className="bg-[#008ECC] text-white w-full"
//             >
//               Place Order
//             </Button>
//           )}

//           <Button
//             onClick={clearCart}
//             variant="ghost"
//             className="w-full mt-3 border"
//           >
//             Clear Cart
//           </Button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Cart;



// ---------------------------------------------------------------------------------------------------------------

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cartcard from "./Cartcard";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { setClearCart } from "./redux/cartSlice";
import { toast } from "sonner";
import { ORDER_API_ENDPOINT } from "../utils/data";
import axios from "axios";
import { setLoading } from "./redux/authSlice";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  CreditCard,
  Truck,
  ShoppingBag,
  CheckCircle2,
  Loader2,
  Package
} from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.cart);
  const { user, loading } = useSelector((store) => store.user);
  const [paymentMode, setPaymentMode] = useState("cod");

  const clearCart = () => {
    if (!user) {
      toast.error("Please login and try again");
      return;
    }
    if (items.length === 0) {
      toast.error("Cart is already empty");
      return;
    }
    dispatch(setClearCart());
    toast.success("Cart cleared successfully!");
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qauntity,
    0
  );

  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const totalAmount = subtotal + deliveryCharge;

  const placeOrder = async () => {
    try {
      dispatch(setLoading(true));

      if (!user) {
        toast.error("Please login and try again");
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primary" />
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-1">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <div className="flex gap-3">
            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={clearCart}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </Button>
            )}
            <Link to="/books">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          // Empty Cart State
          <Card className="p-12">
            <div className="text-center space-y-6">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground">
                  Looks like you haven't added anything to your cart yet
                </p>
              </div>
              <Link to="/books">
                <Button size="lg" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Cart Items List */}
              {items.map((item) => (
                <Cartcard key={item._id} item={item} />
              ))}

              {/* Delivery Info */}
              {subtotal < 500 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <p className="text-sm text-blue-900">
                      Add <span className="font-semibold">₹{(500 - subtotal).toFixed(2)}</span> more for free delivery!
                    </p>
                  </CardContent>
                </Card>
              )}

              {subtotal >= 500 && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="text-sm text-green-900 font-medium">
                      Congratulations! You got free delivery
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Order Summary Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Subtotal ({items.length} items)
                        </span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Charges</span>
                        <span className={`font-medium ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
                          {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentMode === 'cod'
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMode('cod')}
                      >
                        <CardContent className="p-4 text-center">
                          <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm font-medium">Cash on Delivery</p>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentMode === 'online'
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMode('online')}
                      >
                        <CardContent className="p-4 text-center">
                          <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm font-medium">Online Payment</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Place Order Button */}
                <Button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full h-12 text-base gap-2"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Place Order
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;