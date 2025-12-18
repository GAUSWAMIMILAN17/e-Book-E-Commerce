import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  BookOpen,
  LogOut,
  User2,
  PersonStandingIcon,
  User2Icon,
  MoveDownIcon,
  ChevronDown,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data";
import axios from "axios";
import { toast } from "sonner";
import { setLoading, setLogout, setUser } from "./redux/authSlice";
import { setAllMyOrders } from "./redux/orderSlice";
import { setClearCart } from "./redux/cartSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const Navbar = () => {
  // const [count , setCount] = useState(0)

  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.cart);
  const { items } = useSelector((store) => store.cart);
  // console.log(user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setLogout());
        dispatch(setClearCart());
        dispatch(setAllMyOrders([]));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error logging out. Please try again.");
    }
  };
  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <nav
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60
 border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {user && user.role === "admin" ? (
            <Link
              to="/admin/home"
              className="flex items-center space-x-2 group"
            >
              <BookOpen className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                e-Book
              </span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center space-x-2 group">
              <BookOpen className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                e-Book
              </span>
            </Link>
          )}

          {user && user.role === "admin" ? (
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200 font-medium`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/admin/books"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200 font-medium`
                }
              >
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 font-medium `}
                  >
                    Books
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
                  </button>

                  {/* Dropdown */}
                  <div
                    className="absolute left-1/2 z-50 mt-2 w-48 
    -translate-x-1/2 rounded-lg border bg-card shadow-lg
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    transition-all duration-200"
                  >
                    <Link
                      to="/admin/books"
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-t-lg transition-colors"
                    >
                      All Books
                    </Link>

                    <Link
                      to="/admin/books/add"
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-b-lg transition-colors"
                    >
                      Add Book
                    </Link>
                  </div>
                </div>
              </NavLink>
              <NavLink
                to="/admin/allorders"
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200 font-medium`
                }
              >
                All Orders
              </NavLink>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200 font-medium`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200 font-medium`
                }
              >
                Books
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200 font-medium`
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="/myorders"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200 font-medium`
                }
              >
                My Orders
              </NavLink>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {user && user.role === "admin" ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User2Icon className="h-5 w-5" />
                <span className="text-sm font-medium">Admin</span>
              </div>
            ) : (
              <div>
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative group hover:bg-primary/10"
                  >
                    <ShoppingCart className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-primary ml-1">
                      Cart
                    </span>
                    {items.length > 0 && (
                      <Badge className="absolute -top-2 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                        {items.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            )}
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-background hover:ring-primary/20 transition-all duration-200">
                    <AvatarFallback className="bg-gray-400 text-white font-semibold">
                      {user?.fullname?.charAt(0)?.toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4 space-y-2 pb-3 border-b">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user.profile.profilePhoto}
                        alt="@shadcn"
                      />
                      <AvatarFallback className="bg-gray-400 text-white font-semibold">
                      {user?.fullname?.charAt(0)?.toUpperCase() || "A"}
                    </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {user.fullname}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {user.role === "admin" ? "Administrator" : "Customer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-muted-foreground">
                    <Link to="/profile">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        <User2 className="h-4 w-4" />
                        Profile
                      </Button>
                    </Link>

                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
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
