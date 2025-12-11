import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, BookOpen, LogOut, User2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "./redux/authSlice";
import { setAllMyOrders } from "./redux/orderSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  // console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async() => {
    try{
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`,{}, {
        withCredentials: true,
      })
      if(res.data.success){
        dispatch(setUser(null))
        dispatch(setAllMyOrders([]));
        navigate("/")
        toast.success(res.data.message)
      }

    } catch(error){
      console.log(error.message)
      toast.error("Error logging out. Please try again.");
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60
 border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-6 w-6 text-[#008ECC] transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold text-[#008ECC]">e-Book</span>
          </Link>

          <div className="hidden md:flex items-center text-[#666666] space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` ${
                  isActive ? "text-blue-600" : "text-gray-500"
                } transition-colors font-medium`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-600" : "text-gray-500"
                } transition-colors font-medium`
              }
            >
              Books
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                ` ${
                  isActive ? "text-blue-600" : "text-gray-500"
                } transition-colors font-medium`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/myorders"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-600" : "text-gray-500"
                } transition-colors font-medium`
              }
            >
              My Orders
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative w-15">
                <ShoppingCart className="h-5 w-5 text-[#008ECC]" />
                <span className="text-[#666666]">Cart</span>
              </Button>
            </Link>
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="logo.png" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-2">
                  <div className="flex items-center gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="logo.png" alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.fullname}</h3>
                      {/* <p className="text-sm text-muted-foreground">Student</p> */}
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-gray-600  ">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        {" "}
                        <Link to={"/Profile"}> Profile</Link>{" "}
                      </Button>
                    </div>

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut></LogOut>
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4 text-[#008ECC]" />
                  <span className="hidden sm:inline text-[#666666]">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
