import express from "express";
import { register, login } from "../controllers/controller_user.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// router.get("/verify-email");

export default router;
