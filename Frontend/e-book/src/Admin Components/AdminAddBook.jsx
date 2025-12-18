import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Textarea } from "../Components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { BOOK_API_ENDPOINT } from "../utils/data";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Components/redux/authSlice";

const AdminAddBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    category: "",
    pages: "",
    language: "",
    publishedYear: "",
    // stock: "",
    coverImage: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
  setForm({ ...form, coverImage: e.target.files[0] });
};

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("pages", form.pages);
    formData.append("price", form.price);
    formData.append("language", form.language);
    formData.append("publishedYear", form.publishedYear);
    formData.append("coverImage", form.coverImage); // 👈 IMPORTANT

    const res = await axios.post(
      `${BOOK_API_ENDPOINT}/addNewBook`,
      formData,
      {
        
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success("Book Added Successfully");
      navigate("/admin/books");
    }
  }  catch (error) {
      console.log(error);
      toast.error(error.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6 gap-2">
          <Link to="/admin/books">
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Book</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label>Book Title *</Label>
                <Input
                  placeholder="Enter book title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label>Author *</Label>
                <Input
                  name="author"
                  placeholder="Enter author name"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price / Stock / Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Price (₹) *</Label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="299"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* <div className="space-y-2">
                <Label>Stock *</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                  required
                />
              </div> */}
                <div className="space-y-2">
                  <Label>Pages *</Label>
                  <Input
                    type="number"
                    name="pages"
                    placeholder="0"
                    value={form.pages}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Language *</Label>
                  <Input
                    type="string"
                    name="language"
                    placeholder="language"
                    value={form.language}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>publishedYear *</Label>
                  <Input
                    type="number"
                    name="publishedYear"
                    placeholder="2025"
                    value={form.publishedYear}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Input
                    placeholder="Technology"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <Input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={fileHandler
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Image file upload (jpg, png, jpeg)
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Enter book description..."
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                {loading ? (
                  <button
                    disabled
                    className="py-2 my-2 font-semibold text-white flex items-center justify-center w-full mx-auto bg-[#008ECC] opacity-70 cursor-not-allowed rounded-md"
                  >
                    <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </button>
                ) : (
                  <Button type="submit" className="flex-1">
                    Add Book
                  </Button>
                )}

                <Button type="button" variant="outline" asChild>
                  <Link to="/admin/books">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAddBook;
