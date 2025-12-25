import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { OrderStatusBadge } from "./components/OrderStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../components/redux/authSlice";
import { ORDER_API_ENDPOINT } from "../utils/data";
import {
  setAdminOrdersFilter,
  setAllAdminGetAllOrders,
} from "../components/redux/orderSlice";
import axios from "axios";



const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const dispatch = useDispatch();
  const { allAdminGetAllOrders, adminOrdersFilter } = useSelector((store) => store.orders);
  const { loading } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${ORDER_API_ENDPOINT}/getAllOrders`, {
          withCredentials: true,
        });
        // console.log(res.data.orders);
        if (res.data.success) {
          dispatch(setAllAdminGetAllOrders(res.data.orders));
          dispatch(setAdminOrdersFilter("All Status"));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        toast.success("Error Ocures");
        dispatch(setLoading(false));
      }
    };
    fetchOrders();
  }, []);

  const filterHandler = (status) => {
    // console.log(status)
    setStatusFilter(status);
    dispatch(setAdminOrdersFilter(status));
  };

  // const filteredOrders = adminOrdersFilter.filter((order) => {
  //   const matchesSearch =
  //     order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order.user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order.user.email.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesStatus =
  //     statusFilter === "all" || order.status === statusFilter;

  //   return matchesSearch && matchesStatus;
  // });

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
          {/* <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div> */}

          <Select value={statusFilter} onValueChange={filterHandler}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />

              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        {adminOrdersFilter.length > 0 ? (
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
                {adminOrdersFilter?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order._id}</TableCell>

                    <TableCell>
                      <p className="font-medium">{order.user.fullname}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.user.email}
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
                      <OrderStatusBadge status={order.orderStatus} />
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
                        <Link to={`${order._id}`}>
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
