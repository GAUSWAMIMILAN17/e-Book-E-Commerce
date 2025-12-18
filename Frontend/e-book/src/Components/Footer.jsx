import { Locate, Mail, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#212844] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-3">e-Book</h1>
          <div className="w-16 h-1 bg-[#008ECC] mb-4 rounded"></div>
          <p className="text-sm leading-relaxed">
            e-Book is a modern online platform where users can browse,
            read and purchase books easily.  
            Experience fast, secure and seamless digital reading.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <div className="w-12 h-1 bg-[#008ECC] mb-4 rounded"></div>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Books</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">My Orders</li>
          </ul>
        </div>

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
