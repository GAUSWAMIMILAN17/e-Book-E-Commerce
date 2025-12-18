import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bookcard from "./Bookcard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BOOK_API_ENDPOINT } from "../utils/data";
import { setAllBooks } from "./redux/bookSlice";
import { setLoading } from "./redux/authSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const { allBooks } = useSelector((store) => store.books);
  const { loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllBooks(res.data.books));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchBooks();
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#212844] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Your Next <br />
              <span className="text-[#008ECC]">Favorite E-Book</span>
            </h1>

            <p className="text-gray-300 max-w-lg">
              Explore our curated collection of books in a warm, modern reading
              experience. Learn, grow, and enjoy knowledge anytime.
            </p>

            <Link to="/books">
            <button className="px-6 py-3 bg-[#008ECC] rounded-lg font-medium hover:opacity-90 transition">
              Explore Books
            </button></Link>
          </div>

          <div className="flex justify-center">
            <img
              src="logo.png"
              alt="E-Book"
              className="w-72 h-72 opacity-60"
            />
          </div>

        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Books
          </h2>
          <p className="text-gray-500 mt-1">
            Hand-picked selections just for you
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allBooks?.slice(0, 6).map((book) => (
              <Bookcard
                key={book._id}
                id={book._id}
                title={book.title}
                price={book.price}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
