import { useState } from "react";
import { Link } from "react-router-dom";
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

const Signup = () => {
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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Phone Number</Label>
                  <Input id="number" type="number" placeholder="9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>

                <RadioGroup defaultValue="user" className="flex">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="user" id="r1" />
                    <Label htmlFor="r1">User</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="admin" id="r2" />
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
