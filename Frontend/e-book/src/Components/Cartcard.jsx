import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Cartcard = () => {

    const [qty, setQty] = useState(1);
    
      const decrease = () => {
        if (qty > 1) {
          setQty(qty - 1);
        }
      };
    
      const increase = () => {
        setQty(qty + 1);
      };
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
        <h1 className="text-xl font-semibold">hello</h1>

        <p className="my-2 font-semibold">
          1000
          <span className="line-through font-light ms-3">500</span>
        </p>

        <div className="flex gap-3 my-3 ">
          <div className="flex items-center gap-3">
              <button
                onClick={decrease}
                className="px-3 py-1 bg-gray-300 rounded-lg text-xl"
              >
                −
              </button>

              <span className="text-lg font-semibold w-6 text-center">
                {qty}
              </span>

              <button
                onClick={increase}
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
          <Button className="bg-[#008ECC] text-white" variant="primery">
            Remove
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cartcard;