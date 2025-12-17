import React, { useEffect } from "react";
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

const Category = [
  "All",
  "Web Development",
  "Ethics",
  "Story",
  "Games",
  "Ghost",
  "Growth",
];

const Categories = () => {
  const { filterBooks, allBooks } = useSelector((store) => store.books);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => (store) => store.user);

  const filterHandler = (query) => {
    // console.log("clicked")
    dispatch(setLoading(true))
    dispatch(setFilterBooks(query));
    dispatch(setLoading(false))
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
          withCredentials: true,
        });
        // console.log(res.data)

        if (res.data.success) {
          dispatch(setAllBooks(res.data.books));
          dispatch(setFilterBooks("All"));
          dispatch(setLoading(false));
        } else {
          console.log("failed to fetch books");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen max-w-7xl mx-auto my-5">
        <div>
          <h1 className="text-3xl font-semibold">Browse Categories</h1>
          <p className="text-[#666]">Explore books by your favorite topics</p>
          <div className="my-4">
            {Category.map((category, index) => {
              return (
                <Button
                  className="bg-[#008ECC] text-white cursor-pointer mx-2"
                  variant="primery"
                  onClick={() => filterHandler(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
        <div>
          {loading ? (
            <div className="my-5 flex items-center justify-center">
              <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-6">
              {filterBooks.slice(0, 6).map((book) => (
                <Bookcard
                  key={book._id}
                  id={book._id}
                  // image={book.image}
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
