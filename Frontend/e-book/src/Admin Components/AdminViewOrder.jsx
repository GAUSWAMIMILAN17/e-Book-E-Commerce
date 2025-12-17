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

/* 🔹 Dummy Orders Data (UI only) */
const orders = [
  {
    id: "ORD001",
    userName: "Rahul Sharma",
    userEmail: "rahul@gmail.com",
    status: "pending",
    createdAt: "2024-12-10",
    shippingAddress: "221B Baker Street, Mumbai, India",
    totalAmount: 1299,
    books: [
      { bookTitle: "Atomic Habits", quantity: 1, price: 499 },
      { bookTitle: "Deep Work", quantity: 2, price: 400 },
    ],
  },
  {
    id: "ORD002",
    userName: "Amit Patel",
    userEmail: "amit@gmail.com",
    status: "delivered",
    createdAt: "2024-12-08",
    shippingAddress: "Satellite Road, Ahmedabad, India",
    totalAmount: 899,
    books: [{ bookTitle: "Rich Dad Poor Dad", quantity: 1, price: 899 }],
  },
];

const AdminViewOrder = () => {
  const { id } = useParams();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Button asChild>
          <Link to="/admin/allorders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
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
            Order {order.id}
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
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
              <p className="font-medium">{order.userName}</p>
              <p className="text-muted-foreground">{order.userEmail}</p>
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
                {order.shippingAddress}
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
                  {order.books.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.bookTitle}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{item.price}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{item.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-blue-600">
                  ₹{order.totalAmount}
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
              <Select defaultValue={order.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
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
                  {order.books.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  ₹{order.totalAmount}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AdminViewOrder;
