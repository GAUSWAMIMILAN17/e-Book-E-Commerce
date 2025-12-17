import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye, Filter } from "lucide-react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { OrderStatusBadge } from "./Components/OrderStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

/* 🔹 Dummy Orders Data (UI only) */
const orders = [
  {
    id: "ORD001",
    userName: "Rahul Sharma",
    userEmail: "rahul@gmail.com",
    status: "pending",
    totalAmount: 899,
    createdAt: "2024-12-10",
    books: [{ quantity: 2 }, { quantity: 1 }],
  },
  {
    id: "ORD002",
    userName: "Amit Patel",
    userEmail: "amit@gmail.com",
    status: "delivered",
    totalAmount: 1299,
    createdAt: "2024-12-08",
    books: [{ quantity: 3 }],
  },
  {
    id: "ORD003",
    userName: "Sneha Joshi",
    userEmail: "sneha@gmail.com",
    status: "confirmed",
    totalAmount: 499,
    createdAt: "2024-12-05",
    books: [{ quantity: 1 }],
  },
];

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
        <Navbar />
    <div className="container max-w-7xl min-h-screen mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Orders</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="rounded-lg border bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>

                  <TableCell>
                    <p className="font-medium">{order.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.userEmail}
                    </p>
                  </TableCell>

                  <TableCell>
                    {order.books.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    item(s)
                  </TableCell>

                  <TableCell className="font-semibold">
                    ₹{order.totalAmount}
                  </TableCell>

                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`${order.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No orders found</p>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default AdminOrders;
