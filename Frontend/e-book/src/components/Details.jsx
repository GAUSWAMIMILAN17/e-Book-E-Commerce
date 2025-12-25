// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { BOOK_API_ENDPOINT, ORDER_API_ENDPOINT } from "../utils/data";
// import { toast } from "sonner";
// import { setPlacedOrder } from "./redux/orderSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setSingleBook } from "./redux/bookSlice";
// import { setAddtoCart } from "./redux/cartSlice";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { setLoading } from "./redux/authSlice";

// const Details = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { singleBook } = useSelector((store) => store.books);
//   const { user, loading } = useSelector((store) => store.user);
//   const [qty, setQty] = useState(1);
//   const [paymentMode, setPaymentMode] = useState("cod");
//   const [open, setOpen] = useState(false);

//   const decrease = () => {
//     if (qty > 1) {
//       setQty(qty - 1);
//     }
//   };

//   const increase = () => {
//     setQty(qty + 1);
//   };

//   const handleAddToCart = () => {
//     if (!user) {
//       toast.success("plz login and try again");
//       return;
//     }
//     dispatch(
//       setAddtoCart({
//         _id: singleBook._id,
//         title: singleBook.title,
//         price: singleBook.price,
//         // image heare after cloudinary injact
//       })
//     );
//     toast.success("Added to Cart Successfully!");
//   };

//   const placeOrder = async () => {
//     try {
//       if (!user) {
//         toast.success("Plz Login and Try Again");
//         return;
//       }
//       if (!paymentMode) {
//         toast.success("Plz Payment Method Select");
//         return;
//       }

//       const orderData = {
//         books: [
//           {
//             book: singleBook._id,
//             quantity: qty,
//           },
//         ],
//         paymentMode: paymentMode,
//       };

//       const res = await axios.post(
//         `${ORDER_API_ENDPOINT}/placeOrder`,
//         orderData,
//         {
//           withCredentials: true,
//         }
//       );

//       console.log(res.data);
//       toast.success("Order placed Successfully");
//       setOpen(false);
//     } catch (error) {
//       console.log(error);
//       toast.success("Server Error");
//     }
//   };

//   useEffect(() => {
//     const Bookdetail = async () => {
//       try {
//         // console.log(id);
//         dispatch(setLoading(true));
//         const res = await axios.get(`${BOOK_API_ENDPOINT}/singleBook/${id}`, {
//           withCredentials: true,
//         });
//         // console.log(res.data.book);
//         if (res.data.success) {
//           dispatch(setSingleBook(res.data.book));
//           dispatch(setLoading(false));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     Bookdetail();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen">
//         <div className="flex justify-center">
//           {loading ? (
//             <div className="my-5 flex items-center justify-center">
//               <div className="h-12 w-12 border-4 my-20 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <div className="max-w-5xl mx-auto p-10">
//               <h1 className="text-xl font-semibold">
//                 Book Name : {singleBook?.title}
//               </h1>
//               <div className="bg-[#f5f5f5] rounded-xl w-fit my-5 overflow-hidden">
//                 <img
//                   src={singleBook?.coverImage}
//                   className="object-cover h-48 transform transition duration-300 ease-in-out hover:scale-110"
//                 />
//               </div>
//               <div className="my-5">
//                 <h2>
//                   Author: <span>{singleBook?.author}</span>
//                 </h2>
//                 <p>
//                   Discription : <span>{singleBook?.description}</span>
//                 </p>
//                 <p>
//                   Category : <span>{singleBook?.category}</span>
//                 </p>
//                 <p>
//                   Pages : <span>{singleBook?.pages}</span>
//                 </p>
//                 <p>
//                   Price: <span>{singleBook?.price}</span>
//                 </p>
//                 <p>
//                   Language : <span>{singleBook?.language}</span>
//                 </p>
//                 <p>
//                   PublishedYear: <span>{singleBook?.publishedYear}</span>
//                 </p>
//               </div>

//               <div className="flex gap-3 my-3">
//                 <Button className="bg-[#008ECC] text-white" variant="primery">
//                   <Popover open={open} onOpenChange={setOpen}>
//                     <PopoverTrigger asChild>
//                       <Button variant="Primery">Buy</Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-80 bg-black p-3 rounded-2xl m-3">
//                       <div className="grid gap-4">
//                         <div className="space-y-2">
//                           <h4 className="leading-none font-medium">
//                             Place Order
//                           </h4>
//                           <p className="text-muted-foreground text-sm">
//                             Select Payment Mode
//                           </p>
//                         </div>
//                         <div className="grid gap-2">
//                           <div className=" items-center gap-4">
//                             <div className="flex items-center my-3 gap-3">
//                               <button
//                                 onClick={decrease}
//                                 className="px-3 py-1 bg-gray-300 text-black rounded-lg text-xl"
//                               >
//                                 −
//                               </button>

//                               <span className="text-lg font-semibold w-6 text-center">
//                                 {qty}
//                               </span>

//                               <button
//                                 onClick={increase}
//                                 className="px-3 py-1 bg-gray-300 text-black rounded-lg text-xl"
//                               >
//                                 +
//                               </button>
//                             </div>
//                             <div>
//                               <Label htmlFor="width" className="mb-3">
//                                 Payment Mode
//                               </Label>
//                               <select
//                                 id="payment"
//                                 value={paymentMode}
//                                 onChange={(e) => setPaymentMode(e.target.value)}
//                                 className="w-full rounded-md border px-3 py-2"
//                               >
//                                 <optgroup
//                                   className="bg-black"
//                                   label="Payment Options"
//                                 >
//                                   <option value="cod">COD</option>
//                                   <option value="online">Online</option>
//                                 </optgroup>
//                               </select>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <Button
//                         onClick={placeOrder}
//                         className="mt-4 bg-[#008ECC]"
//                         variant="primery"
//                       >
//                         Place Order
//                       </Button>
//                     </PopoverContent>
//                   </Popover>
//                 </Button>
//                 <Button
//                   onClick={handleAddToCart}
//                   className="bg-[#008ECC] text-white"
//                   variant="primery"
//                 >
//                   Add Cart
//                 </Button>
//                 <Link to={"/books"}>
//                   <Button className="bg-black text-white" variant="primery">
//                     Back
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Details;


// ------------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BOOK_API_ENDPOINT, ORDER_API_ENDPOINT } from "../utils/data";
import { toast } from "sonner";
import { setPlacedOrder } from "./redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSingleBook } from "./redux/bookSlice";
import { setAddtoCart } from "./redux/cartSlice";
import { setLoading } from "./redux/authSlice";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  ShoppingCart,
  ArrowLeft,
  Calendar,
  Globe,
  BookOpen,
  User,
  Tag,
  FileText,
  Star,
  Minus,
  Plus,
  CreditCard,
  Truck,
  Shield,
  Heart,
  Share2,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleBook } = useSelector((store) => store.books);
  const { user, loading } = useSelector((store) => store.user);
  const [qty, setQty] = useState(1);
  const [paymentMode, setPaymentMode] = useState("cod");
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const decrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const increase = () => {
    setQty(qty + 1);
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    dispatch(
      setAddtoCart({
        _id: singleBook._id,
        title: singleBook.title,
        price: singleBook.price,
        coverImage: singleBook.coverImage
      })
    );
    toast.success("Added to Cart Successfully!");
  };

  const placeOrder = async () => {
    try {
      if (!user) {
        toast.error("Please Login and Try Again");
        return;
      }
      if (!paymentMode) {
        toast.error("Please Select Payment Method");
        return;
      }

      const orderData = {
        books: [
          {
            book: singleBook._id,
            quantity: qty,
          },
        ],
        paymentMode: paymentMode,
      };

      const res = await axios.post(
        `${ORDER_API_ENDPOINT}/placeOrder`,
        orderData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      toast.success("Order placed Successfully");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    const Bookdetail = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/singleBook/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleBook(res.data.book));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    };
    Bookdetail();
  }, [id, dispatch]);

  // Calculate discount
  const discountPercentage = singleBook?.oldPrice 
    ? Math.round(((singleBook.oldPrice - singleBook.price) / singleBook.oldPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Breadcrumb */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link to="/books" className="hover:text-primary transition-colors">Books</Link>
                <span>/</span>
                <span className="text-foreground font-medium">{singleBook?.title}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10 mt-5">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Left Column - Image Gallery */}
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                      <img
                        src={singleBook?.coverImage}
                        alt={singleBook?.title}
                        className="w-full h-[500px] object-contain rounded-lg"
                      />
                      {discountPercentage > 0 && (
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {discountPercentage}% OFF
                        </Badge>
                      )}
                      {/* Wishlist Button */}
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">Free Delivery</p>
                  </Card>
                  <Card className="text-center p-4">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">Secure Payment</p>
                  </Card>
                  <Card className="text-center p-4">
                    <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">Quality Assured</p>
                  </Card>
                </div>
              </div>

              {/* Right Column - Book Details */}
              <div className="space-y-6">
                {/* Title and Rating */}
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {singleBook?.title}
                  </h1>
                </div>

                {/* Price Section */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-bold text-primary">
                        ₹{singleBook?.price}
                      </span>
                      {singleBook?.oldPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          ₹{singleBook?.oldPrice}
                        </span>
                      )}
                      {discountPercentage > 0 && (
                        <Badge variant="destructive">Save {discountPercentage}%</Badge>
                      )}
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      Inclusive of all taxes
                    </p>
                  </CardContent>
                </Card>

                {/* Book Information */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Book Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Author</p>
                          <p className="font-medium">{singleBook?.author}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Category</p>
                          <p className="font-medium">{singleBook?.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Language</p>
                          <p className="font-medium">{singleBook?.language}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Pages</p>
                          <p className="font-medium">{singleBook?.pages}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Published</p>
                          <p className="font-medium">{singleBook?.publishedYear}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Posted Date</p>
                          <p className="font-medium">{new Date(singleBook?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}</p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {singleBook?.description || "No description available for this book."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setOpen(true)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      Buy Now
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      variant="outline"
                      size="lg"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                  
                  <Link to="/books" className="block">
                    <Button variant="ghost" className="w-full" size="lg">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Buy Now Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Complete Your Order</DialogTitle>
                <DialogDescription>
                  Select quantity and payment method for your order
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {/* Order Summary */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={singleBook?.coverImage}
                        alt={singleBook?.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{singleBook?.title}</h4>
                        <p className="text-sm text-muted-foreground">{singleBook?.author}</p>
                        <p className="font-semibold text-primary">₹{singleBook?.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quantity Selector */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={decrease}
                      size="icon"
                      variant="outline"
                      className="h-10 w-10 rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-12 text-center">
                      {qty}
                    </span>
                    <Button
                      onClick={increase}
                      size="icon"
                      variant="outline"
                      className="h-10 w-10 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Payment Method
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMode === 'cod' 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMode('cod')}
                    >
                      <CardContent className="p-4 text-center">
                        <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Cash on Delivery</p>
                      </CardContent>
                    </Card>
                    
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMode === 'online' 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMode('online')}
                    >
                      <CardContent className="p-4 text-center">
                        <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Online Payment</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Total Amount */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{(singleBook?.price * qty).toFixed(2)}
                  </span>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={placeOrder}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Place Order
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Details;