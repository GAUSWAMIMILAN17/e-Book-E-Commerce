import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Ordercard from './Ordercard';

const Myorders = () => {
  return (
    <div>
        <Navbar />
        <div className='min-h-screen max-w-7xl mx-auto'>
            <div className='my-5'>
                <h1 className='text-2xl font-semibold'>My Orders</h1>
                <p className='text-[#666]'>
                    Track and view your order history
                </p>
            </div>
            <Ordercard />
        </div>
        <Footer /> 
    </div>
  );
};

export default Myorders;