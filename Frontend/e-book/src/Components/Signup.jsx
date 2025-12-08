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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";   
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data.js";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname),
      formData.append("email", input.email),
      formData.append("phonenumber", input.phonenumber),
      formData.append("password", input.password),
      formData.append("role", input.role);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, input, {
        withCredentials: true,
      });
      // console.log(res)

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold ">e-Book</span>
          </Link>

          <Card className="shadow-card supports-backdrop-filter:bg-background/60">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                Create Account
              </CardTitle>
              <CardDescription>
                Join our reading community today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={submitHandler}>
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phonenumber">Phone Number</Label>
                  <Input id="phonenumber" value={input.phonenumber} name="phonenumber" type="phonenumber" onChange={changeEventHandler} placeholder="9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" value={input.password} onChange={changeEventHandler} type="password" placeholder="••••••••" />
                </div>

                <RadioGroup defaultValue="user" onValueChange={(value) => setInput({ ...input, role: value })} className="flex">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="user" name  id="r1" />
                    <Label htmlFor="r1">User</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="admin"  id="r2" />
                    <Label htmlFor="r2">Admin</Label>
                  </div>
                </RadioGroup>

                <Button
                  type="submit"
                  className="w-full bg-[#008ECC] text-white"
                  variant="primery"
                  size="lg"
                >
                  Sign Up
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?
                  <Link to="/login">
                    <button className="text-primary ms-2 font-medium hover:underline">
                      Sign in
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

export default Signup;
