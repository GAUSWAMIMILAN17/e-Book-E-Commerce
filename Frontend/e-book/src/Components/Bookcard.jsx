import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Bookcard = ({ title, price, oldPrice , id}) => {
  return (
    <div className="my-3 w-75 rounded-xl border transition-shadow duration-300 hover:shadow-xl">
      <div className="bg-[#f5f5f5] rounded-t-xl overflow-hidden">
        <img
          src="logo.png"
          className="object-cover w-full h-48 transform transition duration-300 ease-in-out hover:scale-110"
        />
      </div>

      <div className="p-3">
        <h1 className="text-xl font-semibold">{title}</h1>

        <p className="my-2 font-semibold">
          ₹{price}
          <span className="line-through font-light ms-3">₹{oldPrice}</span>
        </p>

        <div className="flex gap-3 my-3 ">
          {/* <Button className='bg-[#008ECC] text-white'  variant="primery">Buy</Button> */}

          <Link to={`/detail/${id}`}>
            <Button className="bg-[#008ECC] text-white" variant="primery">
              Buy
            </Button>
          </Link>
          <Button className="bg-[#008ECC] text-white" variant="primery">
            Add Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bookcard;
