// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Badge } from "./ui/badge";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { Button } from "./ui/button";
// import { setAllBooks, setFilterBooks } from "./redux/bookSlice";
// import axios from "axios";
// import { BOOK_API_ENDPOINT } from "../utils/data";
// import { setLoading } from "./redux/authSlice";
// import Bookcard from "./Bookcard.jsx";

// const Category = [
//   "All",
//   "Web Development",
//   "Ethics",
//   "Story",
//   "Games",
//   "Ghost",
//   "Growth",
// ];

// const Categories = () => {
//   const { filterBooks, allBooks } = useSelector((store) => store.books);
//   const dispatch = useDispatch();
//   const { loading } = useSelector((store) => (store) => store.user);

//   const filterHandler = (query) => {
//     // console.log("clicked")
//     dispatch(setLoading(true))
//     dispatch(setFilterBooks(query));
//     dispatch(setLoading(false))
//   };

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         dispatch(setLoading(true));
//         const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
//           withCredentials: true,
//         });
//         // console.log(res.data)

//         if (res.data.success) {
//           dispatch(setAllBooks(res.data.books));
//           dispatch(setFilterBooks("All"));
//           dispatch(setLoading(false));
//         } else {
//           console.log("failed to fetch books");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchBooks();
//   }, [dispatch]);

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen max-w-7xl mx-auto my-5">
//         <div>
//           <h1 className="text-3xl font-semibold">Browse Categories</h1>
//           <p className="text-[#666]">Explore books by your favorite topics</p>
//           <div className="my-4">
//             {Category.map((category, index) => {
//               return (
//                 <Button
//                   className="bg-[#008ECC] text-white cursor-pointer mx-2"
//                   variant="primery"
//                   onClick={() => filterHandler(category)}
//                 >
//                   {category}
//                 </Button>
//               );
//             })}
//           </div>
//         </div>
//         <div>
//           {loading ? (
//             <div className="my-5 flex items-center justify-center">
//               <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-20">
//               {filterBooks.map((book) => (
//                 <Bookcard
//                   key={book._id}
//                   id={book._id}
//                   coverImage={book.coverImage}
//                   title={book.title}
//                   price={book.price}
//                   oldPrice={book.oldPrice}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Categories;

// ----------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Badge } from "./ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setAllBooks, setFilterBooks } from "./redux/bookSlice";
import axios from "axios";
import { BOOK_API_ENDPOINT } from "../utils/data";
import { setLoading } from "./redux/authSlice";
import Bookcard from "./Bookcard.jsx";
import { Card } from "./ui/card";
import { 
  BookOpen, 
  Code, 
  Heart, 
  Gamepad2, 
  Ghost, 
  TrendingUp,
  Sparkles,
  Filter,
  Library
} from "lucide-react";

// Your original categories with icons and colors
const Category = [
  { name: "All", icon: Library, color: "from-purple-500 to-pink-500" },
  { name: "Web Development", icon: Code, color: "from-blue-500 to-cyan-500" },
  { name: "Ethics", icon: Heart, color: "from-red-500 to-pink-500" },
  { name: "Story", icon: BookOpen, color: "from-yellow-500 to-orange-500" },
  { name: "Games", icon: Gamepad2, color: "from-green-500 to-emerald-500" },
  { name: "Ghost", icon: Ghost, color: "from-indigo-500 to-purple-500" },
  { name: "Growth", icon: TrendingUp, color: "from-teal-500 to-cyan-500" },
];

const Categories = () => {
  const { filterBooks, allBooks } = useSelector((store) => store.books);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookCount, setBookCount] = useState(0);

  const filterHandler = (categoryName) => {
    setActiveCategory(categoryName);
    dispatch(setLoading(true));
    dispatch(setFilterBooks(categoryName));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllBooks(res.data.books));
          dispatch(setFilterBooks("All"));
          setBookCount(res.data.books.length);
          dispatch(setLoading(false));
        } else {
          console.log("failed to fetch books");
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    };
    fetchBooks();
  }, [dispatch]);

  useEffect(() => {
    setBookCount(filterBooks.length);
  }, [filterBooks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
              <Filter className="h-4 w-4" />
              Browse by Category
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Explore Our <span className="text-primary">Book Collection</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover your next great read from our carefully curated selection
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  {bookCount} Books Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  {Category.length} Categories
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto mb-15 px-4 py-8">
        {/* Category Filter Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Categories</h2>
              <p className="text-muted-foreground">
                Select a category to filter books
              </p>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {activeCategory}
            </Badge>
          </div>

          {/* Category Buttons Grid - Desktop */}
          <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Category.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;
              
              return (
                <Card
                  key={index}
                  onClick={() => filterHandler(category.name)}
                  className={`
                    relative overflow-hidden cursor-pointer transition-all duration-300 
                    hover:shadow-lg hover:-translate-y-1
                    ${isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:ring-1 hover:ring-primary/50'}
                  `}
                >
                  <div className={`
                    absolute inset-0 opacity-10 bg-gradient-to-br ${category.color}
                    ${isActive ? 'opacity-20' : ''}
                  `} />
                  
                  <div className="relative p-4 text-center space-y-2">
                    <div className={`
                      mx-auto w-12 h-12 rounded-full flex items-center justify-center
                      bg-gradient-to-br ${category.color} shadow-lg
                      ${isActive ? 'scale-110' : ''}
                      transition-transform duration-300
                    `}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className={`
                      text-xs font-medium
                      ${isActive ? 'text-primary' : 'text-foreground'}
                    `}>
                      {category.name}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Category Buttons - Mobile Friendly Pills */}
          <div className="md:hidden flex flex-wrap gap-2">
            {Category.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;
              
              return (
                <Button
                  key={index}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`
                    gap-2
                    ${isActive ? 'bg-primary' : ''}
                  `}
                  onClick={() => filterHandler(category.name)}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              {activeCategory === "All" ? "All Books" : `${activeCategory} Books`}
            </h3>
            <p className="text-sm text-muted-foreground">
              Showing {bookCount} {bookCount === 1 ? 'book' : 'books'}
            </p>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="space-y-4 text-center">
                <div className="h-12 w-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground">Loading books...</p>
              </div>
            </div>
          ) : filterBooks.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                No books available in this category at the moment.
              </p>
              <Button
                variant="outline"
                onClick={() => filterHandler("All")}
              >
                View All Books
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterBooks.map((book) => (
                <Bookcard
                  key={book._id}
                  id={book._id}
                  coverImage={book.coverImage}
                  title={book.title}
                  price={book.price}
                  oldPrice={book.oldPrice}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Categories;