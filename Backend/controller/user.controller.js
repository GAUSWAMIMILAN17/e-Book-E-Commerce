import { User } from "../models/userschema.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";

// new user signup
export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    // console.log(req.body)
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    //photo upload cloudinary hear

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return res.status(200).json({
      message: `Account created successfully for ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error registering user",
      success: false,
    });
  }
};

// user login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const user = await User.findOne({ email }).populate("orders");

    if (!user) {
      return res.status(400).json({
        message: "User does not exits",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    const tokenData = { userId: user._id };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: {
        bio: user.profile.bio,
        profilePhoto: user.profile.profilePhoto,
        address: user.profile.address,
      },
      orders: user.orders,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
        path: "/",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: sanitizedUser,
        token: token,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error login failed",
      success: false,
    });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/",
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error logging out",
      success: false,
    });
  }
};

// profile update

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, address } = req.body;

    const userId = req.id;
    // console.log(userId)
    const user = await User.findById(userId).populate("orders");

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    }
    if (!user.profile) {
      user.profile = {};
    }

    if (fullname) user.fullname = fullname;
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
      user.email = email;
    }
    if (phonenumber) user.phonenumber = Number(phonenumber);
    if (bio !== undefined) user.profile.bio = bio;
    if (address !== undefined) user.profile.address = address;

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
      orders: user.orders,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error updating profile",
      success: false,
    });
  }
};

export const meLogin = async (req, res) => {
  try {
    const userId = req.id; // ✔ get userId from token

    const user = await User.findById(userId).populate("orders");
    // console.log(user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
