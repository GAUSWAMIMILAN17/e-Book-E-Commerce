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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/me`, {
          withCredentials: true,
        });
        console.log(res.data);
        dispatch(setUser(res.data.user));
      } catch (error) {
        dispatch(setUser(null));
        console.log(error);
      }
    };
    fetchUser();
  }, []);

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
      </Routes>
    </div>
  );
}

export default App;
