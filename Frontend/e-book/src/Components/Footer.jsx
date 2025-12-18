import { Locate, Mail, Phone } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <footer className="bg-[#212844] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-40">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-3">e-Book</h1>
          <div className="w-16 h-1 bg-[#008ECC] mb-4 rounded"></div>
          <p className="text-sm leading-relaxed">
            e-Book is a modern online platform where users can browse, read and
            purchase books easily. Experience fast, secure and seamless digital
            reading.
          </p>
        </div>

        {/* Links */}
        {user && user.role === "admin" ? (
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h2>
            <div className="w-12 h-1 bg-[#008ECC] mb-4 rounded"></div>
            <ul className="space-y-2 text-sm">
              <Link to="/admin/home">
                <li className="hover:text-white my-2 cursor-pointer">Home</li>
              </Link>
              <Link to="/admin/books">
                <li className="hover:text-white my-2 cursor-pointer">Books</li>
              </Link>
              <Link to="/admin/allorders">
                <li className="hover:text-white my-2 cursor-pointer">All Orders</li>
              </Link>
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h2>
            <div className="w-12 h-1 bg-[#008ECC] mb-4 rounded"></div>
            <ul className="space-y-2 text-sm">
              <Link to="/">
                <li className="hover:text-white my-2 cursor-pointer">Home</li>
              </Link>
              <Link to="/books">
                <li className="hover:text-white my-2 cursor-pointer">Books</li>
              </Link>
              <Link to="/categories">
                <li className="hover:text-white my-2 cursor-pointer">Categories</li>
              </Link>
              <Link to="/myorders">
                <li className="hover:text-white my-2 cursor-pointer">My Orders</li>
              </Link>
            </ul>
          </div>
        )}

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>
          <div className="w-14 h-1 bg-[#008ECC] mb-4 rounded"></div>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#008ECC]" />
              e-book@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#008ECC]" />
              +91 98765 43210
            </p>
            <p className="flex items-center gap-3">
              <Locate className="w-4 h-4 text-[#008ECC]" />
              Gandhinagar, Gujarat
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <p className="text-center text-sm text-gray-400 py-4">
          © 2025 e-Book. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
