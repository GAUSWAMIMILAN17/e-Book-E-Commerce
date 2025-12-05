import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Ordercard = () => {
  return (
    <div className="my-5 bg-[#f5f5f5] border max-w-5xl rounded-2xl p-3 px-10">
      <div className="flex gap-3">
        <h1 className="font-semibold my-">Web Development </h1>
        <Badge className="p-1">Pending</Badge>
      </div>
      <div className="flex justify-between my-2">
        <div className="border w-fit rounded-full">
          <img
            src="logo.png"
            className="w-25 h-25 object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="ms-2 my-auto">
          <h2>kodinar, gujarat</h2>
          <h2>9876543210</h2>
          <p>test@gmail.com</p>
        </div>
        <div>
          <Button>View Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Ordercard;
