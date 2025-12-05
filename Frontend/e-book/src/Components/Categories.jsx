import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Badge } from "./ui/badge";

const Categories = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen max-w-7xl mx-auto my-5">
        <h1 className="text-3xl font-semibold">Browse Categories</h1>
        <p className="text-[#666]">Explore books by your favorite topics</p>
        <div className="my-4">
          <ul className="flex gap-2">
            <Badge className="p-2 bg-[#008ECC] cursor-pointer hover:bg-[#4bafda]">Development</Badge>
            <Badge className="p-2 bg-[#008ECC] cursor-pointer hover:bg-[#4bafda]">Games</Badge>
            <Badge className="p-2 bg-[#008ECC] cursor-pointer hover:bg-[#4bafda]">Story</Badge>
            <Badge className="p-2 bg-[#008ECC] cursor-pointer hover:bg-[#4bafda]">Ghost</Badge>
            <Badge className="p-2 bg-[#008ECC] cursor-pointer hover:bg-[#4bafda]">Growth</Badge>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
