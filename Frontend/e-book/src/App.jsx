import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import Books from "./components/Books.jsx";
import Categories from "./components/Categories.jsx";
import Myorders from "./components/Myorders.jsx";
import ViewOrders from "./components/ViewOrders.jsx";
import Details from "./components/Details.jsx";
import Cart from "./components/Cart.jsx";
import { useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "./utils/data";
import { useDispatch } from "react-redux";
import { setUser } from "./components/redux/authSlice";
import Profile from "./components/Profile.jsx";
import AdminHome from "./admin-components/AdminHome.jsx";
import AdminBooks from "./admin-components/AdminBooks.jsx";
import AdminAddBook from "./admin-components/AdminAddBook.jsx";
import AdminOrders from "./admin-components/AdminOrders.jsx";
import AdminViewOrder from "./admin-components/AdminViewOrder.jsx";
import AdminBookDetail from "./admin-components/AdminBookDetail.jsx";
import AdminProfile from "./admin-components/AdminProfile.jsx";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/books" element={<Books />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/myOrders/:id" element={<ViewOrders />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/books/:id" element={<AdminBookDetail />} />
        <Route path="/admin/books/add" element={<AdminAddBook />} />
        <Route path="/admin/allorders" element={<AdminOrders />} />
        <Route path="/admin/allorders/:id" element={<AdminViewOrder />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
    </div>
  );
}

export default App;
