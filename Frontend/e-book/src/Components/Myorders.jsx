import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Ordercard from './Ordercard';
import { ORDER_API_ENDPOINT } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllMyOrders } from './redux/orderSlice';

const Myorders = () => {
  const dispatch = useDispatch()
  const {allMyOrders} = useSelector((store)=> store.orders)
  // const {user} = useSelector((store)=> store.user)


  useEffect(()=> {
    const fetchPlacedBook = async() => {
      const res = await axios.get(`${ORDER_API_ENDPOINT}/myOrders`, {
        withCredentials: true
      })
      // console.log(allMyOrders)
      // console.log(user)
      // console.log("API Response:",res.data.orders)
      if(res.data.success){
        dispatch(setAllMyOrders(res.data.orders))
      }
    }
    fetchPlacedBook()
  }, [])


  return (
  <div>
    <Navbar />
    <div className='min-h-screen max-w-7xl mx-auto'>
      <div className='my-5'>
        <h1 className='text-2xl font-semibold'>
          My Orders : {allMyOrders.length}
        </h1>
        <p className='text-[#666]'>
          Track and view your order history
        </p>
      </div>

      <div>
        {allMyOrders.slice(0, 6).map((order) => (
          <Ordercard
            key={order._id}
            id={order._id}
            address={order.user.profile.address}
            title={order.books[0].book.title}
            phonenumber={order.user.phonenumber}
            email={order.user.email}
            status={order.orderStatus}
            payment={order.paymentStatus}
            mode={order.paymentMode}
            amount={order.totalAmount}
          />
        ))}
      </div>

    </div>
    <Footer />
  </div>
);
}

export default Myorders;