// import React from "react";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { Link } from "react-router-dom";
// import {OrderStatusBadge} from "../Admin Components/Components/OrderStatusBadge"

// const Ordercard = ({
//   status, title, phonenumber, email, payment, mode, amount, id ,address
// }) => {
//   return (
//     <div className="my-5 bg-[#f5f5f5] border max-w-5xl rounded-2xl p-3 px-10">
//       <div className="flex gap-3">
//         <h1 className="font-semibold my-">{title} </h1>
//         <OrderStatusBadge status={status} />
//       </div>
//       <div className="flex justify-between my-2">
//         <div className="border w-fit rounded-full">
//           <img
//             src="logo.png"
//             className="w-25 h-25 object-cover rounded-full"
//             alt=""
//           />
//         </div>
//         <div className="ms-2 my-auto">
//           <h2>{address}</h2>
//           <h2>{phonenumber}</h2>
//           <p>{email}</p>
//           <p>Payment : {payment}</p>
//         </div>
//         <div>
//           <h2>{mode}</h2>
//           <p>{amount}</p>
//           <Link to={`/myOrders/${id}`}><Button>View Order</Button></Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Ordercard;

// --------------------------------------------------------------------------------------------------------------------------

import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Eye, Phone, Mail, MapPin } from "lucide-react";
import { OrderStatusBadge } from "../admin-components/components/OrderStatusBadge";

const Ordercard = ({
  id,
  title,
  status,
  phonenumber,
  email,
  payment,
  mode,
  amount,
  address,
}) => {
  return (
    <div className="my-4 max-w-6xl mx-auto rounded-xl border bg-white shadow-sm hover:shadow-md transition">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 p-5 border-b">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">Order ID: {id}</p>
        </div>

        <OrderStatusBadge status={status} />
      </div>

      {/* Middle Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 text-sm">
        
        {/* Customer */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Customer</h3>
          <p className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" /> {phonenumber}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" /> {email}
          </p>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Shipping Address</h3>
          <p className="flex items-start gap-2 text-gray-600">
            <MapPin className="h-4 w-4 mt-1" />
            {address}
          </p>
        </div>

        {/* Payment */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Payment</h3>
          <p className="text-gray-600">Method: {mode}</p>
          <p className="font-semibold text-gray-900">₹{amount}</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end p-4 bg-gray-50 rounded-b-xl">
        <Button asChild size="sm">
          <Link to={`/myOrders/${id}`} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Order
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Ordercard;
