import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import AdminBookCard from "./AdminBookCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../components/redux/authSlice";
import axios from "axios";
import { BOOK_API_ENDPOINT } from "../utils/data";
import {
  setAllAdminBooks,
  setFilterAdminBooks,

} from "../components/redux/bookSlice";
import { toast } from "sonner";

const Category = [
  "All",
  "Web Development",
  "Ethics",
  "Story",
  "Games",
  "Ghost",
  "Growth",
];

const AdminBooks = () => {
  // Main Connect to the Backend Bellow All

  const [category, setCategory] = useState("All");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const { allAdminBooks, filterAdminBooks } = useSelector((store) => store.books);
  // console.log(allAdminBooks)

  const handleFilterBooks = (query) => {
    setCategory(query);
    dispatch(setFilterAdminBooks(query));
  };

  useEffect(() => {
    const fetchAdminBooks = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setAllAdminBooks(res.data.books));
          dispatch(setFilterAdminBooks("All"));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        toast.success("Server Error");
        dispatch(setLoading(false));
      }
    };
    fetchAdminBooks();
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 mb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Books</h1>
            <p className="text-muted-foreground mt-1">
              Manage your book collection
            </p>
          </div>

          <Button asChild className="gap-2">
            <Link to="/admin/books/add">
              <Plus className="h-5 w-5" />
              Add New Book
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books by title or author..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={category} onValueChange={handleFilterBooks}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {Category.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "All" ? "All" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Books Grid */}
        {filterAdminBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterAdminBooks?.map((book) => (
              <AdminBookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No books found</p>
            <Button asChild variant="link" className="mt-2">
              <Link to="/admin/books/add">Add your first book</Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminBooks;
