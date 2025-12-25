import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../components/redux/authSlice";


const AdminProfile = () => {
  const { user, loading } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(user)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    bio: "",
    address: "",
    phonenumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        bio: user.profile?.bio || "",
        address: user.profile?.address || "",
        phonenumber: user.phonenumber || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (!res.data.success) {
        toast.success("Some Error Ocures");
      }
      toast.success("Profile Update Successfully");

      dispatch(setUser(res.data.user));
      dispatch(setLoading(false));
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.success(error.response?.data?.message || "Server Error");
    }
  };

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="my-5 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-[#008ECC] rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen max-w-7xl flex justify-center mx-auto my-10">
        <Card className="w-full h-[80vh] max-w-3xl rounded-2xl shadow-lg">
          <CardHeader className="flex flex-col items-center gap-4">
            <Avatar className="h-28 w-28">
              <AvatarImage src={user.profile.profilePhoto} />
              <AvatarFallback className="text-2xl">
                {user.fullname.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <CardTitle className="text-2xl font-bold">
                {user.fullname}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge className="mt-2" variant="secondary">
                {user.role.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Bio */}
            <div>
              <h3 className="font-semibold mb-1">Bio</h3>
              <p className="text-sm text-muted-foreground">
                {user.profile.bio || "No bio added"}
              </p>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-sm text-muted-foreground">
                  {user.phonenumber}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-sm text-muted-foreground">
                  {user.profile.address}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="primery">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button>Edit Profile</Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-96 m-5 space-y-4">
                    <h3 className="text-lg font-semibold">Edit Profile</h3>

                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    {loading ? (
                      <button
                        disabled
                        className="py-2 my-2 font-semibold text-white flex items-center justify-center w-full mx-auto bg-black opacity-70 cursor-not-allowed rounded-md"
                      >
                        <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </button>
                    ) : (
                      <Button className="w-full" onClick={handleSubmit}>
                        Save Changes
                      </Button>
                    )}
                  </PopoverContent>
                </Popover>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProfile;
