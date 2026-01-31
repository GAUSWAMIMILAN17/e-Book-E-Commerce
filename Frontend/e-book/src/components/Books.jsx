import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bookcard from "./Bookcard";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import { BOOK_API_ENDPOINT } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setAllBooks } from "./redux/bookSlice";
import { setLoading } from "./redux/authSlice";

const Books = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const { allBooks } = useSelector((store) => store.books);

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
      <div className="min-h-screen max-w-7xl mx-5 md:mx-auto my-5 ">
        <h1 className="text-3xl font-semibold">All Books</h1>
        <p className="text-[#666]">Browse our complete collection</p>
        <div className="flex  items-center gap-2 my-5">
          <span className="opacity-55">
            <Search></Search>
          </span>
          <Input className="md:w-[40%] w-full" placeholder="Search by title"></Input>
        </div>
        {loading ? (
          <div className="my-5 flex items-center justify-center">
            <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-15">
            {allBooks.map((book) => (
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
      <Footer />
    </div>
  );
};

export default Books;
