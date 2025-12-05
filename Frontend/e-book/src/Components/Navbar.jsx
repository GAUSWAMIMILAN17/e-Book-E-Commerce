import { Link } from "react-router-dom";
import { ShoppingCart, User, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

const Navbar = () => {
  const [login, setLogin] = useState(true);

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
            <Link
              to="/"
              className="hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="hover:text-primary transition-colors font-medium"
            >
              Books
            </Link>
            <Link
              to="/categories"
              className="hover:text-primary transition-colors font-medium"
            >
              Categories
            </Link>
            <Link
              to="/myorders"
              className="hover:text-primary transition-colors font-medium"
            >
              My Orders
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative w-15">
                <ShoppingCart className="h-5 w-5 text-[#008ECC]" />
                <span className="text-[#666666]">Cart</span>
              </Button>
            </Link>
            {login ? (
              
<h1></h1>

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
