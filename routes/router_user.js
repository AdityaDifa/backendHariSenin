import express from "express";
import {
  register,
  login,
  sendEmail,
  verifyEmail,
} from "../controllers/controller_user.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/get-token", sendEmail);

router.post("/verify-email", verifyEmail);

export default router;
