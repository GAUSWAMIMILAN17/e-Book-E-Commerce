import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { Link, useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ORDER_API_ENDPOINT } from "../utils/data";
import { setSingleOrder } from "./redux/orderSlice";
import OrderBookCard from "./OrderbookCard";
import { setLoading } from "./redux/authSlice";
import { OrderStatusBadge } from "../Admin Components/Components/OrderStatusBadge";

const ViewOrders = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const { singleOrder } = useSelector((store) => store.orders);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${ORDER_API_ENDPOINT}/myOrders/${id}`, {
          withCredentials: true,
        });
        console.log(res.data.order);

        if (res.data.success) {
          dispatch(setSingleOrder(res.data.order));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <div className="">
          {loading ? (
            <div className="my-5 flex items-center justify-center">
              <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 py-10">

  {/* Order Header */}
  <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
    <h1 className="text-2xl font-semibold flex items-center gap-3">
      Order Status
      
      <OrderStatusBadge status={singleOrder?.orderStatus} />
    </h1>
  </div>

  {/* Order Items */}
  <div className="bg-gray-50 rounded-xl p-6 mb-8">
    <h2 className="text-xl font-semibold mb-5">Ordered Books</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {singleOrder?.books?.map((item, index) => (
        <div key={index} className="flex flex-col">
          <img
            src="https://dummyimage.com/300x200/eeeeee/000000&text=Book+Cover"
            className="rounded-t-xl h-44 object-cover"
            alt="book"
          />
          <OrderBookCard item={item} />
        </div>
      ))}
    </div>
  </div>

  {/* Order Summary */}
  <div className="grid md:grid-cols-2 gap-6">

    {/* Customer Info */}
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Customer Details</h3>

      <div className="text-sm text-gray-700 space-y-2">
        <p><span className="font-medium">Address:</span> {singleOrder?.user?.profile?.address}</p>
        <p><span className="font-medium">Phone:</span> {singleOrder?.user?.phonenumber}</p>
        <p><span className="font-medium">Email:</span> {singleOrder?.user?.email}</p>
      </div>
    </div>

    {/* Payment Info */}
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>

      <div className="text-sm space-y-3">
        <p>
          Payment Mode:{" "}
          <Badge variant="outline">{singleOrder?.paymentMode}</Badge>
        </p>
        <p>
          Payment Status:{" "}
          <Badge className="bg-green-100 text-green-700">
            {singleOrder?.paymentStatus}
          </Badge>
        </p>

        <div className="pt-3 border-t flex justify-between font-semibold text-lg">
          <span>Total Amount</span>
          <span className="text-[#008ECC]">₹{singleOrder?.totalAmount}</span>
        </div>
      </div>
    </div>
  </div>

  {/* Back Button */}
  <div className="mt-8">
    <Link to="/myOrders">
      <Button className="bg-[#008ECC] text-white px-6">
        Back to Orders
      </Button>
    </Link>
  </div>

</div>

          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewOrders;
