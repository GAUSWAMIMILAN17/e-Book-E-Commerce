import express from "express"

import {
  login,
  logout,
  meLogin,
  register,updateProfile
} from "../controller/user.controller.js";
import authenticateToken from "../middleware/authenticateToken.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post(authenticateToken, updateProfile);
router.route("/me").get(authenticateToken, meLogin);

export default router;