// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ArrowRight, BookOpen, Package, TrendingUp } from "lucide-react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllAdminBooks } from "../Components/redux/bookSlice";
// import { setLoading } from "../Components/redux/authSlice";
// import axios from "axios";
// import { BOOK_API_ENDPOINT, ORDER_API_ENDPOINT } from "../utils/data";
// import { setAllAdminGetAllOrders } from "../Components/redux/orderSlice";

// //dumy bellow

// const featuredBooks = [
//   { id: 1, title: "Atomic Habits" },
//   { id: 2, title: "Rich Dad Poor Dad" },
//   { id: 3, title: "Deep Work" },
//   { id: 4, title: "Think & Grow Rich" },
// ];

// const AdminHome = () => {
//   const dispatch = useDispatch()
//   const { allAdminBooks } = useSelector((store) => store.books);
//   const {allAdminGetAllOrders} = useSelector((store)=> store.orders)

//   const deliveredOrdersCount = allAdminGetAllOrders.filter(
//   (order) => order.orderStatus === "delivered"
// ).length;

//   const stats = [
//     {
//       icon: BookOpen,
//       label: "Total Books",
//       value: allAdminBooks.length,
//       color: "text-blue-600",
//     },
//     {
//       icon: Package,
//       label: "Total Orders",
//       value: allAdminGetAllOrders.length,
//       color: "text-purple-600",
//     },
//     {
//       icon: TrendingUp,
//       label: "Delivered",
//       value: deliveredOrdersCount,
//       color: "text-green-600",
//     },
//   ];

//   useEffect(() => {
//     const fetchAdminBooks = async () => {
//       try {
//         dispatch(setLoading(true));
//         const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
//           withCredentials: true,
//         });
//         // console.log(res.data);
//         if (res.data.success) {
//           dispatch(setAllAdminBooks(res.data.books));
//           dispatch(setLoading(false));
//         }
//       } catch (error) {
//         console.log(error);
//         toast.success("Server Error");
//         dispatch(setLoading(false));
//       }
//     };
//     const fetchAdminOrders = async() => {
//       try{
//         dispatch(setLoading(true))
//         const res = await axios.get(`${ORDER_API_ENDPOINT}/getAllOrders`, {
//           withCredentials: true
//         })
//         // console.log(res.data.orders)
//         if(res.data.success){
//           dispatch(setAllAdminGetAllOrders(res.data.orders))
//           dispatch(setLoading(false))
//         }

//       } catch (error) {
//         console.log(error)
//         toast.success("Server Error");
//         dispatch(setLoading(false));
//       }
//     }
//     fetchAdminBooks();
//     fetchAdminOrders();
//   }, [dispatch]);
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       {/* Hero Section */}
//       <section className=" from-amber-100 bg-[#212844] py-20">
//         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
//           <div className="space-y-6">
//             <h1 className="text-4xl md:text-5xl font-bold text-white">
//               Admin Dashboard <br />
//               <span className="text-[#008ECC]">Manage Your E-Book Store</span>
//             </h1>

//             <p className="text-lg text-gray-200 max-w-lg">
//               Control books, orders and users from one powerful admin panel.
//             </p>

//             <div className="flex gap-4">
//               <Link
//                 to="/admin/books"
//                 className="px-6 py-3 bg-[#008ECC] text-white rounded-lg  transition"
//               >
//                 Manage Books
//               </Link>

//               <Link
//                 to="/admin/allorders"
//                 className="px-6 py-3 border border-[#008ECC] text-white font-semibold rounded-lg hover:text-white transition"
//               >
//                 View Orders
//               </Link>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <div className="w-72 h-72 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#008ECC] text-2xl font-bold">
//               Admin Panel
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//           {stats.map((stat) => (
//             <div
//               key={stat.label}
//               className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm"
//             >
//               <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
//                 <stat.icon className="h-6 w-6" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 <p className="text-sm text-gray-500">{stat.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Books */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900">
//                 Featured Books
//               </h2>
//               <p className="text-gray-500">
//                 Quick overview of highlighted books
//               </p>
//             </div>

//             <Link
//               to="/admin/books"
//               className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
//             >
//               View All
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredBooks.map((book) => (
//               <div
//                 key={book.id}
//                 className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
//               >
//                 <h3 className="font-semibold text-gray-800">{book.title}</h3>
//                 <p className="text-sm text-gray-500 mt-2">Book preview card</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default AdminHome;



import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Package, TrendingUp, BarChart3, Users, ShoppingCart, Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminBooks } from "../components/redux/bookSlice";
import { setLoading } from "../components/redux/authSlice";
import axios from "axios";
import { BOOK_API_ENDPOINT, ORDER_API_ENDPOINT } from "../utils/data";
import { setAllAdminGetAllOrders } from "../components/redux/orderSlice";

//dumy bellow

const featuredBooks = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "Rich Dad Poor Dad" },
  { id: 3, title: "Deep Work" },
  { id: 4, title: "Think & Grow Rich" },
];

const AdminHome = () => {
  const dispatch = useDispatch()
  const { allAdminBooks } = useSelector((store) => store.books);
  const {allAdminGetAllOrders} = useSelector((store)=> store.orders)

  const deliveredOrdersCount = allAdminGetAllOrders.filter(
  (order) => order.orderStatus === "delivered"
).length;

  const stats = [
    {
      icon: BookOpen,
      label: "Total Books",
      value: allAdminBooks.length,
      color: "text-blue-600",
    },
    {
      icon: Package,
      label: "Total Orders",
      value: allAdminGetAllOrders.length,
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      label: "Delivered",
      value: deliveredOrdersCount,
      color: "text-green-600",
    },
  ];

  useEffect(() => {
    const fetchAdminBooks = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
          withCredentials: true,
        });
        // console.log(res.data);
        if (res.data.success) {
          dispatch(setAllAdminBooks(res.data.books));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        toast.success("Server Error");
        dispatch(setLoading(false));
      }
    };
    const fetchAdminOrders = async() => {
      try{
        dispatch(setLoading(true))
        const res = await axios.get(`${ORDER_API_ENDPOINT}/getAllOrders`, {
          withCredentials: true
        })
        // console.log(res.data.orders)
        if(res.data.success){
          dispatch(setAllAdminGetAllOrders(res.data.orders))
          dispatch(setLoading(false))
        }

      } catch (error) {
        console.log(error)
        toast.success("Server Error");
        dispatch(setLoading(false));
      }
    }
    fetchAdminBooks();
    fetchAdminOrders();
  }, [dispatch]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className=" from-amber-100 bg-[#212844] md:py-20 py-15 overflow-hidden">
        <div className="max-w-7xl md:mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Admin Dashboard <br />
              <span className="text-[#008ECC] md:text-4xl text-2xl">Manage Your E-Book Store</span>
            </h1>

            <p className="text-[15px] md:text-xl text-gray-200 max-w-lg">
              Control books, orders and users from one powerful admin panel.
            </p>

            <div className="flex gap-4">
              <Link
                to="/admin/books"
                className="px-6 py-3 bg-[#008ECC] text-white rounded-lg  transition"
              >
                Manage Books
              </Link>

              <Link
                to="/admin/allorders"
                className="px-6 py-3 border border-[#008ECC] text-white font-semibold rounded-lg hover:text-white transition"
              >
                View Orders
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-72 h-72 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
              {/* Animated Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: `linear-gradient(to right, #008ECC 1px, transparent 1px),
                                     linear-gradient(to bottom, #008ECC 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    animation: 'grid-move 20s linear infinite'
                  }}
                />
              </div>

              {/* Floating Icons */}
              <div className="absolute top-8 left-8 animate-bounce">
                <div className="p-3 bg-blue-500/20 rounded-lg backdrop-blur">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
              </div>

              <div className="absolute top-20 right-10" style={{animation: 'float 3s ease-in-out infinite'}}>
                <div className="p-3 bg-purple-500/20 rounded-lg backdrop-blur">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
              </div>

              <div className="absolute bottom-20 left-10" style={{animation: 'float 3s ease-in-out infinite 1s'}}>
                <div className="p-3 bg-green-500/20 rounded-lg backdrop-blur">
                  <Package className="h-6 w-6 text-green-400" />
                </div>
              </div>

              <div className="absolute bottom-8 right-8" style={{animation: 'float 3s ease-in-out infinite 2s'}}>
                <div className="p-3 bg-yellow-500/20 rounded-lg backdrop-blur">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
              </div>

              {/* Center Shield Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#008ECC] rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative p-5 bg-gradient-to-br from-[#008ECC] to-blue-600 rounded-full">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Orbiting Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-[#008ECC]/30 rounded-full" 
                  style={{animation: 'spin 10s linear infinite'}} 
                />
              </div>

              {/* Stats Overlay */}
              <div className="absolute top-4 left-4">
                <div className="text-white/70 text-xs font-mono">
                  <span className="animate-pulse">● LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
      `}</style>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Books
              </h2>
              <p className="text-gray-500 text-[13px] md:text-[1rem]">
                Quick overview of highlighted books
              </p>
            </div>

            <Link
              to="/admin/books"
              className="flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-500 mt-2">Book preview card</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminHome;