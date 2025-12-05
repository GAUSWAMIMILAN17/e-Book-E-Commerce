import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bookcard from "./Bookcard";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Web Development",
    price: 350,
    oldPrice: 700,
    image: "logo.png",
  },
  {
    id: 2,
    title: "UI/UX Basics",
    price: 250,
    oldPrice: 500,
    image: "logo.png",
  },
  {
    id: 3,
    title: "Python Mastery",
    price: 499,
    oldPrice: 899,
    image: "logo.png",
  },
  {
    id: 4,
    title: "JavaScript Pro",
    price: 399,
    oldPrice: 799,
    image: "logo.png",
  },
  {
    id: 5,
    title: "DSA Handbook",
    price: 299,
    oldPrice: 599,
    image: "logo.png",
  },
  { id: 6, title: "React Guide", price: 450, oldPrice: 900, image: "logo.png" },
];

const Books = () => {
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
          {books.slice(0, 6).map((item) => (
            <Bookcard
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              oldPrice={item.oldPrice}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Books;
