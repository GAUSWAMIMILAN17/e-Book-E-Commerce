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
    pages: adminSingleBook?.pages || 0,
    language: adminSingleBook?.language || "",
    publishedYear: adminSingleBook?.publishedYear || 0,
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
        pages: adminSingleBook?.pages || 0,
        language: adminSingleBook?.language || "",
        publishedYear: adminSingleBook?.publishedYear || 0,
      });
    }
  }, [adminSingleBook]);

  /* UI only handlers */
  const handleDelete = async () => {
    try {
      dispatch(setLoading(true));

      const res = await axios.delete(`${BOOK_API_ENDPOINT}/deleteBook/${id}`, {
        withCredentials: true, //token send kre se coockie mathi aana vagar unauthiticat ditect krse
      });
      console.log("Delete book:", adminSingleBook._id);
      if (res.data.success) {
        toast.success("Book Delete Successfully");
      }
      navigate("/admin/books");
    } catch (error) {
      console.log(error);
      toast.success("Error Occur");
      dispatch(setLoading(false));
    }
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true));
      // console.log("Updated book data:", editForm);

      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("author", editForm.author);
      formData.append("description", editForm.description);
      formData.append("category", editForm.category);
      formData.append("pages", editForm.pages);
      formData.append("price", editForm.price);
      formData.append("language", editForm.language);
      formData.append("publishedYear", editForm.publishedYear);
      formData.append("coverImage", editForm.coverImage); // 👈 IMPORTANT

      const res = await axios.post(
        `${BOOK_API_ENDPOINT}/updateBook/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Book Update Successfully");
        dispatch(setAdminSingleBook(res.data.book));
        dispatch(setLoading(false));
      }
      setIsEditOpen(false);
    } catch (error) {
      console.log(error);
      toast.success("Error Occure");
      dispatch(setLoading(false));
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
                    src={adminSingleBook.coverImage}
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
                              <Label>Pages</Label>
                              <Input
                                type="number"
                                value={editForm.pages}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    pages: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Language</Label>
                              <Input
                                type="string"
                                name="language"
                                value={editForm.language}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    language: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>publishedYear</Label>
                              <Input
                                type="string"
                                value={editForm.publishedYear}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    publishedYear: Number(e.target.value),
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

                          {/* Cover Image */}
                          <div className="space-y-2">
                            <Label>Cover Image</Label>
                            <Input
                              type="file"
                              name="coverImage"
                              accept="image/*"
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  coverImage: e.target.files[0],
                                })
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              Image file upload (jpg, png, jpeg)
                            </p>
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
