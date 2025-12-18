import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Delete, Edit, Trash2 } from "lucide-react";
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
import { toast } from "sonner";
import axios from "axios";
import { BOOK_API_ENDPOINT } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setAdminSingleBook } from "../Components/redux/bookSlice";
import { setLoading } from "../Components/redux/authSlice";

const AdminBookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminSingleBook } = useSelector((store) => store.books);
  const { loading } = useSelector((store) => store.user);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: adminSingleBook?.title || "",
    author: adminSingleBook?.author || "",
    price: adminSingleBook?.price || 0,
    description: adminSingleBook?.description || "",
    category: adminSingleBook?.category || "",
    coverImage: adminSingleBook?.coverImage || "",
  });

  useEffect(() => {
    // console.log("useEffect called, id =", id);
    const fetchBook = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/singleBook/${id}`, {
          withCredentials: true,
        });
        console.log(res.data.book);

        if (res.data.success) {
          // console.log(res.data.book)
          dispatch(setAdminSingleBook(res.data.book));
          dispatch(setLoading(false));
        } else {
          dispatch(setAdminSingleBook(null));
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(setLoading(false));

        if (error.response?.status === 404) {
          // 🔥 This is what you want
          dispatch(setAdminSingleBook(null));
        } else {
          toast.error("Something went wrong");
        }
      }
    };
    fetchBook();
  }, [id, dispatch]);

  useEffect(() => {
    if (adminSingleBook) {
      setEditForm({
        title: adminSingleBook.title || "",
        author: adminSingleBook.author || "",
        price: adminSingleBook.price || 0,
        description: adminSingleBook.description || "",
        category: adminSingleBook.category || "",
        coverImage: adminSingleBook.coverImage || "",
      });
    }
  }, [adminSingleBook]);

  /* UI only handlers */
  const handleDelete = async () => {
    try {
      dispatch(setLoading(true));

      const res = await axios.delete(`${BOOK_API_ENDPOINT}/deleteBook/${id}`, {
        withCredentials: true   //token send kre se coockie mathi aana vagar unauthiticat ditect krse
      });
      console.log("Delete book:", adminSingleBook._id);
      if (res.data.success) {
        toast.success("Book Delete Successfully");
      }
      navigate("/admin/books");
    } catch (error) {
      console.log(error);
      toast.success("Error Occur");
      dispatch(setLoading(false))
    }
  };

  const handleEdit = async(e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true))
    // console.log("Updated book data:", editForm);
    const res = await axios.post(`${BOOK_API_ENDPOINT}/updateBook/${id}`,editForm , {
      withCredentials: true
    })
    if(res.data.success){
      toast.success("Book Update Successfully")
      dispatch(setAdminSingleBook(res.data.book))
      dispatch(setLoading(false))
    }
    setIsEditOpen(false);
    } catch (error) {
      console.log(error)
      toast.success("Error Occure")
      dispatch(setLoading(false))
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mb-5">
        {loading ? (
          <div className="my-5 min-h-screen flex items-center justify-center">
            <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
          </div>
        ) : adminSingleBook ? (
          <div>
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
                    src="data:image/jpeg;base64,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"
                    alt={adminSingleBook.title}
                    className=" w-full h-[50%] object-contain"
                  />
                </div>

                {/* Book Details */}
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      {adminSingleBook.category}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {adminSingleBook.title}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      by {adminSingleBook.author}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-blue-600">
                      ₹{adminSingleBook.price}
                    </span>
                    {/* <Badge variant={book.stock > 10 ? "default" : "destructive"}>
                  {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                </Badge> */}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {adminSingleBook.description}
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Added on{" "}
                    {new Date(adminSingleBook.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
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
                            Are you sure you want to delete "
                            {adminSingleBook.title}
                            "? This action cannot be undone.
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
        ) : (
          <div className="container min-h-screen mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Book not found</h1>
            <Button asChild>
              <Link to="/admin/books">Back to Books</Link>
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminBookDetail;
