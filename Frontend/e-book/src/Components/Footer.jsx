import { Locate, Mail, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#008ECC] py-5">
      <div className="flex justify-between  max-w-7xl mx-auto">
        <div>
          <h1 className="text-white text-2xl font-bold">e-Book</h1>
          <hr className="w-20 pb-5" />
          <p className="text-white flex ">
            E-BOOk is a modern online shopping <br /> platform where users can
            browse products, <br />
            compare prices, and place orders easily. <br /> It delivers a fast,
            secure, and seamless shopping <br /> experience for all customers.
          </p>
        </div>
        <div>
          <h1 className="text-white font-semibold">Links</h1>
          <hr className="w-10 pb-5" />
          <ul className="text-white">
            <li>Home</li>
            <li>Books</li>
            <li>Category</li>
            <li>My Orders</li>
          </ul>
        </div>
        <div className="text-white">
          <h1 className="text-white font-semibold">Contact us</h1>
          <hr className="w-20 pb-5" />
          <p className="flex items-center gap-2"><Mail className="w-5 h-5"/> e-book@gmail.com</p>
          <p className="flex items-center gap-2"><Phone className="w-5 h-5" />9876543210</p>
          <p className="flex items-center gap-2"><Locate className="w-5 h-5" />Gandhinagar, Gujarat</p>
        </div>
      </div>
      <hr className="max-w-7xl mx-auto mt-5 opacity-30" />
      <p className="text-center text-white mt-3">© 2025 All rights reserved. e-Book</p>
    </div>
  );
};

export default Footer;
