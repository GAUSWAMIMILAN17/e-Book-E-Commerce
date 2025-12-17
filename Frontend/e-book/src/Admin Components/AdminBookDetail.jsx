import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Badge } from "../Components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../Components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialog";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Textarea } from "../Components/ui/textarea";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

/* 🔹 Dummy Books Data (UI only) */
const books = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    description:
      "Atomic Habits explains how small changes can lead to remarkable results.",
    category: "Self Help",
    stock: 12,
    coverImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    price: 399,
    description:
      "Deep Work teaches how to focus without distraction in a noisy world.",
    category: "Productivity",
    stock: 5,
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    createdAt: "2024-11-20",
  },
];

const AdminBookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    price: book?.price || 0,
    description: book?.description || "",
    category: book?.category || "",
    stock: book?.stock || 0,
    coverImage: book?.coverImage || "",
  });

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Button asChild>
          <Link to="/admin/books">Back to Books</Link>
        </Button>
      </div>
    );
  }

  /* UI only handlers */
  const handleDelete = () => {
    console.log("Delete book:", book.id);
    navigate("/books");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("Updated book data:", editForm);
    setIsEditOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mb-5">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6 gap-2">
            <Link to="/admin/books">
              <ArrowLeft className="h-4 w-4" />
              Back to Books
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Book Cover */}
            <div>
              
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className=" w-full h-[50%] object-contain"
                />
           
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {book.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  by {book.author}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  ₹{book.price}
                </span>
                <Badge variant={book.stock > 10 ? "default" : "destructive"}>
                  {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                </Badge>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                Added on{" "}
                {new Date(book.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Book</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Author</Label>
                        <Input
                          value={editForm.author}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              author: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Price</Label>
                          <Input
                            type="number"
                            value={editForm.price}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                price: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            value={editForm.stock}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                stock: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Cover Image URL</Label>
                        <Input
                          value={editForm.coverImage}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              coverImage: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          rows={4}
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete Book
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Book</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{book.title}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminBookDetail;
