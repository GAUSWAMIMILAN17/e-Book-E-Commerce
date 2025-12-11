import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setDecreaseQty, setIncreaseQty, setRemoveFromCart } from './redux/cartSlice';
import { toast } from 'sonner';

const Cartcard = ({item}) => {
  // console.log(item)

  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(setRemoveFromCart(item._id))
    toast.success("Remove Successfully!");
  }
  const handleInc = () => {
    dispatch(setIncreaseQty(item._id))
  }
  const handleDec = () => {
    dispatch(setDecreaseQty(item._id))
  }
  
  return (
    <div className="my-3 w-75 rounded-xl border transition-shadow duration-300 hover:shadow-xl">
    <div className=''>
        <div className="bg-[#f5f5f5] rounded-t-xl overflow-hidden">
        <img
          src="logo.png"
          className="object-cover w-full h-48 transform transition duration-300 ease-in-out hover:scale-110"
        />
      </div>

      <div className="p-3">
        <h1 className="text-xl font-semibold">{item.title}</h1>

        <p className="my-2 font-semibold">
          {item.price}
          <span className="line-through font-light ms-3">500</span>
        </p>

        <div className="flex gap-3 my-3 ">
          <div className="flex items-center gap-3">
              <button
                onClick={handleDec}
                className="px-3 py-1 bg-gray-300 rounded-lg text-xl"
              >
                −
              </button>

              <span className="text-lg font-semibold w-6 text-center">
                {item.qauntity}
              </span>

              <button
                onClick={handleInc}
                className="px-3 py-1 bg-gray-300 rounded-lg text-xl"
              >
                +
              </button>
            </div>

          {/* <Link to={"/detail/123"}>
            <Button className="bg-[#008ECC] text-white" variant="primery">
              Buy
            </Button>
          </Link> */}
          <Button onClick={handleRemove} className="bg-[#008ECC] text-white" variant="primery">
            Remove
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cartcard;