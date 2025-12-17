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
import { setLoading, setUser } from "./redux/authSlice";
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
                        <Link to={"/profile"}> Profile</Link>{" "}
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

// // Respponsive

// import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
// import { ShoppingCart, User, BookOpen, LogOut, User2, Menu, X } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { USER_API_ENDPOINT } from "../utils/data";
// import axios from "axios";
// import { toast } from "sonner";
// import { setUser } from "./redux/authSlice";
// import { setAllMyOrders } from "./redux/orderSlice";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
//         dispatch(setUser(null));
//         dispatch(setAllMyOrders([]));
//         navigate("/");
//         toast.success(res.data.message);
//         setIsMobileMenuOpen(false);
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Error logging out. Please try again.");
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 group">
//             <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#008ECC] transition-transform group-hover:scale-110" />
//             <span className="text-lg sm:text-xl font-bold text-[#008ECC]">e-Book</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center text-[#666666] space-x-8">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `${
//                   isActive ? "text-blue-600" : "text-gray-500"
//                 } transition-colors font-medium hover:text-blue-600`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/books"
//               className={({ isActive }) =>
//                 `${
//                   isActive ? "text-blue-600" : "text-gray-500"
//                 } transition-colors font-medium hover:text-blue-600`
//               }
//             >
//               Books
//             </NavLink>
//             <NavLink
//               to="/categories"
//               className={({ isActive }) =>
//                 `${
//                   isActive ? "text-blue-600" : "text-gray-500"
//                 } transition-colors font-medium hover:text-blue-600`
//               }
//             >
//               Categories
//             </NavLink>
//             <NavLink
//               to="/myorders"
//               className={({ isActive }) =>
//                 `${
//                   isActive ? "text-blue-600" : "text-gray-500"
//                 } transition-colors font-medium hover:text-blue-600`
//               }
//             >
//               My Orders
//             </NavLink>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             {/* Cart - Always visible */}
//             <Link to="/cart">
//               <Button variant="ghost" size="icon" className="relative">
//                 <ShoppingCart className="h-5 w-5 text-[#008ECC]" />
//                 <span className="hidden sm:inline text-[#666666] ml-1">Cart</span>
//               </Button>
//             </Link>

//             {/* User Menu - Desktop */}
//             <div className="hidden sm:block">
//               {user ? (
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Avatar className="cursor-pointer h-8 w-8 sm:h-10 sm:w-10">
//                       <AvatarImage src="logo.png" alt="@shadcn" />
//                     </Avatar>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-64 sm:w-80 mr-2">
//                     <div className="flex items-center gap-4 space-y-2">
//                       <Avatar className="cursor-pointer">
//                         <AvatarImage src="logo.png" alt="@shadcn" />
//                       </Avatar>
//                       <div>
//                         <h3 className="font-medium">{user.fullname}</h3>
//                       </div>
//                     </div>

//                     <div className="flex flex-col my-2 text-gray-600">
//                       <div className="flex w-fit items-center gap-2 cursor-pointer">
//                         <User2 />
//                         <Button variant="link">
//                           <Link to="/profile">Profile</Link>
//                         </Button>
//                       </div>

//                       <div className="flex w-fit items-center gap-2 cursor-pointer">
//                         <LogOut />
//                         <Button onClick={logoutHandler} variant="link">
//                           Logout
//                         </Button>
//                       </div>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               ) : (
//                 <Link to="/login">
//                   <Button variant="outline" size="sm" className="gap-2">
//                     <User className="h-4 w-4 text-[#008ECC]" />
//                     <span className="hidden sm:inline text-[#666666]">Login</span>
//                   </Button>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden"
//               onClick={toggleMobileMenu}
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
//             <div className="px-4 pt-2 pb-3 space-y-1">
//               <NavLink
//                 to="/"
//                 onClick={closeMobileMenu}
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive
//                       ? "text-blue-600 bg-blue-50"
//                       : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   }`
//                 }
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/books"
//                 onClick={closeMobileMenu}
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive
//                       ? "text-blue-600 bg-blue-50"
//                       : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   }`
//                 }
//               >
//                 Books
//               </NavLink>
//               <NavLink
//                 to="/categories"
//                 onClick={closeMobileMenu}
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive
//                       ? "text-blue-600 bg-blue-50"
//                       : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   }`
//                 }
//               >
//                 Categories
//               </NavLink>
//               <NavLink
//                 to="/myorders"
//                 onClick={closeMobileMenu}
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive
//                       ? "text-blue-600 bg-blue-50"
//                       : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   }`
//                 }
//               >
//                 My Orders
//               </NavLink>

//               {/* User Section in Mobile Menu */}
//               <div className="border-t pt-4 pb-2 mt-4">
//                 {user ? (
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 px-3 py-2">
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src="logo.png" alt="@shadcn" />
//                       </Avatar>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">
//                           {user.fullname}
//                         </p>
//                       </div>
//                     </div>
//                     <Link
//                       to="/profile"
//                       onClick={closeMobileMenu}
//                       className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                     >
//                       <User2 className="h-4 w-4" />
//                       Profile
//                     </Link>
//                     <button
//                       onClick={() => {
//                         logoutHandler();
//                         closeMobileMenu();
//                       }}
//                       className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={closeMobileMenu}
//                     className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   >
//                     <User className="h-4 w-4" />
//                     Login
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;