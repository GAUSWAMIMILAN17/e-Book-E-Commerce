// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from './ui/button';
// import { useDispatch } from 'react-redux';
// import { setDecreaseQty, setIncreaseQty, setRemoveFromCart } from './redux/cartSlice';
// import { toast } from 'sonner';

// const Cartcard = ({item}) => {
//   // console.log(item)

//   const dispatch = useDispatch()

//   const handleRemove = () => {
//     dispatch(setRemoveFromCart(item._id))
//     toast.success("Remove Successfully!");
//   }
//   const handleInc = () => {
//     dispatch(setIncreaseQty(item._id))
//   }
//   const handleDec = () => {
//     dispatch(setDecreaseQty(item._id))
//   }
  
//   return (
//     <div className="my-3 w-75 rounded-xl border transition-shadow duration-300 hover:shadow-xl">
//     <div className=''>
//         <div className="bg-[#f5f5f5] rounded-t-xl overflow-hidden">
//         <img
//           src="logo.png"
//           className="object-cover w-full h-48 transform transition duration-300 ease-in-out hover:scale-110"
//         />
//       </div>

//       <div className="p-3">
//         <h1 className="text-xl font-semibold">{item.title}</h1>

//         <p className="my-2 font-semibold">
//           {item.price}
//           <span className="line-through font-light ms-3">500</span>
//         </p>

//         <div className="flex gap-3 my-3 ">
//           <div className="flex items-center gap-3">
//               <button
//                 onClick={handleDec}
//                 className="px-3 py-1 bg-gray-300 rounded-lg text-xl"
//               >
//                 −
//               </button>

//               <span className="text-lg font-semibold w-6 text-center">
//                 {item.qauntity}
//               </span>

//               <button
//                 onClick={handleInc}
//                 className="px-3 py-1 bg-gray-300 rounded-lg text-xl"
//               >
//                 +
//               </button>
//             </div>

//           {/* <Link to={"/detail/123"}>
//             <Button className="bg-[#008ECC] text-white" variant="primery">
//               Buy
//             </Button>
//           </Link> */}
//           <Button onClick={handleRemove} className="bg-[#008ECC] text-white" variant="primery">
//             Remove
//           </Button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Cartcard;


// ---------------------------------------------------------------------------------------------------------------------

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useDispatch } from 'react-redux';
import { setDecreaseQty, setIncreaseQty, setRemoveFromCart } from './redux/cartSlice';
import { toast } from 'sonner';
import { Minus, Plus, Trash2, Eye, X } from 'lucide-react';

const Cartcard = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(setRemoveFromCart(item._id));
    toast.success("Removed from cart!");
  };

  const handleInc = () => {
    dispatch(setIncreaseQty(item._id));
  };

  const handleDec = () => {
    if (item.qauntity > 1) {
      dispatch(setDecreaseQty(item._id));
    }
  };

  const totalPrice = (item.price * item.qauntity).toFixed(2);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {/* Image Section */}
          <div className="relative w-full sm:w-32 h-40 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={item.coverImage || "logo.png"}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Title and Remove Button */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-primary">
                  ₹{item.price}
                </span>
                {item.oldPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{item.oldPrice}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Controls and Actions */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md hover:bg-white"
                  onClick={handleDec}
                  disabled={item.qauntity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-base font-semibold min-w-[2rem] text-center">
                  {item.qauntity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md hover:bg-white"
                  onClick={handleInc}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Subtotal and Actions */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Subtotal</p>
                  <p className="text-lg font-bold text-foreground">₹{totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cartcard;