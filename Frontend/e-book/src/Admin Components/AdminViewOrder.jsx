import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, User, MapPin, Calendar } from "lucide-react";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { OrderStatusBadge } from "./Components/OrderStatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import { Separator } from "../Components/ui/separator";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Components/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { ORDER_API_ENDPOINT } from "../utils/data";
import { setSingleAdminOrder } from "../Components/redux/orderSlice";

const AdminViewOrder = () => {
  const { id } = useParams();
  const { loading } = useSelector((store) => store.user);
  const { singleAdminOrder } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${ORDER_API_ENDPOINT}/getOneOrder/${id}`, {
          withCredentials: true,
        });
        console.log(res.data.order);
        if (res.data.success) {
          dispatch(setSingleAdminOrder(res.data.order));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        toast.success("Error Occure");
        dispatch(setLoading(false));
      }
    };
    fetchOrder();
  }, [id, dispatch]);
  useEffect(() => {
  if (singleAdminOrder?.orderStatus) {
    setStatus(singleAdminOrder.orderStatus);
  }
}, [singleAdminOrder]);


  const statusHandle = async (value) => {
    try {
      setStatus(value);

      const res = await axios.post(
        `${ORDER_API_ENDPOINT}/updateOrderStatus/${id}`,{ orderStatus: value },
        {
          withCredentials: true,
        }
      );

      if(res.data.success){
        toast.success("Status Update Successfully")
        dispatch(setSingleAdminOrder(res.data.order))
      }

    } catch (error) {
      console.log(error);
      toast.success("Error Ocures");
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="my-5 min-h-screen flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
        </div>
      ) : singleAdminOrder ? (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6 gap-2">
            <Link to="/admin/allorders">
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Link>
          </Button>

          {/* Order Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Order {singleAdminOrder._id}
              </h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(singleAdminOrder.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>

            <OrderStatusBadge status={singleAdminOrder.orderStatus} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="md:col-span-2 space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-blue-600" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">
                    {singleAdminOrder?.user?.fullname}
                  </p>
                  <p className="text-muted-foreground">
                    {singleAdminOrder.user.email}
                  </p>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {singleAdminOrder?.user?.profile?.address}
                  </p>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {singleAdminOrder.books.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.book.title}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{item.book.price}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{item.book.price * item.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-blue-600">
                      ₹{singleAdminOrder.totalAmount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              {/* Update Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Update Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select onValueChange={statusHandle} value={status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Status change UI only (backend not connected)
                  </p>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span>
                      {singleAdminOrder.books.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{singleAdminOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ₹{singleAdminOrder.totalAmount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="container min-h-screen mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button asChild>
            <Link to="/admin/allorders">Back to Orders</Link>
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminViewOrder;
