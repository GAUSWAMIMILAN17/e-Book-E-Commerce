import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Button } from "./button";
import { Link } from "react-router-dom";


const ViewOrders = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <div className="">
          <div className="max-w-6xl mx-auto p-10 border m-2">
            <h1 className="text-2xl font-semibold">
              Order : status
            </h1>
            <div className="bg-[#f5f5f5] rounded-xl w-fit my-5 overflow-hidden">
              <img
                src="data:image/jpeg;base64,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"
                className="object-cover h-48 transform transition duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <div className="border p-3 rounded-xl">
              <h2 className="font-semibold text-xl">title: Software Development</h2>
              <p>adress</p>
              <p>phonenumber</p>
              <p>email</p>
              <p>quantity</p>
              <p>paymentMode : </p>
              <p>paymentStatus</p>
              <p>totalAmount</p>
              <p>language</p>
              <p>publishedYear: 2025</p>
            </div>
            <div className="flex gap-3 my-3">
              <Link to={"/myOrders"} >
              <Button className="bg-[#008ECC] text-white" variant="primery">
                Back
              </Button></Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewOrders;
