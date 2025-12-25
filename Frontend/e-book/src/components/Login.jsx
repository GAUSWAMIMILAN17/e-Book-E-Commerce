import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "./redux/authSlice.js";
import { setAllAdminBooks } from "./redux/bookSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.user);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        // dispatch(setAllAdminBooks(res.data.books))


        // 🔑 ROLE BASED REDIRECT (MAIN LOGIC)
        if (res.data.user.role === "admin") {
          navigate("/admin/home");
        } else {
          navigate("/");
        }

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔁 Page refresh / direct visit protection
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      {/* UI same as yours */}
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <BookOpen className="h-8 w-8" />
            <span className="text-2xl font-bold">e-Book</span>
          </Link>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Sign in to access your account</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={submitHandler} className="space-y-4">
                <Label>Email</Label>
                <Input name="email" value={input.email} placeholder="viratkohli@gmail.com" onChange={changeEventHandler} />

                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={input.password}
                  onChange={changeEventHandler}
                />

                <RadioGroup
                  onValueChange={(value) => setInput({ ...input, role: value })}
                  className="flex"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="user" id="r1" />
                    <Label htmlFor="r1">User</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="admin" id="r2" />
                    <Label htmlFor="r2">Admin</Label>
                  </div>
                </RadioGroup>

                {loading ? (
                  <button disabled className="w-full py-2 bg-[#008ECC] opacity-70">
                    <div className="h-5 w-5 border-4 border-white border-t-transparent animate-spin mx-auto" />
                  </button>
                ) : (
                  <Button type="submit" className="w-full bg-[#008ECC]">
                    Sign In
                  </Button>
                )}
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Create account?
                  <Link to="/signup">
                    <button className="text-primary ms-2 font-medium hover:underline">
                      Signup
                    </button>
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;


