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

const AdminAddBook = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    coverImage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 For now just console log (UI only)
    console.log("Book Data:", form);

    // After submit redirect
    navigate("/books");
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
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label>Author *</Label>
              <Input
                placeholder="Enter author name"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
                required
              />
            </div>

            {/* Price / Stock / Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Price (₹) *</Label>
                <Input
                  type="number"
                  placeholder="299"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Input
                  placeholder="Technology"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={form.coverImage}
                onChange={(e) =>
                  setForm({ ...form, coverImage: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Optional field
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                placeholder="Enter book description..."
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Add Book
              </Button>

              <Button type="button" variant="outline" asChild>
                <Link to="/books">Cancel</Link>
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
