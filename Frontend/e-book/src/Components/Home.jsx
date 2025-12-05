import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bookcard from "./Bookcard";

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

const Home = () => {
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

export default Home;
