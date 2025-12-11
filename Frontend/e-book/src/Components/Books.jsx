import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bookcard from "./Bookcard";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import { BOOK_API_ENDPOINT} from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setAllBooks } from "./redux/bookSlice";


const Books = () => {

  const dispatch = useDispatch()
  const {allBooks} = useSelector((store)=> store.books)
  
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
      <div className="min-h-screen max-w-7xl mx-auto my-5">
        <h1 className="text-3xl font-semibold">All Books</h1>
        <p className="text-[#666]">Browse our complete collection</p>
        <div className="flex items-center gap-2 my-5">
            <span className="opacity-55"><Search></Search></span>
            <Input className="w-[40%]" placeholder="Search by title"></Input>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-6">
          {allBooks.slice(0, 6).map((book) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default Books;
