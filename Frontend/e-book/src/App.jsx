import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Books from "./Components/Books";
import Categories from "./Components/Categories";
import Myorders from "./Components/Myorders";
import ViewOrders from "./Components/ViewOrders";
import Details from "./Components/Details";
import Cart from "./Components/Cart";
import { useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "./utils/data";
import { useDispatch } from "react-redux";
import { setUser } from "./Components/redux/authSlice";
import Profile from "./Components/Profile";
import AdminHome from "./Admin Components/AdminHome";
import AdminBooks from "./Admin Components/AdminBooks";
import AdminAddBook from "./Admin Components/AdminAddBook";
import AdminOrders from "./Admin Components/AdminOrders";
import AdminViewOrder from "./Admin Components/AdminViewOrder";
import AdminBookDetail from "./Admin Components/AdminBookDetail";
import AdminProfile from "./Admin Components/AdminProfile";

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
