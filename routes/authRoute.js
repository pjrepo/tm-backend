import express from "express";
import {
  register,
  login,
  logout,
  isLoggedIn,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/isLoggedIn", isLoggedIn);

router.get("/logout", logout);

export default router;
