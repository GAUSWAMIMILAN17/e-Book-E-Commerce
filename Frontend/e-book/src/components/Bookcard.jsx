// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { Link } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux"
// import { setAddtoCart } from "./redux/cartSlice";
// import { toast } from "sonner";

// const Bookcard = ({ title, price, oldPrice ,coverImage, id}) => {

//   const dispatch = useDispatch()
//   const {user} = useSelector((Store)=> Store.user)

//   const handleAddToCart = () => {
//     if(!user){
//       toast.success("plz login and try again")
//       return;
//     }
//     dispatch(setAddtoCart({
//       _id: id,
//       title,
//       price,
//       coverImage
//     }))
//     toast.success("Added to Cart Successfully!");
//   }

//   return (
//     <div className="my-3 w-75 rounded-xl border transition-shadow duration-300 hover:shadow-xl">
//       <div className="bg-[#f5f5f5] rounded-t-xl overflow-hidden">
//         <img
//           src={coverImage}
//           className="object-cover w-full h-48 transform transition duration-300 ease-in-out hover:scale-110"
//         />
//       </div>

//       <div className="p-3">
//         <h1 className="text-xl font-semibold">{title}</h1>

//         <p className="my-2 font-semibold">
//           ₹{price}
//           <span className="line-through font-light ms-3">₹{oldPrice}</span>
//         </p>

//         <div className="flex gap-3 my-3 ">
//           {/* <Button className='bg-[#008ECC] text-white'  variant="primery">Buy</Button> */}

//           <Link to={`/detail/${id}`}>
//             <Button className="bg-[#008ECC] text-white" variant="primery">
//               Buy
//             </Button>
//           </Link>
//           <Button onClick={handleAddToCart} className="bg-[#008ECC] text-white" variant="primery">
//             Add Cart
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookcard;



// --------------------------------------------------------------------------------------------------------------------------------------------

import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAddtoCart } from "./redux/cartSlice";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { ShoppingCart, ShoppingBag } from "lucide-react";

const Bookcard = ({ title, price, oldPrice, coverImage, id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((Store) => Store.user);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    dispatch(
      setAddtoCart({
        _id: id,
        title,
        price,
        coverImage,
      })
    );
    toast.success("Added to Cart Successfully!");
  };

  const discountPercentage = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={coverImage || "/placeholder-book.png"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{discountPercentage}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl font-bold">₹{price}</span>
          {oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{oldPrice}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Link to={`/detail/${id}`} className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              <ShoppingBag className="h-4 w-4 mr-1" />
              Buy
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Bookcard;