import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bookcard from "./Bookcard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BOOK_API_ENDPOINT } from "../utils/data";
import { setAllBooks } from "./redux/bookSlice";



const Home = () => {

  const {allBooks} = useSelector((store)=> store.books)
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch()

  useEffect(()=> {
      const fetchBooks = async() => {
        try{
        const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`,{
          withCredentials: true
        })
        // console.log(res.data)

        if(res.data.success){
          dispatch(setAllBooks(res.data.books))
        }
        else {
          console.log("failed to fetch books")
        }
      } catch(error){
        console.log(error)
      }
      }
      fetchBooks();

    }, [dispatch])


  return (
    <div>
      <Navbar />
      <div className="min-h-screen max-w-7xl my-10 mx-auto">
        <div className="bg-[#212844] my-8 p-7 flex justify-between text-white rounded-2xl pb-20">
          <div className="mt-20 ms-15">
            <h1 className="text-5xl py-2 font-semibold">Discover Your Next </h1>
            <h2 className="text-3xl py-3">Your Ultimate E-Book</h2>
            <p className="opacity-60">
              Explore our curated collection of books in a warm, coffee-inspired
              atmosphere. Read, learn, and grow with e-Book.
            </p>
          </div>
          <div className="">
            <img src="logo.png" className="w-80 h-80 opacity-50" alt="" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold">Featured Books</h1>
        <p className="text-[#666]">Hand-picked selections just for you</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-6">
          {allBooks?.slice(0, 6).map((book) => (
            <Bookcard
              key={book._id}
              id={book._id}
              // image={book.image}
              title={book.title}
              price={book.price}
              // oldPrice={book.oldPrice}  
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
