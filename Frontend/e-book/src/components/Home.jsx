// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Bookcard from "./Bookcard";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { BOOK_API_ENDPOINT } from "../utils/data";
// import { setAllBooks } from "./redux/bookSlice";
// import { setLoading } from "./redux/authSlice";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const { allBooks } = useSelector((store) => store.books);
//   const { loading } = useSelector((store) => store.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         dispatch(setLoading(true));
//         const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setAllBooks(res.data.books));
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };
//     fetchBooks();
//   }, [dispatch]);

//   return (
//     <div className="bg-gray-50">
//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="bg-[#212844] text-white">
//         <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
//           <div className="space-y-6">
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//               Discover Your Next <br />
//               <span className="text-[#008ECC]">Favorite E-Book</span>
//             </h1>

//             <p className="text-gray-300 max-w-lg">
//               Explore our curated collection of books in a warm, modern reading
//               experience. Learn, grow, and enjoy knowledge anytime.
//             </p>

//             <Link to="/books">
//             <button className="px-6 py-3 bg-[#008ECC] rounded-lg font-medium hover:opacity-90 transition">
//               Explore Books
//             </button></Link>
//           </div>

//           <div className="flex justify-center">
//             <img
//               src="logo.png"
//               alt="E-Book"
//               className="w-72 h-72 opacity-60"
//             />
//           </div>

//         </div>
//       </section>

//       {/* FEATURED BOOKS */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">
//             Featured Books
//           </h2>
//           <p className="text-gray-500 mt-1">
//             Hand-picked selections just for you
//           </p>
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {allBooks?.slice(0, 6).map((book) => (
//               <Bookcard
//                 key={book._id}
//                 id={book._id}
//                 title={book.title}
//                 price={book.price}
//                 coverImage={book.coverImage}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Home;



// ------------------------------------------------------------------------------------------------------------------

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Bookcard from "./Bookcard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BOOK_API_ENDPOINT } from "../utils/data";
import { setAllBooks } from "./redux/bookSlice";
import { setLoading } from "./redux/authSlice";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Library, BookMarked } from "lucide-react";

const Home = () => {
  const { allBooks } = useSelector((store) => store.books);
  const { loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${BOOK_API_ENDPOINT}/getAllBooks`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllBooks(res.data.books));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchBooks();
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#212844] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6 z-10 relative">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Discover Your Next <br />
              <span className="text-[#008ECC]">Favorite E-Book</span>
            </h1>

            <p className="text-gray-300 max-w-lg">
              Explore our curated collection of books in a warm, modern reading
              experience. Learn, grow, and enjoy knowledge anytime.
            </p>

            <Link to="/books">
              <button className="px-6 py-3 bg-[#008ECC]  md:hover:bg-gray-500 rounded-lg font-medium hover:opacity-90 transition">
                Explore Books
              </button>
            </Link>
          </div>

          <div className="flex justify-center items-center relative h-70 md:h-80">
            {/* Main 3D Book Animation Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Central Animated Book */}
              <div className="relative preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  <div 
                    className="relative w-48 h-64 preserve-3d"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'bookRotate 8s linear infinite' 
                    }}
                  >
                    {/* Book Cover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#008ECC] to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white/80" />
                    </div>
                    
                    {/* Book Spine */}
                    <div 
                      className="absolute left-0 top-0 w-4 h-full bg-gradient-to-b from-blue-700 to-blue-900 rounded-l-lg"
                      style={{ transform: 'rotateY(-90deg) translateZ(2px)' }}
                    />
                    
                    {/* Book Pages */}
                    <div 
                      className="absolute inset-0 bg-white rounded-lg"
                      style={{ transform: 'translateZ(-10px)' }}
                    />
                  </div>
                </div>

                {/* Floating Mini Books */}
                <div className="absolute -top-10 -left-10" style={{ animation: 'orbit 6s linear infinite' }}>
                  <div className="w-16 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded shadow-lg flex items-center justify-center">
                    <BookMarked className="w-8 h-8 text-white/70" />
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10" style={{ animation: 'orbit 6s linear infinite reverse' }}>
                  <div className="w-16 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded shadow-lg flex items-center justify-center">
                    <Library className="w-8 h-8 text-white/70" />
                  </div>
                </div>

                <div className="absolute top-20 -right-20" style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>
                  <div className="w-14 h-18 bg-gradient-to-br from-yellow-500 to-orange-600 rounded shadow-lg" />
                </div>

                {/* Sparkle Effects */}
                <Sparkles className="absolute -top-5 left-10 w-6 h-6 text-yellow-400 animate-pulse" />
                <Sparkles className="absolute bottom-10 -right-5 w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
                <Sparkles className="absolute top-1/2 -left-8 w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Animated Background Circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="absolute w-80 h-80 border border-white/10 rounded-full"
                    style={{ animation: 'ripple 4s ease-out infinite' }}
                  />
                  <div 
                    className="absolute w-64 h-64 border border-white/10 rounded-full"
                    style={{ animation: 'ripple 4s ease-out infinite 1s' }}
                  />
                  <div 
                    className="absolute w-48 h-48 border border-white/10 rounded-full"
                    style={{ animation: 'ripple 4s ease-out infinite 2s' }}
                  />
                </div>
              </div>

              {/* Floating Pages Animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute top-10 left-20 w-8 h-10 bg-white/90 rounded shadow-lg"
                  style={{ animation: 'pageFly 8s linear infinite' }}
                />
                <div 
                  className="absolute bottom-20 right-10 w-8 h-10 bg-white/90 rounded shadow-lg"
                  style={{ animation: 'pageFly 8s linear infinite 2s' }}
                />
                <div 
                  className="absolute top-1/2 left-10 w-8 h-10 bg-white/90 rounded shadow-lg"
                  style={{ animation: 'pageFly 8s linear infinite 4s' }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Add CSS Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes bookRotate {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }

          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }

          @keyframes ripple {
            0% {
              transform: scale(0.8);
              opacity: 0.2;
            }
            100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }

          @keyframes pageFly {
            0% {
              transform: translateX(0) translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateX(200px) translateY(-100px) rotate(45deg);
              opacity: 0;
            }
          }

          .preserve-3d {
            transform-style: preserve-3d;
          }
        `}</style>
      </section>

      {/* FEATURED BOOKS */}
      <section className="max-w-7xl mx-auto px-6 md:py-16 py-5">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Top Books
          </h2>
          <p className="text-gray-500 mt-1">
            Hand-picked selections just for you
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allBooks?.slice(0, 4).map((book) => (
              <Bookcard
                key={book._id}
                id={book._id}
                title={book.title}
                price={book.price}
                coverImage={book.coverImage}
              />
            ))}
          </div>
        )}
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;