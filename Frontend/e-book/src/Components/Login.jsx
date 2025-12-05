import { useState } from "react";
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
import { useEffect } from "react";
import { setUser } from "./redux/authSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { user } = useSelector((store) => store.user);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("login  faild");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <BookOpen className="h-8 w-8 " />
            <span className="text-2xl font-bold ">e-Book</span>
          </Link>

          <Card className="shadow-card supports-backdrop-filter:bg-background/60">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                Welcome Back
              </CardTitle>
              <CardDescription>Sign in to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitHandler} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={input.email}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
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

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#008ECC] text-white"
                  variant="primery"
                  size="lg"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?
                  <Link to="/signup">
                    <button className="text-primary font-medium hover:underline ms-2">
                      Sign up
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
