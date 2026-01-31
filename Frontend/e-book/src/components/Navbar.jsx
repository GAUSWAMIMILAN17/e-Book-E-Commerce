// import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
// import {
//   ShoppingCart,
//   User,
//   BookOpen,
//   LogOut,
//   User2,
//   PersonStandingIcon,
//   User2Icon,
//   MoveDownIcon,
//   ChevronDown,
// } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { USER_API_ENDPOINT } from "../utils/data";
// import axios from "axios";
// import { toast } from "sonner";
// import { setLoading, setLogout, setUser } from "./redux/authSlice";
// import { setAllMyOrders } from "./redux/orderSlice";
// import { setClearCart } from "./redux/cartSlice";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "./ui/dropdown-menu";

// const Navbar = () => {
//   // const [count , setCount] = useState(0)

//   const { user } = useSelector((store) => store.user);
//   const { cart } = useSelector((store) => store.cart);
//   const { items } = useSelector((store) => store.cart);
//   // console.log(user)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${USER_API_ENDPOINT}/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setLogout());
//         dispatch(setClearCart());
//         dispatch(setAllMyOrders([]));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Error logging out. Please try again.");
//     }
//   };
//   useEffect(() => {
//     dispatch(setLoading(false));
//   }, [dispatch]);

//   return (
//     <nav
//       className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60
//  border-b border-border shadow-sm"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {user && user.role === "admin" ? (
//             <Link
//               to="/admin/home"
//               className="flex items-center space-x-2 group"
//             >
//               <BookOpen className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
//               <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
//                 e-Book
//               </span>
//             </Link>
//           ) : (
//             <Link to="/" className="flex items-center space-x-2 group">
//               <BookOpen className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
//               <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
//                 e-Book
//               </span>
//             </Link>
//           )}

//           {user && user.role === "admin" ? (
//             <div className="hidden md:flex items-center space-x-8">
//               <NavLink
//                 to="/admin/home"
//                 className={({ isActive }) =>
//                   ` ${
//                     isActive
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-foreground"
//                   } transition-all duration-200 font-medium`
//                 }
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/admin/books"
//                 className={({ isActive }) =>
//                   `${
//                     isActive
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-foreground"
//                   } transition-all duration-200 font-medium`
//                 }
//               >
//                 <div className="relative group">
//                   <button
//                     className={`flex items-center gap-1 px-3 py-2 font-medium `}
//                   >
//                     Books
//                     <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
//                   </button>

//                   {/* Dropdown */}
//                   <div
//                     className="absolute left-1/2 z-50 mt-2 w-48
//     -translate-x-1/2 rounded-lg border bg-card shadow-lg
//     opacity-0 invisible group-hover:opacity-100 group-hover:visible
//     transition-all duration-200"
//                   >
//                     <Link
//                       to="/admin/books"
//                       className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-t-lg transition-colors"
//                     >
//                       All Books
//                     </Link>

//                     <Link
//                       to="/admin/books/add"
//                       className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-b-lg transition-colors"
//                     >
//                       Add Book
//                     </Link>
//                   </div>
//                 </div>
//               </NavLink>
//               <NavLink
//                 to="/admin/allorders"
//                 className={({ isActive }) =>
//                   ` ${
//                     isActive
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-foreground"
//                   } transition-all duration-200 font-medium`
//                 }
//               >
//                 All Orders
//               </NavLink>
//             </div>
//           ) : (
//             <div className="hidden md:flex items-center space-x-8">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   ` ${
//                     isActive
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-foreground"
//                   } transition-all duration-200 font-medium`
//                 }
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/books"
//                 className={({ isActive }) =>
//                   `${
//                     isActive
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-foreground"
//                   } transition-all duration-200 font-medium`
//                 }
//               >
//                 Books
//               </NavLink>
//               <NavLink
//                 to="/categories"
//                 className={({ isActive }) =>
//                   ` ${
//                     isActive
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-foreground"
//                   } transition-all duration-200 font-medium`
//                 }
//               >
//                 Categories
//               </NavLink>
//               <NavLink
//                 to="/myorders"
//                 className={({ isActive }) =>
//                   `${
//                     isActive
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-foreground"
//                   } transition-all duration-200 font-medium`
//                 }
//               >
//                 My Orders
//               </NavLink>
//             </div>
//           )}

//           <div className="flex items-center space-x-4">
//             {user && user.role === "admin" ? (
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <User2Icon className="h-5 w-5" />
//                 <span className="text-sm font-medium">Admin</span>
//               </div>
//             ) : (
//               <div>
//                 <Link to="/cart">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="relative group hover:bg-primary/10"
//                   >
//                     <ShoppingCart className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
//                     <span className="text-muted-foreground group-hover:text-primary ml-1">
//                       Cart
//                     </span>
//                     {items.length > 0 && (
//                       <Badge className="absolute -top-2 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
//                         {items.length}
//                       </Badge>
//                     )}
//                   </Button>
//                 </Link>
//               </div>
//             )}
//             {user ? (
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Avatar className="cursor-pointer ring-2 ring-background hover:ring-primary/20 transition-all duration-200">
//                     <AvatarFallback className="bg-gray-400 text-white font-semibold">
//                       {user?.fullname?.charAt(0)?.toUpperCase() || "A"}
//                     </AvatarFallback>
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 mr-2 rounded-lg shadow-lg">
//                   <div className="flex items-center gap-4 space-y-2 pb-3 border-b">
//                     <Avatar className="cursor-pointer">
//                       <AvatarImage
//                         src={user.profile.profilePhoto}
//                         alt="@shadcn"
//                       />
//                       <AvatarFallback className="bg-gray-400 text-white font-semibold">
//                       {user?.fullname?.charAt(0)?.toUpperCase() || "A"}
//                     </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h3 className="font-semibold text-foreground">
//                         {user.fullname}
//                       </h3>
//                       <p className="text-sm text-muted-foreground">
//                         {user.role === "admin" ? "Administrator" : "Customer"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col my-2 text-muted-foreground">
//                     {
//                       user && user.role === "admin" ? (<Link to="/admin/profile">
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-start gap-2 hover:bg-accent hover:text-accent-foreground"
//                       >
//                         <User2 className="h-4 w-4" />
//                         Profile
//                       </Button>
//                     </Link>) : (<Link to="/profile">
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-start gap-2 hover:bg-accent hover:text-accent-foreground"
//                       >
//                         <User2 className="h-4 w-4" />
//                         Profile
//                       </Button>
//                     </Link>)
//                     }

//                     <Button
//                       onClick={logoutHandler}
//                       variant="ghost"
//                       className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       Logout
//                     </Button>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             ) : (
//               <Link to="/login">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
//                 >
//                   <User className="h-4 w-4" />
//                   <span className="hidden sm:inline">Login</span>
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  BookOpen,
  LogOut,
  User2,
  ChevronDown,
  Menu,
  X,
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
import { setLoading, setLogout } from "./redux/authSlice";
import { setAllMyOrders } from "./redux/orderSlice";
import { setClearCart } from "./redux/cartSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { items } = useSelector((store) => store.cart);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        dispatch(setLogout());
        dispatch(setClearCart());
        dispatch(setAllMyOrders([]));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <nav className=" sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
      <div className="container mx-auto lg:px-[2rem] px-[1rem]">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link
            to={user?.role === "admin" ? "/admin/home" : "/"}
            className="flex items-center gap-2"
          >
            <img
              className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              src="/logo.png"
              alt=""
            />
            {/* <BookOpen className="h-6 w-6 text-primary" /> */}
            {/* <span className="text-xl font-bold text-primary">e-Book</span> */}
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {user?.role === "admin" ? (
              <>
                <NavLink to="/admin/home">Home</NavLink>

                <div className="relative group">
                  <button className="flex items-center gap-1">
                    Books
                    <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition" />
                  </button>

                  <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition bg-background border rounded-lg shadow mt-2 w-40">
                    <Link
                      to="/admin/books"
                      className="block px-4 py-2 hover:bg-accent"
                    >
                      All Books
                    </Link>
                    <Link
                      to="/admin/books/add"
                      className="block px-4 py-2 hover:bg-accent"
                    >
                      Add Book
                    </Link>
                  </div>
                </div>

                <NavLink to="/admin/allorders">All Orders</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/categories">Categories</NavLink>
                {user && <NavLink to="/myorders">My Orders</NavLink>}
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* CART (USER ONLY) */}
            {user && user.role !== "admin" && (
              <Link to="/cart">
                <Button variant="ghost" className="relative">
                  <ShoppingCart />
                  {items.length > 0 && (
                    <Badge className="absolute -top-2 -right-2">
                      {items.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* AVATAR (DESKTOP) */}
            {user && (
              <div className="hidden md:block">
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>
                        {user?.fullname?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="w-56">
                    <p className="font-semibold">{user.fullname}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {user.role === "admin" ? "Admin" : "Customer"}
                    </p>

                    <Link
                      to={user.role === "admin" ? "/admin/profile" : "/profile"}
                    >
                      <Button variant="ghost" className="w-full justify-start">
                        <User2 className="mr-2 h-4 w-4" /> Profile
                      </Button>
                    </Link>

                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full justify-start text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* LOGIN */}
            {!user && (
              <Link to="/login">
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background shadow-lg animate-in slide-in-from-right duration-500">
          <div className="p-4 space-y-4">
            {/* USER INFO */}
            {user && (
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>
                    {user?.fullname?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.fullname}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.role === "admin" ? "Administrator" : "Customer"}
                  </p>
                </div>
              </div>
            )}

            {/* MENU LINKS */}
            <div className="flex flex-col gap-2 text-sm font-medium">
              {user?.role !== "admin" && (
                <>
                  <NavLink
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  >
                    <BookOpen className="h-4 w-4" /> Home
                  </NavLink>
                  <NavLink
                    to="/books"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  >
                    📚 Books
                  </NavLink>

                  <NavLink
                    to="/categories"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  >
                    🗂 Categories
                  </NavLink>

                  {user && (
                    <>
                      <NavLink
                        to="/myorders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                      >
                        🧾 My Orders
                      </NavLink>
                      <NavLink
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                      >
                        <User2 className="h-4 w-4" /> Profile
                      </NavLink>{" "}
                    </>
                  )}
                </>
              )}

              {user?.role === "admin" && (
                <div className="mt-2 rounded-xl border bg-card shadow-sm overflow-hidden">
                  <NavLink
                    to="/admin/home"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition
         ${isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🏠 <span>Admin Home</span>
                  </NavLink>

                  <NavLink
                    to="/admin/books"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition
         ${isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📚 <span>All Books</span>
                  </NavLink>

                  <NavLink
                    to="/admin/books/add"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition
         ${isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ➕ <span>Add Book</span>
                  </NavLink>

                  <NavLink
                    to="/admin/allorders"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition
         ${isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📦 <span>All Orders</span>
                  </NavLink>

                  <NavLink
                    to="/admin/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition
         ${isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    👤 <span>Profile</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* LOGOUT */}
            {user && (
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logoutHandler();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
